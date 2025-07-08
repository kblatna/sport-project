<template>
    <DataTable
        :value="results"
        :loading="isLoading"
        :paginator="true"
        :rows="10"
        :rows-per-page-options="[5, 10, 25, 50]"
        :sort-field="'rank'"
        :sort-order="1"
        removable-sort
        filter-display="row"
        :global-filter-fields="['rank', 'startNumber', 'name', 'dateOfBirth', 'totalTime', 'category', 'year']"
        class="p-datatable-sm"
        responsive-layout="scroll"
        striped-rows
        show-gridlines
        table-style="min-width: 50rem"
        v-model:filters="filters"
    >
        <template #header>
            <div class="flex justify-between">
                <h3 class="m-0">
                    Výsledky závodů
                </h3>
                <IconField icon-position="left">
                    <InputIcon>
                        <i class="pi pi-search"></i>
                    </InputIcon>
                    <InputText
                        v-model="filters['global'].value"
                        placeholder="Globální vyhledávání..."
                        class="p-inputtext-sm"
                    />
                </IconField>
            </div>
        </template>

        <Column
            field="rank"
            header="Pořadí"
            sortable
            :show-filter-menu="true"
            :style="{ width: '10%' }"
        />

        <Column
            field="startNumber"
            header="Startovní číslo"
            sortable
            :show-filter-menu="true"
            :style="{ width: '12%' }"
        />

        <Column
            field="name"
            header="Jméno"
            sortable
            :show-filter-menu="true"
            :style="{ width: '20%' }"
        >
            <template #body="slotProps">
                <span class="font-medium">{{ slotProps.data.name }}</span>
            </template>
        </Column>

        <Column
            field="dateOfBirth"
            header="Rok narození"
            sortable
            :show-filter-menu="true"
            :style="{ width: '12%' }"
        />

        <Column
            field="totalTime"
            header="Celkový čas"
            sortable
            :show-filter-menu="true"
            :style="{ width: '12%' }"
        />

        <Column
            field="category"
            header="Kategorie"
            sortable
            :show-filter-menu="true"
            :style="{ width: '12%' }"
        />

        <Column
            field="year"
            header="Ročník"
            sortable
            :show-filter-menu="true"
            :style="{ width: '10%' }"
        />

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
import { Result } from '@/interface/result.interface'
import { FilterMatchMode } from '@primevue/core/api'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'
import { ref } from 'vue'

defineProps<{
    results: Result[]
    isLoading: boolean
}>()

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    rank: { value: null, matchMode: FilterMatchMode.CONTAINS },
    startNumber: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    dateOfBirth: { value: null, matchMode: FilterMatchMode.IN },
    totalTime: { value: null, matchMode: FilterMatchMode.EQUALS },
    category: { value: null, matchMode: FilterMatchMode.EQUALS },
    year: { value: null, matchMode: FilterMatchMode.EQUALS }
})

</script>
