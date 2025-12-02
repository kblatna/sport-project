<template>
    <div
        v-if="isLoading"
        class="min-h-screen flex items-center justify-center"
    >
        <div class="text-center">
            <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-500 mx-auto"></div>
            <p class="mt-4 text-gray-600">
                Načítání obsahu...
            </p>
        </div>
    </div>

    <div
        v-else-if="error"
        class="min-h-screen flex items-center justify-center"
    >
        <div class="text-center">
            <p class="text-red-600">
                {{ error }}
            </p>
        </div>
    </div>

    <div v-else-if="pageContent">
        <section
            v-if="pageContent.hero"
            class="relative h-[65vh]"
        >
            <div
                class="absolute inset-0 bg-cover bg-start"
                :style="{
                    backgroundImage: `linear-gradient(to left, rgba(245,246,252,0.52), rgba(0,0,0,0.73)), url(${pageContent.hero.backgroundImage})`
                }"
            ></div>

            <div class="absolute inset-0 bg-black/20"></div>

            <div class="relative z-10 flex items-center h-full">
                <div class="container">
                    <div class="max-w-2xl text-white">
                        <h1 class="text-4xl md:text-6xl font-extrabold mb-10">
                            {{ pageContent.hero.title }}
                        </h1>

                        <p
                            class="text-lg md:text-2xl leading-snug mb-8"
                            v-html="pageContent.hero.subtitle"
                        ></p>

                        <div class="flex gap-5">
                            <Button
                                v-for="button in pageContent.hero.buttons || []"
                                :key="button.label"
                                :to="{ name: button.link }"
                                router-link
                                :class="{
                                    'border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-black transition': button.variant === 'secondary',
                                    'bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition': button.variant === 'primary'
                                }"
                                :label="button.label"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section
            v-if="pageContent.raceCards && pageContent.raceCards.length > 0"
            class="my-20"
        >
            <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 justify-items-center">
                <Card
                    v-for="card in pageContent.raceCards"
                    :key="card.title"
                    class="equal-card w-full max-w-sm flex flex-col h-full"
                >
                    <template #header>
                        <Image
                            :src="card.image"
                            :alt="card.title"
                            image-class="rounded-t-xl"
                        />
                    </template>

                    <template #title>
                        {{ card.title }}
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
        </section>

        <section
            v-if="pageContent.info"
            class="my-20 py-20 px-5 bg-gradient-to-b from-slate-50 to-slate-100"
        >
            <div class="max-w-4xl mx-auto text-center">
                <p class="uppercase tracking-widest text-sm text-slate-500">
                    {{ pageContent.info.overtitle }}
                </p>
                <h3 class="text-4xl md:text-5xl font-bold mt-3">
                    {{ pageContent.info.title }}
                </h3>

                <div class="w-20 h-1 bg-teal-500 rounded mx-auto mt-6"></div>

                <ul class="grid md:grid-cols-2 gap-y-3 gap-x-10 text-center md:text-left mt-14 text-lg">
                    <li
                        v-for="feature in pageContent.info.features || []"
                        :key="feature"
                        v-html="feature"
                    ></li>
                </ul>
            </div>
        </section>

        <section
            v-if="pageContent.gallery && pageContent.gallery.length > 0"
            class="my-20"
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
                            image-class="block w-full rounded-md w-full"
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

                <div class="grid grid-cols-12 gap-4 w-full">
                    <div
                        v-for="(image, index) of pageContent.gallery"
                        :key="index"
                        class="col-span-12 sm:col-span-6 lg:col-span-3"
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
        </section>
    </div>

    <div
        v-else
        class="min-h-screen flex items-center justify-center"
    >
        <div class="text-center">
            <p class="text-gray-600">
                Obsah stránky nebyl nalezen.
            </p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { MainPageContent } from '@/interface/MainPageContent.interface'
import { mainPageContent } from '@/services/api/services'
import { Button, Card, Galleria, Image } from 'primevue'
import { onMounted, ref } from 'vue'

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
        console.log('Fetched page content:', response)
        pageContent.value = response || null
    } catch (err) {
        console.error('Error fetching page content:', err)
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
