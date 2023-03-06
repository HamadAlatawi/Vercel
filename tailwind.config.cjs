/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend:{
      margin:{
        '90': '352px',
      },
      borderWidth:{
        '3': '3px',
        '6': '6px',
        '10': '10px',
        '12': '12px',
      },
    },
    fontFamily: {
      'Barlow': ['Barlow Semi Condensed', 'sans-serif']
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'PrimaryHover': '#5E53A2',
      'white': '#ffffff',
      'black': '#000000',
      'Base': '#FDFCF5',
      'Shade01': '#02030A',
      'Shade02-5%': '#e5e5e6',
      'Shade02-30%': '#b3b3b4',
      'Neutral1': '#E3E2DC',
      'Neutral2': '#CAC9C4',
      'Neutral3': '#B1B0AB',
      'Neutral4': '#979793',
      'Neutral5': '#7E7E7A',
      'Neutral6': '#656562',
      'Neutral7': '#4C4B49',
      'Neutral8': '#323231',
      'Primary1': '#7D69DB',
      'Primary2': '#897BCF',
      'PrimaryDark': '#342F78',
      'Error1': '#DB4660',
      'Error2': '#FEF8F6',
      'YellowLight': '#FFF086',
      'YellowDark': '#DBB851',
      'Green': '#67DB7D',
      'Blue': '#586FDB',
    },
  },
  plugins: []
};