import { Barlow, Montserrat } from "next/font/google";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      B:["Barlow_Condensed", "sans-serif"],
      D:["DM Sans",'sans-serif'],
      M:["Montserrat","sans-serif"]
    },
    
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors:{
        primary:'#a87d38',
        'primary-300':"#fdba74",
        black:'#0f0f0f',
        smoke:"#c9c3c3",
      },
    },
  },
  plugins: [],
};
export default config;
