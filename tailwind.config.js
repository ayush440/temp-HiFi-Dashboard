/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");
const { toRGB, withOpacityValue } = require("./tailwind-helper.js");


export default {
  content: [
    "./src/**/*.{php,html,js,jsx,ts,tsx,vue}",
    "./resources/**/*.{php,html,js,jsx,ts,tsx,vue}",
    // "./node_modules/@left4code/tw-starter/**/*.js",
  ],
  darkMode: "class",
  theme: {
    extend: {
      width: {
        '1/2': '50%',
        '1/3': '33.333333%',
        '1/4': '25%',
        
      },
      colors: {
        rgb: toRGB({
          inherit: colors.inherit,
          current: colors.current,
          transparent: colors.transparent,
          black: colors.black,
          white: colors.white,
          slate: colors.slate,
          gray: colors.gray,
          zinc: colors.zinc,
          neutral: colors.neutral,
          stone: colors.stone,
          red: colors.red,
          orange: colors.orange,
          amber: colors.amber,
          yellow: colors.yellow,
          lime: colors.lime,
          green: colors.green,
          emerald: colors.emerald,
          teal: colors.teal,
          cyan: colors.cyan,
          sky: colors.sky,
          blue: colors.blue,
          indigo: colors.indigo,
          violet: colors.violet,
          purple: colors.purple,
          fuchsia: colors.fuchsia,
          pink: colors.pink,
          rose: colors.rose,
          sky: colors.sky,
          stone: colors.stone,
          neutral: colors.neutral,
          gray: colors.red,
          slate: colors.slate,
          custom: '#C4E4FF',
          custom3: '#bfefff',
        }),
        'primary-light': withOpacityValue("--color-primary-light"),
        primary: withOpacityValue("--color-primary"),
        'primary-bold': withOpacityValue("--color-primary-bold"),

        'secondary-light': withOpacityValue("--color-secondary-light"),
        secondary: withOpacityValue("--color-secondary"),
        'secondary-bold': withOpacityValue("--color-secondary-bold"),

        'third-light': withOpacityValue("--color-third-light"),
        third: withOpacityValue("--color-third"),
        'third-bold': withOpacityValue("--color-third-bold"),
        
        fourth: withOpacityValue("--color-fourth"),
        tableText: withOpacityValue("--color-table-text"),
        tableTd: withOpacityValue("--color-table-td"),
        
        success: withOpacityValue("--color-success"),
        info: withOpacityValue("--color-info"),
        warning: withOpacityValue("--color-warning"),
        pending: withOpacityValue("--color-pending"),
        danger: withOpacityValue("--color-danger"),
        success: withOpacityValue("--color-success"),
        light: withOpacityValue("--color-light"),
        
        buy: "#4184f3",
        buyBg:"rgba(65,132,243,.1)",


        // default: withOpacityValue("--color-default"),
        // theme1: withOpacityValue("--color-theme1"),
        // theme2: withOpacityValue("--color-theme2"),
        // theme3: withOpacityValue("--color-theme3"),
        // theme4: withOpacityValue("--color-theme4"),
        // theme5: withOpacityValue("--color-theme5"),
        // theme6: withOpacityValue("--color-theme6"),
        // theme7: withOpacityValue("--color-theme7"),
        // theme8: withOpacityValue("--color-theme8"),
        // theme9: withOpacityValue("--color-theme9"),




        slate: {
          50: withOpacityValue("--color-slate-50"),
          100: withOpacityValue("--color-slate-100"),
          200: withOpacityValue("--color-slate-200"),
          300: withOpacityValue("--color-slate-300"),
          400: withOpacityValue("--color-slate-400"),
          500: withOpacityValue("--color-slate-500"),
          600: withOpacityValue("--color-slate-600"),
          700: withOpacityValue("--color-slate-700"),
          800: withOpacityValue("--color-slate-800"),
          900: withOpacityValue("--color-slate-900"),
        },
        darkmode: {
          50: withOpacityValue("--color-darkmode-50"),
          100: withOpacityValue("--color-darkmode-100"),
          200: withOpacityValue("--color-darkmode-200"),
          300: withOpacityValue("--color-darkmode-300"),
          400: withOpacityValue("--color-darkmode-400"),
          500: withOpacityValue("--color-darkmode-500"),
          600: withOpacityValue("--color-darkmode-600"),
          700: withOpacityValue("--color-darkmode-700"),
          800: withOpacityValue("--color-darkmode-800"),
          900: withOpacityValue("--color-darkmode-900"),
        },

      },
      fontFamily: {
        roboto: ["Roboto"],
      },
      container: {
        center: true,
      },
      maxWidth: {
        "1/4": "25%",
        "1/3": "33.33%",
        "1/2": "50%",
        "3/4": "75%",
      },
      strokeWidth: {
        0.5: 0.5,
        1.5: 1.5,
        2.5: 2.5,
      },
      gridColumn: {
        'span-12': 'span 12 / span 12',
        'span-11': 'span 11 / span 11',
        'span-10': 'span 10 / span 10',
        'span-9': 'span 9 / span 9',
        'span-8': 'span 8 / span 8',
        'span-7': 'span 7 / span 7',
        'span-6': 'span 6 / span 6',
        'span-5': 'span 5 / span 5',
        'span-4': 'span 4 / span 4',
        'span-3': 'span 3 / span 3',
        'span-2': 'span 2 / span 2',
        'span-1': 'span 1 / span 1',
      },
      screens: {
        'xs': '400px', // Extra-small screens
        'sm': '640px', // Small screens
        'md': '768px', // Medium screens
        'lg': '1024px', // Large screens
        'xl': '1280px', // Extra-large screens
        'xxl': '1536px', // Custom screen size
      },
    },
  },
  
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
  variants: {
    extend: {
      boxShadow: ["dark"],
      width: ['responsive', 'hover', 'focus', 'group-hover', 'lg'],
      height: ['responsive', 'hover', 'focus', 'group-hover', 'lg'],
    },
  },
}

