import './assets/css/tailwind.css'
// import 'bootstrap/dist/js/bootstrap.bundle.min.js' // Odstraněno - Bootstrap nahrazen Tailwind
import '@vuepic/vue-datepicker/dist/main.css'
import { DataTablePlugin } from '@tvaliasek/vue-datatable'
import VueSecureHTML from 'vue-html-secure'

import { FormInputsPlugin } from '@tvaliasek/vue-form-inputs'
import '@tvaliasek/vue-form-inputs/dist/vue-form-inputs.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './services/router/router'
import 'iconify-icon'

const app = createApp(App)

app.use(router)
app.use(VueSecureHTML)
app.use(FormInputsPlugin())
app.use(DataTablePlugin)

app.mount('#app')
