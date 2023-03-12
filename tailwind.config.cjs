/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {},
        colors: {
            primary: '#0D8C5D',
            secondary: '#67AC64',
            background: '#D3D3D3',
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
