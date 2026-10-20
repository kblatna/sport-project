<template>
    <LoadingSpinner v-if="isLoading" />

    <template v-else-if="currentContent && content.commonSections">
        <SectionWrapper
            background="white"
            padding-y="sm"
        >
            <div class="flex flex-col items-center text-center gap-4 pt-2">
                <h1 class="text-2xl md:text-3xl font-bold text-ink tracking-tight">
                    Informace o závodě
                </h1>
                <div
                    class="inline-flex p-1 bg-surface-muted border border-surface-line rounded-full gap-1"
                    role="tablist"
                    aria-label="Typ závodu"
                >
                    <router-link
                        :to="{ name: 'Info', hash: '#adults' }"
                        role="tab"
                        :aria-selected="variant === 'adults'"
                        class="px-4 py-2 rounded-full text-sm font-semibold transition-colors"
                        :class="variant === 'adults' ? 'bg-ink text-white' : 'text-ink/60 hover:text-ink'"
                    >
                        Mulda
                    </router-link>
                    <router-link
                        :to="{ name: 'Info', hash: '#kids' }"
                        role="tab"
                        :aria-selected="variant === 'kids'"
                        class="px-4 py-2 rounded-full text-sm font-semibold transition-colors"
                        :class="variant === 'kids' ? 'bg-ink text-white' : 'text-ink/60 hover:text-ink'"
                    >
                        Muldička
                    </router-link>
                </div>
            </div>
        </SectionWrapper>

        <component
            :is="variant === 'kids' ? KidsInfo : AdultsInfo"
            :content="currentContent"
        />

        <SectionWrapper
            padding-y="md"
            background="muted"
        >
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
                    <div class="space-y-4 text-ink/80">
                        <p
                            v-for="(paragraph, index) in content.commonSections.washing.content"
                            :key="index"
                        >
                            {{ paragraph }}
                        </p>
                    </div>
                </template>
            </ContentImageCard>
        </SectionWrapper>

        <SectionWrapper
            padding-y="md"
            background="white"
        >
            <SectionHeader
                :title="content.commonSections.parking.title"
                :show-divider="false"
            />
            <SafeHtml
                :content="content.commonSections.parking.content"
                class="text-ink/80 max-w-3xl mx-auto"
            />
        </SectionWrapper>

        <SectionWrapper
            padding-y="md"
            background="muted"
        >
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
                    <p class="text-ink/80">
                        {{ content.commonSections.bikeService.content }}
                    </p>
                </template>
            </ContentImageCard>
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

const variant = computed<'kids' | 'adults'>(() => {
    const hash = route.hash.replace('#', '')
    return hash === 'kids' ? 'kids' : 'adults'
})

const currentContent = computed(() => {
    if (!content.value) {
        return null
    }
    return content.value[variant.value]
})

async function loadContentData() {
    isLoading.value = true
    error.value = null
    try {
        const response = await infoPageContent.getAll()
        content.value = response
    } catch (err) {
        console.error('Error loading info page content:', err)
        error.value = 'Nepodařilo se načíst obsah stránky'
        notifier.error('Nepodařilo se načíst obsah stránky')
    } finally {
        isLoading.value = false
    }
}

onMounted(async () => {
    await loadContentData()
})
</script>
