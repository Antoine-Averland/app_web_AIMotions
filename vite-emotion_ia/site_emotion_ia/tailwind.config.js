/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "custom-dark-blue": "rgb(15, 0, 74)",
      },
    },
  },
  plugins: [],
}

