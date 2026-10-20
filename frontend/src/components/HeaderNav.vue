<template>
    <header
        :class="[
            'header sticky top-0 z-50 transform transition-transform duration-300',
            { '-translate-y-full': isHidden && !isMobileMenuOpen }
        ]"
    >
        <nav
            class="container"
            aria-label="Hlavní navigace"
        >
            <div class="flex justify-between items-center h-16 md:h-20 gap-4">
                <div class="flex items-center shrink-0">
                    <LogoLink />
                </div>

                <div class="hidden md:flex items-center gap-1 lg:gap-2 flex-1 justify-end">
                    <NavLinkList
                        :items="mainNavLeft"
                        wrapper-class="flex items-center gap-1"
                        link-class="header-nav-link rounded-lg px-3 py-2 text-[15px]"
                        active-class="text-ink bg-surface-muted"
                    />

                    <NavDropdown
                        label="Informace"
                        :items="infoItems"
                        button-class="header-nav-link rounded-lg px-3 py-2 text-[15px] flex items-center gap-1"
                        menu-class="dropdown-menu absolute top-full mt-2 w-56 right-0 origin-top-right bg-white border border-surface-line rounded-xl overflow-hidden z-50 shadow-soft"
                    />

                    <NavLinkList
                        :items="mainNavRight"
                        wrapper-class="flex items-center gap-1"
                        link-class="header-nav-link rounded-lg px-3 py-2 text-[15px]"
                        active-class="text-ink bg-surface-muted"
                    />

                    <NavDropdown
                        label="O nás"
                        :items="aboutMenuItems"
                        button-class="header-nav-link rounded-lg px-3 py-2 text-[15px] flex items-center gap-1"
                        menu-class="dropdown-menu absolute top-full mt-2 w-48 right-0 origin-top-right bg-white border border-surface-line rounded-xl overflow-hidden z-50 shadow-soft"
                    />

                    <router-link
                        :to="{ name: 'Signup' }"
                        class="header-cta ml-2"
                    >
                        Přihlásit se
                    </router-link>
                </div>

                <div class="md:hidden flex items-center gap-2">
                    <router-link
                        :to="{ name: 'Signup' }"
                        class="header-cta"
                    >
                        Přihlásit se
                    </router-link>
                    <Button
                        @click="toggleMobileMenu"
                        text
                        rounded
                        class="menu-button text-ink p-2"
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
                link-class="header-nav-link block px-4 py-3 text-lg rounded-xl transition-colors min-h-[44px] hover:bg-surface-muted"
                active-class="bg-surface-muted text-ink"
                @select="closeMobileMenu"
            />

            <div>
                <button
                    @click="toggleMobileInfoDropdown"
                    @keydown.escape="closeMobileInfoDropdown"
                    class="w-full flex justify-between items-center px-4 py-3 text-lg font-medium text-ink rounded-xl transition-colors min-h-[44px] hover:bg-surface-muted"
                    :class="{ 'bg-surface-muted': isMobileInfoDropdownOpen || isInfoActive }"
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
                        class="ml-2 mt-1 space-y-1 border-l border-surface-line pl-2"
                    >
                        <router-link
                            v-for="item in infoItems"
                            :key="item.label"
                            :to="item.to"
                            class="block px-4 py-2.5 text-base text-ink/80 hover:bg-surface-muted rounded-lg transition-colors"
                            @click="handleMobileSubItemClick"
                        >
                            {{ item.label }}
                        </router-link>
                    </div>
                </Transition>
            </div>

            <NavLinkList
                :items="mainNavRight"
                link-class="header-nav-link block px-4 py-3 text-lg rounded-xl transition-colors min-h-[44px] hover:bg-surface-muted"
                active-class="bg-surface-muted text-ink"
                @select="closeMobileMenu"
            />

            <div>
                <button
                    @click="toggleMobileAboutDropdown"
                    @keydown.escape="closeMobileAboutDropdown"
                    class="w-full flex justify-between items-center px-4 py-3 text-lg font-medium text-ink rounded-xl transition-colors min-h-[44px] hover:bg-surface-muted"
                    :class="{ 'bg-surface-muted': isMobileAboutDropdownOpen || isAboutActive }"
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
                        class="ml-2 mt-1 space-y-1 border-l border-surface-line pl-2"
                    >
                        <router-link
                            v-for="item in aboutMenuItems"
                            :key="item.label"
                            :to="item.to"
                            class="block px-4 py-2.5 text-base text-ink/80 hover:bg-surface-muted rounded-lg transition-colors"
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

const isMobileMenuOpen = ref(false)
const isMobileAboutDropdownOpen = ref(false)
const isMobileInfoDropdownOpen = ref(false)

const route = useRoute()
const { isHidden } = useScrollHeader()

watch(() => route.fullPath, () => {
    closeAllDropdowns()
})

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

const { items: navItemsRef } = useNavigation()

function findParent(label: string) {
    if (!navItemsRef.value.length) return null
    let found = navItemsRef.value.find(i => i.label === label)
    if (found && found.children && found.children.length) return found
    found = navItemsRef.value.find(i => typeof i.label === 'string' && i.label.toLowerCase() === label.toLowerCase())
    if (found && found.children && found.children.length) return found
    found = navItemsRef.value.find(i => i.children && i.children.length)
    return found ?? null
}

const infoParent = computed(() => findParent('Informace'))
const aboutParent = computed(() => findParent('O nás'))

const infoItems = computed(() => (infoParent.value && infoParent.value.children) ? infoParent.value.children : [])
const aboutMenuItems = computed(() => (aboutParent.value && aboutParent.value.children) ? aboutParent.value.children : [])

const topLevel = computed(() => navItemsRef.value.filter(i => !i.children))
const mainNavLeft = computed(() => topLevel.value.slice(0, 1))
const mainNavRight = computed(() => topLevel.value.slice(1))
</script>

<style scoped>
:deep(.menu-button.p-button) {
    color: var(--ink);
}

:deep(.menu-button.p-button:hover) {
    background: var(--surface-muted);
}

:deep(.menu-button.p-button svg) {
    color: var(--ink);
    stroke: currentColor;
}
</style>
