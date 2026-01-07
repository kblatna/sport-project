<template>
    <DataTable
        :value="data"
        class="text-sm"
        responsive-layout="scroll"
        striped-rows
        show-gridlines
    >
        <Column
            field="group"
            header="Skupina"
            style="width: 1rem;"
        />
        <Column
            field="category"
            header="Kategorie"
            style="width: 9rem;"
        />
        <Column
            field="birth"
            header="Ročník narození"
            style="width: 5rem;"
        />
        <Column
            field="length"
            header="Délka závodu"
            style="width: 9rem;"
        />
        <Column
            field="presentation"
            header="Prezentace"
            style="width: 7rem;"
        />
        <Column
            field="start"
            header="Start"
            style="width: 5rem;"
        />
        <Column
            v-if="hasAnnouncement"
            field="announcement"
            header="Vyhlášení"
            style="width: 5rem;"
        />
    </DataTable>
</template>

<script setup lang="ts">
import type { CategoryTableRow } from '@/interface/InfoPageContent'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import { computed } from 'vue'

const props = withDefaults(defineProps<{
    data?: CategoryTableRow[]
}>(), {
    data: () => []
})

const hasAnnouncement = computed(() => {
    return props.data.some(row => row.announcement !== undefined)
})
</script>
