import './assets/scss/app.scss'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '@vuepic/vue-datepicker/dist/main.css'

import { FormInputsPlugin } from '@tvaliasek/vue-form-inputs'
import '@tvaliasek/vue-form-inputs/dist/vue-form-inputs.css'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.use(FormInputsPlugin())

app.mount('#app')
