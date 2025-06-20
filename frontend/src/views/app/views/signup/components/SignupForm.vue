<template>
    <form
        @submit.prevent="onSubmit"
        :data-is-loading="isLoading"
    >
        <div class="row">
            <div class="col-12 col-lg-6 mb-3">
                <FormInput
                    label="Jméno"
                    :id="'formInputFirstName'"
                    v-model="firstName"
                    :validation="validation.firstName"
                />
            </div>

            <div class="col-12 col-lg-6 mb-3">
                <FormInput
                    label="Příjmení"
                    :id="'formInputLastName'"
                    v-model="lastName"
                    :validation="validation.lastName"
                />
            </div>

            <div class="col-12 mb-3">
                <FormInput
                    label="E-mail"
                    :id="'formInputEmail'"
                    v-model="email"
                    :validation="validation.email"
                />
            </div>

            <div class="col-12 col-lg-6 mb-3">
                <FormInputDatePicker
                    label="Datum narození"
                    v-model="dateOfBirth"
                    :validation="validation?.dateOfBirth"
                    :min-date="minBirthDate"
                    :max-date="maxBirthDate"
                />
            </div>

            <!--TODO: Přihlášení týmu musím ještě domyslet-->
            <div
                class="col-12 col-lg-6 mb-3"
                v-if="age !== null"
            >
                <FormInputSelect
                    label="Zvolte kategorii"
                    v-model="category"
                    :validation="validation.category"
                    :options="categoryOptions"
                />
            </div>

            <p
                v-if="category && category !== 'male'"
                class="mt-2"
            >
                <strong>Délka závodu:</strong> {{ raceOptions.length > 0 ? raceOptions[0].text : 'Není vybrána' }}
            </p>

            <!--TODO: Teoreticky multiselect???-->
            <div
                class="col-12 mb-3"
                v-if="category === 'male'"
            >
                <FormInputSelect
                    label="Délka závodu"
                    v-model="race"
                    :validation="validation.race"
                    :options="raceOptions"
                    :placeholder="'Vyberte vzdálenost'"
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
            class="cf-turnstile mt-3"
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
import { computed, onMounted, ref, watch } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email as emailValidator } from '@vuelidate/validators'

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const dateOfBirth = ref<Date | null>(null)
const category = ref<string | null>(null)
const race = ref<string | null>(null)
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
        category: {
            required
        },
        race: {
            required
        }
    },
    {
        firstName,
        lastName,
        email,
        dateOfBirth,
        category,
        race
    }
)

const age = computed(() => {
    if (!dateOfBirth.value) {
        return null
    }
    const today = new Date()
    return today.getFullYear() - dateOfBirth.value.getFullYear()
})

const categoryOptions = computed(() => {
    if (dateOfBirth.value && age.value <= 17) {
        return [
            { text: 'Dívka', value: 'girl' },
            { text: 'Chlapec', value: 'boy' }
        ]
    } else if (dateOfBirth.value && age.value >= 18) {
        return [
            { text: 'Žena', value: 'female' },
            { text: 'Muž', value: 'male' }
        ]
    }
    return []
})

const raceRules = {
    female: [
        { min: 18, max: 39, options: [{ text: '15 km (3 kola) - Z15', value: 'Z15' }] },
        { min: 40, max: 49, options: [{ text: '15 km (3 kola) - ZV15', value: 'ZV15' }] },
        { min: 50, max: Infinity, options: [{ text: '15 km (3 kola) - ZW15', value: 'ZW15' }] }
    ],
    male: [
        { min: 18, max: 39, options: [{ text: '15 km (3 kola) - M15', value: 'M15' }, { text: '30 km (6 kol) - M30', value: 'M30' }] },
        { min: 40, max: 49, options: [{ text: '15 km (3 kola) - V15', value: 'V15' }, { text: '30 km (6 kol) - V30', value: 'V30' }] },
        { min: 50, max: 59, options: [{ text: '15 km (3 kola) - W15', value: 'W15' }, { text: '30 km (6 kol) - W30', value: 'W30' }] },
        { min: 60, max: Infinity, options: [{ text: '15 km (3 kola) - WV15', value: 'WV15' }, { text: '30 km - WV30', value: 'WV30' }] }
    ],
    girl: [
        { min: 0, max: 5, options: [{ text: '140 m - Z1', value: 'Z1' }] },
        { min: 6, max: 7, options: [{ text: '350 m - Z2', value: 'Z2' }] },
        { min: 8, max: 9, options: [{ text: '700 m - Z3', value: 'Z3' }] },
        { min: 10, max: 12, options: [{ text: '5 km (2 kola) - Z5', value: 'Z5' }] },
        { min: 13, max: 14, options: [{ text: '7,5 km (3 kola) - Z7', value: 'Z7' }] },
        { min: 15, max: 17, options: [{ text: '10 km (4 kola) - Z10', value: 'Z10' }] }
    ],
    boy: [
        { min: 0, max: 5, options: [{ text: '140 m - M1', value: 'M1' }] },
        { min: 6, max: 7, options: [{ text: '350 m - M2', value: 'M2' }] },
        { min: 8, max: 9, options: [{ text: '700 m - M3', value: 'M3' }] },
        { min: 10, max: 12, options: [{ text: '5 km (2 kola) - M5', value: 'M5' }] },
        { min: 13, max: 14, options: [{ text: '7,5 km (3 kola) - M7', value: 'M7' }] },
        { min: 15, max: 17, options: [{ text: '10 km (4 kola) - M10', value: 'M10' }] }
    ]
}

const raceOptions = computed(() => {
    const c = category.value
    const a = age.value

    if (!c || a === null || a === undefined || !raceRules[c]) {
        return []
    }

    const rule = raceRules[c].find(({ min, max }) => a >= min && a <= max)
    return rule ? rule.options : []
})

watch([category, raceOptions], ([newCategory, newRaceOptions]) => {
    if (newCategory !== 'male' && newRaceOptions.length > 0) {
        race.value = newRaceOptions[0].value
    }
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

const minBirthDate = computed(() => {
    return new Date('1920-01-01T00:00:00')
})

const maxBirthDate = computed(() => {
    return new Date()
})

// TODO: doladit tuto funkci - hlášky, validace, odesílání
async function onSubmit() {
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
            category: category.value,
            race: race.value,
            honeypot: honeypot.value,
            token: cfResponse.value
        }

        await fetch('api/race-application', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })

        success.value = 'Přihláška byla úspěšně odeslána.'
        resetForm()
    } catch (fetchError) {
        if (fetchError instanceof Error) {
            error.value = 'CSRF token is invalid or missing. Please try again.'
            return
        }
        error.value
            = 'Došlo k chybě při odesílání přihlášky. Zkuste to prosím znovu později.'
    } finally {
        isLoading.value = false
    }
}

function resetForm(): void {
    firstName.value = ''
    lastName.value = ''
    email.value = ''
    dateOfBirth.value = null
    category.value = ''
    race.value = ''
    cfResponse.value = ''
    validation.value.$reset()
}
</script>
