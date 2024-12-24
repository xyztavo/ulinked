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
    extend: {
      boxShadow: {
        'custom': '0 0 10px rgba(127, 127, 127, 0.5), inset 0 0 10px rgba(127, 127, 127, 0.5)',
      },
    },
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
