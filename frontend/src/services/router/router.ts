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

const routes: RouteRecordRaw[] = [
    about,
    signup,
    home,
    results,
    info,
    organizer,
    links,
    contact,
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

export default router
