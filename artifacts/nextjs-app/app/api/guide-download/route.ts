import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import showConfig from "@/show.config";

const SYSTEME_API_KEY = process.env.SYSTEME_API_KEY ?? "";
const SYSTEME_API_URL = "https://api.systeme.io/api";

const TAG_PREFIX = showConfig.systeme.tagPrefix;

const SYSTEME_TAG_IDS: Record<string, number> = {
  [`${TAG_PREFIX}-guide-download`]: showConfig.systeme.tags.guideDownload,
  [`${TAG_PREFIX}-grief`]: showConfig.systeme.tags.grief,
  [`${TAG_PREFIX}-relationship`]: showConfig.systeme.tags.relationship,
  [`${TAG_PREFIX}-health`]: showConfig.systeme.tags.health,
  [`${TAG_PREFIX}-financial`]: showConfig.systeme.tags.financial,
  [`${TAG_PREFIX}-spiritual`]: showConfig.systeme.tags.spiritual,
  [`${TAG_PREFIX}-career`]: showConfig.systeme.tags.career,
};

async function getOrCreateSystemeContact(email: string, firstName: string): Promise<string | null> {
  const headers = { "Content-Type": "application/json", "X-API-Key": SYSTEME_API_KEY };

  const getRes = await fetch(`${SYSTEME_API_URL}/contacts?email=${encodeURIComponent(email)}`, { headers });
  if (getRes.ok) {
    const getData = await getRes.json();
    const existing = getData?.items?.[0];
    if (existing?.id) return String(existing.id);
  }

  const createRes = await fetch(`${SYSTEME_API_URL}/contacts`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email, firstName: firstName || undefined }),
  });

  if (createRes.ok) {
    const created = await createRes.json();
    if (created?.id) return String(created.id);
  }

  console.error("Systeme.io create contact failed:", createRes.status);
  return null;
}

async function addTagsToSystemeContact(contactId: string, tagIds: number[]): Promise<void> {
  const headers = { "Content-Type": "application/json", "X-API-Key": SYSTEME_API_KEY };
  await Promise.all(
    tagIds.map((tagId) =>
      fetch(`${SYSTEME_API_URL}/contacts/${contactId}/tags`, {
        method: "POST",
        headers,
        body: JSON.stringify({ tagId }),
      })
    )
  );
}

export async function POST(req: NextRequest) {
  try {
  const body = await req.json();
  const { email, firstName, episodeId } = body as { email: string; firstName: string; episodeId: string };

  if (!email || !episodeId) {
    return NextResponse.json({ error: "email and episodeId are required" }, { status: 400 });
  }

  const episode = await prisma.episode.findUnique({ where: { id: episodeId } });
  if (!episode) return NextResponse.json({ error: "Episode not found" }, { status: 404 });
  if (!episode.guidePdfUrl) return NextResponse.json({ error: "No guide available" }, { status: 404 });

  const existingLead = await prisma.lead.findFirst({ where: { email } });
  if (!existingLead) {
    await prisma.lead.create({
      data: {
        email,
        firstName: firstName || null,
        crisisCategory: episode.crisisCategory ?? "general",
        sourceEpisodeId: episode.id,
        emailSynced: false,
      },
    });
  }

  await prisma.guideDownload.create({
    data: { email, firstName: firstName || null, episodeId: episode.id },
  });

  if (SYSTEME_API_KEY) {
    try {
      const contactId = await getOrCreateSystemeContact(email, firstName);
      if (contactId) {
        const tagIds: number[] = [SYSTEME_TAG_IDS[`${TAG_PREFIX}-guide-download`]];
        if (episode.crisisCategory) {
          const catTag = SYSTEME_TAG_IDS[`${TAG_PREFIX}-${episode.crisisCategory}`];
          if (catTag) tagIds.push(catTag);
        }
        await addTagsToSystemeContact(contactId, tagIds);
        if (!existingLead) {
          await prisma.lead.updateMany({
            where: { email, emailSynced: false },
            data: { emailSynced: true },
          });
        }
      }
    } catch (err) {
      console.error("Systeme.io sync error:", err);
    }
  }

  return NextResponse.json({ success: true, pdfUrl: episode.guidePdfUrl });
  } catch (err) {
    console.error("guide-download error:", err);
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
