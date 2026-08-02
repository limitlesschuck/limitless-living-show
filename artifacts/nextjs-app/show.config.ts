/**
 * show.config.ts — Single source of truth for all show-specific values.
 * When forking this repo for a new show, this is the only file that needs to change.
 */

const showConfig = {
  // Show identity
  showName: "Limitless Living Show",
  showNameShort: "Limitless Living",
  hostName: "Chuck Anderson",
  showInitials: "LLS",
  showTagline: "Transformation stories and coaching resources",
  defaultCtaFallback: "Ready to start your transformation?",

  // Domain & URLs
  domain: "https://www.limitlesslivingpodcast.com",

  // Platform links
  platforms: {
    youtube: "https://www.youtube.com/@limitlesslivingpodcast",
    apple: "https://podcasts.apple.com/us/podcast/the-limitless-living-show/id1751543846",
    spotify: "https://open.spotify.com/show/78eDxPL98YSRZQP80n8rLC",
  },

  // Brand colors (used in PDF generator which cannot use Tailwind classes)
  brand: {
    purple: "#2D1B69",
    purpleDark: "#1A0F3E",
    purpleMid: "#3D2780",
    purpleLight: "#4D35A0",
    purpleDarker: "#1F1235",
    purplePale: "#C4B5FD",
    purpleTint: "#F5F3FF",
    purpleTintBorder: "#DDD6FE",
    purpleMuted: "#4C1D95",
    purpleVivid: "#7C3AED",
    gold: "#F0A500",
    goldLight: "#F5C842",
    goldDark: "#C8860A",
    white: "#FFFFFF",
    grayBorder: "#E5E7EB",
    grayText: "#374151",
    grayTextMuted: "#4B5563",
    grayMuted: "#9CA3AF",
  },

  // Cloudflare R2
  r2: {
    bucket: "limitless-living-media",
  },

  // Systeme.io
  systeme: {
    tagPrefix: "lls",
    tags: {
      guideDownload: 2052428,
      grief: 1975331,
      relationship: 1975332,
      health: 1975333,
      financial: 1975334,
      spiritual: 1975335,
      career: 1975336,
    },
  },

  resultLinks: {
    coachReferral: "https://www.betterhelp.com",
  },
} as const;

export default showConfig;
