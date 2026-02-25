import type { RouteRecordRaw } from 'vue-router'

const home: RouteRecordRaw = {
    path: '/',
    name: 'Home',
    component: () => import('@/views/app/views/home/HomeView.vue'),
    meta: { breadcrumb: 'Domů' }
}

export default home
