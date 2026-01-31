/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      screens: {
        xs: '320px',
        md: '850px',
        xl: '1200px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
}
