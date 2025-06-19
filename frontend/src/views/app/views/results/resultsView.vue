<template>
    <div class="container">
        <h1 class="mt-4">
            Vyhledávání výsledků Soběšické Muldy
        </h1>
        <p class="mb-0">
            V tabulce níže si můžete filtrovat podle zvolených kritérií napříč jednotlivými ročníky závodu.
        </p>
        <div class="bg-white shadow my-5 p-3">
            <h3>Výsledky</h3>
            <ResultsDataTable
                :results="result ?? []"
                :is-loading="isLoading"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ResultsDataTable from './components/ResultsDataTable.vue'
import { Result } from '@/interface/result.interface'
import { results } from '../../../../services/api/services'

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
