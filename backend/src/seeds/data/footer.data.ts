export const footerData = {
    logo: {
        src: '/logo/mulda_logo.png',
        alt: 'Logo Soběšická Mulda'
    },
    socialLinks: [
        {
            icon: 'mdi:facebook',
            url: 'https://www.facebook.com/profile.php?id=100057750875910',
            label: 'Facebook'
        },
        {
            icon: 'mdi:instagram',
            url: 'https://www.instagram.com/sobesicka_mulda/',
            label: 'Instagram'
        },
        {
            icon: 'mdi:youtube',
            url: 'https://www.youtube.com/results?search_query=sob%C4%9B%C5%A1ick%C3%A1+mulda',
            label: 'YouTube'
        }
    ],
    sections: [
        {
            title: 'Informace',
            links: [
                {
                    label: 'Mulda pro dospělé',
                    to: '/info#adults'
                },
                {
                    label: 'Muldička pro děti',
                    to: '/info#kids'
                }
            ]
        },
        {
            title: 'Závod',
            links: [
                {
                    label: 'Registrace',
                    to: '/signup'
                },
                {
                    label: 'Výsledky',
                    to: '/results'
                }
            ]
        },
        {
            title: 'O nás',
            links: [
                {
                    label: 'Pořadatel',
                    to: '/organizer'
                },
                {
                    label: 'Odkazy a ohlasy',
                    to: '/links'
                },
                {
                    label: 'Kontakt',
                    to: '/contact'
                }
            ]
        }
    ],
    copyright: '© {year} Kateřina Blatná. Všechna práva vyhrazena.'
}
