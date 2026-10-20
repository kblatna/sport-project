<template>
    <a
        :href="entry.link"
        class="group panel p-4 hover:border-primary-300 transition-colors flex items-center gap-4"
    >
        <div class="w-10 h-10 flex items-center justify-center flex-shrink-0 rounded-lg bg-primary-50 text-primary-600">
            <iconify-icon
                :icon="entry.icon"
                :inline="true"
                class="text-2xl"
            />
        </div>
        <div class="flex-1 min-w-0">
            <p class="text-ink font-medium group-hover:text-primary-600 transition-colors">
                {{ entry.text }}
            </p>
        </div>
        <iconify-icon
            icon="mdi:chevron-right"
            :inline="true"
            class="text-ink/30 text-2xl group-hover:text-primary-500 group-hover:translate-x-0.5 transition-all flex-shrink-0"
        />
    </a>
</template>

<script setup lang="ts">
interface LinkEntry {
    link: string
    icon?: string
    text: string
}

defineProps<{
    entry: LinkEntry
}>()
</script>
