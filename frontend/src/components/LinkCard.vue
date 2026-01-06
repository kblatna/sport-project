<template>
    <a
        :href="entry.link"
        class="group bg-white rounded-lg shadow-md p-5 hover:shadow-xl hover:bg-primary-50 transition-all flex items-center gap-4"
    >
        <div class="w-10 h-10 flex items-center justify-center flex-shrink-0">
            <iconify-icon
                :icon="entry.icon"
                :inline="true"
                class="text-primary text-2xl"
            />
        </div>
        <div class="flex-1 min-w-0">
            <p class="text-gray-800 font-medium group-hover:text-primary transition-colors">
                {{ entry.text }}
            </p>
        </div>
        <iconify-icon
            icon="mdi:chevron-right"
            :inline="true"
            class="text-gray-400 text-3xl group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0"
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
