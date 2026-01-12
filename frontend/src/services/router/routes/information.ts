export default {
    path: '/information',
    name: 'Information',
    component: () => import('@/views/app/views/information/InfoView.vue'),
    meta: { breadcrumb: 'Informace' }
}
