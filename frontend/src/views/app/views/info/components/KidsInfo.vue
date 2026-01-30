<template>
    <SectionWrapper
        id="kids"
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

    <!-- Map without tabs + category description -->
    <SectionWrapper
        padding-y="md"
        background="gray"
    >
        <div class="container">
            <SectionHeader
                v-if="content.mapSectionTitle"
                :title="content.mapSectionTitle"
                :show-divider="false"
            />

            <ImageLinkCard
                :href="content.mapTabs[0].mapUrl"
                :src="content.mapTabs[0].imageUrl"
                :alt="content.mapTabs[0].alt"
            />

            <div
                v-if="content.descriptionTrack"
                class="mt-8"
            >
                <h3 class="text-xl font-semibold mb-4">
                    {{ content.descriptionTrackTitle }}
                </h3>
                <div class="space-y-4">
                    <p v-html="content.descriptionTrack.category1"></p>
                    <p v-html="content.descriptionTrack.category2"></p>
                    <p v-html="content.descriptionTrack.category3"></p>
                </div>
            </div>
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

    <!-- Awards -->
    <SectionWrapper
        padding-y="md"
        class="container"
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
import CategoryDataTable from './CategoryDataTable.vue'
import ContentImageCard from './ContentImageCard.vue'
import RegistrationPaymentInfo from './RegistrationPaymentInfo.vue'

defineProps<{
    content: InfoPageVariant
}>()
</script>
