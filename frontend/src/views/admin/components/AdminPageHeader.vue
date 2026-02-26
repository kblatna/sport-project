<template>
    <div class="mb-8 flex justify-between items-center">
        <div>
            <h2 class="text-2xl font-bold text-gray-900">
                {{ title }}
            </h2>
            <p
                v-if="description"
                class="mt-1 text-sm text-gray-600"
            >
                {{ description }}
            </p>
        </div>
        <slot name="action"></slot>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    title: string
    description?: string
}>()
</script>
