/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          light: "#e8c97a",
          DEFAULT: "#c8a44a",
          dark: "#a07830",
          dim: "rgba(200, 164, 74, 0.18)",
          line: "rgba(200, 164, 74, 0.22)"
        },
        bg: {
          primary: "#0a0c0e",
          dark: "#0f0b04",
          card: "#14100d",
          nav: "rgba(17, 29, 23, 0.97)"
        },
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
        garamond: ['Cormorant Garamond', 'Georgia', 'serif'],
        hand: ['Parisienne', 'cursive'],
        sans: ['Plus Jakarta Sans', 'DM Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 25px rgba(212, 175, 55, 0.25)',
        'gold-glow': '0 0 35px rgba(200, 164, 74, 0.3)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
      }
    },
  },
  plugins: [],
};
