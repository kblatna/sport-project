<template>
    <SectionWrapper
        padding-y="md"
        class="container"
    >
        <SectionHeader :title="content.pageTitle" />
        <div class="text-center mb-5">
            <h3 class="font-bold mb-5">
                {{ content.subtitle }}
            </h3>
            <p>{{ content.categoryDescription }}</p>
        </div>

        <div class="rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 md:p-10 border border-gray-200/60">
            <CategoryDataTable
                id="categoryTable"
                :data="content.categoryTable"
            />
        </div>
    </SectionWrapper>

    <!-- Map with tabs -->
    <SectionWrapper
        padding-y="md"
        background="gray"
    >
        <div class="container">
            <SectionHeader
                :title="content.mapSectionTitle"
                :show-divider="false"
            />

            <Tabs
                value="0"
                class="transparent-tabs w-full"
            >
                <TabList>
                    <Tab
                        v-for="(tab, index) in content.mapTabs"
                        :key="index"
                        :value="String(index)"
                    >
                        {{ tab.label }}
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel
                        v-for="(tab, index) in content.mapTabs"
                        :key="index"
                        :value="String(index)"
                    >
                        <ImageLinkCard
                            :href="tab.mapUrl"
                            :src="tab.imageUrl"
                            :alt="tab.alt"
                        />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    </SectionWrapper>

    <!-- Registration & Payment -->
    <SectionWrapper
        padding-y="md"
        class="container"
    >
        <SectionHeader
            title="Startovné"
            :show-divider="false"
        />
        <RegistrationPaymentInfo
            :title="content.registrationPayment.title"
            :description="content.registrationPayment.description"
            :fees="content.registrationPayment.fees"
            :bank-account="content.registrationPayment.bankAccount"
            :variable-symbol-note="content.registrationPayment.variableSymbolNote"
        />
    </SectionWrapper>

    <!-- Attendance -->
    <SectionWrapper
        padding-y="md"
        background="gray"
    >
        <div class="container">
            <SectionHeader
                :title="content.attendance.title"
                :show-divider="false"
            />
            <ContentImageCard
                :image-src="content.attendance.imageSrc"
                :image-position="content.attendance.imagePosition"
            >
                <template #default>
                    <div class="space-y-4">
                        <p
                            v-for="(paragraph, index) in content.attendance.content"
                            :key="index"
                            v-html="paragraph"
                        ></p>
                    </div>
                </template>
            </ContentImageCard>
        </div>
    </SectionWrapper>

    <!-- Prizes -->
    <SectionWrapper
        v-if="content.prizes"
        padding-y="md"
        class="container"
    >
        <SectionHeader
            :title="content.prizes.title"
            :show-divider="false"
        />
        <ContentImageCard :image-src="content.prizes.imageSrc">
            <template #default>
                <p v-html="content.prizes.content"></p>
            </template>
        </ContentImageCard>
    </SectionWrapper>

    <!-- Awards -->
    <SectionWrapper
        padding-y="md"
        background="gray"
    >
        <div class="container">
            <SectionHeader
                :title="content.awards.title"
                :show-divider="false"
            />
            <ContentImageCard
                :image-src="content.awards.imageSrc"
                :image-position="content.awards.imagePosition"
            >
                <template #default>
                    <div class="space-y-4">
                        <p
                            v-for="(paragraph, index) in content.awards.content"
                            :key="index"
                            v-html="paragraph"
                        ></p>
                    </div>
                </template>
            </ContentImageCard>
        </div>
    </SectionWrapper>
</template>

<script setup lang="ts">
import ImageLinkCard from '@/components/ImageLinkCard.vue'
import SectionHeader from '@/components/SectionHeader.vue'
import SectionWrapper from '@/components/SectionWrapper.vue'
import type { InfoPageVariant } from '@/interface/InfoPageContent'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primevue'
import CategoryDataTable from './CategoryDataTable.vue'
import ContentImageCard from './ContentImageCard.vue'
import RegistrationPaymentInfo from './RegistrationPaymentInfo.vue'

defineProps<{
    content: InfoPageVariant
}>()
</script>

<style scoped>
/* PrimeVue Tabs styles */
.p-tabpanels {
    --p-tabs-tabpanel-background: rgb(249 250 251 / var(--tw-bg-opacity, 1));
}

.p-tablist-content {
    margin-bottom: 0.5rem;
}

.p-tablist {
    --p-tabs-tablist-background: rgb(249 250 251 / var(--tw-bg-opacity, 1));
}

::v-deep .p-tablist-tab-list {
    justify-content: center;
    gap: 1.5rem;
    --p-tabs-tablist-border-width: 0;
    margin-bottom: 20px;
}

::v-deep .p-tablist-active-bar,
::v-deep .p-tabview .p-tabview-ink-bar,
::v-deep .p-tabview .p-tabview-nav::after {
    display: none;
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
    --p-tabs-tab-active-border-color: transparent;
}
</style>
