<template>
    <header
        class="fixed top-0 left-0 right-0 z-50 h-20 bg-gradient-to-r from-primary-700 via-primary-600 to-primary-500 backdrop-blur-md transition-all duration-200"
        :class="{ '-translate-y-full': isHidden }"
    >
        <nav class="w-full px-4">
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
                    <NavLink
                        v-for="item in mainNavLeft"
                        :key="item.label"
                        :to="item.to"
                        link-class="text-white border-transparent border-b-2 hover:border-white px-3 py-2 text-lg font-medium"
                        active-class="text-white border-b-2 border-white"
                    >
                        {{ item.label }}
                    </NavLink>

                    <div class="relative">
                        <button
                            @click="isInfoDropdownOpen = !isInfoDropdownOpen"
                            class="text-white border-transparent border-b-2 hover:border-white px-3 py-2 text-lg font-medium flex items-center gap-1"
                            :class="{ 'border-white': isInfoDropdownOpen || isInfoActive }"
                        >
                            Informace
                            <iconify-icon
                                :inline="true"
                                icon="mdi:chevron-down"
                                class="transition-transform"
                                :class="{ 'rotate-180': isInfoDropdownOpen }"
                            />
                        </button>
                        <Transition name="dropdown">
                            <div
                                v-if="isInfoDropdownOpen"
                                class="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg overflow-hidden z-50"
                            >
                                <router-link
                                    v-for="item in infoItems"
                                    :key="item.label"
                                    :to="item.to"
                                    class="block px-4 py-3 text-gray-700 hover:bg-primary-50 transition-colors"
                                    @click="isInfoDropdownOpen = false"
                                >
                                    {{ item.label }}
                                </router-link>
                            </div>
                        </Transition>
                    </div>

                    <NavLink
                        v-for="item in mainNavRight"
                        :key="item.label"
                        :to="item.to"
                        link-class="text-white border-transparent border-b-2 hover:border-white px-3 py-2 text-lg font-medium"
                        active-class="text-white border-b-2 border-white"
                    >
                        {{ item.label }}
                    </NavLink>

                    <div class="relative">
                        <button
                            @click="isAboutDropdownOpen = !isAboutDropdownOpen"
                            class="text-white border-transparent border-b-2 hover:border-white px-3 py-2 text-lg font-medium flex items-center gap-1"
                            :class="{ 'border-white': isAboutDropdownOpen || isAboutActive }"
                        >
                            O nás
                            <iconify-icon
                                :inline="true"
                                icon="mdi:chevron-down"
                                class="transition-transform"
                                :class="{ 'rotate-180': isAboutDropdownOpen }"
                            />
                        </button>
                        <Transition name="dropdown">
                            <div
                                v-if="isAboutDropdownOpen"
                                class="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-50"
                            >
                                <router-link
                                    v-for="item in aboutMenuItems"
                                    :key="item.label"
                                    :to="item.to"
                                    class="block px-4 py-3 text-gray-700 hover:bg-primary-50 transition-colors"
                                    @click="isAboutDropdownOpen = false"
                                >
                                    {{ item.label }}
                                </router-link>
                            </div>
                        </Transition>
                    </div>
                </div>

                <!-- Mobile menu button -->
                <div class="md:hidden">
                    <Button
                        @click="isMobileMenuOpen = !isMobileMenuOpen"
                        text
                        rounded
                        class="menu-button text-white p-2 transition-all duration-300"
                        aria-label="Otevřít menu"
                    >
                        <template #icon>
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
                        </template>
                    </Button>
                </div>
            </div>

            <Transition name="fade">
                <div
                    v-if="isMobileMenuOpen"
                    class="fixed inset-0 bg-black/70 z-40 md:hidden"
                    @click="isMobileMenuOpen = false"
                ></div>
            </Transition>

            <!-- Mobile Menu -->
            <Transition name="slide">
                <div
                    v-if="isMobileMenuOpen"
                    class="fixed top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-primary-700 via-primary-600 to-primary-500 z-50 md:hidden overflow-y-auto"
                >
                    <div class="flex justify-between items-center h-20 px-4 bg-primary-800/50 backdrop-blur-sm">
                        <span class="text-white text-xl font-semibold">Menu</span>
                        <Button
                            @click="isMobileMenuOpen = false"
                            text
                            rounded
                            class="menu-button text-white p-3 transition-all duration-300"
                            aria-label="Zavřít menu"
                        >
                            <template #icon>
                                <svg
                                    class="h-7 w-7"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    stroke-width="2.5"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </template>
                        </Button>
                    </div>

                    <nav class="flex flex-col space-y-2 p-6 min-h-screen">
                        <NavLink
                            v-for="item in mainNavLeft"
                            :key="item.label"
                            :to="item.to"
                            link-class="block px-4 py-3 text-lg font-medium text-white hover:bg-white/10 rounded-lg transition-all min-h-[44px]"
                            exact-active-class="bg-white/20"
                            @click="isMobileMenuOpen = false"
                        >
                            {{ item.label }}
                        </NavLink>

                        <div>
                            <button
                                @click="isMobileInfoDropdownOpen = !isMobileInfoDropdownOpen"
                                class="w-full flex justify-between items-center px-4 py-3 text-lg font-medium text-white hover:bg-white/10 rounded-lg transition-all min-h-[44px]"
                                :class="{ 'bg-white/20': isMobileInfoDropdownOpen || isInfoActive }"
                            >
                                Informace
                                <iconify-icon
                                    :inline="true"
                                    icon="mdi:chevron-down"
                                    class="transition-transform"
                                    :class="{ 'rotate-180': isMobileInfoDropdownOpen }"
                                />
                            </button>
                            <Transition name="slide-down">
                                <div
                                    v-if="isMobileInfoDropdownOpen"
                                    class="ml-4 mt-2 space-y-2"
                                >
                                    <router-link
                                        v-for="item in infoItems"
                                        :key="item.label"
                                        :to="item.to"
                                        class="block px-4 py-2 text-base text-white hover:bg-white/10 rounded-lg transition-all"
                                        @click="isMobileMenuOpen = false; isMobileInfoDropdownOpen = false"
                                    >
                                        {{ item.label }}
                                    </router-link>
                                </div>
                            </Transition>
                        </div>

                        <NavLink
                            v-for="item in mainNavRight"
                            :key="item.label"
                            :to="item.to"
                            link-class="block px-4 py-3 text-lg font-medium text-white hover:bg-white/10 rounded-lg transition-all min-h-[44px]"
                            exact-active-class="bg-white/20"
                            @click="isMobileMenuOpen = false"
                        >
                            {{ item.label }}
                        </NavLink>

                        <div>
                            <button
                                @click="isMobileAboutDropdownOpen = !isMobileAboutDropdownOpen"
                                class="w-full flex justify-between items-center px-4 py-3 text-lg font-medium text-white hover:bg-white/10 rounded-lg transition-all min-h-[44px]"
                                :class="{ 'bg-white/20': isMobileAboutDropdownOpen || isAboutActive }"
                            >
                                O nás
                                <iconify-icon
                                    :inline="true"
                                    icon="mdi:chevron-down"
                                    class="transition-transform"
                                    :class="{ 'rotate-180': isMobileAboutDropdownOpen }"
                                />
                            </button>
                            <Transition name="slide-down">
                                <div
                                    v-if="isMobileAboutDropdownOpen"
                                    class="ml-4 mt-2 space-y-2"
                                >
                                    <router-link
                                        v-for="item in aboutMenuItems"
                                        :key="item.label"
                                        :to="item.to"
                                        class="block px-4 py-2 text-base text-white hover:bg-white/10 rounded-lg transition-all"
                                        @click="isMobileMenuOpen = false; isMobileAboutDropdownOpen = false"
                                    >
                                        {{ item.label }}
                                    </router-link>
                                </div>
                            </Transition>
                        </div>
                    </nav>
                </div>
            </Transition>
        </nav>
    </header>
</template>

<script setup lang="ts">
import { useScrollHeader } from '@/composables/useScrollHeader'
import { Button, Image } from 'primevue'
import { computed, ref } from 'vue'
import type { RouteLocationRaw } from 'vue-router'
import { useRoute } from 'vue-router'
import NavLink from './NavLink.vue'

const isMobileMenuOpen = ref(false)
const isAboutDropdownOpen = ref(false)
const isMobileAboutDropdownOpen = ref(false)
const isInfoDropdownOpen = ref(false)
const isMobileInfoDropdownOpen = ref(false)
const route = useRoute()

const { isHidden } = useScrollHeader()

const isAboutActive = computed(() => {
    return route.name === 'Organizer' || route.name === 'Links' || route.name === 'Contact'
})

const isInfoActive = computed(() => {
    return route.name === 'Info'
})

interface NavItem {
    to: RouteLocationRaw
    label: string
}

// TODO: Prozatím ponechat zde, ale bylo by vhodné přesunout do databáze a načítat dynamicky
const infoItems: NavItem[] = [
    { to: { name: 'Info', hash: '#adults' }, label: 'Mulda pro dospělé' },
    { to: { name: 'Info', hash: '#kids' }, label: 'Muldička pro děti' }
]

const navItems: NavItem[] = [
    { to: { name: 'Home' }, label: 'Domů' },
    { to: { name: 'Signup' }, label: 'Registrace' },
    { to: { name: 'Results' }, label: 'Výsledky' }
]

const mainNavLeft = computed(() => navItems.slice(0, 1))
const mainNavRight = computed(() => navItems.slice(1))

const aboutMenuItems: NavItem[] = [
    { to: { name: 'Organizer' }, label: 'Pořadatel' },
    { to: { name: 'Links' }, label: 'Odkazy a ohlasy' },
    { to: { name: 'Contact' }, label: 'Kontakt' }
]
</script>

<!-- TODO: Pořešit styly - dá se aplikovat styly přímo z tailwindu? případně použití scss?? -->
<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
    transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
    transform: translateX(100%);
}

.dropdown-enter-active,
.dropdown-leave-active {
    transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}

.slide-down-enter-active,
.slide-down-leave-active {
    transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
    opacity: 0;
    max-height: 0;
    overflow: hidden;
}

.slide-down-enter-to,
.slide-down-leave-from {
    max-height: 500px;
}

.p-button-text:not(:disabled) {
    transition: all 0.3s ease;
}

.p-button-text:not(:disabled):hover {
    transition: all 0.3s ease;
}

/* Přepsání PrimeVue Button stylů pro hamburger a close ikony */
:deep(.menu-button.p-button) {
    color: white;
}

:deep(.menu-button.p-button:hover svg) {
    color: black;
    stroke: currentColor;
    transition: color 0.3s ease;
}

:deep(.menu-button.p-button svg) {
    color: white;
    stroke: currentColor;
    transition: color 0.3s ease;
}
</style>
