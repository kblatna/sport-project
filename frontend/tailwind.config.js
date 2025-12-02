/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms'

export default {
    content: [
        './index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#e6f1f7',
                    100: '#cce3ef',
                    200: '#99c7df',
                    300: '#66abcf',
                    400: '#338fbf',
                    500: '#2a5a88',
                    600: '#164263',
                    700: '#003049',
                    800: '#002837',
                    900: '#002029'
                }
            },
            fontFamily: {
                montserrat: ['Montserrat', 'sans-serif']
            },
            container: {
                center: true,
                padding: {
                    DEFAULT: '1rem',
                    lg: '2rem'
                },
                screens: {
                    'sm': '640px',
                    'md': '768px',
                    'lg': '1024px',
                    'xl': '1280px',
                    '2xl': '1440px'
                }
            }
        }
    },
    plugins: [
        forms
    ]
}
