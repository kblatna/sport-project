import type { RouteRecordRaw } from 'vue-router'

const organizer: RouteRecordRaw = {
    path: '/organizer',
    name: 'Organizer',
    component: () => import('@/views/app/views/about/OrganizerView.vue'),
    meta: { breadcrumb: 'Pořadatel' }
}

export default organizer
