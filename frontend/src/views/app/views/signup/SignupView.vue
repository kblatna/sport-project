<template>
    <SectionWrapper class="container">
        <SectionHeader title="Přihláška na závod" />

        <div class="max-w-xl mx-auto mb-8 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-5 auto-rows-[8rem] place-items-center">
            <img
                :src="MuldaLogo"
                alt="Logo Mulda 2025"
                class="h-full object-contain"
            />

            <img
                :src="MuldickaLogo"
                alt="Logo Muldička 2025"
                class="h-full object-contain"
            />
        </div>

        <p class="text-center text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Přihlásit se předem na závody Soběšická Mulda a Autonova Muldička můžete <strong>do pátku 9. 10. do 23:59</strong>.
        </p>

        <Card class="w-full max-w-4xl mx-auto">
            <template #title>
                <div class="flex justify-center items-center text-center mb-5 gap-2">
                    <span>Údaje závodníka</span>
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
    </SectionWrapper>
</template>

<script setup lang="ts">
import Card from 'primevue/card'
import SignupForm from './components/SignupForm.vue'
import SectionWrapper from '@/components/SectionWrapper.vue'
import SectionHeader from '@/components/SectionHeader.vue'
import MuldaLogo from '/logo/mulda_logo_2025.png'
import MuldickaLogo from '/logo/muldicka_logo_2025.png'
</script>
