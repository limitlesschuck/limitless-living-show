import { prisma } from "@/lib/prisma";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import EpisodesGrid from "./EpisodesGrid";
import { getCategoryOptions } from "@/lib/categories";

export const dynamic = 'force-dynamic';

async function getCategoryLabels() {
  const categories = await getCategoryOptions();
  return Object.fromEntries(categories.map((c) => [c.value, c.label]));
}

async function getEpisodeCount(category?: string) {
  return prisma.episode.count({
    where: {
      publishStatus: "published",
      ...(category ? { crisisCategory: category } : {}),
    },
  });
}

async function getSiteConfig(): Promise<{ episodeCardImage: "youtube_thumbnail" | "cover_art" }> {
  try {
    const record = await prisma.siteConfig.findFirst();
    const config = record?.config as { episodeCardImage?: string } | null;
    return {
      episodeCardImage: (config?.episodeCardImage as "youtube_thumbnail" | "cover_art") ?? "youtube_thumbnail",
    };
  } catch {
    return { episodeCardImage: "youtube_thumbnail" };
  }
}

export default async function EpisodesPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const category = searchParams.category;
  const [siteConfig, totalCount, categoryLabelsMap, categories] = await Promise.all([
    getSiteConfig(),
    getEpisodeCount(category),
    getCategoryLabels(),
    getCategoryOptions(),
  ]);

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />

      <div className="bg-brand-purple py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl font-extrabold text-white mb-2">
            All episodes
          </h1>
          <p className="text-gray-300 text-sm">
            {totalCount} episode{totalCount !== 1 ? "s" : ""}
            {category ? ` in ${categoryLabelsMap[category] ?? category}` : ""}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Category filter */}
        <div className="flex gap-2 flex-wrap mb-8">
          <Link
            href="/episodes"
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              !category
                ? "bg-brand-purple text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All
          </Link>
          {categories.map((c) => (
            <Link
              key={c.value}
              href={`/episodes?category=${c.value}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                category === c.value
                  ? "bg-brand-purple text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {c.label}
            </Link>
          ))}
        </div>

        <EpisodesGrid
          category={category}
          categoryLabels={categoryLabelsMap}
          imageMode={siteConfig.episodeCardImage}
        />

        {/* Assessment CTA */}
        <div className="mt-16 bg-brand-purple rounded-2xl p-8 text-center">
          <p className="text-brand-gold text-sm font-semibold uppercase tracking-widest mb-3">
            Not sure where to start?
          </p>
          <h2 className="text-2xl font-bold text-white mb-3">
            Find the episodes that are right for you
          </h2>
          <p className="text-gray-300 text-sm mb-6 max-w-md mx-auto">
            Answer 4 quick questions and we&apos;ll match you with the right
            episodes and resources for exactly what you&apos;re going through.
          </p>
          <Link href="/assessment" className="btn-primary">
            Take the free assessment →
          </Link>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
