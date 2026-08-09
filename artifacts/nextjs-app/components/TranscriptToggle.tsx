"use client";
import { useState } from "react";

export default function TranscriptToggle({ transcript }: { transcript: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-8">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 text-sm font-semibold text-brand-purple-dark hover:underline"
      >
        <span>{open ? "▾" : "▸"}</span>
        {open ? "Hide transcript" : "Read full transcript"}
      </button>
      {open && (
        <div className="mt-4 bg-gray-50 rounded-2xl p-6 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed max-h-[600px] overflow-y-auto">
          {transcript}
        </div>
      )}
    </div>
  );
}
