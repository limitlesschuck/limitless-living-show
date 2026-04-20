import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

interface WebhookPayload {
  episodeId: string;
  titleOriginal: string;
  titleYoutube: string | null;
  titlePodcast: string | null;
  descriptionYoutube: string | null;
  descriptionWebsite: string | null;
  guestName: string | null;
  crisisCategory: string | null;
  tags: string[];
  audioUrl: string | null;
  thumbnailUrl: string | null;
  publishedAt: string;
}

async function triggerWebhook(
  url: string,
  payload: WebhookPayload
): Promise<{ ok: boolean; status: number; body: string }> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const body = await res.text();
    return { ok: res.ok, status: res.status, body };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return { ok: false, status: 0, body: message };
  }
}

export async function POST(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session || !["super_admin", "editor"].includes(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const episode = await prisma.episode.findUnique({
    where: { id: params.id },
  });

  if (!episode) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (episode.publishStatus !== "approved") {
    return NextResponse.json(
      { error: "Episode must be in approved status before publishing" },
      { status: 400 }
    );
  }

  const payload: WebhookPayload = {
    episodeId: episode.id,
    titleOriginal: episode.titleOriginal,
    titleYoutube: episode.titleYoutube,
    titlePodcast: episode.titlePodcast,
    descriptionYoutube: episode.descriptionYoutube,
    descriptionWebsite: episode.descriptionWebsite,
    guestName: episode.guestName,
    crisisCategory: episode.crisisCategory,
    tags: episode.tags,
    audioUrl: episode.audioUrl,
    thumbnailUrl: episode.thumbnailUrl,
    publishedAt: new Date().toISOString(),
  };

  const results: Record<string, { ok: boolean; status: number; body: string }> =
    {};

  const sheetsUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const makeUrl = process.env.MAKE_YOUTUBE_WEBHOOK_URL;

  if (sheetsUrl) {
    results.googleSheets = await triggerWebhook(sheetsUrl, payload);
  } else {
    results.googleSheets = {
      ok: false,
      status: 0,
      body: "GOOGLE_SHEETS_WEBHOOK_URL not set",
    };
  }

  if (makeUrl) {
    results.makeYoutube = await triggerWebhook(makeUrl, payload);
  } else {
    results.makeYoutube = {
      ok: false,
      status: 0,
      body: "MAKE_YOUTUBE_WEBHOOK_URL not set",
    };
  }

  const allOk = Object.values(results).every((r) => r.ok);

  await prisma.publishLog.create({
    data: {
      episodeId: episode.id,
      triggeredById: session.user.id,
      platform: "youtube",
      status: allOk ? "success" : "failed",
      webhookPayload: payload as unknown as Prisma.InputJsonValue,
      responseBody: results as unknown as Prisma.InputJsonValue,
    },
  });

  if (allOk) {
    await prisma.episode.update({
      where: { id: episode.id },
      data: { publishStatus: "published", publishedAt: new Date() },
    });
  }

  return NextResponse.json({
    success: allOk,
    results,
    message: allOk
      ? "Episode published — webhooks fired successfully"
      : "One or more webhooks failed — check results for details",
  });
}
