"use client";

import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [episodeCardImage, setEpisodeCardImage] = useState<"youtube_thumbnail" | "cover_art">("youtube_thumbnail");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/admin/site-config")
      .then((r) => r.json())
      .then((data) => {
        if (data.episodeCardImage) setEpisodeCardImage(data.episodeCardImage);
      });
  }, []);

  async function handleSave() {
    setSaving(true);
    setMessage(null);
    const res = await fetch("/api/admin/site-config", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ episodeCardImage }),
    });
    if (res.ok) {
      setMessage({ type: "success", text: "Settings saved" });
    } else {
      const err = await res.text();
      console.error("Save failed:", err);
      setMessage({ type: "error", text: "Save failed — check console for details" });
    }
    setSaving(false);
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Global site configuration.</p>
      </div>

      {message && (
        <div className={`mb-4 px-4 py-3 rounded-lg text-sm ${message.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
          {message.text}
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-sm font-semibold text-gray-900 mb-1">Episode card image</h2>
        <p className="text-xs text-gray-500 mb-4">
          Choose which image to display on episode cards across the site.
        </p>
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setEpisodeCardImage("youtube_thumbnail")}
            className={`flex-1 py-3 px-4 rounded-lg border-2 text-sm font-medium text-left transition-colors ${episodeCardImage === "youtube_thumbnail" ? "border-brand-purple bg-purple-50 text-brand-purple" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}
          >
            YouTube thumbnail
            <p className="text-xs font-normal text-gray-500 mt-0.5">16:9 widescreen, fills the card</p>
          </button>
          <button
            onClick={() => setEpisodeCardImage("cover_art")}
            className={`flex-1 py-3 px-4 rounded-lg border-2 text-sm font-medium text-left transition-colors ${episodeCardImage === "cover_art" ? "border-brand-purple bg-purple-50 text-brand-purple" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}
          >
            Episode cover art
            <p className="text-xs font-normal text-gray-500 mt-0.5">Square artwork, shown in full</p>
          </button>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors"
          >
            {saving ? "Saving..." : "Save settings"}
          </button>
        </div>
      </div>
    </div>
  );
}
