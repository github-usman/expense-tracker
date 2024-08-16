/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: 'class', // Enable dark mode based on a 'dark' class
  theme: {
    extend: {
      colors: {
        // Dark theme colors
        bg: "#1A1A1A",
        conetentBg: "#282828",
        contentBgL1: "#353535",
        danger: "#F21A1A",
        success: "#4CAF50",
        logoColor: "#5DFECA",
        hdblue: "#1364ce",
        lbllightTextue: "#EEF5FF",
        dblue: "#1A73E8",

        // Light theme colors
        Lbg: "#F5F9FC",
        LconetentBg: "#FFFFFF",
        Ltext: "#000000c6",
        Ltext2: "#000000a7"
      },
      boxShadow: {
        dark_all__side__shadow: "1px 1px 8px 1px #0000005d"
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
        lg: "8px",
      },
    },
  },
  plugins: [],
};
