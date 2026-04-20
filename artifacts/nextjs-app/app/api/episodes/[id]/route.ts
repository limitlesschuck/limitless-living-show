import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const episode = await prisma.episode.findFirst({
    where: {
      id: params.id,
      publishStatus: "published",
    },
    include: {
      cta: true,
    },
  });

  if (!episode) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(episode);
}
