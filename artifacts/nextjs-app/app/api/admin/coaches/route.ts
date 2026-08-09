import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const coaches = await prisma.coach.findMany({
    orderBy: [{ priority: "asc" }, { name: "asc" }],
    include: { episode: { select: { id: true, titleOriginal: true, slug: true } } },
  });
  return NextResponse.json({ coaches });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !["super_admin", "editor"].includes(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const coach = await prisma.coach.create({
    data: {
      name: body.name,
      email: body.email ?? `${Date.now()}@placeholder.com`,
      bio: body.bio ?? null,
      photoUrl: body.photoUrl ?? null,
      profileUrl: body.profileUrl ?? null,
      specialties: body.specialties ?? [],
      urgencyLevels: body.urgencyLevels ?? [],
      priority: body.priority ?? 0,
      isActive: body.isActive ?? true,
      episodeId: body.episodeId ?? null,
    },
  });
  return NextResponse.json({ coach });
}
