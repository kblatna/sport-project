<template>
    <Transition name="slide">
        <div
            v-if="open"
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobilní navigační menu"
            class="fixed top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-primary-700 via-primary-600 to-primary-500 z-50 md:hidden overflow-y-auto mobile-menu"
        >
            <div class="flex justify-between items-center h-20 px-4 bg-primary-800/50 backdrop-blur-sm">
                <span class="text-white text-xl font-semibold">Menu</span>
                <button
                    @click="close"
                    class="menu-button text-white p-3"
                    aria-label="Zavřít menu"
                >
                    <svg
                        class="h-7 w-7"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        stroke-width="2.5"
                        aria-hidden="true"
                    ><path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    /></svg>
                </button>
            </div>

            <nav
                class="flex flex-col space-y-2 p-6 min-h-screen"
                aria-label="Mobilní navigace"
            >
                <slot name="links"></slot>
            </nav>
        </div>
    </Transition>
</template>

<script setup lang="ts">

defineProps<{
    open: boolean
}>()

const emits = defineEmits(['update:open', 'close'])

const close = () => {
    emits('update:open', false)
    emits('close')
}
</script>
