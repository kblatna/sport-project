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
                    900: '#002029',
                    DEFAULT: '#2a5a88'
                },
                accent: {
                    50: '#fff4ed',
                    100: '#ffe6d5',
                    200: '#fec9aa',
                    300: '#fda474',
                    400: '#fb743c',
                    500: '#e85d04',
                    600: '#d04d02',
                    700: '#a93b06',
                    800: '#88310c',
                    900: '#6f2a0d',
                    DEFAULT: '#e85d04'
                },
                ink: '#0b1f2a',
                surface: {
                    DEFAULT: '#ffffff',
                    muted: '#f6f8fa',
                    line: '#e2e8ef'
                }
            },
            fontFamily: {
                sans: ['"DM Sans"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif']
            },
            maxWidth: {
                content: '72rem'
            },
            borderRadius: {
                'xl': '0.75rem',
                '2xl': '1rem'
            },
            boxShadow: {
                soft: '0 1px 2px rgba(11, 31, 42, 0.04), 0 8px 24px rgba(11, 31, 42, 0.06)'
            }
        }
    },
    plugins: [
        forms
    ]
}
