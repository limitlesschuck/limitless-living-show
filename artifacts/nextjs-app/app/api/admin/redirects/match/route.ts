import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function slugToWords(slug: string): string {
  return slug.replace(/-/g, " ").toLowerCase();
}

function similarity(a: string, b: string): number {
  const aWords = new Set(slugToWords(a).split(" "));
  const bWords = new Set(slugToWords(b).split(" "));
  const intersection = new Set([...aWords].filter(x => bWords.has(x)));
  const union = new Set([...aWords, ...bWords]);
  return intersection.size / union.size;
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { slugs } = await req.json() as { slugs: string[] };

  const episodes = await prisma.episode.findMany({
    select: { id: true, titleOriginal: true, slug: true, episodeNumber: true },
  });

  const matches = slugs.map((oldSlug) => {
    let best = { episode: episodes[0], score: 0 };
    for (const ep of episodes) {
      const epSlug = ep.slug ?? ep.titleOriginal.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const score = similarity(oldSlug, epSlug);
      if (score > best.score) best = { episode: ep, score };
    }
    return {
      oldSlug,
      episode: best.episode,
      confidence: best.score > 0.7 ? "high" : best.score > 0.4 ? "medium" : "low",
      score: best.score,
    };
  });

  return NextResponse.json({ matches });
}
