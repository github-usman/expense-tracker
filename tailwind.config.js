/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#1A1A1A",
        conetentBg: "#282828",
        contentBgL1:"353535",
        danger:"#F21A1A",
        success:"#4CAF50",
        logoColor: "#5DFECA",
        blue: "#DDEAFC",
        lblue: "#EEF5FF",
        dblue: "#1A73E8",
      },
      screens: {
        xsm: "320px",
        sm: "576px",
        md: "768px",
        lg: "992px",
        xlg: "1200px",
        xxlg: "1400px",
      },
      borderRadius: {
        sm: "6px",
        lg:"16px"
      },
    },
  },
  plugins: [],
};
