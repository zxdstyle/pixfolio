/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        extend: {
            height: {
                18: '4.5rem',
            },
            width: {
                18: '4.5rem',
            },
            rotate: {
                15: '15deg',
            },
            animation: {
                'bounce-slow': 'bounce-slow 4s infinite',
            },
            keyframes: {
                'bounce-slow': {
                    '0%, 100%': {
                        'transform': 'translateY(-10%)',
                        'animation-timing-function': 'cubic-bezier(0.8,0,1,1)',
                    },
                    '50%': {
                        'transform': 'none',
                        'animation-timing-function': 'cubic-bezier(0,0,0.2,1)',
                    },
                },
            },
        },
    },
    plugins: [],
}
