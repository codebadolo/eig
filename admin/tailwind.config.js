/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#e6f3f5',
          100: '#cce7eb',
          200: '#99cfd7',
          300: '#66b7c3',
          400: '#339faf',
          500: '#1A6B7A',
          600: '#155662',
          700: '#0F4855',
          800: '#0a3340',
          900: '#051e2a',
        },
        gold: {
          DEFAULT: '#B8922A',
          light:   '#D4AA4A',
          pale:    '#F5EDD8',
        },
        ivory: '#F8F6F1',
        eig:   '#0F1924',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        num:     ['"Bebas Neue"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
