import { footerContent } from '@/services/api/services'
import { computed, onMounted, ref } from 'vue'
import { logger } from '@/utils/logger'
import type { FooterContent } from '@/interface/FooterContent.interface'

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
            logger.error('Failed to fetch footer content', e, { context: 'useFooterData' })
        } finally {
            loading.value = false
        }
    }

    onMounted(async () => {
        await fetchFooterData()
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
