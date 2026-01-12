<template>
    <footer class="footer text-white">
        <div class="container py-12">
            <div class="grid grid-cols-2 items-center mb-10">
                <div class="flex items-center">
                    <Image
                        src="/logo/mulda_logo.png"
                        alt="Logo Soběšická Mulda"
                        image-class="h-10 w-auto"
                    />
                </div>
                <SocialLinks :links="socialLinks" />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <FooterSection
                    v-for="section in footerSections"
                    :key="section.title"
                    :title="section.title"
                    :links="section.links"
                />
            </div>
        </div>

        <div class="copyright border-t border-gray-700">
            <div class="container-app py-4 text-center text-gray-400 text-sm">
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
