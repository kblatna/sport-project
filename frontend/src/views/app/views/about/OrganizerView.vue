<template>
    <SectionWrapper>
        <LoadingSpinner v-if="isLoading" />
        <ErrorMessage
            v-else-if="error"
            :message="error"
        />

        <template v-else-if="pageContent && pageContent.association && pageContent.organizingTeam && pageContent.thanks">
            <SectionHeader :title="pageContent.pageTitle" />

            <div class="container max-w-6xl mx-auto">
                <div class="flex flex-col md:flex-row md:gap-20 gap-8 mb-12">
                    <div class="flex flex-col flex-1">
                        <h3 class="text-xl font-semibold mb-4 flex items-center gap-2">
                            <iconify-icon
                                icon="mdi:account-group"
                                :inline="true"
                                class="text-primary"
                            />
                            {{ pageContent.association.title }}
                        </h3>
                        <p
                            v-for="(paragraph, index) in pageContent.association.description"
                            :key="index"
                            class="mb-6 text-gray-700 leading-relaxed"
                            v-html="paragraph"
                        ></p>

                        <figure
                            v-if="pageContent.association.image"
                            class="flex flex-col items-center mt-auto"
                        >
                            <Image
                                :src="pageContent.association.image"
                                :alt="pageContent.association.imageAlt || ''"
                                image-class="w-full max-w-[35rem] rounded-md"
                                preview
                            />
                            <figcaption
                                v-if="pageContent.association.imageCaption"
                                class="mt-2 text-sm text-gray-500 italic"
                            >
                                {{ pageContent.association.imageCaption }}
                            </figcaption>
                        </figure>
                    </div>

                    <div class="flex flex-col flex-1">
                        <h3 class="text-xl font-semibold mb-4 flex items-center gap-2">
                            <iconify-icon
                                icon="mdi:clipboard-account"
                                :inline="true"
                                class="text-primary"
                            />
                            {{ pageContent.organizingTeam.title }}
                        </h3>
                        <ul class="space-y-2 mb-6">
                            <li
                                v-for="member in pageContent.organizingTeam.members"
                                :key="member"
                                class="flex items-center gap-2 text-gray-700"
                            >
                                <iconify-icon
                                    icon="mdi:account-check"
                                    :inline="true"
                                    class="text-primary text-sm"
                                />
                                <span>{{ member }}</span>
                            </li>
                        </ul>

                        <p
                            v-for="(paragraph, index) in pageContent.organizingTeam.description"
                            :key="index"
                            class="mb-10 text-gray-700 leading-relaxed"
                            v-html="paragraph"
                        ></p>

                        <figure
                            v-if="pageContent.organizingTeam.image"
                            class="flex flex-col items-center mt-auto"
                        >
                            <Image
                                :src="pageContent.organizingTeam.image"
                                :alt="pageContent.organizingTeam.imageAlt || ''"
                                image-class="w-full max-w-[35rem] rounded-md"
                                preview
                            />
                            <figcaption
                                v-if="pageContent.organizingTeam.imageCaption"
                                class="mt-2 text-sm text-gray-500 italic"
                            >
                                {{ pageContent.organizingTeam.imageCaption }}
                            </figcaption>
                        </figure>
                    </div>
                </div>

                <div class="mt-10 md:mt-20">
                    <h3 class="text-xl font-semibold mb-4">
                        {{ pageContent.thanks.title }}
                    </h3>
                    <p
                        v-for="(paragraph, index) in pageContent.thanks.description"
                        :key="index"
                        v-html="paragraph"
                    ></p>
                </div>
            </div>
        </template>
    </SectionWrapper>
</template>

<script lang="ts" setup>
import ErrorMessage from '@/components/ErrorMessage.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import SectionHeader from '@/components/SectionHeader.vue'
import SectionWrapper from '@/components/SectionWrapper.vue'
import type { OrganizersPageContent } from '@/interface/OrganizersPageContent.interface'
import { organizersPageContent } from '@/services/api/services'
import { Image } from 'primevue'
import { onMounted, ref } from 'vue'

const pageContent = ref<OrganizersPageContent | null>(null)
const isLoading = ref<boolean>(false)
const error = ref<string>('')

onMounted(async () => {
    await loadContentData()
})

async function loadContentData(): Promise<void> {
    isLoading.value = true
    error.value = ''

    try {
        const response = await organizersPageContent.getAll()
        pageContent.value = response || null
    } catch (err) {
        console.error('Failed to load organizer page content:', err)
        error.value = 'Nepodařilo se načíst obsah stránky. Zkuste to prosím později.'
    } finally {
        isLoading.value = false
    }
}
</script>
