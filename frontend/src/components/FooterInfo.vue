<template>
    <footer class="footer">
        <div class="container py-12 md:py-14">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10 pb-8 border-b border-white/10">
                <div class="flex items-center">
                    <Image
                        src="/logo/mulda_logo.png"
                        alt="Logo Soběšická Mulda"
                        image-class="h-10 w-auto"
                    />
                </div>
                <SocialLinks :links="socialLinks" />
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <FooterSection
                    v-for="section in footerSections"
                    :key="section.title"
                    :title="section.title"
                    :links="section.links"
                />
            </div>
        </div>

        <div class="copyright">
            <div class="container py-4 text-center text-white/50 text-sm">
                {{ copyright }}
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { useFooterData } from '@/composables/useFooterData'
import { Image } from 'primevue'
import FooterSection from './footer/FooterSection.vue'
import SocialLinks from './footer/SocialLinks.vue'

const { socialLinks, footerSections, copyright } = useFooterData()
</script>
