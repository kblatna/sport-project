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
            component: () => import('@/views/app/views/about/ReviewsView.vue'),
            meta: { breadcrumb: 'Recenze' }
        },
        {
            path: 'links',
            name: 'Links',
            props: true,
            component: () => import('@/views/app/views/about/LinksView.vue'),
            meta: { breadcrumb: 'Odkazy' }
        }
    ]
}

// TODO: přidat stránku O nás
