<template>
    <SectionWrapper
        class="container"
        padding-y="md"
    >
        <LoadingSpinner v-if="loading" />

        <template v-else-if="pageContent">
            <SectionHeader :title="pageContent.pageTitle" />
            <SafeHtml
                :content="pageContent.introText"
                tag="p"
                class="mb-10"
            />
            <div class="flex flex-col md:flex-row max-w-3xl mx-auto justify-center gap-8 md:gap-32">
                <div>
                    <h3 class="text-lg font-semibold mb-3">
                        {{ pageContent.addressSectionTitle }}
                    </h3>
                    <address class="not-italic space-y-1">
                        <div>{{ pageContent.address.organizationName }}</div>
                        <div>{{ pageContent.address.street }}</div>
                        <div>{{ pageContent.address.city }}, {{ pageContent.address.zipCode }}</div>
                    </address>

                    <a
                        v-if="pageContent.address.mapLink"
                        :href="pageContent.address.mapLink"
                        target="_blank"
                        rel="noopener"
                        class="inline-flex items-center mt-4"
                    >
                        <iconify-icon
                            icon="mdi:map-marker"
                            :inline="true"
                            class="h-4 w-4 mr-2 text-current"
                            aria-hidden="true"
                        />
                        {{ pageContent.showMap }}
                    </a>
                </div>

                <div>
                    <h3 class="text-lg font-semibold text-gray-900 mb-3">
                        {{ pageContent.contactSectionTitle }}
                    </h3>
                    <p class="text-gray-700">
                        <a
                            :href="`mailto:${pageContent.contactInfo.email}`"
                            class="text-primary-600"
                        >{{ pageContent.contactInfo.email }}</a>
                    </p>
                    <p class="text-gray-700 mt-2">
                        <a
                            :href="`tel:${pageContent.contactInfo.phone}`"
                            class="text-primary-600"
                        >{{ pageContent.contactInfo.phone }}</a>
                    </p>

                    <div class="mt-4 flex items-center gap-4">
                        <a
                            v-if="pageContent.contactInfo.facebook"
                            :href="pageContent.contactInfo.facebook"
                            aria-label="Facebook"
                            target="_blank"
                            rel="noopener"
                        >
                            <iconify-icon
                                icon="mdi:facebook"
                                :inline="true"
                                class="h-5 w-5 text-current"
                                aria-hidden="true"
                            />
                        </a>

                        <a
                            v-if="pageContent.contactInfo.instagram"
                            :href="pageContent.contactInfo.instagram"
                            aria-label="Instagram"
                            target="_blank"
                            rel="noopener"
                        >
                            <iconify-icon
                                icon="mdi:instagram"
                                :inline="true"
                                class="h-5 w-5 text-current"
                                aria-hidden="true"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </template>

        <ErrorMessage
            v-else-if="error"
            :message="error"
        />
    </SectionWrapper>

    <SectionWrapper
        padding-y="md"
        background="gray"
    >
        <SectionHeader :title="pageContent?.formSectionTitle || 'Napište nám'" />

        <Card class="w-full max-w-4xl mx-auto">
            <template #content>
                <ContactForm />
            </template>
        </Card>
    </SectionWrapper>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import SafeHtml from '@/components/SafeHtml.vue'
import SectionWrapper from '@/components/SectionWrapper.vue'
import ContactForm from './components/ContactForm.vue'
import SectionHeader from '@/components/SectionHeader.vue'
import { Card } from 'primevue'
import { contactPageContent } from '@/services/api/services'
import type { ContactPageContent } from '@/interface/ContactPageContent.interface'

const pageContent = ref<ContactPageContent | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
    try {
        const response = await contactPageContent.getAll()
        pageContent.value = response
    } catch (err) {
        console.error('Error loading contact page content:', err)
        error.value = 'Nepodařilo se načíst obsah stránky'
    } finally {
        loading.value = false
    }
})
</script>
