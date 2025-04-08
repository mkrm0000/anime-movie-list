/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // 👈 This is important
  ],
  darkMode: 'class', // ← enable dark mode via class
  theme: {
    extend: {},
  },
  plugins: [],
}

