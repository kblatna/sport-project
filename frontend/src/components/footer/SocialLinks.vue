<template>
    <div class="flex justify-end space-x-4">
        <a
            v-for="social in links"
            :key="social.url"
            :href="social.url"
            :aria-label="social.label"
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-400 hover:text-white transition-colors"
        >
            <iconify-icon
                :inline="true"
                class="text-3xl"
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
