import type { RouteRecordRaw } from 'vue-router'

const results: RouteRecordRaw = {
    path: '/results',
    name: 'Results',
    component: () => import('@/views/app/views/results/ResultsView.vue'),
    meta: { breadcrumb: 'Výsledky' }
}

export default results
