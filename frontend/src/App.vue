<template>
    <div class="min-h-screen flex flex-col">
        <!-- Header -->
        <HeaderNav />

        <!-- Breadcrumb Navigation -->
        <BreadcrumbNav />

        <!-- Main Content -->
        <main class="flex-1">
            <RouterView />
        </main>

        <!-- Footer -->
        <FooterInfo />
    </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import BreadcrumbNav from './components/BreadcrumbNav.vue'
import FooterInfo from './components/FooterInfo.vue'
import HeaderNav from './components/HeaderNav.vue'

</script>
