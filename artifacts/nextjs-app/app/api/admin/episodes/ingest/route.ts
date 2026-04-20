import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { fetchCaptivateEpisodes } from "@/lib/captivate";

export async function POST() {
  const session = await getServerSession(authOptions);

  if (!session || !["super_admin", "editor"].includes(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const showId = process.env.CAPTIVATE_SHOW_ID;
  if (!showId) {
    return NextResponse.json(
      { error: "CAPTIVATE_SHOW_ID not set" },
      { status: 500 }
    );
  }

  try {
    const episodes = await fetchCaptivateEpisodes(showId);
    let created = 0;
    let skipped = 0;

    for (const ep of episodes) {
      const existing = await prisma.episode.findUnique({
        where: { captivateId: ep.id },
      });

      if (existing) {
        skipped++;
        continue;
      }

      await prisma.episode.create({
        data: {
          captivateId: ep.id,
          titleOriginal: ep.title,
          descriptionOriginal: ep.shownotes ?? "",
          audioUrl: ep.media_url,
          thumbnailUrl: ep.episode_art ?? null,
          durationSeconds: ep.duration ?? null,
          captivatePublishedAt: ep.published_at
            ? new Date(ep.published_at)
            : null,
          publishStatus: "draft",
        },
      });
      created++;
    }

    return NextResponse.json({ created, skipped, total: episodes.length });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
