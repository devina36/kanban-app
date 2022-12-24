/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        myBlue: '#01959F',
        myBlaxk: '#1E1F21',
        tagbg: '#F7FEFF',
        brBlue: '#4DB5BC',
        brGray: '#EDEDED',
        btnGray: '#E0E0E0',
        myGreen: '#43936C',
        myRed: '#E11428',
      },
      fontFamily: {
        nunito: ['Nunito Sans, sans-serif'],
      },
      boxShadow: {
        '1a': '0px 1px 2px rgba(0, 0, 0, 0.12)',
        '1b': '0px 4px 4px rgba(0, 0, 0, 0.08)',
        '1c': '0px 4px 8px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};
