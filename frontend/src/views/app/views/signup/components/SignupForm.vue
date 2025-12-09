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
                >Jméno</label>
                <InputText
                    id="firstName"
                    v-model="firstName"
                    :validation="validation.firstName"
                    class="w-full"
                />
            </div>

            <div>
                <label
                    for="lastName"
                    class="block mb-2 font-medium"
                >Příjmení</label>
                <InputText
                    id="lastName"
                    v-model="lastName"
                    :validation="validation.lastName"
                    class="w-full"
                />
            </div>

            <div class="md:col-span-2">
                <label
                    for="email"
                    class="block mb-2 font-medium"
                >Email</label>
                <InputText
                    id="email"
                    v-model="email"
                    type="email"
                    class="w-full"
                />
            </div>

            <div>
                <label
                    for="dateOfBirth"
                    class="block mb-2 font-medium"
                >Datum narození</label>
                <DatePicker
                    id="dateOfBirth"
                    v-model="dateOfBirth"
                    :validation="validation?.dateOfBirth"
                    class="w-full"
                    date-format="dd.mm.yy"
                    :max-date="new Date()"
                    show-icon
                    fluid
                    icon-display="input"
                />
            </div>

            <div
                class="md:col-span-2"
                v-if="age !==null"
            >
                <label
                    for="category"
                    class="block mb-2 font-medium"
                >Kategorie</label>
                <Select
                    id="category"
                    v-model="category"
                    :options="categoryOptions"
                    option-label="label"
                    option-value="value"
                    :validation="validation.category"
                    class="w-full"
                />
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
                >Vzdálenost</label>
                <Select
                    id="race"
                    v-model="race"
                    :options="raceOptions"
                    option-label="label"
                    option-value="value"
                    :validation="validation.race"
                    class="w-full"
                />
            </div>

            <div class="md:col-span-2">
                <label
                    for="note"
                    class="block mb-2 font-medium"
                >Poznámka (nepovinné)</label>
                <Textarea
                    id="note"
                    v-model="note"
                    rows="4"
                    class="w-full"
                />
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
                class="cf-turnstile"
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
import { ref, computed, watch, onMounted } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email as emailValidator } from '@vuelidate/validators'

// PrimeVue components
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import DatePicker from 'primevue/datepicker'
import Button from 'primevue/button'
import Message from 'primevue/message'
import { Textarea } from 'primevue'

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
    const birthDate = new Date(dateOfBirth.value)

    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    // If the current month is before the birth month, or it's the same month but the day hasn't occurred yet, subtract one year
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--
    }

    return age
})

const categoryOptions = computed(() => {
    if (dateOfBirth.value && age.value <= 17) {
        return [
            { label: 'Dívka', value: 'girl' },
            { label: 'Chlapec', value: 'boy' }
        ]
    } else if (dateOfBirth.value && age.value >= 18) {
        return [
            { label: 'Žena', value: 'female' },
            { label: 'Muž', value: 'male' }
        ]
    }
    return []
})

const raceRules = {
    female: [
        { min: 18, max: 39, options: [{ label: '15 km (3 kola) - Z15', value: 'Z15' }] },
        { min: 40, max: 49, options: [{ label: '15 km (3 kola) - ZV15', value: 'ZV15' }] },
        { min: 50, max: Infinity, options: [{ label: '15 km (3 kola) - ZW15', value: 'ZW15' }] }
    ],
    male: [
        { min: 18, max: 39, options: [{ label: '15 km (3 kola) - M15', value: 'M15' }, { label: '30 km (6 kol) - M30', value: 'M30' }] },
        { min: 40, max: 49, options: [{ label: '15 km (3 kola) - V15', value: 'V15' }, { label: '30 km (6 kol) - V30', value: 'V30' }] },
        { min: 50, max: 59, options: [{ label: '15 km (3 kola) - W15', value: 'W15' }, { label: '30 km (6 kol) - W30', value: 'W30' }] },
        { min: 60, max: Infinity, options: [{ label: '15 km (3 kola) - WV15', value: 'WV15' }, { label: '30 km - WV30', value: 'WV30' }] }
    ],
    girl: [
        { min: 0, max: 5, options: [{ label: '140 m - Z1', value: 'Z1' }] },
        { min: 6, max: 7, options: [{ label: '350 m - Z2', value: 'Z2' }] },
        { min: 8, max: 9, options: [{ label: '700 m - Z3', value: 'Z3' }] },
        { min: 10, max: 12, options: [{ label: '5 km (2 kola) - Z5', value: 'Z5' }] },
        { min: 13, max: 14, options: [{ label: '7,5 km (3 kola) - Z7', value: 'Z7' }] },
        { min: 15, max: 17, options: [{ label: '10 km (4 kola) - Z10', value: 'Z10' }] }
    ],
    boy: [
        { min: 0, max: 5, options: [{ label: '140 m - M1', value: 'M1' }] },
        { min: 6, max: 7, options: [{ label: '350 m - M2', value: 'M2' }] },
        { min: 8, max: 9, options: [{ label: '700 m - M3', value: 'M3' }] },
        { min: 10, max: 12, options: [{ label: '5 km (2 kola) - M5', value: 'M5' }] },
        { min: 13, max: 14, options: [{ label: '7,5 km (3 kola) - M7', value: 'M7' }] },
        { min: 15, max: 17, options: [{ label: '10 km (4 kola) - M10', value: 'M10' }] }
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

watch(age, (newAge) => {
    if (newAge !== null) {
        category.value = ''
        race.value = null
    }
})

onMounted(() => {
    if ((window as any).turnstile && turnstileSiteKey) {
        try {
            (window as any).turnstile.render(turnstileEl.value, {
                sitekey: turnstileSiteKey,
                mode: 'invisible',
                callback: (token: string) => {
                    turnstileToken.value = token
                }
            })
        } catch (err) {
            console.error('Error rendering Turnstile:', err)
        }
    }
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

        const response = await fetch('api/race-application', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })

        if (!response.ok) {
            const errorData = await response.json()
            console.error('Backend error:', errorData)
            throw new Error(errorData.message || 'Server returned an error')
        }

        success.value = 'Přihláška byla úspěšně odeslána.'
        resetForm()
    } catch (fetchError) {
        console.error('Submit error:', fetchError)
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
    race.value = ''
    note.value = ''
    cfResponse.value = ''
    validation.value.$reset()
}
</script>
