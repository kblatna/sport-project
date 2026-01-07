<template>
    <div
        v-if="items.length > 0"
        class="container py-4"
    >
        <Breadcrumb
            :home="home"
            :model="items"
            class="[&_.p-breadcrumb-list]:items-center [&_.pi-home]:text-lg"
        >
            <!-- Links rewriting to use router-link -->
            <template #item="{ item, props }">
                <router-link
                    v-if="item === home"
                    v-slot="{ href, navigate }"
                    :to="{ name: 'Home' }"
                    custom
                >
                    <a
                        :href="href"
                        v-bind="props.action"
                        @click="navigate"
                    >
                        <span :class="item.icon"></span>
                        <span>{{ item.label }}</span>
                    </a>
                </router-link>

                <router-link
                    v-else-if="item.to"
                    v-slot="{ href, navigate }"
                    :to="item.to"
                    custom
                >
                    <a
                        :href="href"
                        v-bind="props.action"
                        @click="navigate"
                    >
                        <span
                            :class="item.icon"
                            v-if="item.icon"
                        ></span>
                        <span>{{ item.label }}</span>
                    </a>
                </router-link>

                <!-- If there is a `url` (external link) -->
                <a
                    v-else
                    :href="item.url"
                    v-bind="props.action"
                >
                    <span
                        :class="item.icon"
                        v-if="item.icon"
                    ></span>
                    <span>{{ item.label }}</span>
                </a>
            </template>
        </Breadcrumb>
    </div>
</template>

<script setup lang="ts">
import { Breadcrumb } from 'primevue'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const home = {
    icon: 'pi pi-home',
    label: 'Domů'
}

const getHashLabel = (hash: string): string | null => {
    const labels: Record<string, string> = {
        kids: 'Muldička',
        adults: 'Mulda'
    }
    return labels[hash] || null
}

const items = computed(() => {
    if (route.name === 'Home') return []

    const breadcrumbs = route.matched
        .filter(r => r.meta.breadcrumb && r.name)
        .map(r => ({
            label: r.meta.breadcrumb as string,
            to: typeof r.name === 'string'
                ? { name: r.name as string, params: route.params }
                : r.path
        }))

    // Add dynamic breadcrumb for Info page based on hash
    if (route.name === 'Info' && route.hash) {
        const hash = route.hash.replace('#', '')
        const hashLabel = getHashLabel(hash)

        if (hashLabel) {
            // Make parent "Informace" non-clickable
            const lastBreadcrumb = breadcrumbs[breadcrumbs.length - 1]
            if (lastBreadcrumb?.label === 'Informace') {
                delete lastBreadcrumb.to
            }

            const infoPath = router.resolve({
                name: 'Info',
                params: route.params
            }).path

            breadcrumbs.push({
                label: hashLabel,
                to: `${infoPath}#${hash}`
            })
        }
    }

    return breadcrumbs
})
</script>
