export interface ResultPageContent {
    title: string
    description: string
    tableTitle: string
    resetButtonLabel: string
    columnHeaders: {
        rank: string
        startNumber: string
        name: string
        dateOfBirth: string
        totalTime: string
        category: string
        year: string
    }
    filterPlaceholders: {
        startNumber: string
        name: string
        dateOfBirth: string
        category: string
        year: string
    }
    emptyState: {
        title: string
        subtitle: string
    }
    loadingText: string
}
