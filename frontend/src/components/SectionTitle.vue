<template>
    <h2 :class="['text-3xl font-bold mb-8 flex items-center gap-3 text-gray-800', wrapperClass]">
        <div :class="['w-12 h-12 rounded-lg flex items-center justify-center', iconWrapperClass]">
            <iconify-icon
                :icon="icon"
                :inline="true"
                :class="[iconClass]"
            />
        </div>
        <span>{{ title }}</span>
    </h2>
</template>

<script setup lang="ts">

withDefaults(defineProps<{
    icon?: string
    title?: string
    wrapperClass?: string
    iconWrapperClass?: string
    iconClass?: string
}>(), {
    icon: 'mdi:information',
    title: '',
    wrapperClass: '',
    iconWrapperClass: 'bg-primary-100',
    iconClass: 'text-primary text-2xl'
})

</script>
