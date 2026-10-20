<template>
    <div class="max-w-3xl mx-auto text-center mb-8 md:mb-12">
        <p
            v-if="overtitle"
            class="text-sm font-medium tracking-wide text-primary-500 mb-2"
        >
            {{ overtitle }}
        </p>

        <h2
            class="text-2xl md:text-3xl lg:text-4xl font-bold text-ink tracking-tight"
        >
            {{ title }}
        </h2>

        <div
            v-if="showDivider"
            class="w-12 h-0.5 bg-accent-500 mx-auto mt-5 mb-6"
        ></div>

        <div
            v-if="$slots.default"
            class="mt-4 text-ink/70"
        >
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts" setup>

withDefaults(defineProps<{
    title: string
    overtitle?: string
    showDivider?: boolean
}>(), {
    overtitle: '',
    showDivider: false
})

</script>
