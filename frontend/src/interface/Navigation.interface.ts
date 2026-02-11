export interface NavItem {
    label: string
    to: string
    children?: NavItem[]
    visible?: boolean
}

export interface Navigation {
    name: string
    locale?: string
    items: NavItem[]
    createdAt?: Date
    updatedAt?: Date
}
