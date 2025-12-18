<template>
    <DataTable
        :value="schedule"
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
    </DataTable>
</template>

<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const schedule = [
    { group: 'M5', category: 'chlapci 10-12 let', birth: '2014–2016', length: '5 km (2 kola po 2,5 km)', presentation: '8:00-9:15', start: '9:31' },
    { group: 'Z5', category: 'dívky 10-12 let', birth: '2014–2016', length: '5 km (2 kola po 2,5 km)', presentation: '8:00-9:15', start: '9:31' },
    { group: 'M7', category: 'chlapci 13-14 let', birth: '2012–2013', length: '7,5 km (3 kola po 2,5 km)', presentation: '8:00-9:15', start: '9:30' },
    { group: 'Z7', category: 'dívky 13-14 let', birth: '2012–2013', length: '7,5 km (3 kola po 2,5 km)', presentation: '8:00-9:15', start: '9:30' },
    { group: 'M10', category: 'chlapci 15-17 let', birth: '2009–2011', length: '10 km (4 kola po 2,5 km)', presentation: '8:00-10:00', start: '10:30' },
    { group: 'Z10', category: 'dívky 15-17 let', birth: '2009–2011', length: '10 km (4 kola po 2,5 km)', presentation: '8:00-10:00', start: '10:30' },
    { group: 'M15', category: 'muži 18-39 let', birth: '1987–2008', length: '15 km (3 kola po 5 km)', presentation: '8:00-11:00', start: '11:30' },
    { group: 'Z15', category: 'ženy 18-39 let', birth: '1987–2008', length: '15 km (3 kola po 5 km)', presentation: '8:00-11:00', start: '11:35' },
    { group: 'V15', category: 'muži 40-49 let', birth: '1977–1986', length: '15 km (3 kola po 5 km)', presentation: '8:00-11:00', start: '11:35' },
    { group: 'W15', category: 'muži 50-59 let', birth: '1967–1976', length: '15 km (3 kola po 5 km)', presentation: '8:00-11:00', start: '11:35' },
    { group: 'WV15', category: 'muži 60+ let', birth: 'od 1966', length: '15 km (3 kola po 5 km)', presentation: '8:00-11:00', start: '11:35' },
    { group: 'ZV15', category: 'ženy 40-49 let', birth: '1977–1986', length: '15 km (3 kola po 5 km)', presentation: '8:00-11:00', start: '11:35' },
    { group: 'ZW15', category: 'ženy 50+ let', birth: 'od 1976', length: '15 km (3 kola po 5 km)', presentation: '8:00-11:00', start: '11:35' },
    { group: 'M30', category: 'muži 18-39 let', birth: '1987–2008', length: '30 km (6 kol po 5 km)', presentation: '8:00-13:00', start: '13:30' },
    { group: 'V30', category: 'muži 40-49 let', birth: '1977–1986', length: '30 km (6 kol po 5 km)', presentation: '8:00-13:00', start: '13:35' },
    { group: 'W30', category: 'muži 50+ let', birth: '1967–1976', length: '30 km (6 kol po 5 km)', presentation: '8:00-13:00', start: '13:35' },
    { group: 'WV30', category: 'muži 60+ let', birth: 'od 1966', length: '30 km (6 kol po 5 km)', presentation: '8:00-13:00', start: '13:35' }
]
</script>
