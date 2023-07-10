/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            animation: {
                'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite'
            }
        },
        colors: {
            primary: '#0D8C5D',
            secondary: '#67AC64',
            background: '#D3D3D3',
            error: '#A21c1c',
            text: '#000000',
            white: '#FFFFFF',
            black: '#000000',
            gray: colors.neutral,
            red: colors.red,
            yellow: colors.amber,
            blue: colors.blue
        },
        screens: {
            xs: '500px',
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            xxl: '1536px',
            '2xl': '1536px'
        }
    },
    variants: {
        extend: {}
    },
    plugins: []
};
