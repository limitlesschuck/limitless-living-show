import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

  const ext = file.name.split(".").pop()?.toLowerCase();
  if (!["vtt", "srt", "txt"].includes(ext ?? "")) {
    return NextResponse.json({ error: "Only VTT, SRT, or TXT files are supported" }, { status: 400 });
  }

  const text = await file.text();

  // Parse VTT or SRT to plain text — strip timestamps and cue markers
  let transcript = text;
  if (ext === "vtt") {
    transcript = text
      .replace(/^WEBVTT.*$/m, "")
      .replace(/^\d{2}:\d{2}:\d{2}\.\d{3}\s*-->\s*\d{2}:\d{2}:\d{2}\.\d{3}.*$/gm, "")
      .replace(/^\d{2}:\d{2}\.\d{3}\s*-->\s*\d{2}:\d{2}\.\d{3}.*$/gm, "")
      .replace(/^NOTE.*$/gm, "")
      .replace(/^\d+$/gm, "")
      .replace(/<[^>]+>/g, "")
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean)
      .join("\n");
  } else if (ext === "srt") {
    transcript = text
      .replace(/^\d+$/gm, "")
      .replace(/^\d{2}:\d{2}:\d{2},\d{3}\s*-->\s*\d{2}:\d{2}:\d{2},\d{3}.*$/gm, "")
      .replace(/<[^>]+>/g, "")
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean)
      .join("\n");
  }

  return NextResponse.json({ transcript: transcript.trim() });
}
