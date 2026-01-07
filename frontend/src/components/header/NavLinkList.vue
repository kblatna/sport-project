<template>
    <div>
        <NavLink
            v-for="item in items"
            :key="item.label"
            :to="item.to"
            :link-class="linkClass"
            :active-class="activeClass"
            @click="$emit('select', item)"
        >
            {{ item.label }}
        </NavLink>
    </div>
</template>

<script setup lang="ts">
import NavLink from '@/components/NavLink.vue'
import type { NavItem } from '@/composables/useNavigation'

defineProps<{
    items: NavItem[]
    linkClass?: string
    activeClass?: string
}>()

defineEmits(['select'])

</script>
