<template>
    <div class="flex gap-3">
        <a
            v-for="social in links"
            :key="social.url"
            :href="social.url"
            :aria-label="social.label"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/15 text-white/70 hover:text-white hover:border-white/40 transition-colors"
        >
            <iconify-icon
                :inline="true"
                class="text-xl"
                :icon="social.icon"
            />
        </a>
    </div>
</template>

<script setup lang="ts">
import type { SocialLink } from '@/composables/useFooterData'

defineProps<{
    links: SocialLink[]
}>()

</script>
