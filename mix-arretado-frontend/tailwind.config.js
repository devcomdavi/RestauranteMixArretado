/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'xilosa': ['Xilosa', 'sans-serif'],
        'titillium': ['"Titillium Web"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}