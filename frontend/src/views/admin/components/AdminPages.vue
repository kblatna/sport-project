<template>
    <div class="px-4 py-6 sm:px-0">
        <AdminPageHeader
            title="Správa obsahu stránek"
            description="Upravujte textový obsah jednotlivých stránek webu"
        />

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card
                v-for="page in pages"
                :key="page.id"
                class="hover:shadow-xl hover:bg-blue-50 transition-all cursor-pointer"
                @click="$router.push({ name: 'AdminPageEdit', params: { id: page.id } })"
            >
                <template #title>
                    <div class="text-center">
                        {{ page.title }}
                    </div>
                </template>
                <template #content>
                    <p class="text-sm text-gray-600 text-center min-h-[3rem]">
                        {{ page.description }}
                    </p>
                </template>
                <template #footer>
                    <div class="flex justify-center items-center gap-1 bg-blue-100 text-customblue-600 rounded py-1 px-3">
                        <iconify-icon icon="mdi:pencil" />
                        <span>Upravit</span>
                    </div>
                </template>
            </Card>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Card from 'primevue/card'
import AdminPageHeader from './AdminPageHeader.vue'

interface PageConfig {
    id: string
    title: string
    description: string
}

const pages = ref<PageConfig[]>([
    {
        id: 'main',
        title: 'Hlavní stránka',
        description: 'Úvodní text, bannery a sekce hlavní stránky'
    },
    {
        id: 'info',
        title: 'Informace',
        description: 'Informace o akci, pravidla a další detaily'
    },
    {
        id: 'signup',
        title: 'Registrace',
        description: 'Obsah registrační stránky'
    },
    {
        id: 'results',
        title: 'Výsledky',
        description: 'Stránka s výsledky závodů'
    },
    {
        id: 'organizers',
        title: 'Pořadatelé',
        description: 'Informace o pořadatelích akce'
    },
    {
        id: 'links',
        title: 'Odkazy',
        description: 'Užitečné odkazy a zdroje'
    },
    {
        id: 'contact',
        title: 'Kontakt',
        description: 'Kontaktní informace a formulář'
    },
    {
        id: 'footer',
        title: 'Patička webu',
        description: 'Obsah v patičce webu'
    }
])
</script>
