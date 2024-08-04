import {nextui} from '@nextui-org/theme'
import * as config from './config.json'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [ nextui({
    themes: {
      light: {
        // ...
        colors: {
          primary: config.accentColor
        },
      },
      dark: {
        // ...
        colors: {
          primary: config.accentColor
        },
      },
    },
  }),],
}
