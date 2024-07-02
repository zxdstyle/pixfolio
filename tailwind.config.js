import colors from './src/constants/themes/colors'

/** @type {import('tailwindcss').Config} */
export default {
    important: true,
    corePlugins: {
        preflight: false,
    },
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
            colors,
            height: {
                18: '4.5rem',
                128: '32rem',
                160: '40rem',
            },
            minHeight: {
                18: '4.5rem',
                128: '32rem',
                160: '40rem',
            },
            width: {
                18: '4.5rem',
            },
            minWidth: {
                128: '32rem',
                160: '40rem',
            },
            rotate: {
                15: '15deg',
            },
            animation: {
                'bounce-slow': 'bounce-slow 4s infinite',
                'left-in': 'left-in 1s',
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
                'left-in': {
                    '0%': {
                        opacity: '0',
                        transform: 'translate(-50px)',
                    },
                    '50%': {
                        opacity: '1',
                        transform: 'translate(0)',
                    },
                },
            },
        },

    },
    plugins: [],
}
