export default {
    path: '/about',
    redirect: '/about/organizer',
    meta: { breadcrumb: 'O nás' },
    children: [
        {
            path: 'organizer',
            name: 'Organizer',
            props: true,
            component: () => import('@/views/app/views/about/OrganizerView.vue'),
            meta: { breadcrumb: 'Pořadatel' }
        },
        {
            path: 'reviews',
            name: 'Reviews',
            props: true,
            component: () => import('@/views/app/views/about/ContactView.vue'),
            meta: { breadcrumb: 'Recenze' }
        },
        {
            path: 'links',
            name: 'Links',
            props: true,
            component: () => import('@/views/app/views/about/LinksView.vue'),
            meta: { breadcrumb: 'Odkazy' }
        },
        {
            path: 'contact',
            name: 'Contact',
            props: true,
            component: () => import('@/views/app/views/about/ContactView.vue'),
            meta: { breadcrumb: 'Kontakt' }
        }
    ]
}

// TODO: přidat stránku O nás
