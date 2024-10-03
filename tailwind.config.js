/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html"],
    theme: {
      extend: {
        fontFamily: {
            Inter: ["Inter", "sans-serif"],
          }
        },
    },
    plugins: [require("daisyui")],
};

