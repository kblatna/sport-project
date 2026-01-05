<template>
    <form
        @submit.prevent="onSubmit"
        :data-is-loading="isLoading"
    >
        <div>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <label
                        for="name"
                        class="block my-2 font-medium"
                    >
                        Jméno
                    </label>
                    <InputText
                        id="name"
                        v-model="name"
                        :validation="validation.name"
                        class="w-full"
                        @blur="validation.name.$touch()"
                    />
                    <div
                        v-if="validation.name.$error"
                        class="p-error text-red-600 text-sm mt-1"
                    >
                        {{ validation.name.$errors[0]?.$message }}
                    </div>
                </div>

                <div>
                    <label
                        for="email"
                        class="block my-2 font-medium"
                    >
                        Email
                    </label>
                    <InputText
                        id="email"
                        v-model="email"
                        type="email"
                        :validation="validation.email"
                        class="w-full"
                        @blur="validation.email.$touch()"
                    />
                    <div
                        v-if="validation.email.$error"
                        class="p-error text-red-600 text-sm mt-1"
                    >
                        {{ validation.email.$errors[0]?.$message }}
                    </div>
                </div>
            </div>

            <div>
                <label
                    for="subject"
                    class="block my-2 font-medium"
                >
                    Předmět
                </label>
                <InputText
                    id="subject"
                    v-model="subject"
                    :validation="validation.subject"
                    class="w-full"
                    @blur="validation.subject.$touch()"
                />
                <div
                    v-if="validation.subject.$error"
                    class="p-error text-red-600 text-sm mt-1"
                >
                    {{ validation.subject.$errors[0]?.$message }}
                </div>
            </div>

            <div>
                <label
                    for="message"
                    class="block my-2 font-medium"
                >
                    Vaše zpráva
                </label>
                <Textarea
                    id="message"
                    v-model="message"
                    :validation="validation.message"
                    class="w-full"
                    rows="5"
                    @blur="validation.message.$touch()"
                />
                <div
                    v-if="validation.message.$error"
                    class="p-error text-red-600 text-sm mt-1"
                >
                    {{ validation.message.$errors[0]?.$message }}
                </div>
            </div>

            <div class="hidden">
                <input
                    type="text"
                    aria-hidden="true"
                    v-model="honeypot"
                />
            </div>

            <div
                ref="turnstileEl"
                class="cf-turnstile mt-5"
            ></div>

            <div class="flex justify-end">
                <Button
                    type="submit"
                    :disabled="isLoading"
                    :loading="isLoading"
                    label="Odeslat zprávu"
                    icon="pi pi-send"
                />
            </div>
        </div>
    </form>

    <Message
        v-if="error"
        severity="error"
        class="mt-6"
        :closable="true"
        @close="error = null"
    >
        {{ error }}
    </Message>

    <Message
        v-if="success"
        severity="success"
        class="mt-6"
        :closable="true"
        @close="success = null"
    >
        {{ success }}
    </Message>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { required, email as emailValidator } from '@/utils/validators'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'
import Textarea from 'primevue/textarea'
import { onMounted, ref } from 'vue'

const name = ref('')
const email = ref('')
const subject = ref('')
const message = ref('')
const isLoading = ref(false)
const error = ref<string | null>(null)
const success = ref<string | null>(null)
const honeypot = ref('')
const cfResponse = ref<string>('')
const turnstileToken = ref('')
const turnstileEl = ref<HTMLElement | null>(null)

const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY

const validation = useVuelidate(
    {
        name: {
            required
        },
        email: {
            required,
            email: emailValidator
        },
        subject: {
            required
        },
        message: {
            required
        }
    },
    {
        name,
        email,
        subject,
        message
    }
)

onMounted(() => {
    if ((window as any).turnstile && turnstileSiteKey) {
        try {
            (window as any).turnstile.render(turnstileEl.value, {
                sitekey: turnstileSiteKey,
                mode: 'light',
                callback: (token: string) => {
                    turnstileToken.value = token
                }
            })
        } catch (err) {
            console.error('Error rendering Turnstile:', err)
        }
    }
})

const onSubmit = async () => {
    await validation.value.$validate()

    if (validation.value.$invalid) {
        console.error('Validation failed', validation.value)
        return
    }

    isLoading.value = true
    error.value = null
    success.value = null

    try {
        if (!turnstileToken.value) {
            error.value = 'Turnstile ověření selhalo'
            isLoading.value = false
            return
        }

        cfResponse.value = turnstileToken.value

        const payload = {
            name: name.value.trim(),
            email: email.value.trim(),
            subject: subject.value.trim(),
            message: message.value.trim(),
            honeypot: honeypot.value,
            token: cfResponse.value
        }

        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })

        if (!response.ok) {
            const errorData = await response.json()
            console.error('Backend error:', errorData)
            throw new Error(errorData.message || 'Server returned an error')
        }

        success.value = 'Zpráva byla úspěšně odeslána.'
        resetForm()
    } catch (fetchError) {
        console.error('Submit error:', fetchError)
        error.value = 'Došlo k chybě při odesílání přihlášky. Zkuste to prosím znovu později.'
    } finally {
        isLoading.value = false
    }
}

function resetForm(): void {
    name.value = ''
    email.value = ''
    subject.value = ''
    message.value = ''
    honeypot.value = ''
    cfResponse.value = ''
    validation.value.$reset()
}
</script>
