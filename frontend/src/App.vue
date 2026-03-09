<template>
    <div class="min-h-screen flex flex-col">
        <HeaderNav v-if="!isAdminRoute" />

        <BreadcrumbNav v-if="!isAdminRoute" />

        <main class="flex-1">
            <RouterView />
        </main>

        <FooterInfo v-if="!isAdminRoute" />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import BreadcrumbNav from './components/BreadcrumbNav.vue'
import FooterInfo from './components/FooterInfo.vue'
import HeaderNav from './components/HeaderNav.vue'

const route = useRoute()
const isAdminRoute = computed(() => route.meta.requiresAdmin === true)
</script>
