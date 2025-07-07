<template>
    <div class="container mx-auto px-4 py-6">
        <div class="mb-6">
            <h1 class="text-3xl font-bold text-gray-800 mb-2">
                Vyhledávání výsledků Soběšické Muldy
            </h1>
            <p class="text-gray-600">
                V tabulce níže si můžete filtrovat podle zvolených kritérií napříč jednotlivými ročníky závodu.
            </p>
        </div>

        <Card>
            <template #title>
                <div class="flex items-center">
                    <i class="pi pi-trophy text-2xl text-yellow-500 mr-2"></i>
                    Výsledky závodů
                </div>
            </template>
            <template #content>
                <ResultsDataTable
                    :results="result ?? []"
                    :is-loading="isLoading"
                />
            </template>
        </Card>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ResultsDataTable from './components/ResultsDataTable.vue'
import { Result } from '@/interface/result.interface'
import { results } from '../../../../services/api/services'
import Card from 'primevue/card'

const result = ref<Result[]>([])
const isLoading = ref(false)

onMounted(async () => {
    isLoading.value = true

    try {
        const response = await results.getAll()
        result.value = response
    } catch (error) {
        console.error('Error fetching results:', error)
    } finally {
        isLoading.value = false
    }
})

</script>
