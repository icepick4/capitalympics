/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {},
        colors: {
            primary: '#1E3A8A',
            primaryhover: '#2F50AD',
            secondary: '#00BFD5',
            links: '#007EC4',
            background: '#7BB6B3',
            text: '#000000',
            white: '#FFFFFF',
            black: '#000000',
            gray: colors.trueGray
        }
    },
    variants: {
        extend: {}
    },
    plugins: []
};
