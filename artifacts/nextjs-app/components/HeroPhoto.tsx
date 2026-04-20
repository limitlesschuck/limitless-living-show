"use client";

import { useState } from "react";

export default function HeroPhoto() {
  const [error, setError] = useState(false);

  if (error) return null;

  return (
    <div className="hidden lg:flex justify-center items-end">
      <div className="relative">
        <div className="absolute inset-0 rounded-3xl bg-brand-gold opacity-20 blur-2xl scale-110" />
        <img
          src="/nextjs-app/chuck-hero.jpg"
          alt="Chuck Anderson — host of the Limitless Living Show"
          className="relative rounded-3xl w-full max-w-sm object-cover shadow-2xl border-4 border-brand-gold border-opacity-30"
          style={{ maxHeight: "480px", objectPosition: "top" }}
          onError={() => setError(true)}
        />
      </div>
    </div>
  );
}
