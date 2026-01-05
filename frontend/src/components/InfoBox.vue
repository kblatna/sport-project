<template>
    <div :class="[wrapperClass, bgClass, borderClass, 'rounded-lg p-6']">
        <div class="flex items-center gap-4">
            <iconify-icon
                :icon="icon"
                :inline="true"
                :class="[iconClass, 'flex-shrink-0 mt-1']"
            />

            <p :class="[textClass, 'text-gray-700']">
                <SafeHtml
                    :content="message"
                    tag="span"
                />
                <template v-if="ctaRouteName">
                    <router-link :to="{ name: ctaRouteName }">
                        <span :class="['font-bold hover:underline', ctaTextClass]"> {{ ctaText }} </span>
                    </router-link>
                </template>
                <template v-else-if="ctaHref">
                    <a
                        :href="ctaHref"
                        class="font-bold hover:underline"
                        :class="ctaTextClass"
                    >
                        {{ ctaText }}
                    </a>
                </template>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import SafeHtml from './SafeHtml.vue'

withDefaults(defineProps<{
    icon?: string
    message?: string
    ctaText?: string
    ctaRouteName?: string | null
    ctaHref?: string | null
    bgClass?: string
    borderClass?: string
    textClass?: string
    iconClass?: string
    ctaTextClass?: string
    wrapperClass?: string
}>(), {
    icon: 'mdi:information',
    message: 'Máte-li nápad, co dalšího sem přidat, dejte nám vědět prostřednictvím kontaktního',
    ctaText: 'formuláře',
    ctaRouteName: 'Contact',
    ctaHref: null,
    bgClass: 'bg-primary-50',
    borderClass: 'border-primary',
    textClass: 'text-gray-700',
    iconClass: 'text-primary text-2xl',
    ctaTextClass: '',
    wrapperClass: ''
})

</script>
