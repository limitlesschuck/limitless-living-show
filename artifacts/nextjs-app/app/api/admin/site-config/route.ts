import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const record = await prisma.siteConfig.findFirst();
  return NextResponse.json(record?.config ?? { episodeCardImage: "youtube_thumbnail" });
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const existing = await prisma.siteConfig.findFirst();

  if (existing) {
    const updated = await prisma.siteConfig.update({
      where: { id: existing.id },
      data: { config: { ...(existing.config as object), ...body } },
    });
    return NextResponse.json(updated.config);
  }

  const created = await prisma.siteConfig.create({
    data: { config: body },
  });
  return NextResponse.json(created.config);
}
