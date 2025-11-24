<template>
    <header class="header">
        <nav class="container">
            <div class="flex justify-between items-center h-20">
                <div class="flex items-center">
                    <router-link
                        to="/"
                        class="flex items-center space-x-2"
                    >
                        <Image
                            src="/logo/mulda_logo.png"
                            alt="Logo Soběšická Mulda"
                            image-class="h-10 w-auto"
                        />
                    </router-link>
                </div>

                <div class="hidden md:flex items-center space-x-8">
                    <router-link
                        to="/"
                        class="text-white border-transparent border-b-2 hover:border-white px-3 py-2 text-lg font-medium"
                        active-class="text-white border-b-2 border-white"
                    >
                        Domů
                    </router-link>
                    <router-link
                        to="/results"
                        class="text-white border-transparent border-b-2 hover:border-white px-3 py-2 text-lg font-medium"
                        active-class="text-white border-b-2 border-white"
                    >
                        Výsledky
                    </router-link>
                    <router-link
                        to="/signup"
                        class="text-white border-transparent border-b-2 hover:border-white px-3 py-2 text-lg font-medium"
                        active-class="text-white border-b-2 border-white"
                    >
                        Registrace
                    </router-link>
                    <router-link
                        to="/about/organizer"
                        class="text-white border-transparent border-b-2 hover:border-white px-3 py-2 text-lg font-medium"
                        active-class="text-white border-b-2 border-white"
                    >
                        O nás
                    </router-link>
                </div>

                <!-- Mobile menu button -->
                <div class="md:hidden">
                    <button
                        @click="isMobileMenuOpen = !isMobileMenuOpen"
                        class="text-white hover:text-white p-2"
                        aria-label="Otevřít menu"
                    >
                        <svg
                            class="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                v-if="!isMobileMenuOpen"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                            <path
                                v-else
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <!--TODO: rozhodnout jak bude vypadat hover a active na mobilu (podtržení, background, jiná barva?)-->
            <!-- Mobile Menu -->
            <div
                v-if="isMobileMenuOpen"
                class="md:hidden py-3 space-y-2"
            >
                <router-link
                    to="/"
                    @click="isMobileMenuOpen = false"
                    class="block px-3 py-2 text-base font-medium text-white border-transparent border-b-2 hover:border-white"
                    exact-active-class="text-white hover:border-b-2 hover:border-white"
                >
                    Domů
                </router-link>
                <router-link
                    to="/results"
                    @click="isMobileMenuOpen = false"
                    class="block px-3 py-2 text-base font-medium text-white border-transparent border-b-2 hover:border-white"
                    exact-active-class="border-white"
                >
                    Výsledky
                </router-link>
                <router-link
                    to="/signup"
                    @click="isMobileMenuOpen = false"
                    class="block px-3 py-2 text-base font-medium text-white hover:text-primary-600 hover:bg-gray-50 transition-colors rounded-md"
                    active-class="text-primary-600 bg-primary-50"
                >
                    Registrace
                </router-link>
                <router-link
                    to="/about/organizer"
                    @click="isMobileMenuOpen = false"
                    class="block px-3 py-2 text-base font-medium text-white hover:text-teal-600  transition-colors rounded-md"
                    exact-active-class="text-teal-600"
                >
                    O nás
                </router-link>
            </div>
        </nav>
    </header>
</template>

<script setup lang="ts">
import { Image } from 'primevue'
import { ref } from 'vue'

const isMobileMenuOpen = ref(false)
</script>
