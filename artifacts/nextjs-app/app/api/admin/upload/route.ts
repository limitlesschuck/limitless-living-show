import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !["super_admin", "editor"].includes(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const folder = (formData.get("folder") as string) ?? "episode-art";

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json(
      { error: "Only JPEG, PNG, and WebP images are allowed" },
      { status: 400 }
    );
  }

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const safeName = file.name
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-zA-Z0-9-_]/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase();
  const filename = `${safeName}-${Date.now()}.${ext}`;

  const uploadDir = join(process.cwd(), "public", folder);
  await mkdir(uploadDir, { recursive: true });
  const filePath = join(uploadDir, filename);

  const bytes = await file.arrayBuffer();
  await writeFile(filePath, Buffer.from(bytes));

  const appUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "")
    ?? process.env.NEXTAUTH_URL?.replace(/\/$/, "").replace(/\/api\/auth$/, "").replace(/\/nextjs-app$/, "")
    ?? "";
  const publicUrl = `${appUrl}/${folder}/${filename}`;

  return NextResponse.json({ url: publicUrl, filename });
}
