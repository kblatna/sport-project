<template>
    <LoadingSpinner v-if="isLoading" />

    <ErrorMessage
        v-else-if="error"
        :message="error"
    />

    <div v-else-if="pageContent">
        <section
            v-if="pageContent.hero"
            class="relative h-[50vh] md:h-[65vh]"
        >
            <div
                class="absolute inset-0 bg-cover bg-start"
                :style="{
                    backgroundImage: `linear-gradient(to left, rgba(245,246,252,0.52), rgba(0,0,0,0.73)), url(${pageContent.hero.backgroundImage})`
                }"
            ></div>

            <div class="relative z-10 flex items-center h-full">
                <div class="container">
                    <div class="max-w-2xl text-white">
                        <h1 class="text-3xl md:text-5xl font-extrabold mb-10">
                            {{ pageContent.hero.title }}
                        </h1>

                        <p
                            class="text-lg md:text-2xl leading-snug mb-8"
                            v-html="pageContent.hero.subtitle"
                        ></p>

                        <div class="flex flex-wrap gap-4">
                            <Button
                                v-for="button in pageContent.hero.buttons || []"
                                :key="button.label"
                                :to="{ name: button.link }"
                                router-link
                                :class="{
                                    'border-2 border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-primary-700 transition-all duration-300': button.variant === 'secondary',
                                    'bg-white text-primary-700 px-6 py-3 rounded-lg hover:bg-primary-50 transition-all duration-300 font-semibold': button.variant === 'primary'
                                }"
                                :label="button.label"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <SectionWrapper
            v-if="pageContent.raceCards && pageContent.raceCards.length > 0"
            background="white"
        >
            <div class="container">
                <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 justify-items-center">
                    <Card
                        v-for="card in pageContent.raceCards"
                        :key="card.title"
                        class="equal-card w-full max-w-sm flex flex-col h-full"
                    >
                        <template #header>
                            <div class="relative">
                                <Image
                                    :src="card.image"
                                    :alt="card.title"
                                    image-class="rounded-t-xl"
                                />
                                <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6">
                                    <h3 class="text-2xl font-bold text-white">
                                        {{ card.title }}
                                    </h3>
                                </div>
                            </div>
                        </template>

                        <template #subtitle>
                            {{ card.subtitle }}
                        </template>

                        <template #content>
                            <p
                                class="m-0"
                                v-html="card.description"
                            ></p>
                        </template>

                        <template #footer>
                            <div class="flex gap-4 mt-auto pt-4">
                                <Button
                                    v-for="button in card.buttons || []"
                                    :key="button.label"
                                    :label="button.label"
                                    :variant="button.variant"
                                    class="w-full"
                                />
                            </div>
                        </template>
                    </Card>
                </div>
            </div>
        </SectionWrapper>

        <SectionWrapper
            v-if="pageContent.info"
            background="gray"
        >
            <div class="container">
                <div class="max-w-4xl mx-auto text-center">
                    <p class="uppercase tracking-widest text-sm text-slate-500">
                        {{ pageContent.info.overtitle }}
                    </p>
                    <h3 class="text-4xl md:text-5xl font-bold mt-3">
                        {{ pageContent.info.title }}
                    </h3>

                    <div class="w-20 h-1 bg-primary-500 rounded mx-auto mt-6"></div>

                    <ul class="grid md:grid-cols-2 gap-y-4 gap-x-10 text-left mt-14 text-lg">
                        <li
                            v-for="feature in pageContent.info.features || []"
                            :key="feature"
                            class="flex items-start gap-3"
                        >
                            <svg
                                class="w-6 h-6 text-primary-500 flex-shrink-0 mt-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                            <span v-html="feature"></span>
                        </li>
                    </ul>
                </div>
            </div>
        </SectionWrapper>

        <SectionWrapper
            v-if="pageContent.gallery && pageContent.gallery.length > 0"
            background="white"
        >
            <div class="container">
                <Galleria
                    v-model:active-index="activeIndex"
                    v-model:visible="displayCustom"
                    :value="pageContent.gallery"
                    :num-visible="7"
                    :circular="true"
                    :full-screen="true"
                    :show-item-navigators="true"
                    :show-thumbnails="false"
                    class="max-w-50"
                >
                    <template #item="slotProps">
                        <Image
                            :src="slotProps.item.src"
                            :alt="slotProps.item.alt"
                            image-class="block w-full rounded-md"
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

                <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
                    <div
                        v-for="(image, index) of pageContent.gallery"
                        :key="index"
                    >
                        <Image
                            :src="image.src"
                            :alt="image.alt"
                            image-class="w-full rounded-md cursor-pointer"
                            @click="imageClick(index)"
                        />
                    </div>
                </div>
            </div>
        </SectionWrapper>

        <SectionWrapper
            v-if="pageContent.schedule"
            background="gray"
        >
            <div class="container">
                <div class="max-w-4xl mx-auto text-center mb-16">
                    <h2 class="text-4xl md:text-5xl font-bold text-gray-900">
                        {{ pageContent.schedule.title }}
                    </h2>

                    <div class="w-20 h-1 bg-primary-500 rounded mx-auto mt-6 mb-10"></div>

                    <div class="space-y-4 text-lg text-gray-700">
                        <p
                            v-for="(paragraph, index) in pageContent.schedule.description"
                            :key="index"
                            v-html="paragraph"
                        ></p>
                    </div>
                </div>

                <div class="max-w-6xl mx-auto">
                    <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 md:p-10 border border-gray-100">
                        <h3 class="text-2xl md:text-3xl font-semibold mb-8 text-center text-primary-700">
                            {{ pageContent.schedule.tableTitle }}
                        </h3>
                        <div class="overflow-x-auto -mx-6 md:-mx-10 px-6 md:px-10">
                            <ScheduleDataTable :schedule-data="pageContent.schedule.scheduleTable" />
                        </div>

                        <div class="pt-8">
                            <h4 class="text-lg font-semibold mb-4 text-gray-800">
                                Vysvětlivky:
                            </h4>
                            <dl class="space-y-3 text-sm md:text-base text-gray-700">
                                <div
                                    v-for="item in pageContent.schedule.legend"
                                    :key="item.term"
                                >
                                    <dt class="font-semibold inline">
                                        {{ item.term }}
                                    </dt>
                                    <dd
                                        class="inline"
                                        v-html="item.definition"
                                    ></dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>

        <SectionWrapper
            v-if="pageContent.video"
            background="white"
        >
            <div class="container">
                <div class="max-w-4xl mx-auto text-center">
                    <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        {{ pageContent.video.title }}
                    </h2>

                    <div class="w-20 h-1 bg-primary-500 rounded mx-auto mb-12"></div>

                    <div class="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg">
                        <iframe
                            class="absolute inset-0 w-full h-full"
                            :src="pageContent.video.videoUrl"
                            :title="pageContent.video.title"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin"
                            allowfullscreen
                        ></iframe>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    </div>
</template>

<script lang="ts" setup>
import SectionWrapper from '@/components/SectionWrapper.vue'
import type { MainPageContent } from '@/interface/MainPageContent.interface'
import { mainPageContent } from '@/services/api/services'
import { Button, Card, Galleria, Image } from 'primevue'
import { onMounted, ref } from 'vue'
import ScheduleDataTable from './components/ScheduleDataTable.vue'

const pageContent = ref<MainPageContent | null>(null)
const activeIndex = ref<number>(0)
const displayCustom = ref<boolean>(false)
const isLoading = ref<boolean>(false)
const error = ref<string>('')

onMounted(async () => {
    await loadContentData()
})

const imageClick = (index: number) => {
    activeIndex.value = index
    displayCustom.value = true
}

async function loadContentData(): Promise<void> {
    isLoading.value = true
    try {
        const response = await mainPageContent.getAll()
        pageContent.value = response || null
    } catch (err) {
        console.error('Error fetching page content:', err)
        // TODO: doplnit komponentu na error notifier
        error.value = 'Došlo k chybě při načítání obsahu stránky. Zkuste to prosím později.'
    } finally {
        isLoading.value = false
    }
}
</script>

<style>
.mask {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
}

.equal-card .p-card-body {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.equal-card .p-card-content {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.equal-card .p-card-footer {
    margin-top: auto;
}

</style>
