import type { Config } from "tailwindcss";
export default {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      screens: {
        custom: '950px', // Define a custom breakpoint
        low: '440px' // Define a custom breakpoint
      },
    },
  },
  plugins: [],
} satisfies Config;
