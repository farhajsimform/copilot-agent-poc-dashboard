const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class', // Enable dark mode with the 'class' strategy
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@shadcn/ui/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
      colors: {
        primary: {
          light: '#a5b4fc',
          DEFAULT: '#6366f1',
          dark: '#4f46e5',
        },
        secondary: {
          light: '#fbcfe8',
          DEFAULT: '#ec4899',
          dark: '#db2777',
        },
      },
    },
  },
  plugins: [],
};