/**
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  content: ["./src/**/*.{jsx,tsx}"],
  theme: {
    screens: {
      sm: "600px",
      md: "900px",
      lg: "1200px",
      xl: "1600px",
      xxl: "2560px",
    },
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
    },
    zIndex: {
      dropdown: 10,
      header: 20,
    },
    extend: {
      colors: {
        spotify: "#1ed760",
      },
      animation: {
        "login-fade-in": "login-fade-in 450ms ease-in",
        "login-pulse": "login-pulse 2000ms infinite",
        "fade-in": "fade-in 200ms ease-in",
      },
      keyframes: {
        "login-fade-in": {
          from: {
            opacity: 0,
            transform: "scale(1.1)",
          },
          to: {
            opacity: 1,
            transform: "scale(1)",
          },
        },
        "login-pulse": {
          "0%": {
            transform: "scale(0.95)",
            boxShadow: "0 0 0 0 rgba(29, 185, 84, 0.7)",
          },
          "50%": {
            opacity: 0.85,
          },
          "70%": {
            transform: "scale(1)",
            boxShadow: "0 0 0 15px rgba(29, 185, 84, 0)",
          },
          "100%": {
            transform: "scale(0.95)",
            boxShadow: "0 0 0 0 rgba(29, 185, 84, 0)",
          },
        },
        "fade-in": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
