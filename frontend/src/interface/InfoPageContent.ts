export interface CategoryTableRow {
    group: string
    category: string
    birth: string
    length: string
    presentation: string
    start: string
    announcement?: string
}

export interface MapTab {
    label?: string
    mapUrl: string
    imageUrl: string
    alt: string
}

export interface FeeCategory {
    category: string
    subcategories: string
    price: number
    note?: string
}

export interface RegistrationPaymentSection {
    title: string
    description: string
    fees: FeeCategory[]
    bankAccount?: string
    variableSymbolNote?: string
}

export interface AttendanceSection {
    title: string
    imageSrc: string
    imagePosition: string
    content: string[]
}

export interface PrizesSection {
    title: string
    imageSrc: string
    content: string
}

export interface AwardsSection {
    title: string
    imageSrc: string
    imagePosition: string
    content: string[]
}

export interface TrackDescription {
    category1: string
    category2: string
    category3: string
}

export interface InfoPageVariant {
    pageTitle: string
    subtitle: string
    categoryDescription: string
    categoryTable: CategoryTableRow[]
    mapSectionTitle?: string
    mapTabs: MapTab[]
    descriptionTrackTitle?: string
    descriptionTrack?: TrackDescription
    registrationPayment: RegistrationPaymentSection
    attendance: AttendanceSection
    prizes?: PrizesSection
    awards: AwardsSection
}

export interface InfoPageContent {
    kids: InfoPageVariant
    adults: InfoPageVariant
    createdAt: string
    updatedAt: string
}
