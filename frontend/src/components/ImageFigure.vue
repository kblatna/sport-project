<template>
    <figure class="flex flex-col items-center mt-auto">
        <Image
            :src="src"
            :alt="alt"
            :image-class="imageClass"
            :preview="preview"
        />
        <figcaption
            v-if="caption"
            class="mt-2 text-sm text-gray-500 italic"
        >
            {{ caption }}
        </figcaption>
    </figure>
</template>

<script setup lang="ts">
import { Image } from 'primevue'

withDefaults(defineProps<{
    src: string
    alt?: string
    imageClass?: string
    preview?: boolean
    caption?: string | null
}>(), {
    alt: '',
    imageClass: 'w-full rounded-md',
    preview: false,
    caption: null
})
</script>
