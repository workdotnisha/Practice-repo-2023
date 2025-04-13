/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*"],
  theme: {
    extend: {
      keyframes:{
        move:{
          "50%":{transform:'translateY(-1rem)'}
        }
      },
      animation:{
        'movingY':'move 2s linear infinte'
      }
    },
  },
  plugins: [],
}
