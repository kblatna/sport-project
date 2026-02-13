export interface CreateRaceSignup {
    firstName: string
    lastName: string
    email: string
    dateOfBirth: Date
    category: string
    race: string
    token: string
    honeypot?: string | null
}
