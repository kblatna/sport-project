<template>
    <section :class="sectionClasses">
        <div
            v-if="constrain"
            :class="innerClasses"
        >
            <slot></slot>
        </div>
        <template v-else>
            <slot></slot>
        </template>
    </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
    background?: 'white' | 'gray' | 'gradient' | 'none'
    paddingY?: 'none' | 'sm' | 'md' | 'lg'
    customClass?: string
    constrain?: boolean
    innerClass?: string
}>(), {
    background: 'white',
    paddingY: 'md',
    customClass: '',
    constrain: true,
    innerClass: 'max-w-content mx-auto px-4'
})

const backgroundMap = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    none: ''
}

const paddingMap = {
    none: '',
    sm: 'py-4 md:py-6 lg:py-10',
    md: 'py-6 md:py-10 lg:py-16',
    lg: 'py-12 md:py-20 lg:py-28'
}

const sectionClasses = computed(() => {
    return [
        backgroundMap[props.background],
        paddingMap[props.paddingY],
        props.customClass
    ].filter(Boolean).join(' ')
})

const innerClasses = computed(() => props.innerClass)

</script>
