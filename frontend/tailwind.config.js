/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // Override emerald with gold tones for finance aesthetic
      // All existing emerald-* classes become gold automatically
      colors: {
        emerald: {
          50: '#fbf7ee',
          100: '#f5ebd0',
          200: '#ebd5a0',
          300: '#debb6a',
          400: '#d4a843',
          500: '#c49632',
          600: '#b08528',
          700: '#8c6222',
          800: '#744f22',
          900: '#614221',
        },
        navy: {
          50: '#f0f3f9',
          100: '#d9e0ef',
          200: '#b3c1df',
          300: '#8da2cf',
          400: '#6783bf',
          500: '#4164af',
          600: '#2d4a8c',
          700: '#1e3469',
          800: '#142347',
          900: '#0B1426',
          950: '#060a15',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
      },
    },
  },
  plugins: [],
}
