import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/renderer/index.html', './src/renderer/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Product Sans', ...defaultTheme.fontFamily.sans],
        'turret-road': 'Turret Road'
      }
    }
  },
  plugins: []
}
