import './assets/css/tailwind.css'
import VueSecureHTML from 'vue-html-secure'

// PrimeVue imports
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './services/router/router'
import 'iconify-icon'

const app = createApp(App)

app.use(router)
app.use(VueSecureHTML)

// PrimeVue configuration
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
})

app.mount('#app')
