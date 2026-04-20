"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Episode {
  id: string;
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

const CATEGORY_LABELS: Record<string, string> = {
  grief: "Grief & loss",
  relationship: "Relationship",
  health: "Health & addiction",
  financial: "Financial",
  spiritual: "Spiritual",
  career: "Career & purpose",
};

export default function EpisodesPage() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [ingesting, setIngesting] = useState(false);
  const [ingestResult, setIngestResult] = useState<string | null>(null);
  const [showImportConfirm, setShowImportConfirm] = useState(false);
  const [syncingNumbers, setSyncingNumbers] = useState(false);

  async function loadEpisodes(status: string) {
    setLoading(true);
    const params = status ? `?filter=${status}` : "";
    const res = await fetch(`/nextjs-app/api/admin/episodes${params}`);
    const data = await res.json();
    setEpisodes(data.episodes ?? []);
    setTotal(data.total ?? 0);
    setLoading(false);
  }

  async function handleSyncNumbers() {
    setSyncingNumbers(true);
    setIngestResult(null);
    try {
      const res = await fetch("/nextjs-app/api/admin/episodes/sync-numbers", {
        method: "POST",
      });
      const data = await res.json();
      setIngestResult(data.message ?? "Sync complete");
    } catch {
      setIngestResult("Error: sync failed");
    }
    setSyncingNumbers(false);
  }

  async function handleIngest() {
    setShowImportConfirm(false);
    setIngesting(true);
    setIngestResult(null);
    try {
      const res = await fetch("/nextjs-app/api/admin/episodes/ingest", {
        method: "POST",
      });
      const data = await res.json();
      if (data.error) {
        setIngestResult(`Error: ${data.error}`);
      } else {
        setIngestResult(
          `Done — ${data.created} new episodes imported, ${data.skipped} already existed`
        );
        loadEpisodes(filter);
      }
    } catch {
      setIngestResult("Error: Failed to connect to Captivate");
    }
    setIngesting(false);
  }

  useEffect(() => {
    loadEpisodes(filter);
  }, [filter]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Episodes</h1>
          <p className="text-sm text-gray-500 mt-1">{total} total</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSyncNumbers}
            disabled={syncingNumbers}
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
          >
            {syncingNumbers ? "Syncing..." : "Sync episode numbers"}
          </button>
          <Link
            href="/admin/episodes/new"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Add manually
          </Link>
          <button
            onClick={() => setShowImportConfirm(true)}
            disabled={ingesting}
            className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors"
          >
            {ingesting ? "Importing..." : "Import from Captivate"}
          </button>
        </div>
      </div>

      {showImportConfirm && (
        <div className="mb-4 px-4 py-4 rounded-lg bg-amber-50 border border-amber-200">
          <p className="text-sm font-medium text-amber-900 mb-1">
            Import new episodes from Captivate?
          </p>
          <p className="text-xs text-amber-700 mb-3">
            This will only add new episodes. Existing episode data including titles, descriptions, and all customised content will not be changed.
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleIngest}
              className="px-4 py-1.5 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Yes, import new episodes
            </button>
            <button
              onClick={() => setShowImportConfirm(false)}
              className="px-4 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {ingestResult && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-sm text-gray-700">
          {ingestResult}
        </div>
      )}

      <div className="mb-4 flex gap-2 flex-wrap">
        {["", "draft", "ai_generated", "approved", "published"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
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
                        ? CATEGORY_LABELS[ep.crisisCategory] ??
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
    </div>
  );
}
