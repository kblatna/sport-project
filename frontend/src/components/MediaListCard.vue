<template>
    <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow">
        <div class="flex items-center gap-3 mb-4">
            <iconify-icon
                :icon="icon"
                :inline="true"
                class="text-primary text-3xl"
            />
            <h3 class="text-xl font-semibold text-gray-800">
                {{ title }}
            </h3>
        </div>

        <div :class="[maxHeight, 'overflow-y-auto pr-2']">
            <component
                v-for="(item, index) in items"
                :key="index"
                :is="item.link ? 'a' : 'div'"
                :href="item.link || undefined"
                :target="item.link ? '_blank' : undefined"
                :rel="item.link ? 'noopener noreferrer' : undefined"
                class="flex items-center gap-3 p-3 rounded-lg transition-colors"
                :class="item.link ? 'hover:bg-gray-50 group cursor-pointer' : ''"
            >
                <iconify-icon
                    :icon="itemIcon"
                    :inline="true"
                    class="text-primary text-xl mt-0.5 flex-shrink-0"
                />
                <span
                    class="text-gray-700 text-sm"
                    :class="item.link ? 'group-hover:text-primary transition-colors' : ''"
                >
                    {{ item.title }}
                </span>
                <iconify-icon
                    v-if="item.link"
                    icon="mdi:open-in-new"
                    :inline="true"
                    class="text-gray-400 text-sm ml-auto flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                />
            </component>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { MediaItem } from '@/interface/LinksPageContent.interface'

withDefaults(defineProps<{
    icon: string
    title: string
    items: MediaItem[]
    itemIcon?: string
    maxHeight?: string
}>(), {
    itemIcon: 'mdi:play-circle',
    maxHeight: 'max-h-64'
})

</script>
