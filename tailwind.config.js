/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./*.{html,js}",
    "./privacy-policy/*.{html,js,hbs}",
    "./termini-e-condizioni/*.{html,js,hbs}",
    "./partials/*.{html,js,hbs}"
  ],
  theme: {
    extend: {
      colors: {
        "abyss": {
          "950": "hsl(209, 54%, 5%)",
          "900": "hsl(209, 54%, 10%)",
          "DEFAULT": "hsl(209, 54%, 10%)",
          "800": "hsl(209, 54%, 20%)",
          "700": "hsl(209, 54%, 30%)",
          "600": "hsl(209, 54%, 40%)",
          "500": "hsl(209, 54%, 50%)",
          "400": "hsl(209, 54%, 60%)",
          "300": "hsl(209, 54%, 70%)",
          "200": "hsl(209, 54%, 80%)",
          "100": "hsl(209, 54%, 90%)",
          "50": "hsl(209, 54%, 95%)",
        },
        "primary": {
          "950": "hsl(51, 98%, 5%)",
          "900": "hsl(51, 98%, 10%)",
          "800": "hsl(51, 98%, 20%)",
          "700": "hsl(51, 98%, 30%)",
          "600": "hsl(51, 98%, 40%)",
          "500": "hsl(51, 98%, 50%)",
          "DEFAULT": "hsl(51, 98%, 50%)",
          "400": "hsl(51, 98%, 60%)",
          "300": "hsl(51, 98%, 70%)",
          "200": "hsl(51, 98%, 80%)",
          "100": "hsl(51, 98%, 90%)",
          "50": "hsl(51, 98%, 95%)",
        },
        "secondary": {
          "950": "hsl(2, 56%, 5%)",
          "900": "hsl(2, 56%, 10%)",
          "800": "hsl(2, 56%, 20%)",
          "700": "hsl(2, 56%, 30%)",
          "600": "hsl(2, 56%, 40%)",
          "500": "hsl(2, 56%, 50%)",
          "DEFAULT": "hsl(2, 56%, 50%)",
          "400": "hsl(2, 56%, 60%)",
          "300": "hsl(2, 56%, 70%)",
          "200": "hsl(2, 56%, 80%)",
          "100": "hsl(2, 56%, 90%)",
          "50": "hsl(2, 56%, 95%)",
          
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}

