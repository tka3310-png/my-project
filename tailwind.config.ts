import type { Config } from "tailwindcss";
import { semantic, primitives } from "./src/styles/tokens";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: semantic.background,
        text: semantic.text,
        border: semantic.border,
        white: primitives.white,
        black: primitives.black,
        neutral: primitives.neutral,
        positive: primitives.positive,
        warning: primitives.warning,
        danger: primitives.danger,
      },
    },
  },
  plugins: [],
};

export default config;
