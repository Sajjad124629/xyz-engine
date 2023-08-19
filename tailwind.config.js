/** @type {import('tailwindcss').Config} */
export default {

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  
    extend: {
      container: {
        // Add margin-right: auto; and margin-left: auto;
        center: true,
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['night','dark','retro'],
  },
}

