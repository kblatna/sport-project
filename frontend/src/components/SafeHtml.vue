<template>
    <component
        :is="tag"
        ref="contentRef"
    />
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useSafeHtml } from '@/composables/useSafeHtml'

/**
 * SafeHtml Component
 *
 * A secure wrapper for rendering user-generated HTML content.
 * Uses DOMPurify to sanitize HTML and prevent XSS attacks.
 *
 * TODO: This is a temporary solution. When implementing admin panel:
 * - Consider using Tiptap editor with JSON output format
 * - Migrate to structured content storage
 * - Replace this component with a JSON renderer
 *
 * @example
 * <SafeHtml :content="pageContent.description" />
 * <SafeHtml :content="article.body" tag="article" />
 */

interface Props {
    /** HTML content to sanitize and render */
    content?: string | null
    /** HTML tag to wrap the content in */
    tag?: string
}

const props = withDefaults(defineProps<Props>(), {
    content: '',
    tag: 'div'
})

const { sanitize } = useSafeHtml()
const contentRef = ref<HTMLElement | null>(null)

const sanitizedContent = computed(() => sanitize(props.content))

const updateContent = () => {
    if (contentRef.value) {
        contentRef.value.innerHTML = sanitizedContent.value
    }
}

onMounted(() => {
    updateContent()
})

watch(() => props.content, () => {
    updateContent()
})
</script>
