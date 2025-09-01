/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4CAF50", // Fresh green from hills/trees
        primaryDark: "#388E3C", // Deeper green for press states
        accent: "#FFD54F", // Warm yellow from path/highlights
        sky: "#81D4FA", // Light blue from sky
        textPrimary: "#1A1A1A", // Dark neutral for headings
        textSecondary: "#555555", // Softer gray for descriptions
        background: "#FFFFFF", // Clean white base
        backgroundAlt: "#F5F5F5", // Light neutral for sections/cards
      },
    },
  },
  plugins: [],
};
