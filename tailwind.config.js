module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      zIndex: {
        "-10": "-10",
      },
      colors: {
        whatsappgreen: "#009385",
        whatsappgray: "#d6dbd8",
      },
      height: {
        screen90: "92vh",
      },
      width: {
        screen70: "80vw",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
