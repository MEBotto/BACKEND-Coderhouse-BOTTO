/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        color: "#222327",
        colorLight: "#e7e8ea",
        mainColor: "#29fd53",
        mainColorLight: "#02ca2a",
      },
    },
  },
  plugins: [],
};
