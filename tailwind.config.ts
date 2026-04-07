import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        deep: "var(--green-deep)",
        mango: "var(--mango)",
        earth: "var(--earth)",
        cream: "var(--cream)",
        indigo: "var(--indigo)",
      },
      fontFamily: {
        heading: ["var(--font-playfair)", "serif"],
        body: ["var(--font-space)", "sans-serif"],
      },
      boxShadow: {
        float: "0 12px 40px rgba(0,0,0,0.35)",
      },
      backgroundImage: {
        grain: "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
} satisfies Config;
