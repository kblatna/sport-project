import type { RouteRecordRaw } from 'vue-router'

const admin: RouteRecordRaw[] = [
    {
        path: '/admin',
        component: () => import('@/views/admin/AdminView.vue'),
        meta: {
            requiresAuth: true,
            requiresAdmin: true
        },
        children: [
            {
                path: '',
                redirect: '/admin/users'
            },
            {
                path: 'users',
                name: 'AdminUsers',
                component: () => import('@/views/admin/components/AdminUsers.vue')
            },
            {
                path: 'users/:id',
                name: 'AdminUserEdit',
                component: () => import('@/views/admin/components/AdminUserEdit.vue')
            },
            {
                path: 'pages',
                name: 'AdminPages',
                component: () => import('@/views/admin/components/AdminPages.vue')
            },
            {
                path: 'pages/:id',
                name: 'AdminPageEdit',
                component: () => import('@/views/admin/components/AdminPageEdit.vue')
            },
            {
                path: 'results',
                name: 'AdminResults',
                component: () => import('@/views/admin/components/AdminResults.vue')
            },
            {
                path: 'navigation',
                name: 'AdminNavigation',
                component: () => import('@/views/admin/components/AdminNavigation.vue')
            }
        ]
    }
]

export default admin
