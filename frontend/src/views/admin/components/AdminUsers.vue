<template>
    <LoadingSpinner v-if="isLoading" />

    <div
        v-else-if="!error"
        class="px-4 pt-6 sm:px-0"
    >
        <div class="mb-8 flex justify-between items-center">
            <div>
                <h2 class="text-2xl font-bold text-gray-900">
                    Správa uživatelů
                </h2>
                <p class="mt-1 text-sm text-gray-600">
                    Seznam všech uživatelů v systému
                </p>
            </div>
            <Button
                label="Přidat uživatele"
                icon="pi pi-plus"
                severity="primary"
                @click="$router.push({ name: 'AdminUserEdit', params: { id: 'new' } })"
            />
        </div>

        <Card class="shadow-lg">
            <template #content>
                <DataTable
                    :value="usersList"
                    :paginator="true"
                    :rows="10"
                    :loading="isLoading"
                    striped-rows
                    responsive-layout="scroll"
                    class="p-datatable-sm"
                >
                    <template #empty>
                        <div class="text-center py-8">
                            <iconify-icon
                                icon="mdi:account-group"
                                class="text-4xl text-gray-400 mb-3"
                            />
                            <h3 class="text-lg font-medium text-gray-900">
                                Žádní uživatelé
                            </h3>
                            <p class="mt-1 text-sm text-gray-500">
                                Začněte přidáním prvního uživatele.
                            </p>
                        </div>
                    </template>

                    <Column
                        field="name"
                        header="Jméno"
                        sortable
                    />

                    <Column
                        field="email"
                        header="Email"
                        sortable
                    />

                    <Column
                        field="role"
                        header="Role"
                        sortable
                    >
                        <template #body="{ data }">
                            <Tag
                                :value="data.role"
                                :severity="data.role === 'admin' ? 'danger' : 'info'"
                            />
                        </template>
                    </Column>

                    <Column
                        field="isActive"
                        header="Status"
                        sortable
                    >
                        <template #body="{ data }">
                            <Tag
                                :value="data.isActive ? 'Aktivní' : 'Neaktivní'"
                                :severity="data.isActive ? 'success' : 'secondary'"
                            />
                        </template>
                    </Column>

                    <Column
                        field="lastLogin"
                        header="Poslední přihlášení"
                        sortable
                    >
                        <template #body="{ data }">
                            <span class="text-sm text-gray-600">
                                {{ formatDate(data.lastLogin) }}
                            </span>
                        </template>
                    </Column>

                    <Column
                        header="Akce"
                        style="width: 180px"
                    >
                        <template #body="{ data }">
                            <div class="flex gap-2">
                                <Button
                                    icon="pi pi-pencil"
                                    size="small"
                                    severity="secondary"
                                    text
                                    @click="$router.push({ name: 'AdminUserEdit', params: { id: data._id } })"
                                />
                                <Button
                                    icon="pi pi-trash"
                                    size="small"
                                    severity="danger"
                                    text
                                    :disabled="data._id === currentUser?._id"
                                    @click="handleDelete(data._id)"
                                />
                            </div>
                        </template>
                    </Column>
                </DataTable>
            </template>
        </Card>
    </div>

    <ErrorMessage
        v-else-if="error"
        :message="error"
    />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { users } from '@/services/api/services'
import Button from 'primevue/button'
import Card from 'primevue/card'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Tag from 'primevue/tag'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import type { User } from '@/interface/Auth.interface'

const { user: currentUser } = useAuth()
const usersList = ref<User[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)

const loadUsers = async () => {
    isLoading.value = true
    error.value = null

    // TODO: Fix usersList type
    try {
        const response = await users.getAll()
        usersList.value = response
    } catch (err) {
        console.error('Failed to load users:', err)
        error.value = 'Nepodařilo se načíst uživatele. Zkuste to prosím později.'
    } finally {
        isLoading.value = false
    }
}

// TODO: Better alert
const handleDelete = async (userId: string) => {
    if (userId === currentUser.value?._id) {
        alert('Nemůžete smazat svůj vlastní účet.')
        return
    }

    if (!confirm('Opravdu chcete smazat tohoto uživatele?')) {
        return
    }

    try {
        await users.delete(userId)
        await loadUsers()
    } catch (err) {
        console.error('Failed to delete user:', err)
        error.value = 'Nepodařilo se smazat uživatele. Zkuste to prosím později.'
    }
}

const formatDate = (date?: string) => {
    if (!date) return 'Nikdy'
    return new Date(date).toLocaleDateString('cs-CZ', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}

onMounted(async () => {
    await loadUsers()
})
</script>
