<template>
    <SectionWrapper
        class="container"
        padding-y="md"
    >
        <SectionHeader title="Informace" />
        <p class="text-center mb-5">
            Mulda pro mládež a dospělé
        </p>

        <div class="flex justify-center">
            <Tabs value="0">
                <TabList>
                    <Tab value="0">
                        Okruh 2,5 km
                    </Tab>
                    <Tab value="1">
                        Okruh 5 km
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel value="1">
                        <iframe
                            style="border:none"
                            src="https://mapy.com/s/dedabafaha"
                            width="700"
                            height="466"
                            frameborder="0"
                        ></iframe>
                    </TabPanel>
                    <TabPanel value="0">
                        <p class="m-0">
                            <iframe
                                style="border:none"
                                src="https://mapy.com/s/redogopahu"
                                width="700"
                                height="466"
                                frameborder="0"
                            ></iframe>
                        </p>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    </SectionWrapper>
</template>

<script setup lang="ts">
import SectionHeader from '@/components/SectionHeader.vue'
import SectionWrapper from '@/components/SectionWrapper.vue'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primevue'

</script>

<style>
.p-tabview .p-tabview-nav,
.p-tablist-tab-list,
.p-tablist {
    display: flex;
    justify-content: center;
    gap: 1rem;
    --p-tabs-tablist-border-width: 0;
}

.p-tab {
    --p-tabs-tab-border-width: 1px;
    border-radius: 0.5rem;
    --p-tabs-tab-background: var(--p-button-secondary-background);
    --p-tabs-tab-color: var(--p-button-secondary-color);
    --p-tabs-tab-border-width: 0;
}

.p-tab:not(.p-tab-active):not(.p-disabled):hover {
    --p-tabs-tab-hover-background: var(--p-button-secondary-hover-background);
}

.p-tab[aria-selected="true"] {
    --p-tabs-tab-active-background: var(--p-button-primary-background);
    --p-tabs-tab-active-color: var(--p-button-primary-color);
    --p-tabs-tab-active-border-color-color: var(--p-button-primary-border-color);
}

</style>
