import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import about from './routes/about'
import signup from './routes/signup'
import home from './routes/home'
import results from './routes/results'
import information from './routes/information'

const routes: RouteRecordRaw[] = [
    about,
    signup,
    home,
    results,
    information
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
            // Vue Router supports returning an `el` to scroll to
            return { el: to.hash, behavior: 'smooth' }
        }

        // Default: scroll to top
        return { top: 0 }
    }
})

export default router
