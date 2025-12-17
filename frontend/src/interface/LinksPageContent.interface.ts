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

export default LinksPageContent
