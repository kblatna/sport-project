<template>
    <div class="min-h-screen flex flex-col">
        <!-- Header -->
        <HeaderNav />

        <!-- Main Content -->
        <main class="flex-1">
            <RouterView />
        </main>

        <!-- Footer -->
        <FooterInfo />
    </div>
</template>

<script setup lang="ts">
import FooterInfo from './components/FooterInfo.vue'
import HeaderNav from './components/HeaderNav.vue'
import { onMounted } from 'vue'
import { users } from './services/api/services'
import { RouterView } from 'vue-router'

onMounted(async () => {
    console.log(await users.getAll())
})
</script>
