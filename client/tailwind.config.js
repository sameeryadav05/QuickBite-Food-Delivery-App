/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primaryColor:"#ff4d2d",
        hoverColor:"#e64323",
        bgColor:"#fff9f6",
        borderColor:"#ddd",
      }
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
        themes: [
      "light",
      "dark",
      "cupcake",
      "halloween",
      "dracula",
    ],
  },
};
