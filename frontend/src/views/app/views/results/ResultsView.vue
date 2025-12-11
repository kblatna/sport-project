<template>
    <SectionWrapper class="container">
        <SectionHeader
            :title="pageContent?.title || 'Výsledky závodu'"
        >
            <p class="text-gray-600 my-10">
                {{ pageContent?.description || 'V tabulce níže si můžete filtrovat podle zvolených kritérií napříč jednotlivými ročníky závodu.' }}
            </p>
        </SectionHeader>

        <div class="rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 md:p-10 border border-gray-200/60">
            <ResultsDataTable
                :results="result.docs"
                :total-records="result.totalDocs"
                :is-loading="isLoading"
                :page-content="pageContent"
                @on-lazy-load="loadData"
            />
        </div>
    </SectionWrapper>
</template>

<script setup lang="ts">
import { PaginateResult } from '@/interface/PaginateResult.interface'
import { Result } from '@/interface/Result.interface'
import { ResultPageContent } from '@/interface/ResultPageContent.interface'
import { listResults, resultPageContent } from '@/services/api/services'
import { onMounted, ref } from 'vue'
import ResultsDataTable from './components/ResultsDataTable.vue'
import SectionWrapper from '@/components/SectionWrapper.vue'
import SectionHeader from '@/components/SectionHeader.vue'

const result = ref<PaginateResult<Result>>({
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

const pageContent = ref<ResultPageContent | null>(null)
const isLoading = ref(false)

onMounted(async () => {
    await loadPageContent()
    const currentYear = new Date().getFullYear()
    await loadDataWithFallback(currentYear)
})

async function loadPageContent(): Promise<void> {
    try {
        const response = await resultPageContent.getAll()
        pageContent.value = response
    } catch (error) {
        console.error('Error fetching page content:', error)
        // TODO: add notifier for error
    }
}

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
