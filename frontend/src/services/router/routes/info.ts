import type { RouteRecordRaw } from 'vue-router'

const info: RouteRecordRaw = {
    path: '/info',
    name: 'Info',
    component: () => import('@/views/app/views/info/InfoView.vue'),
    meta: { breadcrumb: 'Informace' }
}

export default info
