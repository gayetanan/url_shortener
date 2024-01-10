/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './public/**/*.{html,js,hbs}',
    // './components/**/*.{html,js}',
  ],
  theme: {
  
    container:{
      center:true,
      screens:{
        "2xl":"768px"
      },
      padding:"1rem"
    },
    extend: {},
  },
  plugins: [],
}

