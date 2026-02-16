/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ice-dark': '#050b1a',
        'ice-light': '#a5f3fc',
        'ice-glow': '#00f2ff',
      },
      backgroundImage: {
        'frost-texture': "url('/src/assets/frost.png')",
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
