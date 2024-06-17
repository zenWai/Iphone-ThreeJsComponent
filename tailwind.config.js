/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          DEFAULT: "#86868b",
          300: "#42424570",
        },
      },
    },
  },
  plugins: [],
};
