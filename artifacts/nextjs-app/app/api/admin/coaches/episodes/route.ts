import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") ?? "";

  const episodes = await prisma.episode.findMany({
    where: {
      publishStatus: "published",
      OR: [
        { guestName: { contains: q, mode: "insensitive" } },
        { titleOriginal: { contains: q, mode: "insensitive" } },
      ],
    },
    select: {
      id: true,
      titleOriginal: true,
      guestName: true,
      guestBio: true,
      guideBio: true,
      coverArtUrl: true,
      youtubeThumbnailUrl: true,
      guestEmail: true,
      slug: true,
    },
    take: 10,
    orderBy: { captivatePublishedAt: "desc" },
  });
  return NextResponse.json({ episodes });
}
