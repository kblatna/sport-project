export default {
    path: '/signup',
    name: 'Signup',
    component: () => import('@/views/app/views/signup/SignupView.vue'),
    meta: { breadcrumb: 'Přihlášení' }
}
