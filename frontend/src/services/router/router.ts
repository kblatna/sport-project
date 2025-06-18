import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import about from './routes/about'
import signup from './routes/signup'
import home from './routes/home'

const routes: RouteRecordRaw[] = [
    about,
    signup,
    home
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
