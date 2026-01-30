<template>
    <SectionWrapper>
        <LoadingSpinner v-if="loading" />

        <template v-else-if="pageContent">
            <SectionHeader :title="pageContent.pageTitle" />

            <div
                v-if="pageContent.logos && pageContent.logos.length > 0"
                class="max-w-xl mx-auto mb-8 grid grid-cols-1 md:grid-cols-2 gap-5 auto-rows-[8rem] place-items-center"
            >
                <img
                    v-for="(logo, index) in pageContent.logos"
                    :key="index"
                    :src="logo.src"
                    :alt="logo.alt || `Logo ${index + 1}`"
                    class="max-w-40 h-full object-contain w-max-full"
                />
            </div>

            <SafeHtml
                v-if="pageContent.introText"
                :content="pageContent.introText"
                class="text-center text-lg text-gray-700 mb-8 max-w-2xl mx-auto"
            />

            <Card class="w-full max-w-4xl mx-auto">
                <template #title>
                    <div class="flex justify-center items-center text-center mb-5 gap-2">
                        <span>{{ pageContent.cardTitle }}</span>
                        <iconify-icon
                            :inline="true"
                            icon="mdi:bicycle"
                        />
                    </div>
                </template>
                <template #content>
                    <SignupForm />
                </template>
            </Card>
        </template>

        <ErrorMessage
            v-else-if="error"
            :message="error"
        />
    </SectionWrapper>
</template>

<script setup lang="ts">
import ErrorMessage from '@/components/ErrorMessage.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import SafeHtml from '@/components/SafeHtml.vue'
import SectionHeader from '@/components/SectionHeader.vue'
import SectionWrapper from '@/components/SectionWrapper.vue'
import type { SignupPageContent } from '@/interface/SignupPageContent.interface'
import { signupPageContent } from '@/services/api/services'
import Card from 'primevue/card'
import { onMounted, ref } from 'vue'
import SignupForm from './components/SignupForm.vue'

const pageContent = ref<SignupPageContent | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
    try {
        const response = await signupPageContent.getAll()
        pageContent.value = response as SignupPageContent
    } catch (err) {
        console.error('Error loading signup page content:', err)
        error.value = 'Nepodařilo se načíst obsah stránky'
    } finally {
        loading.value = false
    }
})
</script>
