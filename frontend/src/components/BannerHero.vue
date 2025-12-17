<template>
    <section
        v-if="visible"
        :class="['relative z-10 flex items-center', heightClass]"
        :style="bgStyle"
    >
        <div
            v-if="overlay"
            class="absolute inset-0 bg-black/30"
        ></div>

        <div class="relative container">
            <div :class="['max-w-4xl text-white', centered ? 'mx-auto text-center' : '']">
                <h1
                    v-if="title || $slots.title"
                    class="text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-6 md:mb-10"
                >
                    <slot name="title">
                        {{ title }}
                    </slot>
                </h1>

                <p
                    v-if="subtitle || $slots.subtitle"
                    class="text-base md:text-lg lg:text-xl xl:text-2xl mb-4 md:mb-6 max-w-2xl leading-relaxed text-white/95"
                >
                    <slot name="subtitle">
                        {{ subtitle }}
                    </slot>
                </p>

                <div
                    class="flex flex-wrap gap-4"
                    :class="centered ? 'justify-center' : ''"
                >
                    <slot name="actions"></slot>
                </div>
            </div>

            <slot></slot>
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
    visible?: boolean
    title?: string
    subtitle?: string
    image?: string
    gradient?: string
    overlay?: boolean
    centered?: boolean
    heightClass?: string
    buttons?: Array<Record<string, any>>
}>(), {
    visible: true,
    title: '',
    subtitle: '',
    image: '',
    gradient: 'linear-gradient(90deg,#000,#00000040 50%,#00000040,#000)',
    overlay: true,
    centered: false,
    heightClass: 'h-72 md:h-96 lg:h-[520px]',
    buttons: () => []
})

const bgStyle = computed(() => {
    if (!props.image) {
        return undefined
    }

    const gradientPart = props.gradient ? `${props.gradient}, ` : ''
    return {
        backgroundImage: `${gradientPart}url(${props.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }
})
</script>
