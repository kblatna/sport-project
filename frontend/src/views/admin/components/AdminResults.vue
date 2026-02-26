<template>
    <LoadingSpinner v-if="isLoading" />

    <div
        v-else-if="!error"
        class="px-4 py-6 sm:px-0"
    >
        <AdminPageHeader
            title="Správa výsledků závodů"
            description="Přidávejte a upravujte výsledky závodníků"
        >
            <template #action>
                <Button
                    label="Přidat výsledek"
                    icon="pi pi-plus"
                    severity="primary"
                    @click="showAddDialog = true"
                />
            </template>
        </AdminPageHeader>

        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
            <DataTable
                :value="result.docs"
                paginator
                :rows="10"
                :loading="isLoading"
                striped-rows
            >
                <template #empty>
                    <div class="text-center py-8">
                        <i class="pi pi-inbox text-4xl text-gray-400 mb-2"></i>
                        <iconify-icon
                            icon="mdi:inbox"
                            class="text-4xl text-gray-400 mb-2"
                        />
                        <p class="text-gray-600">
                            Žádné výsledky nenalezeny
                        </p>
                    </div>
                </template>

                <Column
                    field="rank"
                    header="Umístění"
                    style="width: 100px"
                />

                <Column
                    field="name"
                    header="Jméno"
                />

                <Column
                    field="category"
                    header="Kategorie"
                />

                <Column
                    field="totalTime"
                    header="Čas"
                />

                <Column
                    field="year"
                    header="Rok"
                    style="width: 100px"
                />

                <Column
                    header="Akce"
                    style="width: 120px"
                >
                    <template #body>
                        <div class="flex gap-2">
                            <Button
                                icon="pi pi-pencil"
                                size="small"
                                severity="secondary"
                                text
                            />
                            <Button
                                icon="pi pi-trash"
                                size="small"
                                severity="danger"
                                text
                            />
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>

<script setup lang="ts">
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { PaginateResult } from '@/interface/PaginateResult.interface'
import { Result } from '@/interface/Result.interface'
import { listResults } from '@/services/api/services'
import Button from 'primevue/button'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import { onMounted, ref } from 'vue'
import AdminPageHeader from './AdminPageHeader.vue'

const isLoading = ref(true)
const error = ref<string | null>(null)
const showAddDialog = ref(false)

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

const loadResults = async () => {
    isLoading.value = true
    error.value = null

    try {
        const response = await listResults()
        result.value = response
    } catch (err) {
        console.error('Failed to load results:', err)
        error.value = 'Nepodařilo se načíst výsledky. Zkuste to prosím později.'
    } finally {
        isLoading.value = false
    }
}

onMounted(async () => {
    await loadResults()
})
</script>
