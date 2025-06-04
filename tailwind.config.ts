import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        unbounded: ['Unbounded', 'sans-serif'],
        caveat: ['Caveat', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
        robotron: ['Robotron', 'sans-serif']
      },
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800'
      },
      colors: {
        black: {
          DEFAULT: '#030303',
          '50': '#393939',
          '30': '#555',
          '100': '#323232',
          'bg': '#030303'
        },
        white: {
          DEFAULT: '#F7F4F2',
          '50': 'rgba(247, 244, 242, 0.8)'
        },
        red: {
          DEFAULT:'#C60303',
        },
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
};

export default config;