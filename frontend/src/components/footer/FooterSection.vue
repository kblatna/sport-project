<template>
    <div>
        <h6 class="text-lg font-semibold text-white mb-4 uppercase">
            {{ title }}
        </h6>
        <div class="space-y-2">
            <router-link
                v-for="link in links"
                :key="link.to + link.label"
                :to="link.to"
                class="block text-gray-300 hover:text-white transition-colors"
            >
                {{ link.label }}
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { FooterLink } from '@/composables/useFooterData'

defineProps<{
    title: string
    links: FooterLink[]
}>()
</script>
