/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navbarBase: '#9A1A24',
        navBarHover: '#B3242F',
      },
    },
  },
  plugins: [],
}