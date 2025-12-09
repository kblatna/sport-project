import { createService } from './createService'

export const users = createService('users')
export const results = createService('results')
export const mainPageContent = createService('main-page-content')
export const resultPageContent = createService('result-page-content')
export const organizersPageContent = createService('organizer-page-content')

export function listResults(query?: Record<string, unknown>) {
    return results.paginate(query)
}
