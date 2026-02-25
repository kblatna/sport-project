import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import about from './routes/about'
import signup from './routes/signup'
import home from './routes/home'
import results from './routes/results'
import info from './routes/info'
import organizer from './routes/organizer'
import links from './routes/links'
import contact from './routes/contact'
import errors from './routes/errors'
import login from './routes/login'
import admin from './routes/admin'

const routes: RouteRecordRaw[] = [
    about,
    signup,
    home,
    results,
    info,
    organizer,
    links,
    contact,
    login,
    ...admin,
    ...errors
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        // If the user used browser back/forward, restore saved position
        if (savedPosition) {
            return savedPosition
        }

        // If the target route has a hash, scroll to the element
        if (to.hash) {
            // Wait for the DOM to be ready and check if element exists
            return new Promise((resolve) => {
                setTimeout(() => {
                    const element = document.querySelector(to.hash)
                    if (element) {
                        resolve({ el: to.hash, behavior: 'smooth' })
                    } else {
                        resolve({ top: 0 })
                    }
                }, 100)
            })
        }

        // Default: scroll to top
        return { top: 0 }
    }
})

// Navigation guard for authentication
router.beforeEach((to, from, next) => {
    const accessToken = localStorage.getItem('accessToken')
    const userStr = localStorage.getItem('user')

    let user = null
    if (userStr && userStr !== 'undefined' && userStr !== 'null') {
        try {
            user = JSON.parse(userStr)
        } catch (e) {
            console.error('Invalid user data in localStorage, clearing...', e)
            localStorage.removeItem('user')
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
        }
    }

    if (to.meta.requiresAuth) {
        if (!accessToken || !user) {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
            return
        }

        if (to.meta.requiresAdmin && user.role !== 'admin') {
            next('/')
            return
        }
    }

    if (to.path === '/login' && accessToken && user) {
        next('/admin')
        return
    }

    next()
})

export default router
