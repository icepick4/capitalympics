/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {},
        colors: {
            primary: '#0D8C5D',
            primaryhover: '#67D39F',
            secondary: '#67AC64',
            secondaryhover: '#76BB73',
            links: '#00542A',
            background: '#607999',
            error: '#A21c1c',
            text: '#000000',
            white: '#FFFFFF',
            black: '#000000',
            gray: colors.neutral
        }
    },
    variants: {
        extend: {}
    },
    plugins: []
};
