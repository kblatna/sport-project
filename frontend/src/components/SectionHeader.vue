<template>
    <div class="max-w-4xl mx-auto text-center mb-10 lg:mb-16">
        <p
            v-if="overtitle"
            class="uppercase tracking-widest text-sm text-slate-500"
        >
            {{ overtitle }}
        </p>

        <h2
            class="text-4xl md:text-5xl font-bold text-gray-900"
            :class="{ 'mt-3': overtitle }"
        >
            {{ title }}
        </h2>

        <div
            v-if="showDivider"
            class="w-20 h-1 bg-primary-500 rounded mx-auto mt-6 mb-10"
        ></div>

        <slot></slot>
    </div>
</template>

<script lang="ts" setup>
withDefaults(
    defineProps<{
        title: string
        overtitle?: string
        showDivider?: boolean
    }>(),
    {
        overtitle: '',
        showDivider: true
    }
)
</script>
