export interface FooterLink {
    label: string
    to: string
}

export interface FooterSection {
    title: string
    links: FooterLink[]
}

export interface SocialLink {
    icon: string
    url: string
    label: string
}

export interface Logo {
    src: string
    alt: string
}

export interface FooterContent {
    logo: Logo
    socialLinks: SocialLink[]
    sections: FooterSection[]
    copyright: string
}
