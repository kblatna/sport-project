/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms'

export default {
    content: [
        './index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}'
    ],
    theme: {
        container: {
            center: true,
            padding: '1rem',
            screens: {
                'sm': '100%',
                'md': '100%',
                'lg': '1024px',
                'xl': '1200px',
                '2xl': '1200px'
            }
        },
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
            }
        }
    },
    plugins: [
        forms
    ]
}
