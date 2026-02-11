export const navigationData = {
    name: 'main-navigation',
    locale: 'cs',
    items: [
        {
            label: 'Registrace',
            to: '/signup',
            visible: true
        },
        {
            label: 'Informace',
            to: '/info',
            children: [
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
            label: 'Výsledky',
            to: '/results',
            visible: true
        },
        {
            label: 'O nás',
            to: '/about',
            children: [
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
    ]
}
