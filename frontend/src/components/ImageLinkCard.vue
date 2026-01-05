<template>
    <div :class="containerClass">
        <a
            :href="href"
            :target="target"
            :rel="rel"
        >
            <Image
                :src="src"
                :alt="alt"
                :width="width"
                :height="height"
                :image-class="imgClass"
            />
        </a>
    </div>
</template>

<script setup lang="ts">
import { Image } from 'primevue'

withDefaults(defineProps<{
    href: string
    src: string
    alt?: string
    width?: number | string
    height?: number | string
    containerClass?: string | string[]
    imgClass?: string | string[]
    target?: string
    rel?: string
}>(), {
    alt: '',
    width: 1200,
    height: 800,
    containerClass: 'rounded-2xl shadow-2xl overflow-hidden border border-white/50',
    imgClass: 'w-full h-auto',
    target: '_blank',
    rel: 'noopener noreferrer'
})

</script>
