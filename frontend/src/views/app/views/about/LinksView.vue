<template>
    <SectionWrapper class="container">
        <LoadingSpinner v-if="isLoading" />

        <template v-else-if="linksContent && linksContent.heroImage">
            <SectionHeader :title="linksContent.titles.main" />

            <div
                class="links-hero-image mb-12 rounded-xl overflow-hidden h-64 md:h-96 shadow-lg bg-cover bg-center"
                :style="`background-image: url('${linksContent.heroImage}'); background-position: center 70%; background-size: cover;`"
            ></div>

            <div
                v-if="linksContent"
                class="mb-16"
            >
                <SectionTitle
                    :icon="'mdi:television-classic'"
                    :title="linksContent.titles.sectionOhlasy"
                />

                <div class="grid md:grid-cols-2 gap-6">
                    <MediaListCard
                        icon="mdi:television"
                        :title="linksContent.titles.tv"
                        :items="linksContent.tvItems"
                        item-icon="mdi:play-circle"
                    />

                    <MediaListCard
                        icon="mdi:youtube"
                        :title="linksContent.titles.videos"
                        :items="linksContent.videoItems"
                        item-icon="mdi:video"
                    />

                    <MediaListCard
                        icon="mdi:newspaper-variant"
                        :title="linksContent.titles.press"
                        :items="linksContent.pressItems"
                        item-icon="mdi:file-document"
                    />

                    <MediaListCard
                        icon="mdi:web"
                        :title="linksContent.titles.web"
                        :items="linksContent.webItems"
                        item-icon="mdi:link"
                    />
                </div>
            </div>

            <div v-if="linksContent && linksContent.links">
                <SectionTitle
                    :icon="'mdi:link-variant'"
                    :title="linksContent.titles.links"
                />
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <LinkCard
                        v-for="(link, index) in linksContent.links"
                        :key="index"
                        :entry="link"
                    />
                </div>
                <InfoBox
                    v-if="linksContent.contactBox"
                    :message="linksContent.contactBox.message"
                    :icon="linksContent.contactBox.icon"
                    :cta-text="linksContent.contactBox.ctaText"
                    :cta-route-name="linksContent.contactBox.ctaRouteName"
                    bg-class="bg-primary-50"
                    border-class="border-primary"
                    icon-class="text-primary text-2xl"
                    class="mt-8"
                />
            </div>
        </template>

        <ErrorMessage
            v-else-if="error"
            :message="error"
        />
    </SectionWrapper>
</template>

<script setup lang="ts">
import ErrorMessage from '@/components/ErrorMessage.vue'
import InfoBox from '@/components/InfoBox.vue'
import LinkCard from '@/components/LinkCard.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import MediaListCard from '@/components/MediaListCard.vue'
import SectionHeader from '@/components/SectionHeader.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import SectionWrapper from '@/components/SectionWrapper.vue'
import { useNotifier } from '@/composables/useNotifier'
import type { LinksPageContent } from '@/interface/LinksPageContent.interface'
import { linksPageContent } from '@/services/api/services'
import { onMounted, ref } from 'vue'

const notifier = useNotifier()

const linksContent = ref<LinksPageContent | null>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)

onMounted(async () => {
    await loadlinksContentData()
})

async function loadlinksContentData(): Promise<void> {
    isLoading.value = true
    error.value = null
    try {
        const response = await linksPageContent.getAll()
        linksContent.value = response || null
    } catch (err) {
        console.error('Failed to load organizer page links content:', err)
        error.value = 'Nepodařilo se načíst obsah stránky'
        notifier.error('Nepodařilo se načíst obsah stránky')
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
