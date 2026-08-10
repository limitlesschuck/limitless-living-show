import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import showConfig from "@/show.config";

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const episodes = await prisma.episode.findMany({
    where: { publishStatus: "published" },
    select: { slug: true, id: true, updatedAt: true },
    orderBy: { captivatePublishedAt: "desc" },
  });

  const episodeUrls = episodes.map((ep) => ({
    url: `${showConfig.domain}/episodes/${ep.slug ?? ep.id}`,
    lastModified: ep.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: showConfig.domain,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${showConfig.domain}/episodes`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${showConfig.domain}/guides`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${showConfig.domain}/assessment`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    ...episodeUrls,
  ];
}
