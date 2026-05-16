import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      boxShadow: {
        glass: "0 24px 80px -32px rgba(15, 23, 42, 0.28)",
        panel: "0 18px 52px -24px rgba(15, 23, 42, 0.22)"
      },
      backgroundImage: {
        grain:
          "radial-gradient(circle at top left, rgba(255,255,255,0.14), transparent 26%), radial-gradient(circle at bottom right, rgba(255,255,255,0.08), transparent 20%)"
      }
    }
  },
  plugins: []
};

export default config;

