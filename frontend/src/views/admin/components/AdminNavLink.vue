<template>
    <router-link
        :to="{ name }"
        class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors"
        :class="isActive
            ? 'bg-blue-50 text-blue-700'
            : 'text-gray-600 hover:text-gray-900'"
    >
        <slot></slot>
    </router-link>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps<{
    name: string
}>()

const route = useRoute()

const isActive = computed(() => {
    if (!route.name) {
        return false
    }
    const currentName = String(route.name)
    return currentName.startsWith(props.name)
})
</script>
