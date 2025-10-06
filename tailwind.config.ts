import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Sora-inspired brand colors
        brand: {
          dark: "oklch(0.08 0 0)",
          purple: "oklch(0.488 0.243 264.376)",
          cyan: "oklch(0.7 0.15 220)",
          blue: "oklch(0.45 0.2 260)",
          magenta: "oklch(0.6 0.25 330)",
          orange: "oklch(0.65 0.2 50)",
          gold: "oklch(0.75 0.15 80)",
        },
        // Gradient colors
        gradient: {
          start: "oklch(0.37 0.1 296)", // purple
          middle: "oklch(0.35 0.15 264)", // blue
          end: "oklch(0.25 0.08 264)", // dark purple
        },
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        card: "0 4px 16px 0 rgb(0 0 0 / 0.1), 0 2px 8px -2px rgb(0 0 0 / 0.1)",
        glow: "0 0 20px 0 rgb(255 255 255 / 0.1)",
        "glow-sm": "0 0 10px 0 rgb(255 255 255 / 0.05)",
        "glow-lg": "0 0 40px 0 rgb(255 255 255 / 0.15)",
        "glow-purple": "0 0 30px 0 rgb(147 51 234 / 0.3)",
        "glow-cyan": "0 0 30px 0 rgb(6 182 212 / 0.3)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out",
        "slide-up": "slide-up 0.6s ease-out",
        "slide-in": "slide-in 0.4s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "slide-in": {
          "0%": { transform: "translateX(-20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px 0 rgb(255 255 255 / 0.1)" },
          "50%": { boxShadow: "0 0 40px 0 rgb(255 255 255 / 0.2)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
        128: "32rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
