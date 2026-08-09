"use client";

import { useEffect, useState } from "react";

interface RedirectEpisode {
  id: string;
  titleOriginal: string;
  slug: string | null;
  episodeNumber: number | null;
}

interface RedirectMapping {
  id: string;
  oldSlug: string;
  episodeId: string;
  episode: RedirectEpisode;
}

interface EpisodeSearchResult {
  id: string;
  titleOriginal: string;
  guestName: string | null;
  slug: string | null;
}

interface MatchResult {
  oldSlug: string;
  episode: RedirectEpisode;
  confidence: "high" | "medium" | "low";
  score: number;
}

const CONFIDENCE_STYLES: Record<string, string> = {
  high: "bg-green-50 text-green-700 border border-green-200",
  medium: "bg-amber-50 text-amber-700 border border-amber-200",
  low: "bg-red-50 text-red-700 border border-red-200",
};

function extractPodcastSlugs(xml: string): string[] {
  const locRegex = /<loc>([^<]+)<\/loc>/g;
  const slugs = new Set<string>();
  let match: RegExpExecArray | null;
  while ((match = locRegex.exec(xml)) !== null) {
    const url = match[1];
    const slugMatch = url.match(/\/podcast\/([^/?#]+)\/?$/);
    if (slugMatch) {
      try {
        slugs.add(decodeURIComponent(slugMatch[1]));
      } catch {
        slugs.add(slugMatch[1]);
      }
    }
  }
  return Array.from(slugs);
}

export default function RedirectsPage() {
  const [redirects, setRedirects] = useState<RedirectMapping[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Bulk import
  const [sitemapXml, setSitemapXml] = useState("");
  const [parsing, setParsing] = useState(false);
  const [matches, setMatches] = useState<MatchResult[] | null>(null);
  const [checkedSlugs, setCheckedSlugs] = useState<Set<string>>(new Set());
  const [importing, setImporting] = useState(false);

  // Manual add
  const [newOldSlug, setNewOldSlug] = useState("");
  const [episodeQuery, setEpisodeQuery] = useState("");
  const [episodeResults, setEpisodeResults] = useState<EpisodeSearchResult[]>([]);
  const [showEpisodeDropdown, setShowEpisodeDropdown] = useState(false);
  const [selectedEpisode, setSelectedEpisode] = useState<EpisodeSearchResult | null>(null);
  const [adding, setAdding] = useState(false);

  async function loadRedirects() {
    setLoading(true);
    const res = await fetch("/api/admin/redirects");
    const data = await res.json();
    setRedirects(data.redirects ?? []);
    setLoading(false);
  }

  useEffect(() => {
    loadRedirects();
  }, []);

  useEffect(() => {
    if (!episodeQuery.trim()) {
      setEpisodeResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      const res = await fetch(`/api/admin/coaches/episodes?q=${encodeURIComponent(episodeQuery)}`);
      const data = await res.json();
      setEpisodeResults(data.episodes ?? []);
    }, 300);
    return () => clearTimeout(timer);
  }, [episodeQuery]);

  async function handleParseAndMatch() {
    const slugs = extractPodcastSlugs(sitemapXml);
    if (slugs.length === 0) {
      setMessage({ type: "error", text: "No /podcast/[slug] URLs found in the pasted sitemap" });
      return;
    }
    setParsing(true);
    setMatches(null);
    const res = await fetch("/api/admin/redirects/match", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slugs }),
    });
    const data = await res.json();
    const results: MatchResult[] = data.matches ?? [];
    setMatches(results);
    setCheckedSlugs(new Set(results.filter((m) => m.confidence !== "low").map((m) => m.oldSlug)));
    setParsing(false);
  }

  function toggleChecked(oldSlug: string) {
    setCheckedSlugs((prev) => {
      const next = new Set(prev);
      if (next.has(oldSlug)) next.delete(oldSlug);
      else next.add(oldSlug);
      return next;
    });
  }

  async function handleImportAll() {
    if (!matches) return;
    const toImport = matches.filter((m) => checkedSlugs.has(m.oldSlug));
    if (toImport.length === 0) {
      setMessage({ type: "error", text: "No matches selected to import" });
      return;
    }
    setImporting(true);
    let failed = 0;
    for (const m of toImport) {
      const res = await fetch("/api/admin/redirects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldSlug: m.oldSlug, episodeId: m.episode.id }),
      });
      if (!res.ok) failed++;
    }
    setImporting(false);
    setMatches(null);
    setSitemapXml("");
    setMessage(
      failed === 0
        ? { type: "success", text: `Imported ${toImport.length} redirect${toImport.length !== 1 ? "s" : ""}` }
        : { type: "error", text: `Imported ${toImport.length - failed}, ${failed} failed` }
    );
    loadRedirects();
  }

  function selectEpisode(ep: EpisodeSearchResult) {
    setSelectedEpisode(ep);
    setEpisodeQuery(ep.guestName ?? ep.titleOriginal);
    setShowEpisodeDropdown(false);
    setEpisodeResults([]);
  }

  async function handleAddRedirect() {
    if (!newOldSlug.trim() || !selectedEpisode) {
      setMessage({ type: "error", text: "Old slug and an episode are required" });
      return;
    }
    setAdding(true);
    const res = await fetch("/api/admin/redirects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ oldSlug: newOldSlug.trim(), episodeId: selectedEpisode.id }),
    });
    if (res.ok) {
      setMessage({ type: "success", text: "Redirect added" });
      setNewOldSlug("");
      setSelectedEpisode(null);
      setEpisodeQuery("");
      loadRedirects();
    } else {
      setMessage({ type: "error", text: "Failed to add redirect" });
    }
    setAdding(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this redirect?")) return;
    await fetch("/api/admin/redirects", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    loadRedirects();
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Redirects</h1>
        <p className="text-sm text-gray-500 mt-1">
          Map old /podcast/[slug] URLs to episodes so old links keep working
        </p>
      </div>

      {message && (
        <div className={`mb-4 px-4 py-3 rounded-lg text-sm ${message.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
          {message.text}
        </div>
      )}

      {/* Bulk import from sitemap */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="text-sm font-semibold text-gray-900 mb-1">Bulk import from sitemap</h2>
        <p className="text-xs text-gray-500 mb-4">
          Paste a WordPress sitemap XML. We&apos;ll extract every /podcast/[slug] URL and match it to an episode by title similarity.
        </p>
        <textarea
          value={sitemapXml}
          onChange={(e) => setSitemapXml(e.target.value)}
          className="input font-mono text-xs"
          rows={8}
          placeholder="<urlset>...<url><loc>https://example.com/podcast/some-episode/</loc></url>...</urlset>"
        />
        <button
          onClick={handleParseAndMatch}
          disabled={parsing || !sitemapXml.trim()}
          className="mt-3 px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors"
        >
          {parsing ? "Matching..." : "Parse & match"}
        </button>

        {matches && (
          <div className="mt-6">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-4 py-2 w-10" />
                    <th className="text-left text-xs font-medium text-gray-500 px-4 py-2">Old slug</th>
                    <th className="text-left text-xs font-medium text-gray-500 px-4 py-2">Matched episode</th>
                    <th className="text-left text-xs font-medium text-gray-500 px-4 py-2">Confidence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {matches.map((m) => (
                    <tr key={m.oldSlug}>
                      <td className="px-4 py-2">
                        <input
                          type="checkbox"
                          checked={checkedSlugs.has(m.oldSlug)}
                          onChange={() => toggleChecked(m.oldSlug)}
                        />
                      </td>
                      <td className="px-4 py-2">
                        <span className="text-xs text-gray-600 font-mono">{m.oldSlug}</span>
                      </td>
                      <td className="px-4 py-2">
                        <span className="text-sm text-gray-900">
                          {m.episode.titleOriginal}
                          {m.episode.episodeNumber && (
                            <span className="text-gray-400"> (Ep. {m.episode.episodeNumber})</span>
                          )}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded ${CONFIDENCE_STYLES[m.confidence]}`}>
                          {m.confidence} ({Math.round(m.score * 100)}%)
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              onClick={handleImportAll}
              disabled={importing || checkedSlugs.size === 0}
              className="mt-3 px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors"
            >
              {importing ? "Importing..." : `Import ${checkedSlugs.size} selected match${checkedSlugs.size !== 1 ? "es" : ""}`}
            </button>
          </div>
        )}
      </div>

      {/* Manual add */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">Add redirect manually</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Old slug</label>
            <input
              type="text"
              value={newOldSlug}
              onChange={(e) => setNewOldSlug(e.target.value)}
              className="input"
              placeholder="e.g. my-old-episode-slug"
            />
          </div>
          <div className="relative">
            <label className="block text-xs font-medium text-gray-500 mb-1">Episode</label>
            <input
              type="text"
              value={episodeQuery}
              onChange={(e) => {
                setEpisodeQuery(e.target.value);
                setSelectedEpisode(null);
                setShowEpisodeDropdown(true);
              }}
              onFocus={() => setShowEpisodeDropdown(true)}
              onBlur={() => setTimeout(() => setShowEpisodeDropdown(false), 150)}
              className="input"
              placeholder="Search by guest name or episode title..."
            />
            {showEpisodeDropdown && episodeQuery.trim() && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-56 overflow-y-auto">
                {episodeResults.length === 0 ? (
                  <div className="px-3 py-2 text-xs text-gray-500">No episodes found</div>
                ) : (
                  episodeResults.map((ep) => (
                    <button
                      key={ep.id}
                      type="button"
                      onClick={() => selectEpisode(ep)}
                      className="w-full text-left px-3 py-2 text-xs hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                    >
                      <p className="font-medium text-gray-900">{ep.guestName ?? ep.titleOriginal}</p>
                      <p className="text-gray-500 truncate">{ep.titleOriginal}</p>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
        <button
          onClick={handleAddRedirect}
          disabled={adding}
          className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors"
        >
          {adding ? "Adding..." : "Add redirect"}
        </button>
      </div>

      {/* Existing redirects */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-sm text-gray-500">Loading...</div>
        ) : redirects.length === 0 ? (
          <div className="p-8 text-center text-sm text-gray-500">No redirects yet.</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Old slug</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Episode title</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Episode #</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {redirects.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <span className="text-xs text-gray-600 font-mono">{r.oldSlug}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-900">{r.episode.titleOriginal}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-gray-500">{r.episode.episodeNumber ?? "—"}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleDelete(r.id)}
                      className="text-xs font-medium text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
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
