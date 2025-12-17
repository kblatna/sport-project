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
        <p>
            Oficiální kontaktní adresa závodu je mulda@czex.cz. Zprávu na ni poslanou si přečtou všichni hlavní organizátoři a budeme rádi, pokud jí využijete, neb kontakt e-mailem preferujeme.
            Pokud rádi píšete perem na papír, své vzkazy posílejte na adresu Defekt z.s., bratří Mrštíků 24, Brno - Husovice, 614 00.

            Informace můžete příp. získat též na čísle 723 018 497.

            Případně nás kontaktujte tímto jednoduchým formulářem:
        </p>
        <div class="flex max-w-3xl mx-auto justify-center gap-32">
            <div>
                <h3 class="text-lg font-semibold text-gray-900 mb-3">
                    Sídlo organizace
                </h3>
                <address class="not-italic text-gray-700 space-y-1">
                    <div>Defekt z.s.</div>
                    <div>Bratří Mrštíků 24</div>
                    <div>Brno - Husovice, 614 00</div>
                </address>

                <a
                    href="https://www.google.com/maps/search/Bratří+Mrštíků+24+Brno"
                    target="_blank"
                    rel="noopener"
                    class="inline-flex items-center mt-4 text-primary-600 hover:underline"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 mr-2"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                            d="M12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"
                        />
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                            d="M19.5 10.5c0 6.5-7.5 11-7.5 11s-7.5-4.5-7.5-11a7.5 7.5 0 1 1 15 0z"
                        />
                    </svg>
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
                        class="text-gray-600 hover:text-primary-600"
                        aria-label="Facebook"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.99H7.898v-2.888h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.63.772-1.63 1.562v1.874h2.773l-.443 2.888h-2.33v6.99C18.343 21.128 22 16.99 22 12z" />
                        </svg>
                    </a>

                    <a
                        href="#"
                        class="text-gray-600 hover:text-primary-600"
                        aria-label="Instagram"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 6.5A4.5 4.5 0 1 0 16.5 13 4.5 4.5 0 0 0 12 8.5zm6.5-3a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM12 10.5A1.5 1.5 0 1 1 10.5 12 1.5 1.5 0 0 1 12 10.5z" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    </SectionWrapper>

    <SectionWrapper
        padding-y="md"
        background="gray"
    >
        <div class="container px-4 sm:px-6 lg:px-8">
            <ContactForm />
        </div>
    </SectionWrapper>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import ErrorMessage from '../../../../components/ErrorMessage.vue'
import LoadingSpinner from '../../../../components/LoadingSpinner.vue'
import SectionWrapper from '../../../../components/SectionWrapper.vue'
import ContactForm from './components/ContactForm.vue'
import SectionHeader from '../../../../components/SectionHeader.vue'

const isLoading = ref<boolean>(false)
const error = ref<string>('')

</script>
