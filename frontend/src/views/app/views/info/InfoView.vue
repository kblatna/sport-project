<template>
    <LoadingSpinner v-if="loading" />

    <template v-if="currentContent && content.commonSections">
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
                >
                    <template #default>
                        <p>{{ content.commonSections.bikeService.content }}</p>
                    </template>
                </ContentImageCard>
            </div>
        </SectionWrapper>
    </template>

    <ErrorMessage
        v-if="error"
        :message="error.message"
    />
</template>

<script setup lang="ts">
import ErrorMessage from '@/components/ErrorMessage.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import SafeHtml from '@/components/SafeHtml.vue'
import SectionHeader from '@/components/SectionHeader.vue'
import SectionWrapper from '@/components/SectionWrapper.vue'
import { useInfoPageContent } from '@/composables/useInfoPageContent'
import { onMounted } from 'vue'
import AdultsInfo from './components/AdultsInfo.vue'
import ContentImageCard from './components/ContentImageCard.vue'
import KidsInfo from './components/KidsInfo.vue'

const { content, currentContent, variant, loading, error, fetchContent } = useInfoPageContent()

onMounted(async () => {
    await fetchContent()
})
</script>
