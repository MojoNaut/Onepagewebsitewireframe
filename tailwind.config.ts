import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        '350': '1400px',
      },
      width: {
        '125': '500px',
        '150': '600px',
        '175': '700px',
        '225': '900px',
      },
      height: {
        '125': '500px',
        '150': '600px',
        '175': '700px',
        '225': '900px',
      },
      zIndex: {
        '9999': '9999',
      },
    },
  },
  plugins: [],
};

export default config;
