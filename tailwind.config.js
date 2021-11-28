const { withTailwindCssTheme } = require('@yonycalsin/tailwindcss-theme')

module.exports = withTailwindCssTheme({
  mode: 'jit',
  purge: ['./app/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
    },
    extend: {},
  },
  variants: {},
  plugins: [],
})
