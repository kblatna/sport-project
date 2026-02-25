import type { RouteRecordRaw } from 'vue-router'

const about: RouteRecordRaw = {
    path: '/about',
    redirect: '/about/organizer',
    meta: { breadcrumb: 'O nás' },
    children: [
        {
            path: 'organizer',
            name: 'Organizer',
            component: () => import('@/views/app/views/about/OrganizerView.vue'),
            meta: { breadcrumb: 'Pořadatel' }
        },
        {
            path: 'reviews',
            name: 'Reviews',
            component: () => import('@/views/app/views/about/ContactView.vue'),
            meta: { breadcrumb: 'Recenze' }
        },
        {
            path: 'links',
            name: 'Links',
            component: () => import('@/views/app/views/about/LinksView.vue'),
            meta: { breadcrumb: 'Odkazy' }
        },
        {
            path: 'contact',
            name: 'Contact',
            component: () => import('@/views/app/views/about/ContactView.vue'),
            meta: { breadcrumb: 'Kontakt' }
        }
    ]
}

export default about

// TODO: add About Us page
