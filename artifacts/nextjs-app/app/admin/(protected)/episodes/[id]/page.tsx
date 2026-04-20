"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface Episode {
  id: string;
  titleOriginal: string;
  titleYoutube: string | null;
  titlePodcast: string | null;
  descriptionOriginal: string | null;
  descriptionYoutube: string | null;
  descriptionWebsite: string | null;
  guestName: string | null;
  guestBio: string | null;
  crisisCategory: string | null;
  tags: string[];
  publishStatus: string;
  audioUrl: string | null;
  thumbnailUrl: string | null;
  youtubeId: string | null;
  captivatePublishedAt: string | null;
}

const CATEGORIES = [
  { value: "grief", label: "Grief & loss" },
  { value: "relationship", label: "Relationship & divorce" },
  { value: "health", label: "Health & addiction" },
  { value: "financial", label: "Financial hardship" },
  { value: "spiritual", label: "Spiritual awakening" },
  { value: "career", label: "Career & purpose" },
];

const STATUSES = ["draft", "ai_generated", "approved", "published"];

export default function EpisodeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [form, setForm] = useState({
    titleYoutube: "",
    titlePodcast: "",
    descriptionYoutube: "",
    descriptionWebsite: "",
    guestName: "",
    guestBio: "",
    crisisCategory: "",
    tags: "",
    publishStatus: "draft",
    youtubeId: "",
  });

  async function loadEpisode() {
    const res = await fetch(`/nextjs-app/api/admin/episodes/${id}`);
    const data = await res.json();
    setEpisode(data);
    setForm({
      titleYoutube: data.titleYoutube ?? "",
      titlePodcast: data.titlePodcast ?? "",
      descriptionYoutube: data.descriptionYoutube ?? "",
      descriptionWebsite: data.descriptionWebsite ?? "",
      guestName: data.guestName ?? "",
      guestBio: data.guestBio ?? "",
      crisisCategory: data.crisisCategory ?? "",
      tags: (data.tags ?? []).join(", "),
      publishStatus: data.publishStatus ?? "draft",
      youtubeId: data.youtubeId ?? "",
    });
    setLoading(false);
  }

  async function handleSave() {
    setSaving(true);
    setMessage(null);
    const res = await fetch(`/nextjs-app/api/admin/episodes/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      }),
    });
    if (res.ok) {
      setMessage({ type: "success", text: "Saved successfully" });
      loadEpisode();
    } else {
      setMessage({ type: "error", text: "Save failed" });
    }
    setSaving(false);
  }

  async function handleGenerate() {
    setGenerating(true);
    setMessage(null);
    const res = await fetch(`/nextjs-app/api/admin/episodes/${id}/generate`, {
      method: "POST",
    });
    const data = await res.json();
    if (res.ok) {
      setMessage({
        type: "success",
        text: "AI content generated — review and save below",
      });
      loadEpisode();
    } else {
      setMessage({ type: "error", text: `Generation failed: ${data.error}` });
    }
    setGenerating(false);
  }

  useEffect(() => {
    loadEpisode();
  }, [id]);

  if (loading) {
    return (
      <div className="p-8 text-sm text-gray-500">Loading episode...</div>
    );
  }

  if (!episode) {
    return <div className="p-8 text-sm text-gray-500">Episode not found.</div>;
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/admin/episodes"
          className="text-sm text-gray-500 hover:text-gray-900"
        >
          ← Episodes
        </Link>
        <span className="text-gray-300">/</span>
        <span className="text-sm text-gray-900 font-medium line-clamp-1">
          {episode.titleOriginal}
        </span>
      </div>

      {message && (
        <div
          className={`mb-4 px-4 py-3 rounded-lg text-sm ${
            message.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Section title="Original content (read only)">
            <Field label="Original title">
              <p className="text-sm text-gray-700">{episode.titleOriginal}</p>
            </Field>
            {episode.descriptionOriginal && (
              <Field label="Original description">
                <p className="text-sm text-gray-600 whitespace-pre-wrap line-clamp-6">
                  {episode.descriptionOriginal}
                </p>
              </Field>
            )}
          </Section>

          <Section title="AI-generated content">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs text-gray-500">
                Generate or regenerate content using Claude AI
              </p>
              <button
                onClick={handleGenerate}
                disabled={generating}
                className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors"
              >
                {generating ? "Generating..." : "Generate with Claude"}
              </button>
            </div>

            <Field label="YouTube title">
              <input
                type="text"
                value={form.titleYoutube}
                onChange={(e) =>
                  setForm((f) => ({ ...f, titleYoutube: e.target.value }))
                }
                className="input"
                placeholder="AI-generated YouTube title"
              />
              <p className="text-xs text-gray-400 mt-1">
                {form.titleYoutube.length}/70 chars
              </p>
            </Field>

            <Field label="Podcast title">
              <input
                type="text"
                value={form.titlePodcast}
                onChange={(e) =>
                  setForm((f) => ({ ...f, titlePodcast: e.target.value }))
                }
                className="input"
                placeholder="AI-generated podcast title"
              />
            </Field>

            <Field label="YouTube description">
              <textarea
                value={form.descriptionYoutube}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    descriptionYoutube: e.target.value,
                  }))
                }
                rows={8}
                className="input"
                placeholder="AI-generated YouTube description"
              />
            </Field>

            <Field label="Website / SEO description">
              <textarea
                value={form.descriptionWebsite}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    descriptionWebsite: e.target.value,
                  }))
                }
                rows={5}
                className="input"
                placeholder="AI-generated SEO description"
              />
            </Field>

            <Field label="Tags (comma separated)">
              <input
                type="text"
                value={form.tags}
                onChange={(e) =>
                  setForm((f) => ({ ...f, tags: e.target.value }))
                }
                className="input"
                placeholder="grief recovery, starting over, rebuilding your life"
              />
            </Field>
          </Section>

          <Section title="Guest details">
            <Field label="Guest name">
              <input
                type="text"
                value={form.guestName}
                onChange={(e) =>
                  setForm((f) => ({ ...f, guestName: e.target.value }))
                }
                className="input"
              />
            </Field>
            <Field label="Guest bio">
              <textarea
                value={form.guestBio}
                onChange={(e) =>
                  setForm((f) => ({ ...f, guestBio: e.target.value }))
                }
                rows={3}
                className="input"
                placeholder="Short bio shown on episode page"
              />
            </Field>
          </Section>
        </div>

        <div className="space-y-6">
          <Section title="Settings">
            <Field label="Crisis category">
              <select
                value={form.crisisCategory}
                onChange={(e) =>
                  setForm((f) => ({ ...f, crisisCategory: e.target.value }))
                }
                className="input"
              >
                <option value="">— Select category —</option>
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Publish status">
              <select
                value={form.publishStatus}
                onChange={(e) =>
                  setForm((f) => ({ ...f, publishStatus: e.target.value }))
                }
                className="input"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s.replace("_", " ")}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="YouTube video ID">
              <input
                type="text"
                value={form.youtubeId}
                onChange={(e) =>
                  setForm((f) => ({ ...f, youtubeId: e.target.value }))
                }
                className="input"
                placeholder="e.g. dQw4w9WgXcQ"
              />
            </Field>

            {episode.thumbnailUrl && (
              <Field label="Thumbnail">
                <img
                  src={episode.thumbnailUrl}
                  alt="Episode thumbnail"
                  className="w-full rounded-lg border border-gray-200"
                />
              </Field>
            )}

            {episode.audioUrl && (
              <Field label="Audio">
                <audio controls className="w-full" src={episode.audioUrl}>
                  Your browser does not support audio.
                </audio>
              </Field>
            )}
          </Section>

          <div className="flex flex-col gap-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors"
            >
              {saving ? "Saving..." : "Save changes"}
            </button>
            <button
              onClick={() => router.push("/admin/episodes")}
              className="w-full px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-sm font-semibold text-gray-900 mb-4">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1">
        {label}
      </label>
      {children}
    </div>
  );
}
