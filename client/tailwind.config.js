// tailwind.config.js
const daisyui = require("daisyui");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1E40AF",
        "primary-light": "#3B82F6",
        "primary-dark": "#1E3A8A",
        secondary: "#FBBF24",
        "secondary-light": "#FCD34D",
        "secondary-dark": "#F59E0B",
        "primary-200": "#ffbf00",
      },
       fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        'open-sans': ['Open Sans', 'sans-serif'], // Example for Open Sans
      },
    },
  },
  // plugins: [daisyui],
  // daisyui: {
  //   themes: [
  //     "light",
  //     "dark",
  //     "cupcake",
  //     "bumblebee",
  //     "emerald",
  //     "corporate",
  //     "synthwave",
  //     "retro",
  //     "cyberpunk",
  //     "valentine",
  //     "halloween",
  //     "garden",
  //     "forest",
  //     "aqua",
  //     "lofi",
  //     "pastel",
  //     "fantasy",
  //     "wireframe",
  //     "black",
  //     "luxury",
  //     "dracula",
  //     "cmyk",
  //     "autumn",
  //     "business",
  //     "acid",
  //     "lemonade",
  //     "night",
  //     "coffee",
  //     "winter",
  //     "dim",
  //     "nord",
  //     "sunset",
  //   ],
  // },
};
