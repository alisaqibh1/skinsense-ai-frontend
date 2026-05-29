/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#DC2626',
        orange: '#EA580C',
        lightGreen: '#DCFCE7',
        teal: '#0891B2',
      },
      fontFamily: {
        heading: ['Fraunces', 'serif'],
        body: ['Plus Jakarta Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
