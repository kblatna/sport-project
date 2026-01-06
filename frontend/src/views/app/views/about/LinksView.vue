<template>
    <SectionWrapper class="container">
        <LoadingSpinner v-if="isLoading" />
        <ErrorMessage
            v-else-if="error"
            :message="error"
        />
        <template v-else-if="!isLoading && !error && linksContent && linksContent.heroImage">
            <SectionHeader :title="linksContent?.titles?.main ?? 'Ohlasy a odkazy'" />

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
                    :title="linksContent?.titles?.sectionOhlasy ?? 'Ohlasy'"
                />

                <div class="grid md:grid-cols-2 gap-6">
                    <MediaListCard
                        icon="mdi:television"
                        :title="linksContent?.titles?.tv ?? 'Mulda v televizi'"
                        :items="linksContent.tvItems"
                        item-icon="mdi:play-circle"
                    />

                    <MediaListCard
                        icon="mdi:youtube"
                        :title="linksContent?.titles?.videos ?? 'Videa na internetu'"
                        :items="linksContent.videoItems"
                        item-icon="mdi:video"
                    />

                    <MediaListCard
                        icon="mdi:newspaper-variant"
                        :title="linksContent?.titles?.press ?? 'Články v tisku'"
                        :items="linksContent.pressItems"
                        item-icon="mdi:file-document"
                    />

                    <MediaListCard
                        icon="mdi:web"
                        :title="linksContent?.titles?.web ?? 'Sesbíráno po internetu'"
                        :items="linksContent.webItems"
                        item-icon="mdi:link"
                    />
                </div>
            </div>

            <div v-if="linksContent && linksContent.links">
                <SectionTitle
                    :icon="'mdi:link-variant'"
                    :title="linksContent?.titles?.links ?? 'Užitečné odkazy'"
                />
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <LinkCard
                        v-for="(link, index) in linksContent.links"
                        :key="index"
                        :entry="link"
                    />
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
import LinkCard from '@/components/LinkCard.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import MediaListCard from '@/components/MediaListCard.vue'
import SectionHeader from '@/components/SectionHeader.vue'
import SectionTitle from '@/components/SectionTitle.vue'
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
