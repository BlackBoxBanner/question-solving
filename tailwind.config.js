/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors:{
      primary:"#353443",
      "primary-hover":"#25242f",
      "primary-light":"#5d5d69",
      secondary:"#f9fdfc",
      teritary:"#ee4a39",
      "teritary-hover":"#a73428",
      "teritary-light":"#f16e61",
      error:"#ea7f7f",
    },
    extend: {
    },
  },
  plugins: [],
}
