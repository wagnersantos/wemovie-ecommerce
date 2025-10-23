/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,html}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Open Sans"', 'ui-sans-serif', 'system-ui'],
        opensans: ['"Open Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
