<template>
    <SectionWrapper class="container">
        <LoadingSpinner v-if="isLoading" />
        <ErrorMessage
            v-else-if="error"
            :message="error"
        />
        <template v-else-if="!isLoading && !error && linksContent && linksContent.heroImage">
            <SectionHeader title="Ohlasy a odkazy" />

            <div>
                <div
                    class="links-hero-image mb-12 rounded-xl overflow-hidden h-64 md:h-96 shadow-lg bg-cover bg-center"
                    :style="`background-image: url('${linksContent.heroImage}'); background-position: center 70%; background-size: cover;`"
                ></div>

                <div
                    v-if="linksContent"
                    class="mb-16"
                >
                    <h2 class="text-3xl font-bold mb-8 flex items-center gap-3 text-gray-800">
                        <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                            <iconify-icon
                                icon="mdi:television-classic"
                                :inline="true"
                                class="text-primary text-2xl"
                            />
                        </div>
                        Ohlasy
                    </h2>

                    <div class="grid md:grid-cols-2 gap-6">
                        <MediaListCard
                            icon="mdi:television"
                            title="Mulda v televizi"
                            :items="linksContent.tvItems"
                            item-icon="mdi:play-circle"
                        />

                        <MediaListCard
                            icon="mdi:youtube"
                            title="Videa na internetu"
                            :items="linksContent.videoItems"
                            item-icon="mdi:video"
                        />

                        <MediaListCard
                            icon="mdi:newspaper-variant"
                            title="Články v tisku"
                            :items="linksContent.pressItems"
                            item-icon="mdi:file-document"
                        />

                        <MediaListCard
                            icon="mdi:web"
                            title="Sesbíráno po internetu"
                            :items="linksContent.webItems"
                            item-icon="mdi:link"
                        />
                    </div>
                </div>
            </div>

            <div v-if="linksContent && linksContent.links">
                <h2 class="text-3xl font-bold mb-8 flex items-center gap-3 text-gray-800">
                    <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                        <iconify-icon
                            icon="mdi:link-variant"
                            :inline="true"
                            class="text-primary text-2xl"
                        />
                    </div>
                    Užitečné odkazy
                </h2>
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <a
                        v-for="(link, index) in linksContent.links"
                        :key="index"
                        :href="link.link"
                        class="group bg-white rounded-lg shadow-md p-5 hover:shadow-xl hover:bg-primary-50 transition-all flex items-center gap-4"
                    >
                        <div class="w-10 h-10 flex items-center justify-center flex-shrink-0">
                            <iconify-icon
                                :icon="link.icon"
                                :inline="true"
                                class="text-primary text-2xl"
                            />
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="text-gray-800 font-medium group-hover:text-primary transition-colors">
                                {{ link.text }}
                            </p>
                        </div>
                        <iconify-icon
                            icon="mdi:chevron-right"
                            :inline="true"
                            class="text-gray-400 text-3xl group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0"
                        />
                    </a>
                </div>
                <InfoBox
                    v-if="linksContent"
                    :icon="linksContent.contactBox?.icon ?? 'mdi:information'"
                    :message="linksContent.contactBox?.message ?? 'Máte-li nápad, co dalšího sem přidat, dejte nám vědět prostřednictvím kontaktního'"
                    :cta-text="linksContent.contactBox?.ctaText ?? 'formuláře'"
                    :cta-route-name="linksContent.contactBox?.ctaRouteName ?? 'Contact'"
                    bg-class="bg-primary-50"
                    border-class="border-primary"
                    icon-class="text-primary text-2xl"
                    class="mt-8"
                />
            </div>
        </template>
    </SectionWrapper>
</template>

<script setup lang="ts">
import ErrorMessage from '@/components/ErrorMessage.vue'
import InfoBox from '@/components/InfoBox.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import MediaListCard from '@/components/MediaListCard.vue'
import SectionHeader from '@/components/SectionHeader.vue'
import SectionWrapper from '@/components/SectionWrapper.vue'
import type { LinksPageContent } from '@/interface/LinksPageContent.interface'
import { linksPageContent } from '@/services/api/services'
import { onMounted, ref } from 'vue'

const linksContent = ref<LinksPageContent | null>(null)
const isLoading = ref<boolean>(false)
const error = ref<string>('')

onMounted(async () => {
    await loadlinksContentData()
})

async function loadlinksContentData(): Promise<void> {
    isLoading.value = true
    error.value = ''
    try {
        const response = await linksPageContent.getAll()
        linksContent.value = response || null
    } catch (err) {
        console.error('Failed to load organizer page links content:', err)
        error.value = 'Nepodařilo se načíst obsah stránky. Zkuste to prosím později.'
    } finally {
        isLoading.value = false
    }
}

</script>

<style scoped>
.links-hero-image {
    background-image: url('/images/20251012-brnow-154.webp');
    background-position: center 70%;
    background-size: cover;
}
</style>
