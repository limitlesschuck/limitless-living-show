import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const episode = await prisma.episode.findUnique({
    where: { id: params.id },
    include: {
      aiLogs: {
        orderBy: { createdAt: "desc" },
        take: 10,
      },
    },
  });

  if (!episode) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(episode);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session || !["super_admin", "editor"].includes(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const allowed = [
    "titleYoutube",
    "titlePodcast",
    "transcript",
    "descriptionYoutube",
    "descriptionWebsite",
    "guestName",
    "guestBio",
    "guestEmail",
    "affiliateLink",
    "swipeCopy",
    "swipeCopyPdfUrl",
    "systemeContactId",
    "crisisCategory",
    "tags",
    "qaSection",
    "pullQuotes",
    "publishStatus",
    "youtubeId",
    "mp4Url",
    "coverArtUrl",
    "youtubeThumbnailUrl",
    "captivateId",
    "guideBio",
    "guideFrameworks",
    "guideTakeaways",
    "guideQuotes",
    "guideActionItems",
    "guidePdfUrl",
    "ctaId",
    "slug",
  ];

  const data: Record<string, unknown> = {};
  for (const key of allowed) {
    if (key in body) data[key] = body[key];
  }

  // Normalize slug: empty string → null to avoid unique constraint violation
  if ("slug" in data) {
    data.slug = data.slug || null;
  }

  const existingEpisode = await prisma.episode.findUnique({
    where: { id: params.id },
    select: { slug: true },
  });

  const episode = await prisma.episode.update({
    where: { id: params.id },
    data,
  });

  // If a new slug was just set on an episode that previously had none,
  // create a redirect from the episode ID path so old links still work
  if (existingEpisode && data.slug && !existingEpisode.slug) {
    await prisma.redirectMap.upsert({
      where: { oldSlug: params.id },
      update: { episodeId: episode.id },
      create: { oldSlug: params.id, episodeId: episode.id },
    });
  }

  return NextResponse.json(episode);
}
