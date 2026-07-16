import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        text: {
          DEFAULT: "var(--text)",
          h: "var(--text-h)",
        },
        bg: "var(--bg)",
        border: "var(--border)",
        accent: {
          DEFAULT: "var(--accent)",
          bg: "var(--accent-bg)",
          border: "var(--accent-border)",
        },
        social: "var(--social-bg)",
      },
      fontFamily: {
        sans: ["var(--sans)", "system-ui", "Segoe UI", "Roboto", "sans-serif"],
        heading: ["var(--heading)", "system-ui", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["var(--mono)", "ui-monospace", "Consolas", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
