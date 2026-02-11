<template>
    <PageWrapper>
        <div class="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16">
            <div class="text-center max-w-2xl">
                <h1 class="text-8xl md:text-9xl font-bold text-red-600 mb-4">
                    500
                </h1>

                <h2 class="text-3xl md:text-4xl font-semibold text-gray-800 mb-6">
                    Něco se pokazilo
                </h2>

                <p class="text-lg text-gray-600 mb-4">
                    Omlouváme se, na serveru došlo k neočekávané chybě.
                    Naši technici již na problému pracují.
                </p>

                <p class="text-sm text-gray-500 mb-8">
                    Prosím zkuste to znovu za chvíli. Pokud problém přetrvává, kontaktujte nás.
                </p>

                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        severity="primary"
                        label="Zkusit znovu"
                        icon="pi pi-refresh"
                        class="w-full sm:w-auto"
                        @click="reloadPage"
                    />

                    <router-link
                        to="/"
                        class="w-full sm:w-auto"
                    >
                        <Button
                            severity="secondary"
                            label="Zpět na hlavní stránku"
                            icon="pi pi-home"
                            class="w-full"
                        />
                    </router-link>
                </div>

                <div class="mt-12">
                    <Divider />

                    <p class="text-sm text-gray-600 mb-2 mt-8">
                        Potřebujete pomoc?
                    </p>
                    <router-link
                        to="/contact"
                        class="inline-flex items-center text-primary-700 font-medium"
                    >
                        <i class="pi pi-envelope mr-2"></i>
                        <span class="hover:underline">Kontaktujte nás</span>
                    </router-link>
                </div>
            </div>
        </div>
    </PageWrapper>
</template>

<script setup lang="ts">
import PageWrapper from '@/components/PageWrapper.vue'
import { Button, Divider } from 'primevue'

const reloadPage = () => {
    window.location.reload()
}
</script>
