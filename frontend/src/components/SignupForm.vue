<template>
    <form
        @submit.prevent="onSubmit"
        :data-is-loading="isLoading"
    >
        <div class="row">
            <div class="col-12 col-lg-6 mb-3">
                <FormInput
                    label="t('contactForm.firstName')"
                    :id="'formInputFirstName'"
                    v-model="firstName"
                    :validation="validation.firstName"
                />
            </div>

            <div class="col-12 col-lg-6 mb-3">
                <FormInput
                    label="t('contactForm.lastName')"
                    :id="'formInputLastName'"
                    v-model="lastName"
                    :validation="validation.lastName"
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
                <FormInputDatePicker
                    label="Datum narození"
                    v-model="dateOfBirth"
                    :validation="validation?.dateOfBirth"
                />
                <!-- :max-date="minBirthDate" -->
            </div>

            <!--TODO: Přihlášení týmu musím ještě domyslet-->
            <div class="col-12 mb-3">
                <FormInputSelect
                    label="Pohlaví"
                    v-model="type"
                    :validation="validation.type"
                    :options="[
                        { text: 'Žena', value: 'female' },
                        { text: 'Muž', value: 'male' },
                        { text: 'Dívka', value: 'girl' },
                        { text: 'Chlapec', value: 'boy' },
                        { text: 'Tým', value: 'team' }
                    ]"
                />
            </div>

            <p v-if="type !== null || type === 'team' || type !== 'male'">
                Kategorie závodu: {{ raceOptions }}
            </p>

            <div
                class="col-12 mb-3"
                v-if="type === 'male'"
            >
                <FormInputSelect
                    label="Kategorie závodu"
                    v-model="raceOptions"
                    :validation="validation.type"
                    :options="raceOptions"
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
import { FormInput, FormInputDatePicker, FormInputSelect } from '@tvaliasek/vue-form-inputs'
import { computed, onMounted, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email as emailValidator } from '@vuelidate/validators'

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const dateOfBirth = ref<Date | null>(null)
const type = ref<string | null>(null)
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
        firstName: {
            required
        },
        lastName: {
            required
        },
        email: {
            required,
            email: emailValidator
        },
        dateOfBirth: {
            required
        },
        type: {
            required
        }
    },
    {
        firstName,
        lastName,
        email,
        dateOfBirth,
        type
    }
)

const age = computed(() => {
    if (!dateOfBirth.value) {
        return null
    }
    const today = new Date()
    return today.getFullYear() - dateOfBirth.value.getFullYear()
})

// const raceOptions = computed(() => {
//     if (type.value === 'female') {
//         if (age.value && age.value >= 18 && age.value <= 39) {
//             return [
//                 { text: 'Z15', value: 'Z15' }
//             ]
//         } else if (age.value && age.value >= 40 && age.value <= 49) {
//             return [
//                 { text: 'ZV15', value: 'ZV15' }
//             ]
//         } else if (age.value && age.value >= 50) {
//             return [
//                 { text: 'ZW15', value: 'ZW15' }
//             ]
//         }
//         return []
//     } else if (type.value === 'male') {
//         if (age.value && age.value >= 18 && age.value <= 39) {
//             return [
//                 { text: 'M15', value: 'M15' },
//                 { text: 'M30', value: 'M30' }
//             ]
//         } else if (age.value && age.value >= 40 && age.value <= 49) {
//             return [
//                 { text: 'V15', value: 'V15' },
//                 { text: 'V30', value: 'V30' }
//             ]
//         } else if (age.value && age.value >= 50 && age.value <= 59) {
//             return [
//                 { text: 'W15', value: 'W15' },
//                 { text: 'W30', value: 'W30' }
//             ]
//         } else if (age.value && age.value >= 60) {
//             return [
//                 { text: 'WV15', value: 'WV15' },
//                 { text: 'WV30', value: 'WV30' }
//             ]
//         }
//         return []
//     } else if (type.value === 'girl') {
//         if (age.value && age.value >= 10 && age.value <= 12) {
//             return [
//                 { text: 'Z5', value: 'Z5' }
//             ]
//         } else if (age.value && age.value >= 13 && age.value <= 14) {
//             return [
//                 { text: 'Z7', value: 'Z7' }
//             ]
//         } else if (age.value && age.value >= 15 && age.value <= 17) {
//             return [
//                 { text: 'Z10', value: 'Z10' }
//             ]
//         }
//         return []
//     } else if (type.value === 'boy') {
//         if (age.value && age.value >= 10 && age.value <= 12) {
//             return [
//                 { text: 'M5', value: 'M5' }
//             ]
//         } else if (age.value && age.value >= 13 && age.value <= 14) {
//             return [
//                 { text: 'M7', value: 'M7' }
//             ]
//         } else if (age.value && age.value >= 15 && age.value <= 17) {
//             return [
//                 { text: 'M10', value: 'M10' }
//             ]
//         }
//         return []
//     }
//     return []
// })

const raceRules = {
    female: [
        { min: 18, max: 39, options: [{ text: 'Z15', value: 'Z15' }] },
        { min: 40, max: 49, options: [{ text: 'ZV15', value: 'ZV15' }] },
        { min: 50, max: Infinity, options: [{ text: 'ZW15', value: 'ZW15' }] }
    ],
    male: [
        { min: 18, max: 39, options: [{ text: 'M15', value: 'M15' }, { text: 'M30', value: 'M30' }] },
        { min: 40, max: 49, options: [{ text: 'V15', value: 'V15' }, { text: 'V30', value: 'V30' }] },
        { min: 50, max: 59, options: [{ text: 'W15', value: 'W15' }, { text: 'W30', value: 'W30' }] },
        { min: 60, max: Infinity, options: [{ text: 'WV15', value: 'WV15' }, { text: 'WV30', value: 'WV30' }] }
    ],
    girl: [
        { min: 10, max: 12, options: [{ text: 'Z5', value: 'Z5' }] },
        { min: 13, max: 14, options: [{ text: 'Z7', value: 'Z7' }] },
        { min: 15, max: 17, options: [{ text: 'Z10', value: 'Z10' }] }
    ],
    boy: [
        { min: 10, max: 12, options: [{ text: 'M5', value: 'M5' }] },
        { min: 13, max: 14, options: [{ text: 'M7', value: 'M7' }] },
        { min: 15, max: 17, options: [{ text: 'M10', value: 'M10' }] }
    ]
}

const raceOptions = computed(() => {
    const t = type.value
    const a = age.value

    if (!t || !a || !raceRules[t]) {
        return []
    }

    const rule = raceRules[t].find(({ min, max }) => a >= min && a <= max)
    return rule ? rule.options : []
})

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

// const minBirthDate = computed(() => {
//     const maxDate = new Date()
//     maxDate.setHours(12, 0, 0, 0)
//     maxDate.setFullYear(maxDate.getFullYear() - 1)
//     return maxDate
// })

// TODO: doladit tuto funkci - hlášky, validace, odesílání
async function onSubmit() {
    console.log('Submitting contact form...', {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        dateOfBirth: dateOfBirth.value,
        type: type.value,
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
            firstName: firstName.value.trim(),
            lastName: lastName.value.trim(),
            email: email.value,
            dateOfBirth: dateOfBirth.value ? dateOfBirth.value.toISOString() : null,
            type: type.value,
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
    firstName.value = ''
    lastName.value = ''
    email.value = ''
    dateOfBirth.value = null
    type.value = ''
    cfResponse.value = ''
    validation.value.$reset()
}
</script>
