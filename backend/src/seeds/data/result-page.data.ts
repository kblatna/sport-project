export const resultPageData = {
    slug: 'result-page',
    published: true,
    title: 'Výsledky závodu',
    description: 'V tabulce níže si můžete filtrovat podle zvolených kritérií napříč jednotlivými ročníky závodu.',
    tableTitle: 'Výsledky závodů',
    resetButtonLabel: 'Reset filtrů',
    columnHeaders: {
        rank: 'Pořadí',
        startNumber: 'Startovní číslo',
        name: 'Jméno',
        dateOfBirth: 'Rok narození',
        totalTime: 'Celkový čas',
        category: 'Kategorie',
        year: 'Ročník'
    },
    filterPlaceholders: {
        startNumber: 'Hledat číslo',
        name: 'Hledat jméno',
        dateOfBirth: 'Hledat rok',
        category: 'Hledat kategorii',
        year: 'Hledat ročník'
    },
    emptyState: {
        title: 'Žádné výsledky nenalezeny',
        subtitle: 'Zkuste změnit filtry nebo vyhledávací kritéria'
    },
    loadingText: 'Načítání výsledků...'
}
