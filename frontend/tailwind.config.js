/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontWeight:{
        mediumbold:650
      },
      fontFamily: {
        inter: ['Inter', 'ui-sans-serif', 'system-ui'],
        inder: ['Inder', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}

