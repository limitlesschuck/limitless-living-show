import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const redirects = await prisma.redirectMap.findMany({
    orderBy: { createdAt: "desc" },
    include: { episode: { select: { id: true, titleOriginal: true, slug: true, episodeNumber: true } } },
  });
  return NextResponse.json({ redirects });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !["super_admin", "editor"].includes(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { oldSlug, episodeId } = body;
  if (!oldSlug || !episodeId) return NextResponse.json({ error: "oldSlug and episodeId required" }, { status: 400 });

  const redirect = await prisma.redirectMap.upsert({
    where: { oldSlug },
    update: { episodeId },
    create: { oldSlug, episodeId },
  });
  return NextResponse.json({ redirect });
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !["super_admin", "editor"].includes(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();
  await prisma.redirectMap.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
