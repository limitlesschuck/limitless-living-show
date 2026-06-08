"use client";

import { useEffect, useState } from "react";

export default function AssessmentAdminPage() {
  const [raw, setRaw] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [jsonError, setJsonError] = useState<string | null>(null);

  async function load() {
    const res = await fetch("/api/admin/assessment");
    const data = await res.json();
    setRaw(JSON.stringify(data.config, null, 2));
    setLoading(false);
  }

  function handleChange(value: string) {
    setRaw(value);
    try {
      JSON.parse(value);
      setJsonError(null);
    } catch (e) {
      setJsonError((e as Error).message);
    }
  }

  async function handleSave() {
    if (jsonError) return;
    setSaving(true);
    setMessage(null);
    try {
      const config = JSON.parse(raw);
      const res = await fetch("/api/admin/assessment", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ config }),
      });
      if (res.ok) {
        setMessage({ type: "success", text: "Assessment config saved successfully" });
      } else {
        setMessage({ type: "error", text: "Save failed" });
      }
    } catch {
      setMessage({ type: "error", text: "Invalid JSON — check your edits" });
    }
    setSaving(false);
  }

  useEffect(() => { load(); }, []);

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Assessment config</h1>
        <p className="text-sm text-gray-500 mt-1">
          Edit questions, options, scoring, and result content. Add questions by adding objects to the <code className="bg-gray-100 px-1 rounded text-xs">questions</code> array.
          Supported types: <code className="bg-gray-100 px-1 rounded text-xs">category</code>, <code className="bg-gray-100 px-1 rounded text-xs">options</code>, <code className="bg-gray-100 px-1 rounded text-xs">urgency</code>, <code className="bg-gray-100 px-1 rounded text-xs">email</code>.
        </p>
      </div>

      {message && (
        <div className={`mb-4 px-4 py-3 rounded-lg text-sm ${message.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
          {message.text}
        </div>
      )}

      {jsonError && (
        <div className="mb-4 px-4 py-3 rounded-lg text-sm bg-red-50 text-red-700 border border-red-200">
          JSON error: {jsonError}
        </div>
      )}

      {loading ? (
        <div className="text-sm text-gray-500">Loading...</div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <textarea
            value={raw}
            onChange={(e) => handleChange(e.target.value)}
            rows={50}
            className={`w-full font-mono text-xs border rounded-lg p-4 focus:outline-none focus:ring-2 bg-gray-50 ${jsonError ? "border-red-300 focus:ring-red-500" : "border-gray-200 focus:ring-brand-purple"}`}
            spellCheck={false}
          />
          <div className="flex items-center justify-between mt-4">
            <p className="text-xs text-gray-400">
              The <strong>email</strong> question must always be last.
              Questions are shown in array order.
            </p>
            <button
              onClick={handleSave}
              disabled={saving || !!jsonError}
              className="px-6 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors"
            >
              {saving ? "Saving..." : "Save changes"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
