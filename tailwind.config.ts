import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#00e0f5",
        secondary: "#a855f7",
        "prism-cyan": "#00fff9",
        "prism-violet": "#8b5cf6",
        "background-light": "#f1f2f4",
        "background-dark": "#0a0c0d",
        "surface-dark": "#161b1d",
        "accent-dark": "#27393a",
        "ops-green": "#00ff9d",
        "ops-danger": "#ff4d4d",
        "ops-warning": "#ff9d00",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
