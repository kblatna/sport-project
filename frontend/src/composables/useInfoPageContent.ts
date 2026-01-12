import type { InfoPageContent, InfoPageVariant } from '@/interface/InfoPageContent'
import { infoPageContent } from '@/services/api/services'
import { computed, ref } from 'vue'
import { logger } from '@/utils/logger'
import { useRoute } from 'vue-router'

export function useInfoPageContent() {
    const route = useRoute()
    const content = ref<InfoPageContent | null>(null)
    const loading = ref(false)
    const error = ref<Error | null>(null)

    // Určí, která varianta se má zobrazit na základě hash fragmentu (#kids nebo #adults)
    const variant = computed<'kids' | 'adults'>(() => {
        const hash = route.hash.replace('#', '')
        return hash === 'kids' ? 'kids' : 'adults'
    })

    // Vrátí data pro aktuální variantu
    const currentContent = computed<InfoPageVariant | null>(() => {
        if (!content.value) {
            return null
        }
        return content.value[variant.value]
    })

    async function fetchContent() {
        loading.value = true
        error.value = null
        try {
            const response = await infoPageContent.getAll() as InfoPageContent
            content.value = response
        } catch (e) {
            error.value = e as Error
            logger.error('Failed to fetch info page content', e, { context: 'useInfoPageContent' })
        } finally {
            loading.value = false
        }
    }

    return {
        content,
        currentContent,
        variant,
        loading,
        error,
        fetchContent
    }
}
