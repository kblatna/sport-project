export interface LogoImage {
    src: string
    alt?: string
}

export interface SignupPageContent {
    pageTitle: string
    introText: string
    cardTitle: string
    logos: LogoImage[]
    createdAt?: Date
    updatedAt?: Date
}
