<template>
    <header
        :class="[
            'header sticky top-0 z-50 transform transition-transform duration-300',
            { '-translate-y-full': isHidden && !isMobileMenuOpen }
        ]"
    >
        <nav
            class="w-full px-4"
            aria-label="Hlavní navigace"
        >
            <div class="flex justify-between items-center h-20">
                <div class="flex items-center">
                    <LogoLink />
                </div>

                <div class="hidden md:flex items-center space-x-8">
                    <NavLinkList
                        :items="mainNavLeft"
                        link-class="header-nav-link text-white border-transparent border-b-2 hover:border-white px-3 py-2 text-lg font-medium"
                        active-class="text-white border-b-2 border-white"
                    />

                    <NavDropdown
                        label="Informace"
                        :items="infoItems"
                    />

                    <NavLinkList
                        :items="mainNavRight"
                        link-class="header-nav-link text-white border-transparent border-b-2 hover:border-white px-3 py-2 text-lg font-medium"
                        active-class="text-white border-b-2 border-white"
                    />

                    <NavDropdown
                        label="O nás"
                        :items="aboutMenuItems"
                        menu-class="absolute top-full mt-2 w-48 right-0 left-auto origin-top-right bg-white rounded-lg shadow-lg overflow-hidden z-50"
                    />
                </div>

                <!-- Mobile menu button -->
                <div class="md:hidden">
                    <Button
                        @click="toggleMobileMenu"
                        text
                        rounded
                        class="menu-button text-white p-2 transition-all duration-300"
                        :aria-label="isMobileMenuOpen ? 'Zavřít menu' : 'Otevřít menu'"
                        :aria-expanded="isMobileMenuOpen"
                        aria-controls="mobile-menu"
                    >
                        <template #icon>
                            <svg
                                class="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
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
        </nav>
    </header>

    <MobileMenu
        :open="isMobileMenuOpen"
        @update:open="val => isMobileMenuOpen = val"
        @close="closeMobileMenu"
    >
        <template #links>
            <NavLinkList
                :items="mainNavLeft"
                link-class="header-nav-link block px-4 py-3 text-lg font-medium text-white hover:bg-white/10 rounded-lg transition-all min-h-[44px]"
                @select="closeMobileMenu"
            />

            <div>
                <button
                    @click="toggleMobileInfoDropdown"
                    @keydown.escape="closeMobileInfoDropdown"
                    class="w-full flex justify-between items-center px-4 py-3 text-lg font-medium text-white hover:bg-white/10 rounded-lg transition-all min-h-[44px]"
                    :class="{ 'bg-white/20': isMobileInfoDropdownOpen || isInfoActive }"
                    :aria-expanded="isMobileInfoDropdownOpen"
                    aria-controls="mobile-info-submenu"
                >
                    Informace
                    <iconify-icon
                        :inline="true"
                        icon="mdi:chevron-down"
                        class="transition-transform"
                        :class="{ 'rotate-180': isMobileInfoDropdownOpen }"
                        aria-hidden="true"
                    />
                </button>
                <Transition name="slide-down">
                    <div
                        v-if="isMobileInfoDropdownOpen"
                        id="mobile-info-submenu"
                        class="ml-4 mt-2 space-y-2"
                    >
                        <router-link
                            v-for="item in infoItems"
                            :key="item.label"
                            :to="item.to"
                            class="block px-4 py-2 text-base text-white hover:bg-white/10 rounded-lg transition-all"
                            @click="handleMobileSubItemClick"
                        >
                            {{ item.label }}
                        </router-link>
                    </div>
                </Transition>
            </div>

            <NavLinkList
                :items="mainNavRight"
                link-class="header-nav-link block px-4 py-3 text-lg font-medium text-white hover:bg-white/10 rounded-lg transition-all min-h-[44px]"
                @select="closeMobileMenu"
            />

            <div>
                <button
                    @click="toggleMobileAboutDropdown"
                    @keydown.escape="closeMobileAboutDropdown"
                    class="w-full flex justify-between items-center px-4 py-3 text-lg font-medium text-white hover:bg-white/10 rounded-lg transition-all min-h-[44px]"
                    :class="{ 'bg-white/20': isMobileAboutDropdownOpen || isAboutActive }"
                    :aria-expanded="isMobileAboutDropdownOpen"
                    aria-controls="mobile-about-submenu"
                >
                    O nás
                    <iconify-icon
                        :inline="true"
                        icon="mdi:chevron-down"
                        class="transition-transform"
                        :class="{ 'rotate-180': isMobileAboutDropdownOpen }"
                        aria-hidden="true"
                    />
                </button>
                <Transition name="slide-down">
                    <div
                        v-if="isMobileAboutDropdownOpen"
                        id="mobile-about-submenu"
                        class="ml-4 mt-2 space-y-2"
                    >
                        <router-link
                            v-for="item in aboutMenuItems"
                            :key="item.label"
                            :to="item.to"
                            class="block px-4 py-2 text-base text-white hover:bg-white/10 rounded-lg transition-all"
                            @click="handleMobileSubItemClick"
                        >
                            {{ item.label }}
                        </router-link>
                    </div>
                </Transition>
            </div>
        </template>
    </MobileMenu>
</template>

<script setup lang="ts">
import { useScrollHeader } from '@/composables/useScrollHeader'
import { Button } from 'primevue'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import LogoLink from './header/LogoLink.vue'
import NavLinkList from './header/NavLinkList.vue'
import NavDropdown from './header/NavDropdown.vue'
import MobileMenu from './header/MobileMenu.vue'
import { useNavigation } from '@/composables/useNavigation'

// State
const isMobileMenuOpen = ref(false)
const isMobileAboutDropdownOpen = ref(false)
const isMobileInfoDropdownOpen = ref(false)

const route = useRoute()
const { isHidden } = useScrollHeader()

// Zavře všechny dropdowny při změně routy
watch(() => route.fullPath, () => {
    closeAllDropdowns()
})

// Helper funkce pro zavírání dropdown menu
const closeAllDropdowns = () => {
    isMobileAboutDropdownOpen.value = false
    isMobileInfoDropdownOpen.value = false
    isMobileMenuOpen.value = false
}

const closeMobileMenu = () => {
    isMobileMenuOpen.value = false
}

const closeMobileInfoDropdown = () => {
    isMobileInfoDropdownOpen.value = false
}

const closeMobileAboutDropdown = () => {
    isMobileAboutDropdownOpen.value = false
}

const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const toggleMobileInfoDropdown = () => {
    isMobileInfoDropdownOpen.value = !isMobileInfoDropdownOpen.value
}

const toggleMobileAboutDropdown = () => {
    isMobileAboutDropdownOpen.value = !isMobileAboutDropdownOpen.value
}

const handleMobileSubItemClick = () => {
    closeMobileMenu()
    closeMobileInfoDropdown()
    closeMobileAboutDropdown()
}

const isAboutActive = computed(() => {
    return route.name === 'Organizer' || route.name === 'Links' || route.name === 'Contact'
})

const isInfoActive = computed(() => {
    return route.name === 'Info'
})

// Using NavItem type from the navigation composable

// Use API-driven navigation with a local fallback
const { items: navItemsRef } = useNavigation()

// Derive the pieces HeaderNav expects:
function findParent(label: string) {
    if (!navItemsRef.value.length) return null
    // try exact match first
    let found = navItemsRef.value.find(i => i.label === label)
    if (found && found.children && found.children.length) return found
    // case-insensitive match
    found = navItemsRef.value.find(i => typeof i.label === 'string' && i.label.toLowerCase() === label.toLowerCase())
    if (found && found.children && found.children.length) return found
    // fallback to first item that has children
    found = navItemsRef.value.find(i => i.children && i.children.length)
    return found ?? null
}

const infoParent = computed(() => findParent('Informace'))
const aboutParent = computed(() => findParent('O nás'))

const infoItems = computed(() => (infoParent.value && infoParent.value.children) ? infoParent.value.children : [])
const aboutMenuItems = computed(() => (aboutParent.value && aboutParent.value.children) ? aboutParent.value.children : [])

// Top-level nav items without children (used for left/right main links)
const topLevel = computed(() => navItemsRef.value.filter(i => !i.children))
const mainNavLeft = computed(() => topLevel.value.slice(0, 1))
const mainNavRight = computed(() => topLevel.value.slice(1))
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
