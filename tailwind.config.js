/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-cyan': '#31f5ff',
        'brand-black': '#000000',
        'brand-white': '#ffffff',
      },
    },
  },
  plugins: [],
}

