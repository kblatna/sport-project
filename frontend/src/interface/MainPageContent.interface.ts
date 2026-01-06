export interface MainPageContent {
    slug: string
    title: string
    published: boolean
    raceSectionTitle: string
    hero?: {
        title: string
        subtitle: string
        backgroundImage: string
        buttons?: Array<{
            label: string
            link: string
            severity: 'primary' | 'secondary'
        }>
    }
    raceCards?: Array<{
        title: string
        subtitle: string
        description: string
        image: string
        buttons?: Array<{
            label: string
            link: string
            severity: 'primary' | 'secondary'
        }>
    }>
    info?: {
        overtitle: string
        title: string
        features?: string[]
    }
    gallery?: Array<{
        src: string
        alt: string
        title: string
    }>
    schedule?: {
        title: string
        description: string[]
        tableTitle: string
        scheduleTable: Array<{
            category: string
            attendance: string
            training: string
            restrictedTraining: string
            start: string
            limit: string
            announcement: string
            drawing: string
        }>
        legend: Array<{
            term: string
            definition: string
        }>
        legendTitle: string
    }
    video?: {
        title: string
        videoUrl: string
    }
}
