<template>
    <section :class="sectionClasses">
        <slot></slot>
    </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    background?: 'white' | 'gray' | 'gradient' | 'none'
    paddingY?: 'none' | 'sm' | 'md' | 'lg'
    customClass?: string
}

const props = withDefaults(defineProps<Props>(), {
    background: 'white',
    paddingY: 'md',
    customClass: ''
})

const backgroundMap = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    none: ''
}

const paddingMap = {
    none: '',
    sm: 'py-8 md:py-12',
    md: 'py-16 md:py-20',
    lg: 'py-20 md:py-28'
}

const sectionClasses = computed(() => {
    return [
        backgroundMap[props.background],
        paddingMap[props.paddingY],
        props.customClass
    ].filter(Boolean).join(' ')
})

</script>
