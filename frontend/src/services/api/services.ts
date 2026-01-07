import { createService } from './createService'

export const users = createService('users')
export const results = createService('results')
export const mainPageContent = createService('main-page-content')
export const resultPageContent = createService('result-page-content')
export const organizersPageContent = createService('organizer-page-content')
export const linksPageContent = createService('links-page-content')
export const signupPageContent = createService('signup-page-content')
export const contactPageContent = createService('contact-page-content')
export const infoPageContent = createService('info-page-content')
export const footerContent = createService('footer-content')
export const navigation = createService('navigation')

export function listResults(query?: Record<string, unknown>) {
    return results.paginate(query)
}
