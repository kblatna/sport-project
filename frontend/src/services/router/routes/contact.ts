import type { RouteRecordRaw } from 'vue-router'

const contact: RouteRecordRaw = {
    path: '/contact',
    name: 'Contact',
    component: () => import('@/views/app/views/about/ContactView.vue'),
    meta: { breadcrumb: 'Kontakt' }
}

export default contact
