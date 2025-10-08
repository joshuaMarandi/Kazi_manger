/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Rubik', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe', 
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#46ABE3',
          500: '#46ABE3',
          600: '#3890c7',
          700: '#2b6fa0',
          800: '#1e4a6f',
          900: '#0C1D4E',
        },
        navy: '#0C1D4E',
        blue: '#46ABE3',
      }
    },
  },
  plugins: [],
}