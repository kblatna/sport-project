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
            class="w-4"
        />
        <Column
            field="category"
            header="Kategorie"
            class="w-36"
        />
        <Column
            field="birth"
            header="Ročník narození"
            class="w-20"
        />
        <Column
            field="length"
            header="Délka závodu"
            class="w-36"
        />
        <Column
            field="presentation"
            header="Prezentace"
            class="w-28"
        />
        <Column
            field="start"
            header="Start"
            class="w-20"
        />
        <Column
            v-if="hasAnnouncement"
            field="announcement"
            header="Vyhlášení"
            class="w-20"
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
