/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#12141a",
        surface: "#1b1e27",
        "surface-2": "#232733",
        line: "#2c3140",
        text: "#e8e6df",
        "text-dim": "#9aa0ae",
        gold: "#d4a656",
        teal: "#5ec8c0",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      keyframes: {
        blink: { "50%": { opacity: 0 } },
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(5px)" },
        },
        shake: {
          "25%": { transform: "translateX(-3px)" },
          "75%": { transform: "translateX(3px)" },
        },
        pop: {
          from: { transform: "scale(0.4)", opacity: 0 },
          to: { transform: "scale(1)", opacity: 1 },
        },
      },
      animation: {
        blink: "blink 1s step-end infinite",
        floaty: "floaty 1.6s ease-in-out infinite",
        shake: "shake 0.3s ease",
        pop: "pop 0.25s ease",
      },
      transitionTimingFunction: {
        DEFAULT: "ease",
      },
    },
  },
  plugins: [],
};
