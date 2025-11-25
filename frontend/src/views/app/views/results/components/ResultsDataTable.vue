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
            <div class="flex justify-end">
                <Button
                    type="button"
                    icon="pi pi-filter-slash"
                    label="Reset filtrů"
                    outlined
                    @click="clearFilter"
                />
            </div>
        </template>

        <Column
            field="rank"
            header="Pořadí"
            sortable
            :show-filter-menu="true"
            style="width: 50px"
            header-style="width: 50px"
        />

        <Column
            field="startNumber"
            header="Startovní číslo"
            sortable
            :show-filter-menu="true"
        >
            <template #filter="{ filterModel, filterCallback }">
                <InputText
                    v-model="filterModel.value"
                    type="text"
                    @input="filterCallback"
                    placeholder="Hledat číslo"
                />
            </template>
        </Column>

        <Column
            field="name"
            header="Jméno"
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
                    placeholder="Hledat jméno"
                />
            </template>
        </Column>

        <Column
            field="dateOfBirth"
            header="Rok narození"
            sortable
            :show-filter-menu="true"
        >
            <template #filter="{ filterModel, filterCallback }">
                <InputText
                    v-model="filterModel.value"
                    type="text"
                    @input="filterCallback"
                    placeholder="Hledat rok"
                />
            </template>
        </Column>

        <Column
            field="totalTime"
            header="Celkový čas"
            sortable
            :show-filter-menu="true"
        />

        <Column
            field="category"
            header="Kategorie"
            sortable
            :show-filter-menu="true"
        >
            <template #filter="{ filterModel, filterCallback }">
                <InputText
                    v-model="filterModel.value"
                    type="text"
                    @input="filterCallback"
                    placeholder="Hledat kategorii"
                />
            </template>
        </Column>

        <Column
            field="year"
            header="Ročník"
            sortable
            :show-filter-menu="true"
        >
            <template #filter="{ filterModel, filterCallback }">
                <InputText
                    v-model="filterModel.value"
                    type="text"
                    @input="filterCallback"
                    placeholder="Hledat ročník"
                />
            </template>
        </Column>

        <template #empty>
            <div class="text-center py-8">
                <i class="pi pi-search text-4xl text-gray-400 mb-4"></i>
                <p class="text-gray-500 text-lg">
                    Žádné výsledky nenalezeny
                </p>
                <p class="text-gray-400 text-sm">
                    Zkuste změnit filtry nebo vyhledávací kritéria
                </p>
            </div>
        </template>

        <template #loading>
            <div class="text-center py-8">
                <i class="pi pi-spin pi-spinner text-4xl text-blue-500 mb-4"></i>
                <p class="text-gray-500 text-lg">
                    Načítání výsledků...
                </p>
            </div>
        </template>
    </DataTable>
</template>

<script setup lang="ts">
import { Result } from '@/interface/Result.interface'
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
        startNumber: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        name: { value: null, matchMode: FilterMatchMode.CONTAINS },
        dateOfBirth: { value: null, matchMode: FilterMatchMode.CONTAINS },
        totalTime: { value: null, matchMode: FilterMatchMode.EQUALS },
        category: { value: null, matchMode: FilterMatchMode.EQUALS },
        year: { value: null, matchMode: FilterMatchMode.EQUALS }
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
</style>
