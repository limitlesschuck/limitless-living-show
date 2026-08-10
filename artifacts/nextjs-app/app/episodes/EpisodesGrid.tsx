"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import showConfig from "@/show.config";

interface EpisodeSummary {
  id: string;
  slug: string | null;
  episodeNumber: number | null;
  titleOriginal: string;
  titleYoutube: string | null;
  guestName: string | null;
  crisisCategory: string | null;
  thumbnailUrl: string | null;
  coverArtUrl: string | null;
  youtubeThumbnailUrl: string | null;
  durationSeconds: number | null;
}

function formatDuration(seconds: number | null) {
  if (!seconds) return null;
  return `${Math.floor(seconds / 60)} min`;
}

function getPageNumbers(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  if (current <= 3) {
    return [1, 2, 3, 4, "ellipsis", total];
  }
  if (current >= total - 2) {
    return [1, "ellipsis", total - 3, total - 2, total - 1, total];
  }
  return [1, "ellipsis", current - 1, current, current + 1, "ellipsis", total];
}

export default function EpisodesGrid({
  category,
  categoryLabels,
  imageMode,
}: {
  category?: string;
  categoryLabels: Record<string, string>;
  imageMode: "youtube_thumbnail" | "cover_art";
}) {
  const [episodes, setEpisodes] = useState<EpisodeSummary[]>([]);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPage(1);
  }, [category]);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: "20" });
    if (category) params.set("category", category);
    fetch(`/api/episodes?${params.toString()}`)
      .then((r) => r.json())
      .then((data) => {
        setEpisodes(data.episodes ?? []);
        setTotal(data.total ?? 0);
        setLimit(data.limit ?? 20);
        setLoading(false);
      });
  }, [category, page]);

  const totalPages = Math.max(1, Math.ceil(total / limit));

  if (loading && episodes.length === 0) {
    return (
      <div className="text-center py-24 text-sm text-gray-500">
        Loading episodes...
      </div>
    );
  }

  if (!loading && episodes.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="text-gray-500 text-sm mb-4">
          No episodes found in this category yet.
        </p>
        <Link
          href="/episodes"
          className="text-sm text-brand-purple-dark font-medium hover:underline"
        >
          View all episodes
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {episodes.map((ep) => {
          const title = ep.titleYoutube ?? ep.titleOriginal;
          const epCategory = ep.crisisCategory
            ? categoryLabels[ep.crisisCategory]
            : null;
          const duration = formatDuration(ep.durationSeconds);
          const displayImage =
            imageMode === "cover_art"
              ? ep.coverArtUrl || ep.thumbnailUrl
              : ep.youtubeThumbnailUrl || ep.coverArtUrl || ep.thumbnailUrl;

          return (
            <Link
              key={ep.id}
              href={ep.slug ? `/episodes/${ep.slug}` : `/episodes/${ep.id}`}
              className="group episode-card border-gray-200 block text-gray-900 hover:text-brand-purple-dark no-underline"
            >
              <div className={`relative bg-brand-purple-dark overflow-hidden ${imageMode === "cover_art" ? "aspect-square" : "aspect-video"}`}>
                {displayImage ? (
                  <img
                    src={displayImage}
                    alt={title}
                    className={`w-full h-full ${imageMode === "cover_art" ? "object-contain" : "object-cover group-hover:scale-105 transition-transform duration-300"}`}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-brand-purple">
                    <span className="text-brand-gold text-2xl font-bold">
                      {showConfig.showInitials}
                    </span>
                  </div>
                )}
                {epCategory && (
                  <span className="absolute top-2 left-2 text-xs font-semibold bg-brand-gold text-brand-purple-dark px-2 py-0.5 rounded-full">
                    {epCategory}
                  </span>
                )}
              </div>
              <div className="p-4">
                <h2 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-1 group-hover:text-brand-purple-dark transition-colors">
                  {title}
                </h2>
                {ep.guestName && (
                  <p className="text-xs text-gray-500">with {ep.guestName}</p>
                )}
                <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                  {ep.episodeNumber && (
                    <span>Ep. {ep.episodeNumber}</span>
                  )}
                  {duration && <span>{duration}</span>}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1 mt-8">
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page <= 1}
            className="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 text-gray-600 hover:border-gray-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          {getPageNumbers(page, totalPages).map((p, i) =>
            p === "ellipsis" ? (
              <span key={`ellipsis-${i}`} className="px-2 text-xs text-gray-400">
                …
              </span>
            ) : (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                  p === page
                    ? "bg-brand-admin-accent text-brand-purple-dark border-brand-admin-accent"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                }`}
              >
                {p}
              </button>
            )
          )}
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page >= totalPages}
            className="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 text-gray-600 hover:border-gray-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
