<template>
    <Transition name="slide">
        <div
            v-if="open"
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobilní navigační menu"
            class="fixed inset-0 bg-white z-50 md:hidden overflow-y-auto mobile-menu"
        >
            <div class="flex justify-between items-center h-16 px-4 border-b border-surface-line">
                <span class="text-ink text-lg font-semibold">Menu</span>
                <button
                    @click="close"
                    class="menu-button text-ink p-3 rounded-lg hover:bg-surface-muted"
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
                class="flex flex-col space-y-1 p-4"
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
