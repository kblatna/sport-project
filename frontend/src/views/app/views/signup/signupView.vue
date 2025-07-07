<template>
    <div class="flex justify-center items-center min-h-screen bg-gray-50 p-4">
        <Card class="w-full max-w-2xl">
            <template #title>
                <div class="flex items-center justify-center gap-2">
                    <span>Přihláška na závod</span>
                    <iconify-icon
                        :inline="true"
                        icon="mdi:cow"
                    />
                </div>
            </template>
            <template #content>
                <SignupFormPrime />
            </template>
        </Card>
    </div>
</template>

<script setup lang="ts">
import Card from 'primevue/card'
import SignupFormPrime from './components/SignupFormPrime.vue'
</script>
