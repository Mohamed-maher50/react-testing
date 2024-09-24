import { blackA, violet, mauve } from "@radix-ui/colors";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ...blackA,
        ...violet,
        ...mauve,
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
