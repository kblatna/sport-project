<template>
    <div class="px-4 py-6 sm:px-0">
        <AdminPageHeader
            title="Správa navigace"
            description="Upravujte položky hlavní navigace webu."
        />

        <Message
            v-if="error"
            severity="error"
            class="mb-4"
        >
            {{ error }}
        </Message>

        <div class="bg-white shadow overflow-hidden sm:rounded-lg p-6">
            <div
                v-if="isLoading"
                class="flex justify-center py-8"
            >
                <LoadingSpinner />
            </div>

            <div
                v-else-if="navItems.length"
                class="space-y-4"
            >
                <div class="lg:flex items-center justify-between">
                    <div>
                        <h3 class="text-lg font-medium text-gray-900">
                            Položky navigace
                        </h3>
                        <p class="text-sm text-gray-600">
                            Seznam s možností úpravy pořadí,
                            přidání nových položek a smazání existujících.
                        </p>
                    </div>

                    <Button
                        label="Přidat položku"
                        icon="pi pi-plus"
                        severity="primary"
                        class="mt-4"
                    />
                </div>

                <div class="border-t pt-4 mt-4">
                    <ul class="space-y-2">
                        <li
                            v-for="item in navItems"
                            :key="item.label"
                            class="flex items-center justify-between p-3 bg-gray-50 rounded"
                        >
                            <div class="flex items-center">
                                <i class="pi pi-bars text-gray-400 mr-3"></i>
                                <span class="font-medium">{{ item.label }}</span>
                                <span class="ml-3 text-sm text-gray-500">{{ item.to }}</span>
                            </div>
                            <div class="flex gap-2">
                                <Button
                                    icon="pi pi-pencil"
                                    size="small"
                                    severity="secondary"
                                    text
                                />
                                <Button
                                    icon="pi pi-trash"
                                    size="small"
                                    severity="danger"
                                    text
                                />
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div
                v-else
                class="text-center py-8 text-gray-500"
            >
                Žádné položky navigace nenalezeny.
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import type { NavItem } from '@/interface/Navigation.interface'
import { navigation } from '@/services/api/services'
import Button from 'primevue/button'
import Message from 'primevue/message'
import { onMounted, ref } from 'vue'
import AdminPageHeader from './AdminPageHeader.vue'

const isLoading = ref(false)
const error = ref<string | null>(null)
const navItems = ref<NavItem[]>([])

async function loadNavigation() {
    isLoading.value = true
    error.value = null
    try {
        const data = await navigation.getAll()
        navItems.value = data.items || []
    } catch (err) {
        error.value = 'Nepodařilo se načíst navigaci.'
        console.error('Failed to load navigation:', err)
    } finally {
        isLoading.value = false
    }
}

onMounted(async () => {
    await loadNavigation()
})
</script>
