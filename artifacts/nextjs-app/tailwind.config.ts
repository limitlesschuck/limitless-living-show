import type { Config } from "tailwindcss";
import showConfig from "./show.config";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: showConfig.brand.purple,
          "purple-dark": showConfig.brand.purpleDark,
          "purple-mid": showConfig.brand.purpleMid,
          "purple-light": showConfig.brand.purpleLight,
          gold: showConfig.brand.gold,
          "gold-light": showConfig.brand.goldLight,
          "gold-dark": showConfig.brand.goldDark,
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
