/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#023059", // Deep navy blue – trust, stability, global shipping
        primaryDark: "#08306B", // Darker navy for press states & headers
        accent: "#FF6F00", // Bold orange – energy, movement, urgency
        sky: "#29B6F6", // Bright cargo-sky blue for highlights & icons
        textPrimary: "#1A1A1A", // Strong neutral for headings
        textSecondary: "#4F5B62", // Cool gray for descriptions
        background: "#FAFAFA", // Clean light base for screens
        backgroundAlt: "#ECEFF1", // Light steel gray for cards/sections
      },
    },
  },
  presets: [require("nativewind/preset")],
  plugins: [],
};
