<template>
    <PageWrapper>
        <div class="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16">
            <div class="text-center max-w-2xl">
                <h1 class="text-8xl md:text-9xl font-bold text-primary-700 mb-4">
                    404
                </h1>

                <h2 class="text-3xl md:text-4xl font-semibold text-gray-800 mb-6">
                    Stránka nenalezena
                </h2>

                <p class="text-lg text-gray-600 mb-8">
                    Omlouváme se, ale stránka, kterou hledáte, neexistuje nebo byla přesunuta.
                </p>

                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <router-link
                        to="/"
                        class="w-full sm:w-auto"
                    >
                        <Button
                            severity="primary"
                            label="Zpět na hlavní stránku"
                            icon="pi pi-home"
                            class="w-full"
                        />
                    </router-link>

                    <Button
                        severity="secondary"
                        label="Zpět"
                        icon="pi pi-arrow-left"
                        class="w-full sm:w-auto"
                        @click="goBack"
                    />
                </div>

                <div class="mt-12">
                    <Divider />

                    <p class="text-sm text-gray-600 mb-4 mt-8">
                        Možná vás zajímají tyto stránky:
                    </p>
                    <div class="flex flex-wrap gap-4 justify-center text-sm">
                        <router-link
                            to="/info"
                            class="text-primary-700 hover:underline font-medium"
                        >
                            Informace o závodě
                        </router-link>
                        <router-link
                            to="/signup"
                            class="text-primary-700 hover:underline font-medium"
                        >
                            Přihláška
                        </router-link>
                        <router-link
                            to="/results"
                            class="text-primary-700 hover:underline font-medium"
                        >
                            Výsledky
                        </router-link>
                        <router-link
                            to="/contact"
                            class="text-primary-700 hover:underline font-medium"
                        >
                            Kontakt
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </PageWrapper>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import PageWrapper from '@/components/PageWrapper.vue'
import { Button, Divider } from 'primevue'

const router = useRouter()

const goBack = () => {
    // Check if there's history to go back to
    if (window.history.length > 1) {
        router.back()
    } else {
        router.push('/')
    }
}
</script>
