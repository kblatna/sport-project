export default {
    path: '/info',
    name: 'Info',
    component: () => import('@/views/app/views/information/InfoView.vue'),
    meta: { breadcrumb: 'Informace' }
}
