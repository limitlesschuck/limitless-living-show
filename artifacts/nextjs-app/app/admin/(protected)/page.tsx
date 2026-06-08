"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

function SiteSettings() {
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
      setMessage({ type: "error", text: "Save failed" });
    }
    setSaving(false);
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mt-8">
      <h2 className="text-sm font-semibold text-gray-900 mb-4">Site settings</h2>

      {message && (
        <div className={`mb-4 px-4 py-3 rounded-lg text-sm ${message.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
          {message.text}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">
            Episode card image
          </label>
          <p className="text-xs text-gray-500 mb-3">
            Choose which image to display on episode cards across the site.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setEpisodeCardImage("youtube_thumbnail")}
              className={`flex-1 py-3 px-4 rounded-lg border-2 text-sm font-medium transition-colors ${episodeCardImage === "youtube_thumbnail" ? "border-brand-purple bg-purple-50 text-brand-purple" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}
            >
              YouTube thumbnail
              <p className="text-xs font-normal text-gray-500 mt-0.5">16:9 widescreen, fills the card</p>
            </button>
            <button
              onClick={() => setEpisodeCardImage("cover_art")}
              className={`flex-1 py-3 px-4 rounded-lg border-2 text-sm font-medium transition-colors ${episodeCardImage === "cover_art" ? "border-brand-purple bg-purple-50 text-brand-purple" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}
            >
              Episode cover art
              <p className="text-xs font-normal text-gray-500 mt-0.5">Square artwork, shown in full</p>
            </button>
          </div>
        </div>

        <div className="flex justify-end pt-2">
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

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ episodes: 0, leads: 0, coaches: 0, pendingEpisodes: 0 });

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {});
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Welcome back
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8 lg:grid-cols-4">
        <StatCard label="Total episodes" value={stats.episodes} />
        <StatCard label="Total leads" value={stats.leads} />
        <StatCard label="Active coaches" value={stats.coaches} />
        <StatCard
          label="Ready to publish"
          value={stats.pendingEpisodes}
          highlight={stats.pendingEpisodes > 0}
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">
          Quick actions
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <QuickAction
            href="/admin/episodes/new"
            label="Add episode"
            description="Manually enter episode details"
          />
          <QuickAction
            href="/admin/episodes?filter=draft"
            label="Review AI content"
            description="Approve generated titles and descriptions"
          />
          <QuickAction
            href="/admin/leads"
            label="View leads"
            description="See latest assessment submissions"
          />
        </div>
      </div>
      <SiteSettings />
    </div>
  );
}

function StatCard({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: number;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-5 ${
        highlight
          ? "bg-gray-900 border-gray-900 text-white"
          : "bg-white border-gray-200"
      }`}
    >
      <p
        className={`text-3xl font-semibold ${
          highlight ? "text-white" : "text-gray-900"
        }`}
      >
        {value}
      </p>
      <p
        className={`text-xs mt-1 ${
          highlight ? "text-gray-300" : "text-gray-500"
        }`}
      >
        {label}
      </p>
    </div>
  );
}

function QuickAction({
  href,
  label,
  description,
}: {
  href: string;
  label: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="block p-4 rounded-lg border border-gray-200 hover:border-gray-400 hover:bg-gray-50 transition-colors"
    >
      <p className="text-sm font-medium text-gray-900">{label}</p>
      <p className="text-xs text-gray-500 mt-0.5">{description}</p>
    </Link>
  );
}
