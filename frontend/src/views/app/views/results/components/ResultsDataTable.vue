<template>
    <DataTable
        :value="results"
        :lazy="true"
        :loading="isLoading"
        :paginator="true"
        :rows="rows"
        :rows-per-page-options="[5, 10, 25, 50, 100]"
        :total-records="totalRecords"
        :sort-field="sortField"
        :sort-order="sortOrder"
        :first="first"
        filter-display="row"
        class="results-table p-datatable-sm"
        responsive-layout="scroll"
        striped-rows
        show-gridlines
        table-style="min-width: 50rem"
        v-model:filters="filters"
        @page="onLazyLoadHandler($event)"
        @sort="onLazyLoadHandler($event)"
        @filter="onLazyLoadHandler($event)"
    >
        <template #header>
            <div class="flex flex-wrap justify-between items-center w-full gap-4 pb-4">
                <h3 class="text-2xl font-semibold text-gray-800">
                    {{ pageContent?.tableTitle || 'Výsledky závodů' }}
                </h3>
                <Button
                    type="button"
                    icon="pi pi-filter-slash"
                    :label="pageContent?.resetButtonLabel || 'Reset filtrů'"
                    outlined
                    @click="clearFilter"
                />
            </div>
        </template>

        <Column
            field="rank"
            :header="pageContent?.columnHeaders?.rank || 'Pořadí'"
            sortable
            :show-filter-menu="true"
        />

        <Column
            field="startNumber"
            :header="pageContent?.columnHeaders?.startNumber || 'Startovní číslo'"
            sortable
            :show-filter-menu="true"
        >
            <template #filter="{ filterModel, filterCallback }">
                <InputText
                    v-model="filterModel.value"
                    type="text"
                    @input="filterCallback"
                    :placeholder="pageContent?.filterPlaceholders?.startNumber || 'Hledat číslo'"
                />
            </template>
        </Column>

        <Column
            field="name"
            :header="pageContent?.columnHeaders?.name || 'Jméno'"
            sortable
            :show-filter-menu="true"
        >
            <template #body="slotProps">
                <span class="font-medium">
                    {{ slotProps.data.name }}
                </span>
            </template>
            <template #filter="{ filterModel, filterCallback }">
                <InputText
                    v-model="filterModel.value"
                    type="text"
                    @input="filterCallback"
                    :placeholder="pageContent?.filterPlaceholders?.name || 'Hledat jméno'"
                />
            </template>
        </Column>

        <Column
            field="dateOfBirth"
            :header="pageContent?.columnHeaders?.dateOfBirth || 'Rok narození'"
            sortable
            :show-filter-menu="true"
        >
            <template #filter="{ filterModel, filterCallback }">
                <InputText
                    v-model="filterModel.value"
                    type="text"
                    @input="filterCallback"
                    :placeholder="pageContent?.filterPlaceholders?.dateOfBirth || 'Hledat rok'"
                />
            </template>
        </Column>

        <Column
            field="totalTime"
            :header="pageContent?.columnHeaders?.totalTime || 'Celkový čas'"
            sortable
            :show-filter-menu="true"
        />

        <Column
            field="category"
            :header="pageContent?.columnHeaders?.category || 'Kategorie'"
            sortable
            :show-filter-menu="true"
        >
            <template #filter="{ filterModel, filterCallback }">
                <InputText
                    v-model="filterModel.value"
                    type="text"
                    @input="filterCallback"
                    :placeholder="pageContent?.filterPlaceholders?.category || 'Hledat kategorii'"
                />
            </template>
        </Column>

        <Column
            field="year"
            :header="pageContent?.columnHeaders?.year || 'Ročník'"
            sortable
            :show-filter-menu="true"
        >
            <template #filter="{ filterModel, filterCallback }">
                <InputText
                    v-model="filterModel.value"
                    type="text"
                    @input="filterCallback"
                    :placeholder="pageContent?.filterPlaceholders?.year || 'Hledat ročník'"
                />
            </template>
        </Column>

        <template #empty>
            <div class="text-center py-8">
                <i class="pi pi-search text-4xl text-gray-400 mb-4"></i>
                <p class="text-gray-500 text-lg">
                    {{ pageContent?.emptyState?.title || 'Žádné výsledky nenalezeny' }}
                </p>
                <p class="text-gray-400 text-sm">
                    {{ pageContent?.emptyState?.subtitle || 'Zkuste změnit filtry nebo vyhledávací kritéria' }}
                </p>
            </div>
        </template>

        <template #loading>
            <div class="text-center py-8">
                <i class="pi pi-spin pi-spinner text-4xl text-blue-500 mb-4"></i>
                <p class="text-gray-500 text-lg">
                    {{ pageContent?.loadingText || 'Načítání výsledků...' }}
                </p>
            </div>
        </template>
    </DataTable>
</template>

<script setup lang="ts">
import { Result } from '@/interface/Result.interface'
import { ResultPageContent } from '@/interface/ResultPageContent.interface'
import { FilterMatchMode } from '@primevue/core/api'
import Button from 'primevue/button'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import InputText from 'primevue/inputtext'
import { ref, watch } from 'vue'

defineProps<{
    results: Result[]
    totalRecords: number
    isLoading: boolean
    pageContent: ResultPageContent | null
}>()

const filters = ref<Record<string, any>>({})
const sortField = ref<string>('rank')
const sortOrder = ref<0 | 1 | -1>(1)
const first = ref<number>(0)
const rows = ref<number>(10)

const $emit = defineEmits<{
    (e: 'on-lazy-load', filters: Record<string, unknown>): void
}>()

const initFilters = () => {
    filters.value = {
        rank: { value: null, matchMode: FilterMatchMode.CONTAINS },
        startNumber: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.CONTAINS },
        dateOfBirth: { value: null, matchMode: FilterMatchMode.CONTAINS },
        totalTime: { value: null, matchMode: FilterMatchMode.CONTAINS },
        category: { value: null, matchMode: FilterMatchMode.CONTAINS },
        year: { value: null, matchMode: FilterMatchMode.CONTAINS }
    }
}

initFilters()

const clearFilter = () => {
    initFilters()
    sortField.value = 'rank'
    sortOrder.value = 1
    first.value = 0
}

watch([filters, sortField, sortOrder, first, rows], () => {
    onLazyLoadHandler({
        first: first.value,
        rows: rows.value,
        sortField: sortField.value,
        sortOrder: sortOrder.value
    })
}, { immediate: true })

function onLazyLoadHandler(event?: any) {
    const activeFilters: Record<string, unknown> = {}

    if (event?.first !== undefined) {
        first.value = event.first
    }

    if (event.sortField !== undefined) {
        if (typeof event.sortField === 'string') {
            sortField.value = event.sortField
        } else {
            sortField.value = ''
        }
    }

    Object.keys(filters.value).forEach((key) => {
        const filter = filters.value[key]
        if (filter?.value !== null && filter?.value !== undefined && filter?.value !== '') {
            activeFilters[key] = filter.value
        }
    })

    if (event?.first !== undefined && event?.rows !== undefined) {
        activeFilters.page = Math.floor(event.first / event.rows) + 1
    }

    if (event?.rows !== undefined) {
        rows.value = event.rows
        activeFilters.limit = event.rows
    }

    if (event?.sortField) {
        activeFilters.sortBy = event.sortField
        activeFilters.sortOrder = event.sortOrder === 1 ? 'asc' : 'desc'
    }

    return $emit('on-lazy-load', activeFilters)
}

</script>

<style>
/* Hide the filter icon button in the column header */
.results-table {
    .p-datatable-column-filter-button {
        display: none !important;
        visibility: hidden !important;
    }
}

.p-datatable-header {
    border: none !important;
}
</style>
