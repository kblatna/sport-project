<template>
    <div class="panel p-5 md:p-6">
        <div class="flex items-center gap-3 mb-4">
            <iconify-icon
                :icon="icon"
                :inline="true"
                class="text-primary-500 text-2xl"
            />
            <h3 class="text-lg font-semibold text-ink">
                {{ title }}
            </h3>
        </div>

        <div :class="[maxHeight, 'overflow-y-auto pr-1']">
            <component
                v-for="(item, index) in items"
                :key="index"
                :is="item.link ? 'a' : 'div'"
                :href="item.link || undefined"
                :target="item.link ? '_blank' : undefined"
                :rel="item.link ? 'noopener noreferrer' : undefined"
                class="flex items-center gap-3 p-3 rounded-lg transition-colors"
                :class="item.link ? 'hover:bg-surface-muted group cursor-pointer' : ''"
            >
                <iconify-icon
                    :icon="itemIcon"
                    :inline="true"
                    class="text-primary-500 text-xl mt-0.5 flex-shrink-0"
                />
                <span
                    class="text-ink/80 text-sm"
                    :class="item.link ? 'group-hover:text-primary-600 transition-colors' : ''"
                >
                    {{ item.title }}
                </span>
                <iconify-icon
                    v-if="item.link"
                    icon="mdi:open-in-new"
                    :inline="true"
                    class="text-ink/30 text-sm ml-auto flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
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
