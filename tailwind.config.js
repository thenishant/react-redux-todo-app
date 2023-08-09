/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js, jsx, ts, tsx}', './public/index.html'],
    theme: {
        extend: {
            height: {
                22: '22rem', // Define a custom fixed height value
            },
        },
    },
    plugins: [],
};

