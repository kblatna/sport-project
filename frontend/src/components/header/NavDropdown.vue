<template>
    <div
        ref="root"
        class="relative"
    >
        <button
            @click="toggle"
            @keydown.escape="close"
            @keydown.enter.stop.prevent="toggle"
            @keydown.space.prevent="toggle"
            :class="buttonClass"
            :aria-expanded="open"
            aria-haspopup="true"
            :aria-controls="menuId"
        >
            <span>{{ label }}</span>
            <iconify-icon
                :inline="true"
                icon="mdi:chevron-down"
                class="transition-transform"
                :class="{ 'rotate-180': open }"
                aria-hidden="true"
            />
        </button>

        <Transition name="dropdown">
            <div
                v-if="open"
                :id="menuId"
                role="menu"
                :class="menuClassComputed"
            >
                <router-link
                    v-for="item in items"
                    :key="item.label"
                    :to="item.to"
                    role="menuitem"
                    class="block px-4 py-3 text-gray-700 hover:bg-primary-50 transition-colors"
                    @click="onSelect(item)"
                >
                    {{ item.label }}
                </router-link>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import type { NavItem } from '@/interface/Navigation.interface'

const props = defineProps<{
    label: string
    items: NavItem[]
    buttonClass?: string
    id?: string
    menuClass?: string
}>()

const emits = defineEmits(['select'])

const open = ref(false)
const root = ref<HTMLElement | null>(null)

onClickOutside(root, () => (open.value = false))

const toggle = () => {
    open.value = !open.value
}

const close = () => {
    open.value = false
}

const onSelect = (item: NavItem) => {
    emits('select', item)
    close()
}

const menuId = props.id ?? `nav-dropdown-${Math.random().toString(36).slice(2, 9)}`
const buttonClass = props.buttonClass ?? 'text-white border-transparent border-b-2 hover:border-white px-3 py-2 text-lg font-medium flex items-center gap-1'
const menuClassComputed = props.menuClass ?? 'absolute top-full mt-2 w-56 bg-white rounded-lg shadow-lg overflow-hidden z-50'

</script>
