export default {
    path: '/info',
    name: 'Info',
    component: () => import('@/views/app/views/info/InfoView.vue'),
    meta: { breadcrumb: 'Informace' }
}
