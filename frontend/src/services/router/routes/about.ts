export default {
    path: '/about',
    children: [
        {
            path: 'organizer',
            name: 'Organizer',
            props: true,
            component: () => import('@/views/app/views/about/OrganizerView.vue')
        },
        {
            path: 'reviews',
            name: 'Reviews',
            props: true,
            component: () => import('@/views/app/views/about/ReviewsView.vue')
        },
        {
            path: 'links',
            name: 'Links',
            props: true,
            component: () => import('@/views/app/views/about/LinksView.vue')
        }
    ]
}
