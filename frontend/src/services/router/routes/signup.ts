import type { RouteRecordRaw } from 'vue-router'

const signup: RouteRecordRaw = {
    path: '/signup',
    name: 'Signup',
    component: () => import('@/views/app/views/signup/SignupView.vue'),
    meta: { breadcrumb: 'Přihlášení' }
}

export default signup
