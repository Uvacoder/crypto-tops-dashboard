const { withTailwindCssTheme } = require('@yonycalsin/tailwindcss-theme')

module.exports = withTailwindCssTheme({
  mode: 'jit',
  purge: ['./app/**/*.{ts,tsx}'],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
})
