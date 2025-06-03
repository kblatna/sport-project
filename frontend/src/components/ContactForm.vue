<template>
    <form
        @submit.prevent="onSubmit"
        :data-is-loading="isLoading"
    >
        <div class="row">
            <div class="col-12 col-lg-6 mb-3">
                <FormInput
                    label="t('contactForm.name')"
                    :id="'formInputName'"
                    v-model="name"
                    :validation="validation.name"
                />
            </div>

            <div class="col-12 mb-3">
                <FormInput
                    label="t('contactForm.email')"
                    :id="'formInputEmail'"
                    v-model="email"
                    :validation="validation.email"
                />
            </div>
            <div class="col-12 mb-3">
                <FormInputTextarea
                    label="t('contactForm.message')"
                    :id="'formInputMessage'"
                    v-model="message"
                    :validation="validation.message"
                    placeholder="t('contactForm.messagePlaceholder')"
                />
            </div>
        </div>

        <div class="d-none">
            <input
                type="text"
                aria-hidden="true"
                v-model="honeypot"
            />
        </div>

        <div
            ref="turnstileEl"
            class="cf-turnstile"
        ></div>

        <div class="text-center mt-5">
            <button
                type="submit"
                class="btn btn-primary px-5 text-uppercase"
            >
                Odeslat
            </button>
        </div>
    </form>

    <div
        v-if="isLoading"
        class="text-center mt-3"
    >
        <span
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
        ></span>
        Odesílání...
    </div>

    <div
        v-if="error"
        class="alert alert-danger mt-3"
    >
        {{ error }}
    </div>

    <div
        v-if="success"
        class="alert alert-success mt-3"
    >
        {{ success }}
    </div>
</template>

<script setup lang="ts">
import { FormInput, FormInputTextarea } from '@tvaliasek/vue-form-inputs'
import { onMounted, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email as emailValidator } from '@vuelidate/validators'

const name = ref('')
const email = ref('')
const message = ref('')
const honeypot = ref('')

const isLoading = ref(false)
const error = ref<string | null>(null)
const success = ref<string | null>(null)
const cfResponse = ref<string>('')
const turnstileToken = ref<string>('')
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
        message: {
            required
        }
    },
    {
        name,
        email,
        message
    }
)

onMounted(() => {
    if ((window as any).turnstile && turnstileSiteKey) {
        try {
            (window as any).turnstile.render(turnstileEl.value, {
                sitekey: turnstileSiteKey,
                callback: (token: string) => {
                    turnstileToken.value = token
                }
            })
        } catch (err) {
            console.error('Error rendering Turnstile:', err)
        }
    }
})

async function onSubmit() {
    console.log('Submitting contact form...', {
        name: name.value,
        email: email.value,
        message: message.value,
        honeypot: honeypot.value,
        token: turnstileToken.value,
        cfResponse: cfResponse.value
    })

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
            email: email.value,
            message: message.value,
            honeypot: honeypot.value,
            token: cfResponse.value
        }

        await fetch('api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })

        success.value = 'Zpráva byla úspěšně odeslána.'
        resetForm()
    } catch (fetchError) {
        if (fetchError instanceof Error) {
            error.value = 'CSRF token is invalid or missing. Please try again.'
            return
        }
        error.value
            = 'Došlo k chybě při odesílání zprávy. Zkuste to prosím znovu později.'
    } finally {
        isLoading.value = false
    }
}

function resetForm(): void {
    name.value = ''
    email.value = ''
    message.value = ''
    cfResponse.value = ''

    validation.value.$reset()
}
</script>
