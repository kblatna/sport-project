export interface AssociationSection {
    title: string
    description: string[]
    image?: string
    imageAlt?: string
    imageCaption?: string
}

export interface OrganizingTeamSection {
    title: string
    members: string[]
    description: string[]
    image?: string
    imageAlt?: string
    imageCaption?: string
    links?: Array<{
        label: string
        url: string
    }>
}

export interface ThanksSection {
    title: string
    description: string[]
}

export interface OrganizersPageContent {
    pageTitle: string
    association: AssociationSection
    organizingTeam: OrganizingTeamSection
    thanks: ThanksSection
}
