import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || !["super_admin", "editor"].includes(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const coach = await prisma.coach.update({
    where: { id: params.id },
    data: {
      name: body.name,
      email: body.email,
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

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || !["super_admin", "editor"].includes(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.coach.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
