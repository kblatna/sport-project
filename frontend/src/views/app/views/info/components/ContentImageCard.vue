<template>
    <div class="grid md:grid-cols-2 gap-10 items-center">
        <div :class="['prose prose-lg max-w-none', isImageLeft ? 'md:order-2' : 'md:order-1']">
            <slot></slot>
        </div>

        <iframe
            v-if="imageSrc.includes('mapy.com')"
            :src="imageSrc"
            :width="imageWidth || '100%'"
            :height="imageHeight || '100%'"
            frameborder="0"
            :class="[
                'w-full rounded-2xl shadow-2xl max-h-64 md:max-h-none',
                imageTall ? 'aspect-[21/9] md:aspect-[2/3]' :
                imageSmall ? 'aspect-[21/9] md:aspect-square max-w-sm mx-auto md:mx-0' : 'aspect-[21/9] md:aspect-video',
                isImageLeft ? 'md:order-1' : 'md:order-2',
                imageClass
            ]"
            class="border-0"
        ></iframe>
        <img
            v-else
            :src="imageSrc"
            :alt="alt || 'Obrázek'"
            :class="[
                'w-full rounded-2xl shadow-2xl object-cover max-h-64 md:max-h-none',
                imageTall ? 'aspect-[21/9] md:aspect-[2/3]' :
                imageSmall ? 'aspect-[21/9] md:aspect-square max-w-sm mx-auto md:mx-0' : 'aspect-[21/9] md:aspect-video',
                isImageLeft ? 'md:order-1' : 'md:order-2',
                imageClass
            ]"
            :style="imageObjectPosition ? { objectPosition: imageObjectPosition } : undefined"
        />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
    imageSrc: string
    alt?: string
    imagePosition?: 'left' | 'right'
    imageFirst?: boolean
    imageTall?: boolean
    imageSmall?: boolean
    imageWidth?: string | number
    imageHeight?: string | number
    imageClass?: string | string[]
    imageObjectPosition?: string
}>()

const isImageLeft = computed(() => {
    if (props.imagePosition) return props.imagePosition === 'left'
    return !!props.imageFirst
})

</script>
