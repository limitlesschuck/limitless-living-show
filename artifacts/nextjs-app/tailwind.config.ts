import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: "var(--brand-purple)",
          "purple-dark": "var(--brand-purple-dark)",
          "purple-mid": "var(--brand-purple-mid)",
          "purple-light": "var(--brand-purple-light)",
          gold: "var(--brand-gold)",
          "gold-light": "var(--brand-gold-light)",
          "gold-dark": "var(--brand-gold-dark)",
          "header-bg": "var(--brand-header-bg)",
          "purple-darker": "var(--brand-purple-darker)",
          "purple-pale": "var(--brand-purple-pale)",
          "purple-tint": "var(--brand-purple-tint)",
          "purple-tint-border": "var(--brand-purple-tint-border)",
          "purple-muted": "var(--brand-purple-muted)",
          "purple-vivid": "var(--brand-purple-vivid)",
          "gray-border": "var(--brand-gray-border)",
          "gray-text": "var(--brand-gray-text)",
          "gray-text-muted": "var(--brand-gray-text-muted)",
          "gray-muted": "var(--brand-gray-muted)",
          "admin-accent": "var(--brand-admin-accent)",
          "admin-accent-light": "var(--brand-admin-accent-light)",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
