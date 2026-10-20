<template>
    <div>
        <h6 class="text-sm font-semibold text-white mb-4 tracking-wide">
            {{ title }}
        </h6>
        <div class="space-y-2">
            <router-link
                v-for="link in links"
                :key="link.to + link.label"
                :to="link.to"
                class="block text-sm text-white/70 hover:text-white transition-colors"
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
