<template>
    <LoadingSpinner v-if="isLoading" />

    <div
        v-else-if="pageContent"
    >
        <BannerHero
            v-if="pageContent.hero"
            :image="pageContent.hero.backgroundImage"
            :title="pageContent.hero.title"
            :overlay="true"
        >
            <template #subtitle>
                <SafeHtml
                    :content="pageContent.hero.subtitle"
                    tag="span"
                />
            </template>

            <template #actions>
                <router-link
                    v-for="button in pageContent.hero.buttons || []"
                    :key="button.label"
                    :to="{ name: button.link, hash: button.hash ? `#${button.hash}` : undefined }"
                    class="inline-block"
                >
                    <Button
                        :severity="button.severity === 'secondary' ? 'secondary' : 'primary'"
                        :outlined="button.severity === 'secondary'"
                        :label="button.label"
                        :class="button.severity === 'secondary' ? '' : 'bg-accent-500 border-accent-500 hover:bg-accent-600'"
                        class="px-6 py-3 text-base"
                    />
                </router-link>
            </template>
        </BannerHero>

        <SectionWrapper
            v-if="pageContent.raceCards && pageContent.raceCards.length > 0"
            background="white"
        >
            <SectionHeader
                :title="pageContent.raceSectionTitle"
                :show-divider="false"
            />

            <div class="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-5xl mx-auto">
                <article
                    v-for="card in pageContent.raceCards"
                    :key="card.title"
                    class="panel overflow-hidden flex flex-col h-full"
                >
                    <div class="relative aspect-[16/10] overflow-hidden bg-surface-muted">
                        <Image
                            :src="card.image"
                            :alt="card.title"
                            image-class="w-full h-full object-cover"
                        />
                    </div>

                    <div class="p-5 md:p-6 flex flex-col flex-1">
                        <h3 class="text-xl md:text-2xl font-bold text-ink mb-1">
                            {{ card.title }}
                        </h3>
                        <p class="text-sm font-medium text-primary-500 mb-3">
                            {{ card.subtitle }}
                        </p>
                        <SafeHtml
                            :content="card.description"
                            tag="p"
                            class="m-0 text-ink/70 text-[15px] leading-relaxed flex-1"
                        />
                        <div class="flex flex-wrap gap-3 mt-5 pt-1">
                            <router-link
                                v-for="button in card.buttons || []"
                                :key="button.label"
                                :to="{ name: button.link, hash: button.hash ? `#${button.hash}` : undefined }"
                                class="flex-1 min-w-[8rem]"
                            >
                                <Button
                                    :severity="button.severity"
                                    :label="button.label"
                                    class="w-full"
                                    :class="button.severity === 'primary' ? 'bg-accent-500 border-accent-500 hover:bg-accent-600' : ''"
                                />
                            </router-link>
                        </div>
                    </div>
                </article>
            </div>
        </SectionWrapper>

        <SectionWrapper
            v-if="pageContent.info"
            background="muted"
        >
            <SectionHeader
                :title="pageContent.info.title"
                :overtitle="pageContent.info.overtitle"
            />

            <ul class="max-w-4xl mx-auto grid md:grid-cols-2 gap-y-3 gap-x-8 text-left">
                <li
                    v-for="feature in pageContent.info.features || []"
                    :key="feature"
                    class="flex items-start gap-3 text-[15px] md:text-base text-ink/80"
                >
                    <span
                        class="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0"
                        aria-hidden="true"
                    ></span>
                    <SafeHtml
                        :content="feature"
                        tag="span"
                    />
                </li>
            </ul>
        </SectionWrapper>

        <SectionWrapper
            v-if="pageContent.gallery && pageContent.gallery.length > 0"
            background="white"
        >
            <Galleria
                v-model:active-index="activeIndex"
                v-model:visible="displayCustom"
                :value="pageContent.gallery"
                :num-visible="7"
                :circular="true"
                :full-screen="true"
                :show-item-navigators="true"
                :show-thumbnails="false"
            >
                <template #item="slotProps">
                    <Image
                        :src="slotProps.item.src"
                        :alt="slotProps.item.alt"
                        image-class="block w-full rounded-xl"
                    />
                </template>
                <template #thumbnail="slotProps">
                    <Image
                        :src="slotProps.item.src"
                        :alt="slotProps.item.alt"
                        image-class="block w-full rounded-md"
                    />
                </template>
            </Galleria>

            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                <button
                    v-for="(image, index) of pageContent.gallery"
                    :key="index"
                    type="button"
                    class="block w-full overflow-hidden rounded-xl border border-surface-line focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
                    @click="imageClick(index)"
                >
                    <Image
                        :src="image.src"
                        :alt="image.alt"
                        image-class="w-full aspect-[4/3] object-cover"
                    />
                </button>
            </div>
        </SectionWrapper>

        <SectionWrapper
            v-if="pageContent.schedule"
            background="muted"
        >
            <SectionHeader :title="pageContent.schedule.title">
                <div class="space-y-3 text-[15px] md:text-base text-ink/70">
                    <SafeHtml
                        v-for="(paragraph, index) in pageContent.schedule.description"
                        :key="index"
                        :content="paragraph"
                        tag="p"
                    />
                </div>
            </SectionHeader>

            <div class="panel p-5 md:p-8 max-w-5xl mx-auto">
                <h3 class="text-lg md:text-xl font-semibold mb-6 text-ink">
                    {{ pageContent.schedule.tableTitle }}
                </h3>
                <div class="overflow-x-auto">
                    <ScheduleDataTable :schedule-data="pageContent.schedule.scheduleTable" />
                </div>

                <div class="pt-8 mt-2 border-t border-surface-line">
                    <h4 class="text-base font-semibold mb-3 text-ink">
                        {{ pageContent.schedule.legendTitle }}
                    </h4>
                    <dl class="space-y-2 text-sm md:text-[15px] text-ink/70">
                        <div
                            v-for="item in pageContent.schedule.legend"
                            :key="item.term"
                        >
                            <dt class="inline font-semibold text-ink">
                                {{ item.term }}
                            </dt>
                            <SafeHtml
                                :content="item.definition"
                                tag="dd"
                                class="inline"
                            />
                        </div>
                    </dl>
                </div>
            </div>
        </SectionWrapper>

        <SectionWrapper
            v-if="pageContent.video"
            background="white"
        >
            <SectionHeader :title="pageContent.video.title" />

            <div class="max-w-4xl mx-auto">
                <div class="relative w-full aspect-video rounded-2xl overflow-hidden border border-surface-line">
                    <iframe
                        class="absolute inset-0 w-full h-full"
                        :src="pageContent.video.videoUrl"
                        :title="pageContent.video.title"
                        frameborder="0"
                        referrerpolicy="strict-origin-when-cross-origin"
                        allowfullscreen
                    ></iframe>
                </div>
            </div>
        </SectionWrapper>
    </div>

    <ErrorMessage
        v-else-if="error"
        :message="error"
    />
</template>

<script lang="ts" setup>
import BannerHero from '@/components/BannerHero.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import SafeHtml from '@/components/SafeHtml.vue'
import SectionHeader from '@/components/SectionHeader.vue'
import SectionWrapper from '@/components/SectionWrapper.vue'
import { useNotifier } from '@/composables/useNotifier'
import type { MainPageContent } from '@/interface/MainPageContent.interface'
import { mainPageContent } from '@/services/api/services'
import { Button, Galleria, Image } from 'primevue'
import { onMounted, ref } from 'vue'
import ScheduleDataTable from './components/ScheduleDataTable.vue'

const notifier = useNotifier()

const pageContent = ref<MainPageContent | null>(null)
const activeIndex = ref(0)
const displayCustom = ref(false)
const isLoading = ref(false)
const error = ref<string | null>(null)

onMounted(async () => {
    await loadContentData()
})

const imageClick = (index: number) => {
    activeIndex.value = index
    displayCustom.value = true
}

async function loadContentData(): Promise<void> {
    isLoading.value = true
    error.value = null
    try {
        const response = await mainPageContent.getAll()
        pageContent.value = response || null
    } catch (err) {
        console.error('Error fetching page content:', err)
        error.value = 'Nepodařilo se načíst obsah stránky'
        notifier.error('Nepodařilo se načíst obsah stránky')
    } finally {
        isLoading.value = false
    }
}
</script>
