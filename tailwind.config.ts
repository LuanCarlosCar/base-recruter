import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        black1: "#1A202C",
        blueOne: "#dfeffe",
        blueSegund: "#148aed",
      },
      fontSize: {
        // Aqui você adiciona o novo tamanho de fonte
        sizebasel: "2rem", // Define o tamanho da fonte como 2rem
      },
    },
  },
  plugins: [],
};

export default config;
