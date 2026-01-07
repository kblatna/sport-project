<template>
    <router-link
        :to="to"
        class="flex items-center space-x-2"
        :aria-label="ariaLabel"
    >
        <Image
            :src="src"
            :alt="alt"
            image-class="h-10 w-auto"
        />
    </router-link>
</template>

<script setup lang="ts">
import { Image } from 'primevue'
import type { RouteLocationRaw } from 'vue-router'

withDefaults(defineProps<{
    src?: string
    alt?: string
    to?: RouteLocationRaw
    ariaLabel?: string
}>(), {
    src: '/logo/mulda_logo.png',
    alt: 'Logo Soběšická Mulda',
    to: '/',
    ariaLabel: 'Přejít na úvodní stránku'
})
</script>
