const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './lib/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
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
      rose: colors.rose,
      green: colors.green,
      emerald: colors.emerald,
      cyan: colors.cyan,
      sky: colors.sky,
      purple: colors.purple,
      indigo: colors.indigo,
      'blue-gray': colors.blueGray,
      'true-gray': colors.trueGray,
      blue: colors.blue,
      pink: colors.pink,
      orange: colors.orange,
      teal: colors.teal
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
