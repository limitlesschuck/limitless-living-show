"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Episode {
  id: string;
  episodeNumber: number | null;
  titleOriginal: string;
  titleYoutube: string | null;
  guestName: string | null;
  crisisCategory: string | null;
  publishStatus: string;
  captivatePublishedAt: string | null;
  youtubeId: string | null;
}

const STATUS_STYLES: Record<string, string> = {
  draft: "bg-gray-100 text-gray-600",
  ai_generated: "bg-blue-50 text-blue-700",
  approved: "bg-amber-50 text-amber-700",
  published: "bg-green-50 text-green-700",
};

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

export default function EpisodesPage() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(20);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [categoryLabels, setCategoryLabels] = useState<Record<string, string>>({});

  async function loadEpisodes(status: string, pageNum: number) {
    setLoading(true);
    const params = new URLSearchParams({ page: String(pageNum) });
    if (status) params.set("filter", status);
    const res = await fetch(`/api/admin/episodes?${params.toString()}`);
    const data = await res.json();
    setEpisodes(data.episodes ?? []);
    setTotal(data.total ?? 0);
    setLimit(data.limit ?? 20);
    setLoading(false);
  }

  useEffect(() => {
    loadEpisodes(filter, page);
  }, [filter, page]);

  function changeFilter(status: string) {
    setFilter(status);
    setPage(1);
  }

  const totalPages = Math.max(1, Math.ceil(total / limit));
  const rangeStart = total === 0 ? 0 : (page - 1) * limit + 1;
  const rangeEnd = Math.min(page * limit, total);

  useEffect(() => {
    fetch("/api/admin/categories")
      .then((r) => r.json())
      .then((data) => {
        const map = Object.fromEntries(
          (data.categories ?? []).map((c: { value: string; label: string }) => [c.value, c.label])
        );
        setCategoryLabels(map);
      });
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Episodes</h1>
          <p className="text-sm text-gray-500 mt-1">{total} total</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/episodes/new"
            className="px-4 py-2 text-sm font-medium text-white bg-brand-purple rounded-lg hover:bg-brand-purple-mid transition-colors"
          >
            Add Episode
          </Link>
        </div>
      </div>

      <div className="mb-4 flex gap-2 flex-wrap">
        {["", "draft", "ai_generated", "approved", "published"].map((s) => (
          <button
            key={s}
            onClick={() => changeFilter(s)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
              filter === s
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
            }`}
          >
            {s === "" ? "All" : s.replace("_", " ")}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-sm text-gray-500">
            Loading...
          </div>
        ) : episodes.length === 0 ? (
          <div className="p-8 text-center text-sm text-gray-500">
            No episodes found.{" "}
            {filter === "" && "Use Import from Captivate to get started."}
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3 hidden sm:table-cell w-16">
                  Ep#
                </th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">
                  Episode
                </th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3 hidden sm:table-cell">
                  Category
                </th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3 hidden md:table-cell">
                  Status
                </th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3 hidden lg:table-cell">
                  Published
                </th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {episodes.map((ep) => (
                <tr key={ep.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="text-xs font-medium text-gray-400">
                      {ep.episodeNumber ? `#${ep.episodeNumber}` : "—"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-gray-900 line-clamp-1">
                      {ep.titleYoutube ?? ep.titleOriginal}
                    </p>
                    {ep.guestName && (
                      <p className="text-xs text-gray-500 mt-0.5">
                        {ep.guestName}
                      </p>
                    )}
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="text-xs text-gray-600">
                      {ep.crisisCategory
                        ? categoryLabels[ep.crisisCategory] ??
                          ep.crisisCategory
                        : "—"}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        STATUS_STYLES[ep.publishStatus] ??
                        "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {ep.publishStatus.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <span className="text-xs text-gray-500">
                      {ep.captivatePublishedAt
                        ? new Date(
                            ep.captivatePublishedAt
                          ).toLocaleDateString()
                        : "—"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/episodes/${ep.id}`}
                      className="text-xs font-medium text-gray-900 hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {total > 0 && (
        <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
          <p className="text-xs text-gray-500">
            Showing {rangeStart}–{rangeEnd} of {total} episode{total !== 1 ? "s" : ""}
          </p>
          {totalPages > 1 && (
            <div className="flex items-center gap-1">
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
                        ? "bg-gray-900 text-white border-gray-900"
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
        </div>
      )}
    </div>
  );
}
