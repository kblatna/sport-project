<template>
    <div class="min-h-screen flex items-center justify-center">
        <div class="text-center">
            <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500 mx-auto"></div>
            <p class="mt-4 text-gray-600">
                {{ message }}
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Props {
    message?: string
}

withDefaults(defineProps<Props>(), {
    message: 'Načítání obsahu...'
})
</script>
