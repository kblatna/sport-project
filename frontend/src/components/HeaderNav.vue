<template>
    <header class="bg-white shadow-sm border-b border-gray-200">
        <nav class="container-app">
            <div class="flex justify-between items-center h-16">
                <!-- Logo -->
                <div class="flex items-center">
                    <router-link
                        to="/"
                        class="flex items-center space-x-2"
                    >
                        <img
                            src="/logo/mulda_logo.png"
                            alt="Mulda Logo"
                            class="h-8 w-auto"
                        />
                        <span class="text-xl font-bold text-gray-900">Mulda</span>
                    </router-link>
                </div>

                <!-- Desktop Menu -->
                <div class="hidden md:flex items-center space-x-8">
                    <router-link
                        to="/"
                        class="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
                        active-class="text-primary-600 border-b-2 border-primary-600"
                    >
                        Domů
                    </router-link>
                    <router-link
                        to="/results"
                        class="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
                        active-class="text-primary-600 border-b-2 border-primary-600"
                    >
                        Výsledky
                    </router-link>
                    <router-link
                        to="/signup"
                        class="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
                        active-class="text-primary-600 border-b-2 border-primary-600"
                    >
                        Registrace
                    </router-link>
                    <router-link
                        to="/about"
                        class="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
                        active-class="text-primary-600 border-b-2 border-primary-600"
                    >
                        O nás
                    </router-link>
                </div>

                <!-- Mobile menu button -->
                <div class="md:hidden">
                    <button
                        @click="isMobileMenuOpen = !isMobileMenuOpen"
                        class="text-gray-700 hover:text-primary-600 p-2"
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

            <!-- Mobile Menu -->
            <div
                v-if="isMobileMenuOpen"
                class="md:hidden border-t border-gray-200 pt-4 pb-3 space-y-1"
            >
                <router-link
                    to="/"
                    @click="isMobileMenuOpen = false"
                    class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-colors"
                    active-class="text-primary-600 bg-primary-50"
                >
                    Domů
                </router-link>
                <router-link
                    to="/results"
                    @click="isMobileMenuOpen = false"
                    class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-colors"
                    active-class="text-primary-600 bg-primary-50"
                >
                    Výsledky
                </router-link>
                <router-link
                    to="/signup"
                    @click="isMobileMenuOpen = false"
                    class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-colors"
                    active-class="text-primary-600 bg-primary-50"
                >
                    Registrace
                </router-link>
                <router-link
                    to="/about"
                    @click="isMobileMenuOpen = false"
                    class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-colors"
                    active-class="text-primary-600 bg-primary-50"
                >
                    O nás
                </router-link>
            </div>
        </nav>
    </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isMobileMenuOpen = ref(false)
</script>
