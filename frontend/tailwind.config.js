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
                    50: '#eff6ff',
                    100: '#dbeafe',
                    500: '#3b82f6',
                    600: '#2563eb',
                    700: '#1d4ed8'
                },
                gray: {
                    50: '#f9fafb',
                    100: '#f3f4f6',
                    900: '#111827'
                }
            }
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
    },
    plugins: [
        forms
    ]
}
