import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { renderToBuffer, type DocumentProps } from "@react-pdf/renderer";
import { SwipeCopyPdf } from "@/lib/swipe-copy-pdf";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import React from "react";
import showConfig from "@/show.config";

const R2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID ?? "",
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY ?? "",
  },
});

const BUCKET = process.env.CLOUDFLARE_R2_BUCKET ?? showConfig.r2.bucket;
const PUBLIC_URL = process.env.CLOUDFLARE_R2_PUBLIC_URL?.replace(/\/$/, "") ?? "";
const APP_URL = (process.env.NEXT_PUBLIC_APP_URL ?? showConfig.domain).replace(/\/$/, "");

export async function POST(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session || !["super_admin", "editor"].includes(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const episode = await prisma.episode.findUnique({
    where: { id: params.id },
  });

  if (!episode) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (!episode.swipeCopy) {
    return NextResponse.json(
      { error: "Generate swipe copy first before creating the PDF" },
      { status: 400 }
    );
  }

  try {
    const slug = episode.slug ?? episode.id;
    const episodePublicUrl = `${APP_URL || showConfig.domain}/episodes/${slug}`;
    const episodeUrl = episode.affiliateLink ?? episodePublicUrl;
    const swipeCopyText = (episode.swipeCopy ?? "")
      .replace(/\[EPISODE URL\]/g, episodeUrl)
      .replace(/\[AFFILIATE URL\]/g, episodeUrl)
      .replace(/\[affiliate url\]/gi, episodeUrl);

    const pdfElement = React.createElement(SwipeCopyPdf, {
      showName: showConfig.showName,
      episodeTitle: episode.titleYoutube ?? episode.titleOriginal,
      guestName: episode.guestName ?? "the guest",
      episodeUrl,
      swipeCopy: swipeCopyText,
      coverArtUrl: episode.coverArtUrl ?? undefined,
      thumbnailUrl: episode.youtubeThumbnailUrl ?? undefined,
    }) as unknown as React.ReactElement<DocumentProps>;

    const pdfBuffer = await renderToBuffer(pdfElement);

    const filename = `swipe-copy/${slug}-swipe.pdf`;

    await R2.send(
      new PutObjectCommand({
        Bucket: BUCKET,
        Key: filename,
        Body: pdfBuffer,
        ContentType: "application/pdf",
      })
    );

    const pdfUrl = `${PUBLIC_URL}/${filename}`;

    await prisma.episode.update({
      where: { id: episode.id },
      data: { swipeCopyPdfUrl: pdfUrl },
    });

    return NextResponse.json({ pdfUrl, success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "PDF generation failed";
    console.error("Swipe copy PDF generation error:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
