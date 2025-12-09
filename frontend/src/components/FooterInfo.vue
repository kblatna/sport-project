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
                <div class="flex justify-end space-x-4">
                    <a
                        href="https://www.facebook.com/profile.php?id=100057750875910"
                        target="_blank"
                        class="text-gray-400 hover:text-white transition-colors"
                    >
                        <iconify-icon
                            :inline="true"
                            class="text-3xl"
                            icon="mdi:facebook"
                        />
                    </a>
                    <a
                        href="https://www.instagram.com/sobesicka_mulda/"
                        target="_blank"
                        class="text-gray-400 hover:text-white transition-colors"
                    >
                        <iconify-icon
                            :inline="true"
                            class="text-3xl"
                            icon="mdi:instagram"
                        />
                    </a>
                    <a
                        href="https://www.youtube.com/results?search_query=sob%C4%9B%C5%A1ick%C3%A1+mulda"
                        target="_blank"
                        class="text-gray-400 hover:text-white transition-colors"
                    >
                        <iconify-icon
                            :inline="true"
                            class="text-3xl"
                            icon="mdi:youtube"
                        />
                    </a>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div>
                    <h6 class="text-lg font-semibold text-white mb-4 uppercase">
                        Informace
                    </h6>
                    <div class="space-y-2">
                        <router-link
                            :to="{ name: 'Home' }"
                            class="block text-gray-300 hover:text-white transition-colors"
                        >
                            Mulda
                        </router-link>
                        <router-link
                            :to="{ name: 'Home' }"
                            class="block text-gray-300 hover:text-white transition-colors"
                        >
                            Muldička
                        </router-link>
                        <router-link
                            :to="{ name: 'Signup' }"
                            class="block text-gray-300 hover:text-white transition-colors"
                        >
                            Registrace
                        </router-link>
                    </div>
                </div>

                <div>
                    <h6 class="text-lg font-semibold text-white mb-4 uppercase">
                        Kontakty
                    </h6>
                    <div class="space-y-2">
                        <router-link
                            :to="{ name: 'Organizer' }"
                            class="block text-gray-300 hover:text-white transition-colors"
                        >
                            Pořadatel
                        </router-link>
                        <router-link
                            :to="{ name: 'Links' }"
                            class="block text-gray-300 hover:text-white transition-colors"
                        >
                            Odkazy
                        </router-link>
                    </div>
                </div>

                <div>
                    <h6 class="text-lg font-semibold text-white mb-4 uppercase">
                        Rychlé odkazy
                    </h6>
                    <div class="space-y-2">
                        <router-link
                            :to="{ name: 'Home' }"
                            class="block text-gray-300 hover:text-white transition-colors"
                        >
                            Domů
                        </router-link>
                        <router-link
                            :to="{ name: 'Results' }"
                            class="block text-gray-300 hover:text-white transition-colors"
                        >
                            Výsledky
                        </router-link>
                        <router-link
                            :to="{ name: 'Signup' }"
                            class="block text-gray-300 hover:text-white transition-colors"
                        >
                            Registrace
                        </router-link>
                        <router-link
                            :to="{ name: 'Organizer' }"
                            class="block text-gray-300 hover:text-white transition-colors"
                        >
                            O nás
                        </router-link>
                    </div>
                </div>
            </div>
        </div>

        <div class="copyright border-t border-gray-700">
            <div class="container-app py-4 text-center text-gray-400 text-sm">
                © 2025 Kateřina Blatná. Všechna práva vyhrazena.
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { Image } from 'primevue'

</script>
