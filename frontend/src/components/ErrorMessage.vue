<template>
    <div class="min-h-screen flex items-center justify-center">
        <div class="text-center max-w-2xl mx-auto px-4">
            <svg
                class="w-16 h-16 text-red-500 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
            <p class="text-red-600 text-lg">
                {{ message }}
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">

withDefaults(defineProps<{
    message: string
}>(), {
    message: 'Došlo k neočekávané chybě. Zkuste to prosím znovu.'
})

</script>
