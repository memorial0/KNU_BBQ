/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        knu: {
          green: '#006a32',
          light: '#f1f8f3',
          dark: '#004a22',
        }
      }
    },
  },
  plugins: [],
}
