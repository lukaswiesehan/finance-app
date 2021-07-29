const colors = require('tailwindcss/colors')

module.exports = {
  //mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'sans': ['Lato', 'sans-serif']
    },
		fontWeight: {
      'normal': 400,
      'bold': 900
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: colors.white,
      gray: colors.coolGray,
      red: colors.red,
      green: colors.emerald,
      blue: colors.sky
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
