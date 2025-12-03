<template>
    <!-- TODO: doplnit do databáze -->
    <DataTable
        :value="scheduleData"
        striped-rows
        responsive-layout="scroll"
        class="text-sm"
    >
        <Column
            field="category"
            header="Kategorie"
        />
        <Column
            field="attendance"
            header="Prezence"
        />
        <Column
            field="training"
            header="Trénink"
        />
        <Column
            field="restrictedTraining"
            header="Omez. trénink"
        />
        <Column
            field="start"
            header="Start"
        />
        <Column
            field="limit"
            header="Limit"
        />
        <Column
            field="announcement"
            header="Vyhlášení"
        />
        <Column
            field="drawing"
            header="Losování"
        />
    </DataTable>
</template>

<script lang="ts" setup>
import { Column, DataTable } from 'primevue'

interface ScheduleRow {
    category: string
    attendance: string
    training: string
    restrictedTraining: string
    start: string
    limit: string
    announcement: string
    drawing: string
}

defineProps<{
    scheduleData: ScheduleRow[]
}>()
</script>
