import type { RouteRecordRaw } from 'vue-router'

const links: RouteRecordRaw = {
    path: '/links',
    name: 'Links',
    component: () => import('@/views/app/views/about/LinksView.vue'),
    meta: { breadcrumb: 'Odkazy' }
}

export default links
