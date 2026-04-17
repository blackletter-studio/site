/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,ts,tsx,md,mdx}"],
  theme: {
    extend: {
      colors: {
        paper: "#faf6ef",
        ink: "#1a1a1a",
        "ink-soft": "#3a3a3a",
        oxblood: "#6b1e2a",
      },
      fontFamily: {
        display: ['"Fraunces"', "Georgia", "serif"],
        body: ['"IBM Plex Sans"', "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
      },
      fontSize: {
        xs: "12px",
        sm: "14px",
        base: "16px",
        md: "18px",
        lg: "22px",
        xl: "28px",
        "2xl": "40px",
        "3xl": "60px",
        "4xl": "96px",
      },
      spacing: {
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        6: "24px",
        8: "32px",
        12: "48px",
        16: "64px",
        24: "96px",
      },
      borderRadius: { sm: "6px", md: "10px", lg: "14px" },
    },
  },
  plugins: [],
};
