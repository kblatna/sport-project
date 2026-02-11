export const mainPageData = {
    slug: 'homepage',
    title: 'Soběšická Mulda 2026 - Domovská stránka',
    published: true,
    raceSectionTitle: 'Kategorie závodů',
    hero: {
        title: 'Soběšická Mulda 2026',
        subtitle: '28. ročník tradičního závodu horských kol pro&nbsp;veřejnost se uskuteční 16. října 2026',
        backgroundImage: 'https://images.unsplash.com/photo-1633707167682-9068729bc84c',
        buttons: [
            {
                label: 'Informace',
                link: 'Info',
                severity: 'secondary'
            },
            {
                label: 'Registrace',
                link: 'Signup',
                severity: 'primary'
            }
        ]
    },
    raceCards: [
        {
            title: 'Mulda',
            subtitle: 'Mládež (10-17 let) a dospělí (18+)',
            description: 'Vzhledem k očekávanému počtu startujících a&nbsp;nutnosti zajištění jejich bezpečnosti jsme Soběšickou Muldu rozdělili do čtyř samostatných závodů. První tři v&nbsp;každé kategorii jednotlivců obdrží diplom, první tři v&nbsp;mládežnických kategoriích (10-17 let) dostanou navíc originální dřevěnou medaili.',
            image: '/images/adults.webp',
            buttons: [
                {
                    label: 'Informace',
                    link: 'Info',
                    severity: 'secondary',
                    hash: 'adults'
                },
                {
                    label: 'Registrace',
                    link: 'Signup',
                    severity: 'primary'
                }
            ]
        },
        {
            title: 'Muldička',
            subtitle: 'Děti (4-9 let)',
            description: 'Zařazení do kategorie je určeno ročníkem narození, jednotlivé kategorie startují dle harmonogramu. Děti startují zdarma, drobné ceny budou určeny pro každého předem přihlášeného malého závodníka. První tři v&nbsp;každé kategorii obdrží diplom.',
            image: '/images/kids.webp',
            buttons: [
                {
                    label: 'Informace',
                    link: 'Info',
                    severity: 'secondary',
                    hash: 'kids'
                },
                {
                    label: 'Registrace',
                    link: 'Signup',
                    severity: 'primary'
                }
            ]
        }
    ],
    info: {
        overtitle: 'MTB závod v Brně – od roku 1996',
        title: '28. ročník Soběšické Muldy 2026',
        features: [
            'atraktivní a&nbsp;dobře zabezpečená trať',
            'skvělá atmosféra',
            'měření časů pomocí nevratných čipů',
            'možnost bezplatného použití sprch',
            'možnost bezplatného umytí kol',
            'losování cen od našich sponzorů',
            'soutěž rodinných týmů',
            'možnost vynechání nejobtížnějšího sjezdu na trati dospělých'
        ]
    },
    gallery: [
        {
            src: '/images/gallery/20251012-brnow-007.webp',
            alt: 'start závodu na louce',
            title: 'start závodu na louce'
        },
        {
            src: '/images/gallery/20251012-brnow-029.webp',
            alt: 'Účastníci na trati',
            title: 'Účastníci na trati'
        },
        {
            src: '/images/gallery/20251012-brnow-065.webp',
            alt: 'Stoupání na louku',
            title: 'Stoupání na louku'
        },
        {
            src: '/images/gallery/20251012-brnow-107.webp',
            alt: 'Průjezd cílem',
            title: 'Průjezd cílem'
        },
        {
            src: '/images/gallery/20251012-brnow-208.webp',
            alt: 'Stupně vítězů',
            title: 'Stupně vítězů'
        },
        {
            src: '/images/gallery/20251012-brnow-233.webp',
            alt: 'Stoupání v podání dospělých',
            title: 'Stoupání v podání dospělých'
        },
        {
            src: '/images/gallery/20251012-brnow-241.webp',
            alt: 'Nájezd do dalšího kola',
            title: 'Nájezd do dalšího kola'
        },
        {
            src: '/images/gallery/20251012-brnow-312.webp',
            alt: 'Tým bikerů po závodě',
            title: 'Tým bikerů po závodě'
        }
    ],
    schedule: {
        title: 'Harmonogram',
        description: [
            'Vzhledem k&nbsp;očekávanému počtu startujících a&nbsp;nutnosti zajištění jejich bezpečnosti jsme Soběšickou Muldu rozdělili do čtyř samostatných závodů. A&nbsp;v&nbsp;rámci jednotlivých závodů budou ještě použity starty ve vlnách (přesné časy startů viz tabulka níže), aby se minimalizovalo riziko střetu rozdílně zdatných závodníků.',
            'Maximální počet závodníků v&nbsp;jednom závodě je stanoven na <strong>220</strong>&nbsp;v&nbsp;kategoriích <strong>dospělých</strong> a&nbsp;na <strong>120</strong>&nbsp;v&nbsp;kategoriích <strong>mládeže</strong>.'
        ],
        scheduleTable: [
            {
                category: 'M5, Z5',
                attendance: '8:00–9:15',
                training: 'do 9:10',
                restrictedTraining: '-',
                start: '9:31',
                limit: '10:10',
                announcement: '11:45',
                drawing: 'asi od 11:30'
            },
            {
                category: 'M7, Z7',
                attendance: '8:00–9:15',
                training: 'do 9:10',
                restrictedTraining: '-',
                start: '9:30',
                limit: '10:10',
                announcement: '11:45',
                drawing: 'asi od 11:30'
            },
            {
                category: 'M10, Z10',
                attendance: '8:00–10:00',
                training: 'do 9:10',
                restrictedTraining: '-',
                start: '10:30',
                limit: '11:15',
                announcement: '11:45',
                drawing: 'asi od 11:30'
            },
            {
                category: 'M15',
                attendance: '8:00–11:00',
                training: 'do 9:10',
                restrictedTraining: '9:10–11:10',
                start: '11:30',
                limit: '12:45',
                announcement: '13:00',
                drawing: 'asi od 14:30'
            },
            {
                category: 'Z15, V15, W15, WV15, ZV15, ZW15',
                attendance: '8:00–11:00',
                training: 'do 9:10',
                restrictedTraining: '9:10–11:10',
                start: '11:35',
                limit: '12:45',
                announcement: '13:00',
                drawing: 'asi od 14:30'
            },
            {
                category: 'M30',
                attendance: '8:00–13:00',
                training: 'do 9:10',
                restrictedTraining: '9:10–11:10',
                start: '13:30',
                limit: '16:00',
                announcement: '16:00',
                drawing: 'asi od 14:30'
            },
            {
                category: 'V30, W30, WV30',
                attendance: '8:00–13:00',
                training: 'do 9:10',
                restrictedTraining: '9:10–11:10',
                start: '13:35',
                limit: '16:00',
                announcement: '16:00',
                drawing: 'asi od 14:30'
            }
        ],
        legend: [
            {
                term: 'Trénink',
                definition: ' – doba, po kterou je pro trénink otevřena celá trať.'
            },
            {
                term: 'Omezený trénink',
                definition: ' – během závodů mládeže lze trénovat jen mimo trať pro mládež.'
            },
            {
                term: 'Limit',
                definition: ' – okamžik, kdy je trať uzavřena pro průjezd do dalšího kola.'
            },
            {
                term: 'Vyhlášení',
                definition: ' – vyhlášení vítězů.'
            },
            {
                term: 'Losování',
                definition: ' – vyvěšení seznamu počítačem vylosovaných výherců z&nbsp;řad závodníků na nástěnku vedle prezence a&nbsp;výdej cen u&nbsp;stolku poblíž.'
            }
        ],
        legendTitle: 'Vysvětlivky'
    },
    video: {
        title: 'Ukázka ze závodu',
        videoUrl: 'https://www.youtube.com/embed/uh0oFVfHCKU?si=PGWR8VdDzo2DDru6'
    }
}
