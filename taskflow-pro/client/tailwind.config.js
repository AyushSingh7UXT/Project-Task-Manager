/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef4ff',
          500: '#5b7cff',
          600: '#4d6cf0',
          700: '#3f5dd8'
        }
      },
      boxShadow: {
        glass: '0 8px 32px rgba(31, 38, 135, 0.15)'
      }
    }
  },
  plugins: []
};
