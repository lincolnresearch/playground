import {heroui} from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
      extend: {
          colors: {
              venus: {
                  base: "#190F1A",
                  surface: "#402B3E",
                  accent: "#A67CA3",
                  "accent-deep": "#725373",  // ✅ quoted to avoid syntax issues
                  highlight: "#D8A9D9",
                  action: "#B91355",
                  soft: "#A39FD1",
                  text: "#FFFFEF",
                  gold: "#FFD64D",
                  success: "#22E091",
              },
          },
      }
  },
  darkMode: "class",
  plugins: [heroui()],
}
