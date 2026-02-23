<template>
    <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card class="w-full max-w-md shadow-xl">
            <template #header>
                <div class="text-center pt-6 pb-2">
                    <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                        <iconify-icon
                            icon="solar:lock-linear"
                            class="text-3xl text-blue-600"
                        />
                    </div>
                    <h2 class="text-3xl font-bold text-gray-900">
                        Přihlášení do administrace
                    </h2>
                    <p class="mt-2 text-sm text-gray-600">
                        Zadejte své přihlašovací údaje
                    </p>
                </div>
            </template>

            <template #content>
                <Message
                    v-if="error"
                    severity="error"
                    :closable="true"
                    @close="clearError"
                    class="mb-4"
                >
                    {{ error }}
                </Message>

                <form
                    class="space-y-4"
                    @submit.prevent="handleSubmit"
                >
                    <div class="flex flex-col gap-2">
                        <label
                            for="email"
                            class="font-semibold text-gray-700"
                        >
                            Email
                        </label>
                        <InputText
                            id="email"
                            v-model="form.email"
                            type="email"
                            placeholder="vas@email.cz"
                            autocomplete="email"
                            :invalid="!!emailError"
                            @blur="validateEmail"
                            class="w-full"
                        />
                        <small
                            v-if="emailError"
                            class="text-red-600"
                        >
                            {{ emailError }}
                        </small>
                    </div>

                    <div class="flex flex-col gap-2">
                        <label
                            for="password"
                            class="font-semibold text-gray-700"
                        >
                            Heslo
                        </label>
                        <Password
                            id="password"
                            v-model="form.password"
                            placeholder="Zadejte heslo"
                            :toggle-mask="true"
                            :feedback="false"
                            autocomplete="current-password"
                            :invalid="!!passwordError"
                            @blur="validatePassword"
                            class="w-full"
                            input-class="w-full"
                        />
                        <small
                            v-if="passwordError"
                            class="text-red-600"
                        >
                            {{ passwordError }}
                        </small>
                    </div>

                    <Button
                        type="submit"
                        :loading="isLoading"
                        :disabled="!isFormValid"
                        class="w-full mt-6"
                        severity="primary"
                    >
                        <iconify-icon icon="material-symbols:login" />
                        Přihlásit se
                    </Button>
                </form>
            </template>
        </Card>
    </div>
</template>

<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
import Button from 'primevue/button'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'
import Password from 'primevue/password'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { login, isLoading, error, clearError } = useAuth()

const form = ref({
    email: '',
    password: ''
})

const emailError = ref('')
const passwordError = ref('')

const validateEmail = () => {
    emailError.value = ''
    if (!form.value.email) {
        emailError.value = 'Email je povinný'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
        emailError.value = 'Neplatný formát emailu'
    }
}

const validatePassword = () => {
    passwordError.value = ''
    if (!form.value.password) {
        passwordError.value = 'Heslo je povinné'
    } else if (form.value.password.length < 6) {
        passwordError.value = 'Heslo musí mít alespoň 6 znaků'
    }
}

const isFormValid = computed(() => {
    return form.value.email && form.value.password && !emailError.value && !passwordError.value
})

const handleSubmit = async () => {
    validateEmail()
    validatePassword()

    if (!isFormValid.value) {
        return
    }

    try {
        console.log('Attempting login...')
        const response = await login({
            email: form.value.email,
            password: form.value.password
        })

        console.log('Login successful, response:', response)
        console.log('localStorage after login:', {
            accessToken: localStorage.getItem('accessToken'),
            user: localStorage.getItem('user')
        })

        console.log('Redirecting to /admin...')
        await router.replace('/admin')
        console.log('Redirect complete')
    } catch (e) {
        console.error('Login failed:', e)
    }
}
</script>
