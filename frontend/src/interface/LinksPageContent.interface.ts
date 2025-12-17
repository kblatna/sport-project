export interface MediaItem {
    title: string
    link?: string
}

export interface UsefulLink {
    text: string
    icon: string
    link: string
}

export interface LinksPageContent {
    heroImage: string
    tvItems: MediaItem[]
    videoItems: MediaItem[]
    pressItems: MediaItem[]
    webItems: MediaItem[]
    links: UsefulLink[]
}

export interface ContactBox {
    icon?: string
    message?: string
    ctaText?: string
    ctaRouteName?: string
    ctaHref?: string
}

export interface LinksPageContent {
    heroImage: string
    tvItems: MediaItem[]
    videoItems: MediaItem[]
    pressItems: MediaItem[]
    webItems: MediaItem[]
    links: UsefulLink[]
    contactBox?: ContactBox
    titles?: {
        main?: string
        sectionOhlasy?: string
        tv?: string
        videos?: string
        press?: string
        web?: string
        links?: string
    }
}
