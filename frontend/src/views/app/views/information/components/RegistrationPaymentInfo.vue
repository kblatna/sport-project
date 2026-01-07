<template>
    <div class="mx-auto mt-6">
        <div class="md:col-span-2 space-y-4">
            <div>
                <h4 class="text-lg font-semibold mb-2">
                    {{ title }}
                </h4>
                <p class="text-gray-600 mb-8">
                    {{ description }}
                </p>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div
                        v-for="(fee, index) in fees"
                        :key="index"
                        class="border rounded-lg p-4"
                    >
                        <div class="flex items-baseline justify-between">
                            <div>
                                <div class="font-medium">
                                    {{ fee.category }}
                                </div>
                                <div class="text-md text-gray-500">
                                    {{ fee.subcategories }}
                                </div>
                            </div>
                            <div class="text-right">
                                <div class="text-2xl font-semibold">
                                    {{ fee.price }} Kč
                                </div>
                            </div>
                        </div>
                        <p
                            v-if="fee.note"
                            class="mt-3"
                            v-html="fee.note"
                        ></p>
                    </div>
                </div>

                <div
                    v-if="bankAccount && variableSymbolNote"
                    class="mt-8"
                >
                    <h5 class="font-semibold mb-3">
                        Platba převodem
                    </h5>
                    <div class=" mb-3">
                        <p class="font-medium">
                            Č. účtu:
                        </p>
                        <p>
                            {{ bankAccount }}
                        </p>
                    </div>
                    <div class="mb-3">
                        <p class="font-medium">
                            Variabilní symbol:
                        </p>
                        <p>{{ variableSymbolNote }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Fee {
    category: string
    subcategories: string
    price: number
    note?: string
}

defineProps<{
    title?: string
    description?: string
    fees?: Fee[]
    bankAccount?: string
    variableSymbolNote?: string
}>()
</script>
