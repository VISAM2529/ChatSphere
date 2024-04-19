/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      phone: {'min':'360px','max':'640px'},
      laptop: {'min':'768px','max':'1023px'},
      desktop: {'min':'1024px','max':'1279px'},
      desktopxl: {'min':'1280px','max':'1535px'},
      desktop2xl: {'min':'1536px'}
      
    },
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}