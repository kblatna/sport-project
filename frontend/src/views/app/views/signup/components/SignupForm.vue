<template>
    <form
        @submit.prevent="onSubmit"
        :data-is-loading="isLoading"
    >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label
                    for="firstName"
                    class="block mb-2 font-medium"
                >
                    Jméno
                </label>
                <InputText
                    id="firstName"
                    v-model="firstName"
                    :validation="validation.firstName"
                    class="w-full"
                    @blur="validation.firstName.$touch()"
                />
                <div
                    v-if="validation.firstName.$error"
                    class="p-error text-red-600 text-sm mt-1"
                >
                    {{ validation.firstName.$errors[0]?.$message }}
                </div>
            </div>

            <div>
                <label
                    for="lastName"
                    class="block mb-2 font-medium"
                >
                    Příjmení
                </label>
                <InputText
                    id="lastName"
                    v-model="lastName"
                    :validation="validation.lastName"
                    class="w-full"
                    @blur="validation.lastName.$touch()"
                />
                <div
                    v-if="validation.lastName.$error"
                    class="p-error text-red-600 text-sm mt-1"
                >
                    {{ validation.lastName.$errors[0]?.$message }}
                </div>
            </div>

            <div>
                <label
                    for="email"
                    class="block mb-2 font-medium"
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

            <div>
                <label
                    for="dateOfBirth"
                    class="block mb-2 font-medium"
                >
                    Datum narození
                </label>
                <DatePicker
                    id="dateOfBirth"
                    v-model="dateOfBirth"
                    :validation="validation.dateOfBirth"
                    class="w-full"
                    date-format="dd.mm.yy"
                    :max-date="new Date()"
                    show-icon
                    fluid
                    icon-display="input"
                    @blur="validation.dateOfBirth.$touch()"
                />
                <div
                    v-if="validation.dateOfBirth.$error"
                    class="p-error text-red-600 text-sm mt-1"
                >
                    {{ validation.dateOfBirth.$errors[0]?.$message }}
                </div>
            </div>

            <div
                class="md:col-span-2"
                v-if="age !== null"
            >
                <label
                    for="category"
                    class="block mb-2 font-medium"
                >
                    Kategorie
                </label>
                <Select
                    id="category"
                    v-model="category"
                    :options="categoryOptions"
                    option-label="label"
                    option-value="value"
                    :validation="validation.category"
                    class="w-full"
                    @blur="validation.category.$touch()"
                />
                <div
                    v-if="validation.category.$error"
                    class="p-error text-red-600 text-sm mt-1"
                >
                    {{ validation.category.$errors[0]?.$message }}
                </div>
            </div>

            <p
                v-if="category && category !== 'male'"
                class="mt-2"
            >
                <strong>Délka závodu:</strong> {{ raceOptions.length > 0 ? raceOptions[0].label : 'Není vybrána' }}
            </p>

            <div
                class="md:col-span-2"
                v-if="category === 'male'"
            >
                <label
                    for="race"
                    class="block mb-2 font-medium"
                >
                    Vzdálenost
                </label>
                <Select
                    id="race"
                    v-model="race"
                    :options="raceOptions"
                    option-label="label"
                    option-value="value"
                    :validation="validation.race"
                    class="w-full"
                    @blur="validation.race.$touch()"
                />
                <div
                    v-if="validation.race.$error"
                    class="p-error text-red-600 text-sm mt-1"
                >
                    {{ validation.race.$errors[0]?.$message }}
                </div>
            </div>

            <div class="md:col-span-2">
                <label
                    for="note"
                    class="block mb-2 font-medium"
                >
                    Poznámka (nepovinné)
                </label>
                <Textarea
                    id="note"
                    v-model="note"
                    :validation="validation.note"
                    rows="4"
                    maxlength="500"
                    class="w-full"
                    @blur="validation.note.$touch()"
                />
                <small class="text-gray-600">
                    {{ note.length }}/500 znaků
                </small>
                <div
                    v-if="validation.note.$error"
                    class="p-error text-red-600 text-sm mt-1"
                >
                    {{ validation.note.$errors[0]?.$message }}
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
                class="cf-turnstile mb-5"
            ></div>
        </div>

        <p class="text-xs text-gray-500 mb-5">
            Uvedené údaje použije pořadatel Defekt z.s., Bratří Mrštíků 24, 614 00, Brno, IČ: 708342237 pouze pro účely spojené s&nbsp;pořádáním závodů Soběšická Mulda a&nbsp;Muldička a&nbsp;neposkytne je třetím osobám. Odesláním formuláře vyjadřujete svůj souhlas ve smyslu zákona 101/2000 Sb., o&nbsp;ochraně osobních údajů, v&nbsp;platném znění, s&nbsp;výše uvedeným zpracováním osobních údajů.
        </p>

        <div class="flex justify-end">
            <Button
                type="submit"
                :disabled="isLoading"
                :loading="isLoading"
                label="Odeslat přihlášku"
                icon="pi pi-send"
                class="px-6 py-2"
            />
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
import { required, email as emailValidator, maxLength } from '@/utils/validators'
import { logger } from '@/utils/logger'
import { getCategoryOptions, getRaceOptions, requiresRaceSelection } from '@/config/raceCategories'
import { Textarea } from 'primevue'
import Button from 'primevue/button'
import DatePicker from 'primevue/datepicker'
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'
import Select from 'primevue/select'
import { computed, onMounted, ref, watch } from 'vue'

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const dateOfBirth = ref<Date | null>(null)
const category = ref('')
const race = ref<string | null>(null)
const honeypot = ref('')
const note = ref('')

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
        },
        note: {
            maxLength: maxLength(500)
        }
    },
    {
        firstName,
        lastName,
        email,
        dateOfBirth,
        category,
        race,
        note
    }
)

const age = computed(() => {
    if (!dateOfBirth.value) {
        return null
    }
    const today = new Date()
    const birthDate = new Date(dateOfBirth.value)

    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    // If the current month is before the birth month, or it's the same month but the day hasn't occurred yet, subtract one year
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--
    }

    return age
})

const categoryOptions = computed(() => getCategoryOptions(age.value))

const raceOptions = computed(() => getRaceOptions(category.value, age.value))

watch([category, raceOptions], ([newCategory, newRaceOptions]) => {
    // Auto-select race for categories with single option
    if (!requiresRaceSelection(newCategory) && newRaceOptions.length > 0) {
        race.value = newRaceOptions[0].value
    }
})

watch(age, (newAge) => {
    if (newAge !== null) {
        category.value = ''
        race.value = null
    }
})

onMounted(() => {
    if (window.turnstile && turnstileSiteKey) {
        try {
            window.turnstile.render(turnstileEl.value, {
                sitekey: turnstileSiteKey,
                callback: (token: string) => {
                    turnstileToken.value = token
                }
            })
        } catch (err) {
            logger.error('Error rendering Turnstile', err, { context: 'SignupForm' })
        }
    }
})

async function onSubmit() {
    await validation.value.$validate()
    if (validation.value.$invalid) {
        logger.error('Validation failed', validation.value.$errors, { context: 'SignupForm' })
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
            note: note.value.trim(),
            honeypot: honeypot.value,
            token: cfResponse.value
        }

        const response = await fetch('api/race-application', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })

        if (!response.ok) {
            const errorData = await response.json()
            logger.error('Backend error', errorData, { context: 'SignupForm' })
            throw new Error(errorData.message || 'Server returned an error')
        }

        success.value = 'Přihláška byla úspěšně odeslána.'
        resetForm()
    } catch (fetchError) {
        logger.error('Submit error', fetchError, { context: 'SignupForm' })
        error.value = 'Došlo k chybě při odesílání přihlášky. Zkuste to prosím znovu později.'
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
    race.value = null
    note.value = ''
    cfResponse.value = ''
    validation.value.$reset()
}
</script>
