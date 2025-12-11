<template>
    <div class="min-h-screen flex flex-col">
        <!-- Header -->
        <HeaderNav />

        <!-- Breadcrumb Navigation -->
        <BreadcrumbNav />

        <!-- Main Content -->
        <main class="pt-20 flex-1">
            <RouterView />
        </main>

        <!-- Footer -->
        <FooterInfo />
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import BreadcrumbNav from './components/BreadcrumbNav.vue'
import FooterInfo from './components/FooterInfo.vue'
import HeaderNav from './components/HeaderNav.vue'
import { users } from './services/api/services'

onMounted(async () => {
    console.log(await users.getAll())
})
</script>
