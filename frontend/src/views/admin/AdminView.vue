<template>
    <div class="min-h-screen">
        <nav class="shadow-md border-b border-gray-200">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 flex items-center gap-2">
                            <h1 class="text-xl font-bold ">
                                Administrace
                            </h1>
                        </div>

                        <div class="hidden sm:ml-8 sm:flex sm:gap-2">
                            <AdminNavLink
                                v-for="item in navItems"
                                :key="item.name"
                                :name="item.name"
                            >
                                {{ item.label }}
                            </AdminNavLink>
                        </div>
                    </div>

                    <div class="flex items-center gap-4">
                        <div class="hidden sm:flex items-center gap-3 px-4 py-2">
                            <Avatar
                                icon="pi pi-user"
                                size="normal"
                                shape="circle"
                            />
                            <div class="flex flex-col">
                                <span class="text-sm font-semibold text-gray-900">
                                    {{ user?.name }}
                                </span>
                                <span class="text-xs text-gray-500">
                                    {{ user?.email }}
                                </span>
                            </div>
                        </div>
                        <Button
                            icon="pi pi-sign-out"
                            label="Odhlásit"
                            severity="secondary"
                            size="small"
                            @click="handleLogout"
                        />
                    </div>
                </div>
            </div>
        </nav>

        <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <router-view />
        </main>
    </div>
</template>

<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
import Avatar from 'primevue/avatar'
import Button from 'primevue/button'
import AdminNavLink from './components/AdminNavLink.vue'

interface NavItem {
    name: string
    label: string
}

const navItems: NavItem[] = [
    {
        name: 'AdminUsers',
        label: 'Uživatelé'
    },
    {
        name: 'AdminPages',
        label: 'Obsah stránek'
    },
    {
        name: 'AdminResults',
        label: 'Výsledky'
    },
    {
        name: 'AdminNavigation',
        label: 'Navigace'
    }
]

const { user, logout } = useAuth()

// TODO: Apply better confirmation
const handleLogout = async () => {
    if (confirm('Opravdu se chcete odhlásit?')) {
        await logout()
    }
}
</script>
