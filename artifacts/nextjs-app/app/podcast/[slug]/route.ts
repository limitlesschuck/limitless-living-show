import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import showConfig from "@/show.config";

export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const mapping = await prisma.redirectMap.findUnique({
    where: { oldSlug: params.slug },
    include: { episode: { select: { slug: true, id: true } } },
  });

  if (mapping) {
    const destination = `/episodes/${mapping.episode.slug ?? mapping.episode.id}`;
    return NextResponse.redirect(`${showConfig.domain}${destination}`, { status: 301 });
  }

  // Fallback: try matching by slug directly on Episode
  const episode = await prisma.episode.findFirst({
    where: { slug: params.slug },
    select: { slug: true, id: true },
  });

  if (episode) {
    return NextResponse.redirect(
      `${showConfig.domain}/episodes/${episode.slug ?? episode.id}`,
      { status: 301 }
    );
  }

  return NextResponse.redirect(`${showConfig.domain}/episodes`, { status: 302 });
}
