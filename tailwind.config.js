/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        primaryLight: "rgb(var(--color-primary-light) / <alpha-value>)",
        primaryDark: "rgb(var(--color-primary-dark) / <alpha-value>)",

        secondary: "rgb(var(--color-secondary) / <alpha-value>)",
        secondaryLight: "rgb(var(--color-secondary-light) / <alpha-value>)",
        secondaryDark: "rgb(var(--color-secondary-dark) / <alpha-value>)",

        accent: "rgb(var(--color-accent) / <alpha-value>)",

        background: "rgb(var(--color-background) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",

        textPrimary: "rgb(var(--color-text-primary) / <alpha-value>)",
        textSecondary: "rgb(var(--color-text-secondary) / <alpha-value>)",

        error: "rgb(var(--color-error) / <alpha-value>)",
        success: "rgb(var(--color-success) / <alpha-value>)",
        warning: "rgb(var(--color-warning) / <alpha-value>)",

        info: "rgb(var(--color-info) / <alpha-value>)",
        dangerLight: "rgb(var(--color-danger-light) / <alpha-value>)",
      },
    },
  },
  presets: [require("nativewind/preset")],
  plugins: [],
};
