"use client";

import { useEffect, useState } from "react";

interface AffiliateRoute {
  id: string;
  crisisCategory: string;
  urgencyLevel: string;
  affiliateName: string;
  affiliateUrl: string;
  priority: number;
  isActive: boolean;
  isDefault: boolean;
  description: string | null;
  imageUrl: string | null;
  showAboveExperts: boolean;
}

interface RouteForm {
  crisisCategory: string;
  urgencyLevel: string;
  affiliateName: string;
  affiliateUrl: string;
  priority: number;
  isDefault: boolean;
  description: string;
  imageUrl: string;
  showAboveExperts: boolean;
}

const EMPTY_FORM: RouteForm = {
  crisisCategory: "grief",
  urgencyLevel: "crisis",
  affiliateName: "",
  affiliateUrl: "",
  priority: 1,
  isDefault: false,
  description: "",
  imageUrl: "",
  showAboveExperts: false,
};

const FALLBACK_URGENCY_OPTIONS = [
  { value: "crisis", label: "Crisis" },
  { value: "struggling", label: "Struggling" },
  { value: "healing", label: "Healing" },
  { value: "exploring", label: "Exploring" },
  { value: "any", label: "Any urgency" },
];

export default function AffiliatesPage() {
  const [routes, setRoutes] = useState<AffiliateRoute[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<RouteForm>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [categoryLabels, setCategoryLabels] = useState<Record<string, string>>({});
  const [urgencyLabels, setUrgencyLabels] = useState<Record<string, string>>({});

  async function loadCategories() {
    const res = await fetch("/api/admin/categories");
    const data = await res.json();
    const map = Object.fromEntries(
      (data.categories ?? []).map((c: { value: string; label: string }) => [c.value, c.label])
    );
    setCategoryLabels(map);
  }

  async function loadUrgencyOptions() {
    try {
      const res = await fetch("/api/assessment/config");
      const config = await res.json();
      const questions: Array<{
        type?: string;
        storeAs?: string;
        options?: Array<{ value: string; label: string }>;
      }> = config.questions ?? [];
      const urgencyQuestion = questions.find(
        (q) => q.type === "urgency" || q.storeAs === "urgency"
      );
      const base =
        urgencyQuestion?.options && urgencyQuestion.options.length > 0
          ? urgencyQuestion.options
          : FALLBACK_URGENCY_OPTIONS;
      const withAny = base.some((o) => o.value === "any")
        ? base
        : [...base, { value: "any", label: "Any urgency" }];
      setUrgencyLabels(Object.fromEntries(withAny.map((o) => [o.value, o.label])));
    } catch {
      setUrgencyLabels(Object.fromEntries(FALLBACK_URGENCY_OPTIONS.map((o) => [o.value, o.label])));
    }
  }

  async function loadRoutes() {
    setLoading(true);
    const res = await fetch("/api/admin/affiliates");
    const data = await res.json();
    setRoutes(data);
    setLoading(false);
  }

  useEffect(() => {
    loadRoutes();
    loadCategories();
    loadUrgencyOptions();
  }, []);

  function openAddForm() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
  }

  function openEditForm(route: AffiliateRoute) {
    setEditingId(route.id);
    setForm({
      crisisCategory: route.crisisCategory,
      urgencyLevel: route.urgencyLevel,
      affiliateName: route.affiliateName,
      affiliateUrl: route.affiliateUrl,
      priority: route.priority,
      isDefault: route.isDefault,
      description: route.description ?? "",
      imageUrl: route.imageUrl ?? "",
      showAboveExperts: route.showAboveExperts,
    });
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    const uploadData = new FormData();
    uploadData.append("file", file);
    const res = await fetch("/api/admin/affiliates/upload", {
      method: "POST",
      body: uploadData,
    });
    const data = await res.json();
    if (res.ok && data.url) {
      setForm((f) => ({ ...f, imageUrl: data.url }));
    } else {
      setMessage({ type: "error", text: data.error ?? "Image upload failed" });
    }
    setUploadingImage(false);
    e.target.value = "";
  }

  async function handleToggleActive(route: AffiliateRoute) {
    await fetch(`/api/admin/affiliates/${route.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !route.isActive }),
    });
    loadRoutes();
  }

  async function handleSave() {
    if (!form.affiliateName.trim() || !form.affiliateUrl.trim()) {
      setMessage({ type: "error", text: "Affiliate name and URL are required" });
      return;
    }
    setSaving(true);
    const payload = {
      crisisCategory: form.crisisCategory,
      urgencyLevel: form.urgencyLevel,
      affiliateName: form.affiliateName,
      affiliateUrl: form.affiliateUrl,
      priority: form.priority,
      isDefault: form.isDefault,
      description: form.description || null,
      imageUrl: form.imageUrl || null,
      showAboveExperts: form.showAboveExperts,
    };
    const res = editingId
      ? await fetch(`/api/admin/affiliates/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      : await fetch("/api/admin/affiliates", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

    if (res.ok) {
      setMessage({ type: "success", text: editingId ? "Route updated" : "Route added" });
      closeForm();
      loadRoutes();
    } else {
      setMessage({ type: "error", text: editingId ? "Update failed" : "Failed to add route" });
    }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this affiliate route?")) return;
    await fetch(`/api/admin/affiliates/${id}`, { method: "DELETE" });
    loadRoutes();
  }

  const defaultRoutes = routes.filter((r) => r.isDefault);
  const categoryRoutes = routes.filter((r) => !r.isDefault);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Affiliate routes</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage which affiliate offers are shown based on crisis category and urgency
          </p>
        </div>
        <button
          onClick={openAddForm}
          className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Add route
        </button>
      </div>

      {message && (
        <div className={`mb-4 px-4 py-3 rounded-lg text-sm ${message.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
          {message.text}
        </div>
      )}

      {loading ? (
        <div className="p-8 text-center text-sm text-gray-500">Loading...</div>
      ) : (
        <div className="space-y-6">
          {/* Default routes */}
          {defaultRoutes.length > 0 && (
            <div>
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Default fallback</h2>
              <RouteTable routes={defaultRoutes} onToggle={handleToggleActive} onEdit={openEditForm} onDelete={handleDelete} categoryLabels={categoryLabels} urgencyLabels={urgencyLabels} />
            </div>
          )}

          {/* Category routes */}
          <div>
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Category routes</h2>
            <RouteTable routes={categoryRoutes} onToggle={handleToggleActive} onEdit={openEditForm} onDelete={handleDelete} categoryLabels={categoryLabels} urgencyLabels={urgencyLabels} />
          </div>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">
              {editingId ? "Edit route" : "Add new route"}
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Crisis category</label>
                  <select value={form.crisisCategory} onChange={(e) => setForm((f) => ({ ...f, crisisCategory: e.target.value }))} className="input">
                    {Object.entries(categoryLabels).map(([v, l]) => (
                      <option key={v} value={v}>{l}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Urgency level</label>
                  <select value={form.urgencyLevel} onChange={(e) => setForm((f) => ({ ...f, urgencyLevel: e.target.value }))} className="input">
                    {Object.entries(urgencyLabels).map(([v, l]) => (
                      <option key={v} value={v}>{l}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Affiliate name</label>
                <input type="text" value={form.affiliateName} onChange={(e) => setForm((f) => ({ ...f, affiliateName: e.target.value }))} className="input" placeholder="e.g. BetterHelp" />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Affiliate URL</label>
                <input type="url" value={form.affiliateUrl} onChange={(e) => setForm((f) => ({ ...f, affiliateUrl: e.target.value }))} className="input" placeholder="https://..." />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  className="input"
                  rows={3}
                  placeholder="Short description of this offer (shown on result page)"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-2">Image</label>
                <div className="flex items-center gap-3">
                  {form.imageUrl ? (
                    <img
                      src={form.imageUrl}
                      alt="Offer preview"
                      className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-lg bg-gray-100 flex-shrink-0" />
                  )}
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                      className="hidden"
                      id="affiliate-image-upload"
                    />
                    <label
                      htmlFor="affiliate-image-upload"
                      className={`inline-block px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                        uploadingImage
                          ? "text-gray-400 bg-gray-50 border-gray-200 cursor-not-allowed"
                          : "text-gray-600 bg-white border-gray-200 hover:border-gray-400 cursor-pointer"
                      }`}
                    >
                      {uploadingImage ? "Uploading..." : "Upload image"}
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Priority (lower = higher priority)</label>
                <input type="number" value={form.priority} onChange={(e) => setForm((f) => ({ ...f, priority: parseInt(e.target.value) || 1 }))} className="input" min={1} />
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="isDefault" checked={form.isDefault} onChange={(e) => setForm((f) => ({ ...f, isDefault: e.target.checked }))} />
                <label htmlFor="isDefault" className="text-sm text-gray-700">Set as default fallback route</label>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="showAboveExperts" checked={form.showAboveExperts} onChange={(e) => setForm((f) => ({ ...f, showAboveExperts: e.target.checked }))} />
                <label htmlFor="showAboveExperts" className="text-sm text-gray-700">
                  Show this offer above Recommended Experts on the result page
                </label>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button onClick={handleSave} disabled={saving} className="flex-1 px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors">
                {saving ? "Saving..." : editingId ? "Save changes" : "Add route"}
              </button>
              <button onClick={closeForm} className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function RouteTable({
  routes,
  onToggle,
  onEdit,
  onDelete,
  categoryLabels,
  urgencyLabels,
}: {
  routes: AffiliateRoute[];
  onToggle: (r: AffiliateRoute) => void;
  onEdit: (r: AffiliateRoute) => void;
  onDelete: (id: string) => void;
  categoryLabels: Record<string, string>;
  urgencyLabels: Record<string, string>;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-4 py-3 w-14" />
            <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Category</th>
            <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Urgency</th>
            <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Affiliate</th>
            <th className="text-left text-xs font-medium text-gray-500 px-4 py-3 hidden md:table-cell">URL</th>
            <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Active</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {routes.map((route) => (
            <tr key={route.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3">
                {route.imageUrl ? (
                  <img src={route.imageUrl} alt={route.affiliateName} className="w-8 h-8 rounded object-cover" />
                ) : (
                  <div className="w-8 h-8 rounded bg-gray-100" />
                )}
              </td>
              <td className="px-4 py-3">
                <span className="text-sm text-gray-900">{categoryLabels[route.crisisCategory] ?? route.crisisCategory}</span>
              </td>
              <td className="px-4 py-3">
                <span className="text-sm text-gray-600">{urgencyLabels[route.urgencyLevel] ?? route.urgencyLevel}</span>
              </td>
              <td className="px-4 py-3">
                <span className="text-sm font-medium text-gray-900">{route.affiliateName}</span>
                {route.showAboveExperts && (
                  <span className="ml-2 inline-block text-xs font-medium text-brand-purple-dark bg-brand-gold-light px-1.5 py-0.5 rounded">
                    Above experts
                  </span>
                )}
              </td>
              <td className="px-4 py-3 hidden md:table-cell">
                <a href={route.affiliateUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-brand-purple hover:underline truncate block max-w-xs">
                  {route.affiliateUrl}
                </a>
              </td>
              <td className="px-4 py-3">
                <button onClick={() => onToggle(route)} className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${route.isActive ? "bg-green-500" : "bg-gray-300"}`}>
                  <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${route.isActive ? "translate-x-5" : "translate-x-1"}`} />
                </button>
              </td>
              <td className="px-4 py-3 text-right">
                <div className="flex gap-3 justify-end">
                  <button onClick={() => onEdit(route)} className="text-xs font-medium text-gray-600 hover:text-gray-900">Edit</button>
                  <button onClick={() => onDelete(route.id)} className="text-xs font-medium text-red-500 hover:text-red-700">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
