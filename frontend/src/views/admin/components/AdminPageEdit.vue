<template>
    <LoadingSpinner v-if="isLoading" />

    <div
        v-else-if="!error && pageContent"
        class="px-4 py-6 sm:px-0"
    >
        <div class="mb-8">
            <router-link
                :to="{ name: 'AdminPages' }"
                class="text-sm text-customblue-600 hover:text-customblue-800 mb-4 inline-flex items-center"
            >
                <i class="pi pi-arrow-left mr-2"></i>
                Zpět na seznam stránek
            </router-link>
            <AdminPageHeader
                :title="pageTitle"
                description="Upravte obsah této stránky"
            />
        </div>

        <Card class="shadow-lg">
            <template #content>
                <form
                    @submit.prevent="handleSubmit"
                    class="space-y-6"
                >
                    <div class="space-y-4">
                        <h3 class="text-lg font-semibold text-gray-800 border-b pb-2">
                            Hero sekce
                        </h3>

                        <div class="flex flex-col gap-2">
                            <label class="font-semibold text-gray-700">
                                Hlavní nadpis
                            </label>
                            <InputText
                                v-model="pageContent.hero.title"
                                class="w-full"
                            />
                        </div>

                        <div class="flex flex-col gap-2">
                            <label class="font-semibold text-gray-700">
                                Podnadpis
                            </label>
                            <InputText
                                v-model="pageContent.hero.subtitle"
                                class="w-full"
                            />
                        </div>

                        <div class="flex flex-col gap-2">
                            <label class="font-semibold text-gray-700">
                                URL obrázku na pozadí
                            </label>
                            <InputText
                                v-model="pageContent.hero.backgroundImage"
                                class="w-full"
                            />
                        </div>
                    </div>

                    <div class="space-y-4">
                        <h3 class="text-lg font-semibold text-gray-800 border-b pb-2">
                            Sekce závodů
                        </h3>

                        <div class="flex flex-col gap-2">
                            <label class="font-semibold text-gray-700">
                                Název sekce
                            </label>
                            <InputText
                                v-model="pageContent.raceSectionTitle"
                                class="w-full"
                            />
                        </div>
                    </div>

                    <div
                        v-if="pageContent.info"
                        class="space-y-4"
                    >
                        <h3 class="text-lg font-semibold text-gray-800 border-b pb-2">
                            Informační sekce
                        </h3>

                        <div class="flex flex-col gap-2">
                            <label class="font-semibold text-gray-700">
                                Nadtitulek
                            </label>
                            <InputText
                                v-model="pageContent.info.overtitle"
                                class="w-full"
                            />
                        </div>

                        <div class="flex flex-col gap-2">
                            <label class="font-semibold text-gray-700">
                                Titulek
                            </label>
                            <InputText
                                v-model="pageContent.info.title"
                                class="w-full"
                            />
                        </div>

                        <div class="flex flex-col gap-2">
                            <label class="font-semibold text-gray-700">
                                Vlastnosti (každá na nový řádek)
                            </label>
                            <Textarea
                                :model-value="featuresText"
                                @update:model-value="updateFeatures"
                                rows="6"
                                class="w-full"
                            />
                            <small class="text-gray-500">
                                Zadejte každou vlastnost na nový řádek
                            </small>
                        </div>
                    </div>

                    <div
                        v-if="pageContent.video"
                        class="space-y-4"
                    >
                        <h3 class="text-lg font-semibold text-gray-800 border-b pb-2">
                            Video sekce
                        </h3>

                        <div class="flex flex-col gap-2">
                            <label class="font-semibold text-gray-700">
                                Název videa
                            </label>
                            <InputText
                                v-model="pageContent.video.title"
                                class="w-full"
                            />
                        </div>

                        <div class="flex flex-col gap-2">
                            <label class="font-semibold text-gray-700">
                                URL videa (YouTube embed)
                            </label>
                            <InputText
                                v-model="pageContent.video.videoUrl"
                                class="w-full"
                            />
                        </div>
                    </div>

                    <div class="flex justify-end gap-3 pt-4 border-t">
                        <Button
                            label="Zrušit"
                            severity="secondary"
                            @click="$router.push({ name: 'AdminPages' })"
                            type="button"
                        />
                        <Button
                            label="Uložit změny"
                            icon="pi pi-check"
                            severity="primary"
                            type="submit"
                            :loading="isSaving"
                        />
                    </div>
                </form>
            </template>
        </Card>
    </div>

    <ErrorMessage
        v-else-if="error"
        :message="error"
    />
</template>

<script setup lang="ts">
import ErrorMessage from '@/components/ErrorMessage.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import type { MainPageContent } from '@/interface/MainPageContent.interface'
import { mainPageContent } from '@/services/api/services'
import Button from 'primevue/button'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import { useToast } from 'primevue/usetoast'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AdminPageHeader from './AdminPageHeader.vue'

const route = useRoute()
const router = useRouter()
const toast = useToast()
const pageId = computed(() => route.params.id as string)

const isLoading = ref(false)
const isSaving = ref(false)
const error = ref<string | null>(null)
const pageContent = ref<MainPageContent | null>(null)

const pageTitles: Record<string, string> = {
    main: 'Hlavní stránka',
    info: 'Informace',
    signup: 'Registrace',
    results: 'Výsledky',
    organizers: 'Pořadatelé',
    links: 'Odkazy',
    contact: 'Kontakt',
    footer: 'Patička webu'
}

const pageTitle = computed(() => pageTitles[pageId.value] || 'Stránka')

const featuresText = computed(() => {
    if (!pageContent.value?.info?.features) {
        return ''
    }
    return pageContent.value.info.features.join('\n')
})

const updateFeatures = (value: string) => {
    if (pageContent.value?.info) {
        pageContent.value.info.features = value
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0)
    }
}

const loadContent = async () => {
    isLoading.value = true
    error.value = null

    try {
        const response = await mainPageContent.getAll()
        pageContent.value = response
    } catch (err) {
        console.error('Chyba při načítání obsahu:', err)
        error.value = 'Nepodařilo se načíst obsah stránky. Zkuste to prosím později.'
    } finally {
        isLoading.value = false
    }
}

const handleSubmit = async () => {
    if (!pageContent.value) {
        return
    }

    isSaving.value = true

    try {
        const contentId = (pageContent.value as MainPageContent & { _id: string })._id
        if (!contentId) {
            throw new Error('ID obsahu nebylo nalezeno')
        }

        await mainPageContent.update(contentId, pageContent.value)

        toast.add({
            severity: 'success',
            summary: 'Uloženo',
            detail: 'Změny byly úspěšně uloženy',
            life: 3000
        })

        setTimeout(() => {
            router.push({ name: 'AdminPages' })
        }, 1000)
    } catch (err) {
        console.error('Chyba při načítání obsahu:', err)
        error.value = 'Nepodařilo se načíst obsah stránky. Zkuste to prosím později.'
        toast.add({
            severity: 'error',
            summary: 'Chyba',
            detail: error,
            life: 5000
        })
    } finally {
        isSaving.value = false
    }
}

onMounted(async () => {
    await loadContent()
})
</script>
