/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{ts,tsx,html,css,svg}'],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        ring: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(15deg)' },
          '50%': { transform: 'rotate(-15deg)' },
          '75%': { transform: 'rotate(10deg)' },
        },
      },
      animation: {
        ring: 'ring 0.5s ease-in-out 4',
      },
      colors: {
        'dark-mode-base': '#15191e',
        'dark-mode-box': '#191d23',
        'dark-mode-card': '#1d232a',
        'dark-mode-card-hover': '#232a32',
      },
    },
  },

  plugins: [],
};
