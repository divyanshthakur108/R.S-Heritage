/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        royal: {
          gold: "#D4AF37",
          goldDark: "#B38F29",
          goldLight: "#F3E5AB",
          emerald: "#062C24",
          emeraldDark: "#031E18",
          emeraldLight: "#0D473B",
          maroon: "#58111A",
          cream: "#FAF8F5",
          sand: "#F4EFEA"
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 25px rgba(212, 175, 55, 0.25)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
      }
    },
  },
  plugins: [],
};
