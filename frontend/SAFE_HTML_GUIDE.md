# Secure HTML content rendering

## Current solutions

The project uses **DOMPurify** to sanitize HTML content and protect against XSS attacks.

### Usage

```vue
<template>
<SafeHtml :content="htmlContent" tag="p" class="my-class" />
</template>

<script setup>
import SafeHtml from '@/components/SafeHtml.vue'
</script>

```

### Components
- **`SafeHtml.vue`** - Component for safe HTML rendering
- **`useSafeHtml.ts`** - Composable with sanitization function

---

## Recommendations for future admin panel

### Option 1: Structured content with Tiptap (RECOMMENDED)

**Why?**
- ✅ 100% safe - no HTML injection
- ✅ Validable data structure
- ✅ Easy editing even programmatically
- ✅ Possibility of versioning changes
- ✅ Flexible export to various formats

**Implementation:**

1. **Installing the editor**
```bash
npm install @tiptap/vue-3 @tiptap/starter-kit
```

2. **Data structure in DB** (MongoDB):
```typescript
interface PageContent {
title: string
content: JSONContent // Tiptap JSON format
}

// Tiptap JSON example:
{
"type": "doc",
"content": [
{
"type": "paragraph",
"content": [
{ "type": "text", "text": "Normal text " },
{
"type": "text",
"text": "bold text",
"marks": [{ "type": "bold" }]
}
]
}
]
}
```