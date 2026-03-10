<template>
    <LoadingSpinner v-if="isLoading" />

    <template v-else-if="currentContent && content.commonSections">
        <component
            :is="variant === 'kids' ? KidsInfo : AdultsInfo"
            :content="currentContent"
        />

        <SectionWrapper
            padding-y="md"
            background="gray"
        >
            <div class="container">
                <SectionHeader
                    :title="content.commonSections.washing.title"
                    :show-divider="false"
                />
                <ContentImageCard
                    :image-src="content.commonSections.washing.imageSrc"
                    :image-width="content.commonSections.washing.imageWidth"
                    :image-height="content.commonSections.washing.imageHeight"
                    :image-position="content.commonSections.washing.imagePosition"
                >
                    <template #default>
                        <div class="space-y-4">
                            <p
                                v-for="(paragraph, index) in content.commonSections.washing.content"
                                :key="index"
                            >
                                {{ paragraph }}
                            </p>
                        </div>
                    </template>
                </ContentImageCard>
            </div>
        </SectionWrapper>

        <SectionWrapper
            padding-y="md"
            class="container"
        >
            <SectionHeader
                :title="content.commonSections.parking.title"
                :show-divider="false"
            />
            <SafeHtml :content="content.commonSections.parking.content" />
        </SectionWrapper>

        <SectionWrapper
            padding-y="md"
            background="gray"
        >
            <div class="container">
                <SectionHeader
                    :title="content.commonSections.bikeService.title"
                    :show-divider="false"
                />
                <ContentImageCard
                    :image-src="content.commonSections.bikeService.imageSrc"
                    :image-position="content.commonSections.bikeService.imagePosition"
                    image-object-position="bottom"
                >
                    <template #default>
                        <p>{{ content.commonSections.bikeService.content }}</p>
                    </template>
                </ContentImageCard>
            </div>
        </SectionWrapper>
    </template>

    <ErrorMessage
        v-else-if="error"
        :message="error"
    />
</template>

<script setup lang="ts">
import ErrorMessage from '@/components/ErrorMessage.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import SafeHtml from '@/components/SafeHtml.vue'
import SectionHeader from '@/components/SectionHeader.vue'
import SectionWrapper from '@/components/SectionWrapper.vue'
import { useNotifier } from '@/composables/useNotifier'
import type { InfoPageContent } from '@/interface/InfoPageContent'
import { infoPageContent } from '@/services/api/services'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import AdultsInfo from './components/AdultsInfo.vue'
import ContentImageCard from './components/ContentImageCard.vue'
import KidsInfo from './components/KidsInfo.vue'

const route = useRoute()
const notifier = useNotifier()
const content = ref<InfoPageContent | null>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)

// Determines which variant to display based on hash fragment (#kids or #adults)
const variant = computed<'kids' | 'adults'>(() => {
    const hash = route.hash.replace('#', '')
    return hash === 'kids' ? 'kids' : 'adults'
})

// Returns data for current variant
const currentContent = computed(() => {
    if (!content.value) {
        return null
    }
    return content.value[variant.value]
})

async function fetchContent() {
    isLoading.value = true
    error.value = null
    try {
        const response = await infoPageContent.getAll()
        content.value = response
    } catch (err) {
        console.error('Error loading info page content:', err)
        notifier.error('Nepodařilo se načíst obsah stránky')
    } finally {
        isLoading.value = false
    }
}

onMounted(async () => {
    await fetchContent()
})
</script>
