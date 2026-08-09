"use client";

import { useEffect, useState } from "react";

interface CoachEpisode {
  id: string;
  titleOriginal: string;
  slug: string | null;
}

interface Coach {
  id: string;
  name: string;
  email: string;
  bio: string | null;
  photoUrl: string | null;
  profileUrl: string | null;
  specialties: string[];
  urgencyLevels: string[];
  priority: number;
  isActive: boolean;
  episodeId: string | null;
  episode: CoachEpisode | null;
}

interface EpisodeSearchResult {
  id: string;
  titleOriginal: string;
  guestName: string | null;
  guestBio: string | null;
  guideBio: string | null;
  coverArtUrl: string | null;
  youtubeThumbnailUrl: string | null;
  guestEmail: string | null;
  slug: string | null;
}

interface CoachForm {
  name: string;
  email: string;
  bio: string;
  photoUrl: string;
  profileUrl: string;
  priority: number;
  specialties: string[];
  isActive: boolean;
  episodeId: string | null;
}

const EMPTY_FORM: CoachForm = {
  name: "",
  email: "",
  bio: "",
  photoUrl: "",
  profileUrl: "",
  priority: 0,
  specialties: [],
  isActive: true,
  episodeId: null,
};

export default function CoachesPage() {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<{ value: string; label: string }[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<CoachForm>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [episodeQuery, setEpisodeQuery] = useState("");
  const [episodeResults, setEpisodeResults] = useState<EpisodeSearchResult[]>([]);
  const [showEpisodeDropdown, setShowEpisodeDropdown] = useState(false);
  const [episodeSearchLoading, setEpisodeSearchLoading] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  async function loadCoaches() {
    setLoading(true);
    const res = await fetch("/api/admin/coaches");
    const data = await res.json();
    setCoaches(data.coaches ?? []);
    setLoading(false);
  }

  async function loadCategories() {
    const res = await fetch("/api/admin/categories");
    const data = await res.json();
    setCategories(data.categories ?? []);
  }

  useEffect(() => {
    loadCoaches();
    loadCategories();
  }, []);

  useEffect(() => {
    if (!episodeQuery.trim()) {
      setEpisodeResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      setEpisodeSearchLoading(true);
      const res = await fetch(`/api/admin/coaches/episodes?q=${encodeURIComponent(episodeQuery)}`);
      const data = await res.json();
      setEpisodeResults(data.episodes ?? []);
      setEpisodeSearchLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [episodeQuery]);

  function openAddForm() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setEpisodeQuery("");
    setEpisodeResults([]);
    setShowForm(true);
  }

  function openEditForm(coach: Coach) {
    setEditingId(coach.id);
    setForm({
      name: coach.name,
      email: coach.email,
      bio: coach.bio ?? "",
      photoUrl: coach.photoUrl ?? "",
      profileUrl: coach.profileUrl ?? "",
      priority: coach.priority,
      specialties: coach.specialties,
      isActive: coach.isActive,
      episodeId: coach.episodeId,
    });
    setEpisodeQuery(coach.episode?.titleOriginal ?? "");
    setEpisodeResults([]);
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
  }

  function selectEpisode(ep: EpisodeSearchResult) {
    setForm((f) => ({
      ...f,
      episodeId: ep.id,
      name: ep.guestName ?? f.name,
      bio: ep.guideBio ?? ep.guestBio ?? f.bio,
      photoUrl: ep.coverArtUrl ?? ep.youtubeThumbnailUrl ?? f.photoUrl,
      email: ep.guestEmail ?? f.email,
    }));
    setEpisodeQuery(ep.guestName ?? ep.titleOriginal);
    setShowEpisodeDropdown(false);
    setEpisodeResults([]);
  }

  function toggleSpecialty(value: string) {
    setForm((f) => ({
      ...f,
      specialties: f.specialties.includes(value)
        ? f.specialties.filter((s) => s !== value)
        : [...f.specialties, value],
    }));
  }

  async function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingPhoto(true);
    const uploadData = new FormData();
    uploadData.append("file", file);
    const res = await fetch("/api/admin/coaches/upload", {
      method: "POST",
      body: uploadData,
    });
    const data = await res.json();
    if (res.ok && data.url) {
      setForm((f) => ({ ...f, photoUrl: data.url }));
    } else {
      setMessage({ type: "error", text: data.error ?? "Photo upload failed" });
    }
    setUploadingPhoto(false);
    e.target.value = "";
  }

  async function handleSave() {
    if (!form.name.trim()) {
      setMessage({ type: "error", text: "Name is required" });
      return;
    }
    setSaving(true);
    const payload = {
      name: form.name,
      email: form.email || undefined,
      bio: form.bio || null,
      photoUrl: form.photoUrl || null,
      profileUrl: form.profileUrl || null,
      specialties: form.specialties,
      priority: form.priority,
      isActive: form.isActive,
      episodeId: form.episodeId,
    };
    const res = editingId
      ? await fetch(`/api/admin/coaches/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      : await fetch("/api/admin/coaches", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

    if (res.ok) {
      setMessage({ type: "success", text: editingId ? "Collaborator updated" : "Collaborator added" });
      closeForm();
      loadCoaches();
    } else {
      setMessage({ type: "error", text: "Save failed" });
    }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this collaborator?")) return;
    await fetch(`/api/admin/coaches/${id}`, { method: "DELETE" });
    loadCoaches();
  }

  async function handleToggleActive(coach: Coach) {
    await fetch(`/api/admin/coaches/${coach.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: coach.name,
        email: coach.email,
        bio: coach.bio,
        photoUrl: coach.photoUrl,
        profileUrl: coach.profileUrl,
        specialties: coach.specialties,
        priority: coach.priority,
        isActive: !coach.isActive,
        episodeId: coach.episodeId,
      }),
    });
    loadCoaches();
  }

  const categoryLabels = Object.fromEntries(categories.map((c) => [c.value, c.label]));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Featured Collaborators</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage the coaches and collaborators shown to assessment leads
          </p>
        </div>
        <button
          onClick={openAddForm}
          className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Add Collaborator
        </button>
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

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-sm text-gray-500">Loading...</div>
        ) : coaches.length === 0 ? (
          <div className="p-8 text-center text-sm text-gray-500">
            No collaborators yet. Click &quot;Add Collaborator&quot; to create one.
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3 w-16">
                  Priority
                </th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3 w-14" />
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">
                  Name
                </th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3 hidden sm:table-cell">
                  Categories
                </th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3 hidden md:table-cell">
                  Affiliate URL
                </th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">
                  Active
                </th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {coaches.map((coach) => (
                <tr key={coach.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <span className="text-xs font-medium text-gray-400">{coach.priority}</span>
                  </td>
                  <td className="px-4 py-3">
                    {coach.photoUrl ? (
                      <img
                        src={coach.photoUrl}
                        alt={coach.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-200" />
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-gray-900">{coach.name}</p>
                    <p className="text-xs text-gray-500">{coach.email}</p>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="text-xs text-gray-600">
                      {coach.specialties.length > 0
                        ? coach.specialties.map((s) => categoryLabels[s] ?? s).join(", ")
                        : "—"}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    {coach.profileUrl ? (
                      <a
                        href={coach.profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-brand-purple hover:underline truncate block max-w-xs"
                      >
                        {coach.profileUrl}
                      </a>
                    ) : (
                      <span className="text-xs text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleToggleActive(coach)}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                        coach.isActive ? "bg-green-500" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                          coach.isActive ? "translate-x-5" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex gap-3 justify-end">
                      <button
                        onClick={() => openEditForm(coach)}
                        className="text-xs font-medium text-gray-600 hover:text-gray-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(coach.id)}
                        className="text-xs font-medium text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">
              {editingId ? "Edit collaborator" : "Add collaborator"}
            </h2>

            <div className="mb-4 relative">
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Search episode (optional)
              </label>
              <input
                type="text"
                value={episodeQuery}
                onChange={(e) => {
                  setEpisodeQuery(e.target.value);
                  setShowEpisodeDropdown(true);
                }}
                onFocus={() => setShowEpisodeDropdown(true)}
                onBlur={() => setTimeout(() => setShowEpisodeDropdown(false), 150)}
                className="input"
                placeholder="Search by guest name or episode title..."
              />
              {showEpisodeDropdown && episodeQuery.trim() && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-56 overflow-y-auto">
                  {episodeSearchLoading ? (
                    <div className="px-3 py-2 text-xs text-gray-500">Searching...</div>
                  ) : episodeResults.length === 0 ? (
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
              {form.episodeId && (
                <button
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, episodeId: null }))}
                  className="text-xs text-gray-400 hover:text-gray-600 mt-1"
                >
                  Clear episode link
                </button>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="input"
                  placeholder="Full name"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="input"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Bio</label>
                <textarea
                  value={form.bio}
                  onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
                  className="input"
                  rows={4}
                  placeholder="Short bio..."
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-2">Headshot</label>
                <div className="flex items-center gap-3">
                  {form.photoUrl ? (
                    <img
                      src={form.photoUrl}
                      alt="Headshot preview"
                      className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-gray-100 flex-shrink-0" />
                  )}
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      disabled={uploadingPhoto}
                      className="hidden"
                      id="coach-photo-upload"
                    />
                    <label
                      htmlFor="coach-photo-upload"
                      className={`inline-block px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                        uploadingPhoto
                          ? "text-gray-400 bg-gray-50 border-gray-200 cursor-not-allowed"
                          : "text-gray-600 bg-white border-gray-200 hover:border-gray-400 cursor-pointer"
                      }`}
                    >
                      {uploadingPhoto ? "Uploading..." : "Upload photo"}
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Affiliate / profile URL
                </label>
                <input
                  type="url"
                  value={form.profileUrl}
                  onChange={(e) => setForm((f) => ({ ...f, profileUrl: e.target.value }))}
                  className="input"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Priority</label>
                <input
                  type="number"
                  value={form.priority}
                  onChange={(e) => setForm((f) => ({ ...f, priority: parseInt(e.target.value) || 0 }))}
                  className="input"
                  min={0}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-2">Categories</label>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((c) => (
                    <label key={c.value} className="flex items-center gap-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={form.specialties.includes(c.value)}
                        onChange={() => toggleSpecialty(c.value)}
                      />
                      {c.label}
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, isActive: !f.isActive }))}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                    form.isActive ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                      form.isActive ? "translate-x-5" : "translate-x-1"
                    }`}
                  />
                </button>
                <span className="text-sm text-gray-700">Active</span>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors"
              >
                {saving ? "Saving..." : editingId ? "Save changes" : "Add collaborator"}
              </button>
              <button
                onClick={closeForm}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
