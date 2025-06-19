<template>
    <DataTable
        :size="'sm'"
        :header="header"
        :actions="false"
        :loading="isLoading"
        :data="results"
        :paging="true"
        :responsive="true"
        lang="cs_CZ"
    />
</template>

<script setup lang="ts">
import { Result } from '@/interface/result.interface'
import { computed } from 'vue'

defineProps<{
    results: Result[]
    isLoading: boolean
}>()

const header = computed(() => [
    {
        data: 'rank',
        text: 'Pořadí',
        sortable: true,
        filterable: true
    },
    {
        data: 'startNumber',
        text: 'Startovní číslo',
        sortable: true,
        filterable: true
    },
    {
        data: 'name',
        text: 'Jméno',
        sortable: true,
        filterable: true
    },
    {
        data: 'dateOfBirth',
        text: 'Rok narození',
        sortable: true,
        filterable: true
    },
    {
        data: 'totalTime',
        text: 'Celkový čas',
        sortable: true,
        filterable: true
    },
    {
        data: 'category',
        text: 'Kategorie',
        sortable: true,
        filterable: true
    },
    {
        data: 'year',
        text: 'Ročník',
        sortable: true,
        filterable: true
    }
])

</script>
