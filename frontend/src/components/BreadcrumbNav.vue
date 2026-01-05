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
import { useRoute } from 'vue-router'

const route = useRoute()

const home = {
    icon: 'pi pi-home',
    label: 'Domů'
}

const items = computed(() => {
    if (route.name === 'Home') {
        return []
    }

    return route.matched
        .filter(r => r.meta.breadcrumb && r.name)
        .map((r) => {
            const target = typeof r.name === 'string'
                ? { name: r.name as string, params: route.params }
                : r.path

            return {
                label: r.meta.breadcrumb as string,
                to: target
            }
        })
})
</script>
