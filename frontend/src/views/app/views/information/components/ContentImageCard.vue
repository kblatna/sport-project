<template>
    <div class="py-8">
        <div class="grid lg:grid-cols-2 gap-10 items-center">
            <div :class="['prose prose-lg max-w-none', isImageLeft ? 'lg:order-2' : 'lg:order-1']">
                <slot></slot>
            </div>

            <div
                :class="[
                    'relative overflow-hidden rounded-2xl shadow-2xl group cursor-pointer',
                    imageTall ? 'aspect-[3/4] lg:aspect-[2/3]' :
                    imageSmall ? 'aspect-square max-w-sm mx-auto lg:mx-0' : 'aspect-video',
                    isImageLeft ? 'lg:order-1' : 'lg:order-2',
                ]"
            >
                <iframe
                    v-if="imageSrc.includes('mapy.com')"
                    :src="imageSrc"
                    :width="imageWidth || '100%'"
                    :height="imageHeight || '100%'"
                    frameborder="0"
                    :class="['w-full h-full', imageClass]"
                    style="border:none"
                ></iframe>
                <Image
                    v-else
                    :src="imageSrc"
                    :alt="alt || 'Obrázek'"
                    :class="['w-full h-full']"
                    :image-class="imageClass"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Image } from 'primevue'
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
}>()

const isImageLeft = computed(() => {
    if (props.imagePosition) return props.imagePosition === 'left'
    return !!props.imageFirst
})

</script>
