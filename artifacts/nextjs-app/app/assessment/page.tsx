"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const CATEGORIES = [
  { value: "grief", label: "Grief or loss", emoji: "💙" },
  { value: "relationship", label: "Relationship or divorce", emoji: "💔" },
  { value: "health", label: "Health or addiction", emoji: "🌿" },
  { value: "financial", label: "Financial hardship", emoji: "💪" },
  { value: "spiritual", label: "Spiritual awakening", emoji: "✨" },
  { value: "career", label: "Career or purpose", emoji: "🎯" },
];

const DURATIONS = [
  { value: "just_started", label: "Just started — very recent" },
  { value: "few_months", label: "A few months" },
  { value: "over_a_year", label: "Over a year" },
  { value: "long_term", label: "For as long as I can remember" },
];

const URGENCY_OPTIONS = [
  {
    value: "crisis",
    label: "I'm in crisis and need help immediately",
    color: "border-red-300 hover:border-red-500",
    selected: "bg-red-50 border-red-500",
  },
  {
    value: "struggling",
    label: "I'm struggling and looking for direction",
    color: "border-amber-300 hover:border-amber-500",
    selected: "bg-amber-50 border-amber-500",
  },
  {
    value: "healing",
    label: "I'm starting to heal but want support",
    color: "border-blue-300 hover:border-blue-500",
    selected: "bg-blue-50 border-blue-500",
  },
  {
    value: "exploring",
    label: "I'm curious and exploring",
    color: "border-green-300 hover:border-green-500",
    selected: "bg-green-50 border-green-500",
  },
];

function AssessmentFunnel() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const prefillCategory = searchParams.get("category") ?? "";

  const [step, setStep] = useState(prefillCategory ? 2 : 1);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    crisisCategory: prefillCategory,
    crisisDuration: "",
    urgency: "",
    firstName: "",
    email: "",
  });

  function selectCategory(value: string) {
    setForm((f) => ({ ...f, crisisCategory: value }));
    setStep(2);
  }

  function selectDuration(value: string) {
    setForm((f) => ({ ...f, crisisDuration: value }));
    setStep(3);
  }

  function selectUrgency(value: string) {
    setForm((f) => ({ ...f, urgency: value }));
    setStep(4);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    const res = await fetch("/nextjs-app/api/assessment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok && data.success) {
      router.push(
        `/assessment/result?type=${data.resultType}&category=${data.crisisCategory}&urgency=${data.urgency}`
      );
    } else {
      setSubmitting(false);
      alert("Something went wrong. Please try again.");
    }
  }

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-brand-purple">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-white font-bold text-lg">
            Limitless <span className="text-brand-gold">Living</span>
          </Link>
          <span className="text-gray-300 text-sm">Free assessment</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-gray-100">
        <div
          className="h-1 bg-brand-gold transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Step 1 — Crisis category */}
        {step === 1 && (
          <div>
            <p className="text-brand-gold text-sm font-semibold uppercase tracking-widest mb-2">
              Question 1 of 4
            </p>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
              What best describes what you&apos;re going through right now?
            </h1>
            <p className="text-gray-500 text-sm mb-8">
              Choose the option that feels closest to your situation.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CATEGORIES.map((c) => (
                <button
                  key={c.value}
                  onClick={() => selectCategory(c.value)}
                  className="flex items-center gap-3 p-4 rounded-xl border-2 border-gray-200 hover:border-brand-purple hover:bg-purple-50 text-left transition-all group"
                >
                  <span className="text-2xl">{c.emoji}</span>
                  <span className="text-sm font-medium text-gray-800 group-hover:text-brand-purple">
                    {c.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2 — Duration */}
        {step === 2 && (
          <div>
            <p className="text-brand-gold text-sm font-semibold uppercase tracking-widest mb-2">
              Question 2 of 4
            </p>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
              How long have you been dealing with this?
            </h1>
            <p className="text-gray-500 text-sm mb-8">
              This helps us understand where you are in your journey.
            </p>
            <div className="space-y-3">
              {DURATIONS.map((d) => (
                <button
                  key={d.value}
                  onClick={() => selectDuration(d.value)}
                  className="w-full flex items-center gap-3 p-4 rounded-xl border-2 border-gray-200 hover:border-brand-purple hover:bg-purple-50 text-left transition-all"
                >
                  <span className="text-sm font-medium text-gray-800">
                    {d.label}
                  </span>
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(1)}
              className="mt-6 text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              ← Back
            </button>
          </div>
        )}

        {/* Step 3 — Urgency */}
        {step === 3 && (
          <div>
            <p className="text-brand-gold text-sm font-semibold uppercase tracking-widest mb-2">
              Question 3 of 4
            </p>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
              Where are you right now?
            </h1>
            <p className="text-gray-500 text-sm mb-8">
              Be honest — this helps us point you to the right support.
            </p>
            <div className="space-y-3">
              {URGENCY_OPTIONS.map((u) => (
                <button
                  key={u.value}
                  onClick={() => selectUrgency(u.value)}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                    form.urgency === u.value ? u.selected : u.color
                  }`}
                >
                  <span className="text-sm font-medium text-gray-800">
                    {u.label}
                  </span>
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(2)}
              className="mt-6 text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              ← Back
            </button>
          </div>
        )}

        {/* Step 4 — Email capture */}
        {step === 4 && (
          <div>
            <p className="text-brand-gold text-sm font-semibold uppercase tracking-widest mb-2">
              Question 4 of 4
            </p>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
              Where should we send your personalised resource guide?
            </h1>
            <p className="text-gray-500 text-sm mb-8">
              We&apos;ll match you with episodes, resources, and support based
              on your answers. No spam, ever.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First name
                </label>
                <input
                  type="text"
                  value={form.firstName}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, firstName: e.target.value }))
                  }
                  className="input"
                  placeholder="Your first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email address <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                  required
                  className="input"
                  placeholder="you@example.com"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full text-center disabled:opacity-50"
              >
                {submitting ? "Finding your path..." : "Show me my results →"}
              </button>
              <p className="text-xs text-gray-400 text-center">
                By continuing you agree to receive emails from the Limitless
                Living Show. Unsubscribe any time.
              </p>
            </form>
            <button
              onClick={() => setStep(3)}
              className="mt-4 text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              ← Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AssessmentPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-gray-400 text-sm">Loading...</div>
        </div>
      }
    >
      <AssessmentFunnel />
    </Suspense>
  );
}
