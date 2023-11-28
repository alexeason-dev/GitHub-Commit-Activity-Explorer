/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '0 0 2px rgb(255, 255, 255, 1), 0 0 5px rgb(255, 255, 255, 0.7), 0 0 10px rgb(255, 255, 255, 0.4)',
      }
    }
  }
}