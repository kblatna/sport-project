<template>
    <div
        v-if="items.length > 0"
        class="container py-4"
    >
        <Breadcrumb
            :home="home"
            :model="items"
            class="[&_.p-breadcrumb-list]:items-center [&_.pi-home]:text-lg"
        />
    </div>
</template>

<script setup lang="ts">
import { Breadcrumb } from 'primevue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const home = {
    icon: 'pi pi-home',
    label: 'Domů',
    to: '/'
}

const items = computed(() => {
    if (route.name === 'Home') {
        return []
    }

    return route.matched
        .filter(r => r.meta.breadcrumb && r.name)
        .map(r => ({
            label: r.meta.breadcrumb as string,
            to: r.path
        }))
})
</script>
