import type { RouteRecordRaw } from 'vue-router'
import LoginView from '@/views/LoginView.vue'

const login: RouteRecordRaw = {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: {
        title: 'Přihlášení',
        requiresAuth: false
    }
}

export default login
