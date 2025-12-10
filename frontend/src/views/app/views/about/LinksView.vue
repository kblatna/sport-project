<template>
    <SectionWrapper>
        <LoadingSpinner v-if="isLoading" />
        <ErrorMessage
            v-else-if="error"
            :message="error"
        />
        <template v-else-if="!isLoading && !error && linksContent && linksContent.heroImage">
            <SectionHeader title="Ohlasy a odkazy" />

            <div class="container max-w-6xl mx-auto">
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
                        <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow">
                            <div class="flex items-center gap-3 mb-4">
                                <iconify-icon
                                    icon="mdi:television"
                                    :inline="true"
                                    class="text-primary text-3xl"
                                />
                                <h3 class="text-xl font-semibold text-gray-800">
                                    Mulda v televizi
                                </h3>
                            </div>
                            <div class="max-h-96 overflow-y-auto pr-2">
                                <component
                                    v-for="(item, index) in linksContent.tvItems"
                                    :key="index"
                                    :is="item.link ? 'a' : 'div'"
                                    :href="item.link || undefined"
                                    :target="item.link ? '_blank' : undefined"
                                    :rel="item.link ? 'noopener noreferrer' : undefined"
                                    class="flex items-center gap-3 p-3 rounded-lg transition-colors"
                                    :class="item.link ? 'hover:bg-gray-50 group cursor-pointer' : ''"
                                >
                                    <iconify-icon
                                        icon="mdi:play-circle"
                                        :inline="true"
                                        class="text-primary text-xl mt-0.5 flex-shrink-0"
                                    />
                                    <span
                                        class="text-gray-700 text-sm"
                                        :class="item.link ? 'group-hover:text-primary transition-colors' : ''"
                                    >{{ item.title }}</span>
                                    <iconify-icon
                                        v-if="item.link"
                                        icon="mdi:open-in-new"
                                        :inline="true"
                                        class="text-gray-400 text-sm ml-auto flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                    />
                                </component>
                            </div>
                        </div>

                        <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow">
                            <div class="flex items-center gap-3 mb-4">
                                <iconify-icon
                                    icon="mdi:youtube"
                                    :inline="true"
                                    class="text-primary text-3xl"
                                />
                                <h3 class="text-xl font-semibold text-gray-800">
                                    Videa na internetu
                                </h3>
                            </div>
                            <div class="max-h-96 overflow-y-auto pr-2">
                                <component
                                    v-for="(item, index) in linksContent.videoItems"
                                    :key="index"
                                    :is="item.link ? 'a' : 'div'"
                                    :href="item.link || undefined"
                                    :target="item.link ? '_blank' : undefined"
                                    :rel="item.link ? 'noopener noreferrer' : undefined"
                                    class="flex items-center gap-3 p-3 rounded-lg transition-colors"
                                    :class="item.link ? 'hover:bg-gray-50 group cursor-pointer' : ''"
                                >
                                    <iconify-icon
                                        icon="mdi:video"
                                        :inline="true"
                                        class="text-primary text-xl mt-0.5 flex-shrink-0"
                                    />
                                    <span
                                        class="text-gray-700 text-sm"
                                        :class="item.link ? 'group-hover:text-primary transition-colors' : ''"
                                    >{{ item.title }}</span>
                                    <iconify-icon
                                        v-if="item.link"
                                        icon="mdi:open-in-new"
                                        :inline="true"
                                        class="text-gray-400 text-sm ml-auto flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                    />
                                </component>
                            </div>
                        </div>

                        <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow">
                            <div class="flex items-center gap-3 mb-4">
                                <iconify-icon
                                    icon="mdi:newspaper-variant"
                                    :inline="true"
                                    class="text-primary text-3xl"
                                />
                                <h3 class="text-xl font-semibold text-gray-800">
                                    Články v tisku
                                </h3>
                            </div>
                            <div class="max-h-96 overflow-y-auto pr-2">
                                <component
                                    v-for="(item, index) in linksContent.pressItems"
                                    :key="index"
                                    :is="item.link ? 'a' : 'div'"
                                    :href="item.link || undefined"
                                    :target="item.link ? '_blank' : undefined"
                                    :rel="item.link ? 'noopener noreferrer' : undefined"
                                    class="flex items-center gap-3 p-3 rounded-lg transition-colors"
                                    :class="item.link ? 'hover:bg-gray-50 group cursor-pointer' : ''"
                                >
                                    <iconify-icon
                                        icon="mdi:file-document"
                                        :inline="true"
                                        class="text-primary text-xl mt-0.5 flex-shrink-0"
                                    />
                                    <span
                                        class="text-gray-700 text-sm"
                                        :class="item.link ? 'group-hover:text-primary transition-colors' : ''"
                                    >{{ item.title }}</span>
                                    <iconify-icon
                                        v-if="item.link"
                                        icon="mdi:open-in-new"
                                        :inline="true"
                                        class="text-gray-400 text-sm ml-auto flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                    />
                                </component>
                            </div>
                        </div>

                        <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow">
                            <div class="flex items-center gap-3 mb-4">
                                <iconify-icon
                                    icon="mdi:web"
                                    :inline="true"
                                    class="text-primary text-3xl"
                                />
                                <h3 class="text-xl font-semibold text-gray-800">
                                    Sesbíráno po internetu
                                </h3>
                            </div>
                            <div>
                                <component
                                    v-for="(item, index) in linksContent.webItems"
                                    :key="index"
                                    :is="item.link ? 'a' : 'div'"
                                    :href="item.link || undefined"
                                    :target="item.link ? '_blank' : undefined"
                                    :rel="item.link ? 'noopener noreferrer' : undefined"
                                    class="flex items-center gap-3 p-3 rounded-lg transition-colors"
                                    :class="item.link ? 'hover:bg-gray-50 group cursor-pointer' : ''"
                                >
                                    <iconify-icon
                                        icon="mdi:link"
                                        :inline="true"
                                        class="text-primary text-xl mt-0.5 flex-shrink-0"
                                    />
                                    <span
                                        class="text-gray-700 text-sm"
                                        :class="item.link ? 'group-hover:text-primary transition-colors' : ''"
                                    >{{ item.title }}</span>
                                    <iconify-icon
                                        v-if="item.link"
                                        icon="mdi:open-in-new"
                                        :inline="true"
                                        class="text-gray-400 text-sm ml-auto flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                    />
                                </component>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>

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
            <div class="mt-8 bg-primary-50  border-primary rounded-lg p-6">
                <div class="flex items-center gap-4">
                    <iconify-icon
                        icon="mdi:information"
                        :inline="true"
                        class="text-primary text-2xl flex-shrink-0 mt-1"
                    />
                    <p class="text-gray-700">
                        Máte-li nápad, co dalšího sem přidat, dejte nám vědět prostřednictvím kontaktního
                        <router-link :to="{ name: 'Contact' }">
                            <span class="font-bold hover:underline"> formuláře</span>
                        </router-link>.
                    </p>
                </div>
            </div>
        </div>
    </SectionWrapper>
</template>

<script setup lang="ts">

import ErrorMessage from '@/components/ErrorMessage.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import SectionHeader from '@/components/SectionHeader.vue'
import SectionWrapper from '@/components/SectionWrapper.vue'
import { ref, onMounted } from 'vue'
import { linksPageContent } from '@/services/api/services'

const linksContent = ref<any | null>(null) // TODO: doplnit interface
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
