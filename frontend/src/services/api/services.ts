import { createService } from './createService'

export const users = createService('users')
export const results = createService('results')

export function listResults(query?: Record<string, unknown>) {
    return results.paginate(query)
}
