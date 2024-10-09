/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {},
    screens: {
      sm: "360px",
      md: "640px",
      lg: "768px",
      xl: "1024px",
      '2xl': "1280px"
    },
    keyframes:{
      fly: {
        "100%": {transform: "translateY(-1rem)",
                transform: "translateX(-1.5rem)",
        }
      }
    },
    animation: {
      flying: "fly 7.9s linear infinite"
    },
    fontFamily: {
      rubik: ["Rubik", "sans-serif"],
      teko: ["Teko", "sans-serif"]
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "12px",
        md: "32px"
      }
    }
  },
  plugins: [],
}

