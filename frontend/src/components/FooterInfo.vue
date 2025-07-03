<template>
    <footer class="bg-gray-900 text-white">
        <div class="container-app py-12">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <!-- Informace -->
                <div>
                    <h6 class="text-lg font-semibold text-white mb-4 uppercase">
                        Informace
                    </h6>
                    <div class="space-y-2 text-gray-300">
                        <div>Mulda</div>
                        <div>Muldička</div>
                        <div>Registrace</div>
                    </div>
                </div>

                <!-- Kontakty -->
                <div>
                    <h6 class="text-lg font-semibold text-white mb-4 uppercase">
                        Kontakty
                    </h6>
                    <div class="space-y-2 text-gray-300">
                        <div>Pořadatel</div>
                        <div>Odkazy</div>
                    </div>
                </div>

                <!-- Rychlé odkazy -->
                <div>
                    <h6 class="text-lg font-semibold text-white mb-4 uppercase">
                        Rychlé odkazy
                    </h6>
                    <div class="space-y-2">
                        <router-link
                            to="/"
                            class="block text-gray-300 hover:text-white transition-colors"
                        >
                            Domů
                        </router-link>
                        <router-link
                            to="/results"
                            class="block text-gray-300 hover:text-white transition-colors"
                        >
                            Výsledky
                        </router-link>
                        <router-link
                            to="/signup"
                            class="block text-gray-300 hover:text-white transition-colors"
                        >
                            Registrace
                        </router-link>
                        <router-link
                            to="/about"
                            class="block text-gray-300 hover:text-white transition-colors"
                        >
                            O nás
                        </router-link>
                    </div>
                </div>

                <!-- Logo a popis -->
                <div>
                    <div class="flex items-center space-x-2 mb-4">
                        <img
                            src="/logo/mulda_logo.png"
                            alt="Mulda Logo"
                            class="h-8 w-auto"
                        />
                        <span class="text-xl font-bold">Mulda</span>
                    </div>
                    <p class="text-gray-300 text-sm">
                        Sportovní aplikace pro správu závodů a výsledků.
                    </p>
                </div>
            </div>
        </div>

        <!-- Copyright -->
        <div class="border-t border-gray-700 bg-gray-900">
            <div class="container-app py-4">
                <div class="text-center text-gray-400 text-sm">
                    © 2025 Kateřina Blatná. Všechna práva vyhrazena.
                </div>
            </div>
        </div>
    </footer>
</template>
