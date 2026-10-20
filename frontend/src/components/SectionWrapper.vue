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
    background?: 'white' | 'gray' | 'muted' | 'gradient' | 'none'
    paddingY?: 'none' | 'sm' | 'md' | 'lg'
    customClass?: string
    constrain?: boolean
    innerClass?: string
}>(), {
    background: 'white',
    paddingY: 'md',
    customClass: '',
    constrain: true,
    innerClass: 'container'
})

const backgroundMap: Record<string, string> = {
    white: 'bg-white',
    gray: 'bg-surface-muted',
    muted: 'bg-surface-muted',
    none: '',
    gradient: 'bg-surface-muted'
}

const paddingMap = {
    none: '',
    sm: 'py-8 md:py-10',
    md: 'py-12 md:py-16',
    lg: 'py-16 md:py-24'
}

const sectionClasses = computed(() => {
    return [
        backgroundMap[props.background] ?? '',
        paddingMap[props.paddingY],
        props.customClass
    ].filter(Boolean).join(' ')
})

const innerClasses = computed(() => props.innerClass)

</script>
