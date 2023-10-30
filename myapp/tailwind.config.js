/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "header-color": "#eee",
        "main-color":"#0079ff"
      }
    },
  },
  plugins: [],
}