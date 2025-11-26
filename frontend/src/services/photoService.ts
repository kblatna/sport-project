import img1 from '@/assets/images/20251012-brnow-007.webp'
import img2 from '@/assets/images/20251012-brnow-029.webp'
import img3 from '@/assets/images/20251012-brnow-065.webp'
import img4 from '@/assets/images/20251012-brnow-107.webp'
import img5 from '@/assets/images/20251012-brnow-208.webp'
import img6 from '@/assets/images/20251012-brnow-233.webp'
import img7 from '@/assets/images/20251012-brnow-241.webp'
import img8 from '@/assets/images/20251012-brnow-312.webp'

export const PhotoService = {
    getData() {
        return [
            {
                itemImageSrc: img1,
                thumbnailImageSrc: img1,
                alt: 'Start závodu na louce',
                title: 'Start závodu na louce'
            },
            {
                itemImageSrc: img2,
                thumbnailImageSrc: img2,
                alt: 'Účastníci na trati',
                title: 'Účastníci na trati'
            },
            {
                itemImageSrc: img3,
                thumbnailImageSrc: img3,
                alt: 'Stoupání na louku',
                title: 'Stoupání na louku'
            },
            {
                itemImageSrc: img4,
                thumbnailImageSrc: img4,
                alt: 'Průjezd cílem',
                title: 'Průjezd cílem'
            },
            {
                itemImageSrc: img5,
                thumbnailImageSrc: img5,
                alt: 'Stupně vítězů',
                title: 'Stupně vítězů'
            },
            {
                itemImageSrc: img6,
                thumbnailImageSrc: img6,
                alt: 'Stoupání v podání dospělých',
                title: 'Stoupání v podání dospělých'
            },
            {
                itemImageSrc: img7,
                thumbnailImageSrc: img7,
                alt: 'Nájezd do dalšího kola',
                title: 'Nájezd do dalšího kola'
            },
            {
                itemImageSrc: img8,
                thumbnailImageSrc: img8,
                alt: 'Tým bikerů po závodě',
                title: 'Tým bikerů po závodě'
            }
        ]
    },

    getImages() {
        return Promise.resolve(this.getData())
    }
}
