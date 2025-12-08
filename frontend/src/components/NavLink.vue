<template>
    <router-link
        :to="to"
        :class="linkClass"
        :active-class="activeClass"
        :exact-active-class="exactActiveClass"
        @click="$emit('click')"
    >
        <slot></slot>
    </router-link>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

defineProps<{
    to: RouteLocationRaw
    linkClass?: string
    activeClass?: string
    exactActiveClass?: string
}>()

defineEmits<{
    click: []
}>()
</script>
