/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        'dvh': '100dvh', 
      },
      width: {
        'dvw': '100dvw'
      },
      colors: {
        green: {
          50:"#cedfcf",
          100: '#3f9142',
          200:"#357937",
          300:"#263126",
          400:"#98e19b",
          500:'#347136'
        },
        iconColor: {
          50: "#1b281b"
        },
        gray:{
          50:"#EEF6EF",
          100:"#cddbce",
          200:'#717c72',
          300:"#e8f1e9",
          400:"#6c7d6d"
        },

        white:{
          50:"#fbfdfc",
          100:"#f1f9f3"
        },

        dark:{
          50:"#232323",
          100:"#2f3630",
          200:"#2c2c2c",
          300:"#242424"
        }
      },
    },
  },
  plugins: [],
}