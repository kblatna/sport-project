export default {
    path: '/about',
    children: [
        {
            path: 'organizer',
            name: 'Organizer',
            props: true,
            component: () => import('@/views/app/views/about/organizerView.vue')
        },
        {
            path: 'reviews',
            name: 'Reviews',
            props: true,
            component: () => import('@/views/app/views/about/reviewsView.vue')
        },
        {
            path: 'links',
            name: 'Links',
            props: true,
            component: () => import('@/views/app/views/about/linksView.vue')
        }
    ]
}
