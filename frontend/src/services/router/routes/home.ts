export default {
    path: '/',
    name: 'Home',
    component: () => import('@/views/app/views/home/HomeView.vue'),
    meta: { breadcrumb: 'Domů' }
}
