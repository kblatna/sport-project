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

        <ResultsDataTable
            :results="result.docs"
            :total-records="result.totalDocs"
            :is-loading="isLoading"
            @on-lazy-load="loadData"
        />
    </div>
</template>

<script setup lang="ts">
import { PaginateResult } from '@/interface/PaginateResult.interface'
import { Result } from '@/interface/Result.interface'
import { listResults } from '@/services/api/services'
import Card from 'primevue/card'
import { onMounted, ref } from 'vue'
import ResultsDataTable from './components/ResultsDataTable.vue'

const result = ref<PaginateResult<Result[]>>({
    docs: [],
    totalDocs: 0,
    offset: 0,
    limit: 10,
    totalPages: 0,
    page: 1,
    pagingCounter: 1,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: null,
    nextPage: null
})

const isLoading = ref(false)

onMounted(async () => {
    const currentYear = new Date().getFullYear()
    await loadDataWithFallback(currentYear)
})

async function loadDataWithFallback(year: number): Promise<void> {
    await loadData({ year })

    if (result.value.totalDocs === 0) {
        console.warn(`No results for year ${year}. I try lo load last year ${year - 1}…`)
        await loadData({ year: year - 1 })
    }
}

async function loadData(filters?: Record<string, unknown>): Promise<void> {
    isLoading.value = true
    try {
        const response = await listResults(filters)
        result.value = response
    } catch (error) {
        console.error('Error fetching results:', error)
    // TODO: add notifier for error
    } finally {
        isLoading.value = false
    }
}
</script>
