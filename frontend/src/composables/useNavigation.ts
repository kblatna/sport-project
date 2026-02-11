import { navigation as navigationService } from '@/services/api/services'
import { computed, onMounted, ref } from 'vue'
import { logger } from '@/utils/logger'
import type { NavItem } from '@/interface/Navigation.interface'

export function useNavigation() {
    const data = ref<NavItem[]>([])
    const isLoading = ref(false)
    const error = ref<Error | null>(null)

    async function fetchNavigation() {
        isLoading.value = true
        error.value = null
        try {
            const response = await navigationService.getAll()
            // Backend returns Navigation object with 'items' array property
            if (response && 'items' in response && Array.isArray(response.items)) {
                data.value = response.items
            } else if (Array.isArray(response)) {
                // Fallback if API returns array directly
                data.value = response as NavItem[]
            } else {
                data.value = []
            }
        } catch (e) {
            error.value = e as Error
            logger.error('Failed to fetch navigation', e, { context: 'useNavigation' })
            data.value = []
        } finally {
            isLoading.value = false
        }
    }

    onMounted(async () => {
        await fetchNavigation()
    })

    const items = computed(() => data.value)

    return {
        items,
        isLoading,
        error,
        refetch: fetchNavigation
    }
}
