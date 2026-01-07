import { footerContent } from '@/services/api/services'
import { computed, onMounted, ref } from 'vue'

export interface FooterLink {
    label: string
    to: string
}

export interface FooterSection {
    title: string
    links: FooterLink[]
}

export interface SocialLink {
    icon: string
    url: string
    label: string
}

export interface Logo {
    src: string
    alt: string
}

export interface FooterContent {
    logo: Logo
    socialLinks: SocialLink[]
    sections: FooterSection[]
    copyright: string
}

export function useFooterData() {
    const data = ref<FooterContent | null>(null)
    const loading = ref(false)
    const error = ref<Error | null>(null)

    const currentYear = computed(() => new Date().getFullYear())

    const copyright = computed(() => {
        if (!data.value) {
            return ''
        }
        // If copyright from DB contains {year}, replace it
        if (data.value.copyright.includes('{year}')) {
            return data.value.copyright.replace('{year}', currentYear.value.toString())
        }
        return data.value.copyright
    })

    async function fetchFooterData() {
        loading.value = true
        error.value = null
        try {
            const response = await footerContent.getAll()
            if (response) {
                data.value = response
            }
        } catch (e) {
            error.value = e as Error
            console.error('Failed to fetch footer content:', e)
        } finally {
            loading.value = false
        }
    }

    onMounted(() => {
        fetchFooterData()
    })

    return {
        logo: computed(() => data.value?.logo),
        socialLinks: computed(() => data.value?.socialLinks ?? []),
        footerSections: computed(() => data.value?.sections ?? []),
        copyright,
        loading,
        error,
        refetch: fetchFooterData
    }
}
