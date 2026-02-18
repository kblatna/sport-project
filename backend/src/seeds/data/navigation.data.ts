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
            visible: true,
            children: [
                {
                    label: 'Mulda pro dospělé',
                    to: '/info#adults',
                    visible: true
                },
                {
                    label: 'Muldička pro děti',
                    to: '/info#kids',
                    visible: true
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
            visible: true,
            children: [
                {
                    label: 'Pořadatel',
                    to: '/organizer',
                    visible: true
                },
                {
                    label: 'Odkazy a ohlasy',
                    to: '/links',
                    visible: true
                },
                {
                    label: 'Kontakt',
                    to: '/contact',
                    visible: true
                }
            ]
        }
    ]
}
