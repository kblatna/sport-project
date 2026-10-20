<template>
    <section
        v-if="visible"
        :class="['relative z-10 flex items-end', heightClass]"
        :style="bgStyle"
    >
        <div
            v-if="overlay"
            class="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/45 to-ink/20"
        ></div>

        <div class="relative container w-full pb-10 md:pb-14 lg:pb-16">
            <div :class="['max-w-2xl text-white', centered ? 'mx-auto text-center' : '']">
                <h1
                    v-if="title || $slots.title"
                    class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 md:mb-5"
                >
                    <slot name="title">
                        {{ title }}
                    </slot>
                </h1>

                <p
                    v-if="subtitle || $slots.subtitle"
                    class="text-base md:text-lg lg:text-xl mb-6 md:mb-8 max-w-xl leading-relaxed text-white/90"
                >
                    <slot name="subtitle">
                        {{ subtitle }}
                    </slot>
                </p>

                <div
                    class="flex flex-wrap gap-3"
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
    gradient: '',
    overlay: true,
    centered: false,
    heightClass: 'min-h-[22rem] md:min-h-[28rem] lg:min-h-[34rem]',
    buttons: () => []
})

const bgStyle = computed(() => {
    if (!props.image) {
        return {
            background: 'linear-gradient(135deg, #1f4d3a 0%, #164263 50%, #0b1f2a 100%)'
        }
    }

    return {
        backgroundImage: `url(${props.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }
})
</script>
