/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      // You can extend the theme (colors, fontSizes, etc.) here if needed.
      // For example, define a brand color if provided by the design.
      // colors: { primary: {...} }
    }
  },
  plugins: [
    require("@tailwindcss/forms") // Optional: better default styling for form elements
  ]
};
