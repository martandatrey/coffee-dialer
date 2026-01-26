/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                coffee: {
                    50: '#efebe9',
                    100: '#d7ccc8',
                    200: '#bcaaa4',
                    300: '#a1887f',
                    400: '#8d6e63',
                    500: '#795548',
                    600: '#6d4c41',
                    700: '#5d4037',
                    800: '#4e342e',
                    900: '#3e2723',
                },
                cream: {
                    DEFAULT: '#F5F5DC',
                    light: '#FFF8E1',
                },
                slate: {
                    850: '#263238', // Darker slate
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
