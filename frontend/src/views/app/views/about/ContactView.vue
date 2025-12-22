<template>
    <LoadingSpinner v-if="isLoading" />
    <ErrorMessage
        v-else-if="error"
        :message="error"
    />

    <SectionWrapper
        class="container"
        padding-y="md"
    >
        <SectionHeader title="Kontakty" />
        <p class="mb-10">
            Oficiální kontaktní adresa závodu je <a href="mailto:mulda@czex.cz">mulda@czex.cz</a>. Zprávu na ni poslanou si přečtou všichni hlavní organizátoři a budeme rádi, pokud jí využijete, neb kontakt e-mailem preferujeme.
            Pokud rádi píšete perem na papír, své vzkazy posílejte na adresu našeho spolku.

            Informace můžete příp. získat též na níže uvedeném čísle.

            Případně nás kontaktujte tímto jednoduchým formulářem:
        </p>
        <div class="flex flex-col md:flex-row max-w-3xl mx-auto justify-center gap-8 md:gap-32">
            <div>
                <h3 class="text-lg font-semibold mb-3">
                    Sídlo organizace
                </h3>
                <address class="not-italic space-y-1">
                    <div>Defekt z.s.</div>
                    <div>Bratří Mrštíků 24</div>
                    <div>Brno - Husovice, 614 00</div>
                </address>

                <a
                    href="https://www.google.com/maps/search/Bratří+Mrštíků+24+Brno"
                    target="_blank"
                    rel="noopener"
                    class="inline-flex items-center mt-4 hover:underline"
                >
                    <iconify-icon
                        icon="mdi:map-marker"
                        :inline="true"
                        class="h-4 w-4 mr-2 text-current"
                        aria-hidden="true"
                    />
                    Zobrazit na mapě
                </a>
            </div>

            <div>
                <h3 class="text-lg font-semibold text-gray-900 mb-3">
                    Kontakt
                </h3>
                <p class="text-gray-700">
                    <a
                        href="mailto:mulda@czex.cz"
                        class="text-primary-600 hover:underline"
                    >mulda@czex.cz</a>
                </p>
                <p class="text-gray-700 mt-2">
                    <a
                        href="tel:+420723018497"
                        class="text-primary-600 hover:underline"
                    >723 018 497</a>
                </p>

                <div class="mt-4 flex items-center gap-4">
                    <a
                        href="#"
                        aria-label="Facebook"
                    >
                        <iconify-icon
                            icon="mdi:facebook"
                            :inline="true"
                            class="h-5 w-5 text-current"
                            aria-hidden="true"
                        />
                    </a>

                    <a
                        href="#"
                        aria-label="Instagram"
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
    </SectionWrapper>

    <SectionWrapper
        padding-y="md"
        background="gray"
    >
        <SectionHeader title="Napište nám" />

        <Card class="w-full max-w-4xl mx-auto">
            <template #content>
                <ContactForm />
            </template>
        </Card>
    </SectionWrapper>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import ErrorMessage from '../../../../components/ErrorMessage.vue'
import LoadingSpinner from '../../../../components/LoadingSpinner.vue'
import SectionWrapper from '../../../../components/SectionWrapper.vue'
import ContactForm from './components/ContactForm.vue'
import SectionHeader from '../../../../components/SectionHeader.vue'
import { Card } from 'primevue'

const isLoading = ref<boolean>(false)
const error = ref<string>('')

</script>
