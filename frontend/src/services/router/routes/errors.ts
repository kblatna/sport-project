import type { RouteRecordRaw } from 'vue-router'

const errors: RouteRecordRaw[] = [
    {
        path: '/500',
        name: 'ServerError',
        component: () => import('@/views/errors/ServerErrorView.vue'),
        meta: { title: 'Chyba serveru' }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/errors/NotFoundView.vue'),
        meta: { title: 'Stránka nenalezena' }
    }
]

export default errors
