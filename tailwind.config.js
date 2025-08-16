/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'instrument-serif': ['Instrument Serif', 'serif'],
        'libre': ['Montserrat', 'sans-serif'],
        'news': ['"News Plantin Roman"', 'Plantin', 'Georgia', 'serif'],
      },
      colors: {
        tulane: {
          green: '#006747',
          'green-light': '#43B02A',
          blue: '#418FDE'
        }
      }
    },
  },
  plugins: [],
};