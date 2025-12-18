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
    scrollBehavior() {
        return { top: 0, behavior: 'smooth' }
    }
})

export default router
