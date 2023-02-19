/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
      "2xl": "1920px",
    },

    extend: {
      colors: {
        // MainGreen: "#12C466",
        // TextBlack: "#1d1d1d",
        // subBlack: "#696969",
        // placeHol: "#aaadb0",
        // blackie: "#000000",
        // tintWhite: "rgba(255, 255, 255, 0.4)",
        // tintBlue: "#3b88db",
      },
    },
  },
  plugins: [],
};
