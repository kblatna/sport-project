<template>
    <LoadingSpinner v-if="isLoading" />

    <div
        v-else-if="!error"
        class="px-4 py-6 sm:px-0"
    >
        <div class="mb-8">
            <router-link
                :to="{ name: 'AdminUsers' }"
                class="text-sm text-customblue-600 hover:text-customblue-800 mb-4 inline-flex items-center"
            >
                <iconify-icon
                    icon="mdi:arrow-left"
                    class="mr-2"
                />
                Zpět na seznam
            </router-link>
        </div>

        <Card class="max-w-2xl mx-auto  shadow-lg">
            <template #content>
                <h2 class="text-2xl font-bold text-gray-900 mb-5">
                    {{ isNewUser ? 'Nový uživatel' : 'Upravit uživatele' }}
                </h2>
                <form
                    @submit.prevent="handleSubmit"
                    class="space-y-6"
                >
                    <div class="flex flex-col gap-2">
                        <label
                            for="name"
                            class="font-semibold"
                        >
                            Jméno a příjmení*
                        </label>
                        <InputText
                            id="name"
                            v-model="form.name"
                            placeholder="Jan Novák"
                            required
                            class="w-full"
                        />
                    </div>

                    <div class="flex flex-col gap-2">
                        <label
                            for="email"
                            class="font-semibold"
                        >
                            Email*
                        </label>
                        <InputText
                            id="email"
                            v-model="form.email"
                            type="email"
                            placeholder="jan@example.com"
                            required
                            class="w-full"
                        />
                    </div>

                    <div class="flex flex-col gap-2">
                        <label
                            for="password"
                            class="font-semibold"
                        >
                            Heslo {{ isNewUser ? '*' : '(ponechte prázdné pro zachování)' }}
                        </label>
                        <Password
                            id="password"
                            v-model="form.password"
                            placeholder="Alespoň 6 znaků"
                            :toggle-mask="true"
                            :feedback="false"
                            :required="isNewUser"
                            class="w-full"
                            input-class="w-full"
                        />
                        <small class="text-gray-500">
                            Heslo musí mít alespoň 6 znaků
                        </small>
                    </div>

                    <div class="flex flex-col gap-2">
                        <label
                            for="role"
                            class="font-semibold"
                        >
                            Role*
                        </label>
                        <Select
                            id="role"
                            v-model="form.role"
                            :options="roleOptions"
                            option-label="label"
                            option-value="value"
                            placeholder="Vyberte roli"
                            class="w-full"
                        />
                    </div>

                    <div class="flex items-center gap-3">
                        <Checkbox
                            input-id="isActive"
                            v-model="form.isActive"
                            :binary="true"
                        />
                        <label
                            for="isActive"
                            class="cursor-pointer"
                            @click="form.isActive = !form.isActive"
                        >
                            <span class="font-semibold">Aktivní účet</span>
                            <p class="text-sm text-gray-500">
                                Neaktivní uživatelé se nemohou přihlásit
                            </p>
                        </label>
                    </div>

                    <div class="flex justify-end gap-3 pt-4 border-t">
                        <Button
                            label="Zrušit"
                            severity="secondary"
                            @click="$router.push({ name: 'AdminUsers' })"
                            type="button"
                        />
                        <Button
                            :label="isNewUser ? 'Vytvořit' : 'Uložit změny'"
                            icon="pi pi-check"
                            severity="primary"
                            type="submit"
                            :loading="isSaving"
                        />
                    </div>
                </form>
            </template>
        </Card>
    </div>

    <ErrorMessage
        v-else-if="error"
        :message="error"
    />
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { users } from '@/services/api/services'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Select from 'primevue/select'
import Checkbox from 'primevue/checkbox'
import Button from 'primevue/button'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import type { UserRole } from '@/interface/Auth.interface'

const router = useRouter()
const route = useRoute()

const userId = computed(() => route.params.id as string)
const isNewUser = computed(() => userId.value === 'new')

const form = ref({
    name: '',
    email: '',
    password: '',
    role: 'editor' as UserRole,
    isActive: true
})

const isLoading = ref(false)
const isSaving = ref(false)
const error = ref<string | null>(null)

const roleOptions = [
    { label: 'Editor', value: 'editor' },
    { label: 'Admin', value: 'admin' }
]

const loadUser = async () => {
    if (isNewUser.value) {
        return
    }

    isLoading.value = true
    error.value = null

    try {
        const user = await users.getById(userId.value)
        form.value = {
            name: user.name,
            email: user.email,
            password: '',
            role: user.role,
            isActive: user.isActive
        }
    } catch (err) {
        ;
        console.error('Failed to load users:', err)
        error.value = 'Nepodařilo se načíst uživatele. Zkuste to prosím později.'
    } finally {
        isLoading.value = false
    }
}

const handleSubmit = async () => {
    isSaving.value = true
    error.value = null

    try {
        const data = {
            name: form.value.name,
            email: form.value.email,
            role: form.value.role,
            isActive: form.value.isActive,
            ...(form.value.password && { password: form.value.password })
        }

        if (isNewUser.value) {
            await users.create(data)
        } else {
            await users.update(userId.value, data)
        }

        router.push({ name: 'AdminUsers' })
    } catch (err) {
        console.error('Failed to save user:', err)
        error.value = 'Nepodařilo se uložit uživatele. Zkuste to prosím později.'
    } finally {
        isSaving.value = false
    }
}

onMounted(async () => {
    await loadUser()
})
</script>
