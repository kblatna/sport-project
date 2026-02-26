import { createService } from './createService'
import type { SignupPageContent } from '@/interface/SignupPageContent.interface'
import type { MainPageContent } from '@/interface/MainPageContent.interface'
import type { InfoPageContent } from '@/interface/InfoPageContent'
import type { FooterContent } from '@/interface/FooterContent.interface'
import type { ResultPageContent } from '@/interface/ResultPageContent.interface'
import type { OrganizersPageContent } from '@/interface/OrganizersPageContent.interface'
import type { LinksPageContent } from '@/interface/LinksPageContent.interface'
import type { ContactPageContent } from '@/interface/ContactPageContent.interface'
import type { Result } from '@/interface/Result.interface'
import type { PaginateResult } from '@/interface/PaginateResult.interface'
import type { Navigation } from '@/interface/Navigation.interface'
import { User } from '@/interface/Auth.interface'

export const users = createService<User>('users')
export const results = createService<Result>('results')
export const mainPageContent = createService<MainPageContent>('main-page-content')
export const resultPageContent = createService<ResultPageContent>('result-page-content')
export const organizersPageContent = createService<OrganizersPageContent>('organizer-page-content')
export const linksPageContent = createService<LinksPageContent>('links-page-content')
export const signupPageContent = createService<SignupPageContent>('signup-page-content')
export const contactPageContent = createService<ContactPageContent>('contact-page-content')
export const infoPageContent = createService<InfoPageContent>('info-page-content')
export const footerContent = createService<FooterContent>('footer-content')
export const navigation = createService<Navigation>('navigation')

export function listResults(query?: Record<string, unknown>): Promise<PaginateResult<Result>> {
    return results.paginate(query)
}
