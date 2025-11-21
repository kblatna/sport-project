<template>
    <div class="w-full">
        <h1 :class="[
            'text-3xl md:text-4xl font-semibold mb-5 md:mb-20',
            center ? 'text-center' : '',
            className
        ]">
            {{ title }}        
        </h1>
    </div>
</template>

<script lang="ts" setup>

defineProps<{
    title: string
    center?: boolean
    className?: string
}>()

</script>
