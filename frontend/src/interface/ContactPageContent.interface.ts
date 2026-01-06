export interface Address {
    organizationName: string
    street: string
    city: string
    zipCode: string
    mapLink?: string
}

export interface ContactInfo {
    email: string
    phone: string
    facebook?: string
    instagram?: string
}

export interface ContactPageContent {
    pageTitle: string
    introText: string
    addressSectionTitle: string
    address: Address
    showMap: string
    contactSectionTitle: string
    contactInfo: ContactInfo
    formSectionTitle: string
    createdAt?: Date
    updatedAt?: Date
}
