import './assets/css/tailwind.css'
import VueSecureHTML from 'vue-html-secure'

// PrimeVue imports
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import { definePreset } from '@primeuix/themes'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './services/router/router'
import 'iconify-icon'

const MyPreset = definePreset(Aura, {
    primitive: {
        customblue: {
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
            950: '#001520'
        }
    },
    semantic: {
        primary: {
            50: '{customblue.50}',
            100: '{customblue.100}',
            200: '{customblue.200}',
            300: '{customblue.300}',
            400: '{customblue.400}',
            500: '{customblue.500}',
            600: '{customblue.600}',
            700: '{customblue.700}',
            800: '{customblue.800}',
            900: '{customblue.900}',
            950: '{customblue.950}'
        }
    }
})

const app = createApp(App)

const criticalContexts = ['render', 'setup']

// Global error handler for better error tracking and user experience
app.config.errorHandler = (err, instance, info) => {
    // Log error details in development
    if (import.meta.env.DEV) {
        console.error('Global Vue error:', err)
        console.error('Component:', instance)
        console.error('Error info:', info)
    }

    // TODO: Send to error tracking service in production (Sentry, etc.)
    // Example: Sentry.captureException(err, { contexts: { vue: { componentName: instance?.$options.name, info } } })

    const isCritical = criticalContexts.some(ctx => info?.includes(ctx)) || !instance

    if (isCritical) {
        router.push('/500')
    }
}

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
    if (import.meta.env.DEV) {
        console.error('Unhandled promise rejection:', event.reason)
    }
    // TODO: Send to error tracking service
    event.preventDefault()
})

app.use(router)
app.use(VueSecureHTML)

// PrimeVue configuration
app.use(PrimeVue, {
    theme: {
        preset: MyPreset,
        options: {
            prefix: 'p',
            darkModeSelector: false,
            cssLayer: false
        }
    }
})

app.mount('#app')
