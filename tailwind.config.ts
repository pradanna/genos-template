import { mtConfig } from "@material-tailwind/react";

const config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ["Nunito", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "primary-color": "#F12C42",
        "light-color": "#fff",
        "primary-light": "#F77A8E",
        "primary-light2": "#FDD6DA",
        "primary-light3": "#FFE6E8",
        dark: "#111111",
        dark1: "#2d2f33",
        dark2: "#45484d",
        dark3: "#5c5f66",
        "success-dark": "#126B27",
        "success-base": "#22C55E",
        "success-light": "#86EFAC",
        "success-light2": "#DCFCE7",
        "success-light3": "#F3FAF7",
        "danger-dark": "#7F1D1D",
        "danger-base": "#DC2626",
        "danger-light": "#F87171",
        "danger-light2": "#FEE2E2",
        "warning-dark": "#92400E",
        "warning-base": "#F59E0B",
        "warning-light": "#FCD34D",
        "warning-light2": "#FEF9C3",
        light1: "#f8f9fa",
        light2: "#e9ecef",
      },
    },
  },
  plugins: [mtConfig],
};

export default config;
