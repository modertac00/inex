/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.tsx","./components/**/*.tsx","./layouts/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        primary: '#005EFE',
        tertiary: '#2E2E2E',
        PrimaryBackGround: '#005EFE14',
        subtitle: '#808080',
        formHeading: '#666666',
      },
    },
  },
  plugins: [],
}


