<template>
    <form
        @submit.prevent="onSubmit"
        :data-is-loading="isLoading"
        class="space-y-6"
    >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <FloatLabel>
                    <InputText
                        id="firstName"
                        v-model="firstName"
                        :invalid="validation.firstName.$invalid && validation.firstName.$dirty"
                        class="w-full"
                    />
                    <label for="firstName">Jméno</label>
                </FloatLabel>
                <small
                    v-if="validation.firstName.$invalid && validation.firstName.$dirty"
                    class="text-red-500 text-sm mt-1 block"
                >
                    Jméno je povinné
                </small>
            </div>

            <div>
                <FloatLabel>
                    <InputText
                        id="lastName"
                        v-model="lastName"
                        :invalid="validation.lastName.$invalid && validation.lastName.$dirty"
                        class="w-full"
                    />
                    <label for="lastName">Příjmení</label>
                </FloatLabel>
                <small
                    v-if="validation.lastName.$invalid && validation.lastName.$dirty"
                    class="text-red-500 text-sm mt-1 block"
                >
                    Příjmení je povinné
                </small>
            </div>

            <div class="md:col-span-2">
                <FloatLabel>
                    <InputText
                        id="email"
                        v-model="email"
                        type="email"
                        :invalid="validation.email.$invalid && validation.email.$dirty"
                        class="w-full"
                    />
                    <label for="email">Email</label>
                </FloatLabel>
                <small
                    v-if="validation.email.$invalid && validation.email.$dirty"
                    class="text-red-500 text-sm mt-1 block"
                >
                    Zadejte platný email
                </small>
            </div>

            <div>
                <FloatLabel>
                    <InputText
                        id="phone"
                        v-model="phone"
                        type="tel"
                        :invalid="validation.phone.$invalid && validation.phone.$dirty"
                        class="w-full"
                    />
                    <label for="phone">Telefon</label>
                </FloatLabel>
                <small
                    v-if="validation.phone.$invalid && validation.phone.$dirty"
                    class="text-red-500 text-sm mt-1 block"
                >
                    Telefon je povinný
                </small>
            </div>

            <div>
                <FloatLabel>
                    <DatePicker
                        id="dateOfBirth"
                        v-model="dateOfBirth"
                        :invalid="validation.dateOfBirth.$invalid && validation.dateOfBirth.$dirty"
                        class="w-full"
                        date-format="dd.mm.yy"
                        :max-date="new Date()"
                        show-icon
                        icon-display="input"
                    />
                    <label for="dateOfBirth">Datum narození</label>
                </FloatLabel>
                <small
                    v-if="validation.dateOfBirth.$invalid && validation.dateOfBirth.$dirty"
                    class="text-red-500 text-sm mt-1 block"
                >
                    Datum narození je povinné
                </small>
            </div>

            <div class="md:col-span-2">
                <FloatLabel>
                    <Select
                        id="category"
                        v-model="category"
                        :options="categoryOptions"
                        option-label="label"
                        option-value="value"
                        :invalid="validation.category.$invalid && validation.category.$dirty"
                        class="w-full"
                    />
                    <label for="category">Kategorie</label>
                </FloatLabel>
                <small
                    v-if="validation.category.$invalid && validation.category.$dirty"
                    class="text-red-500 text-sm mt-1 block"
                >
                    Kategorie je povinná
                </small>
            </div>

            <div class="md:col-span-2">
                <div class="flex items-center gap-2 mb-4">
                    <Checkbox
                        id="agreeTerms"
                        v-model="agreeTerms"
                        :invalid="validation.agreeTerms.$invalid && validation.agreeTerms.$dirty"
                        binary
                    />
                    <label
                        for="agreeTerms"
                        class="text-sm"
                    >
                        Souhlasím s podmínkami účasti
                    </label>
                </div>
                <small
                    v-if="validation.agreeTerms.$invalid && validation.agreeTerms.$dirty"
                    class="text-red-500 text-sm block"
                >
                    Musíte souhlasit s podmínkami
                </small>
            </div>
        </div>

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
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email as emailValidator } from '@vuelidate/validators'

// PrimeVue components
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import DatePicker from 'primevue/datepicker'
import Checkbox from 'primevue/checkbox'
import Button from 'primevue/button'
import FloatLabel from 'primevue/floatlabel'

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const phone = ref('')
const dateOfBirth = ref('')
const category = ref('')
const agreeTerms = ref(false)
const isLoading = ref(false)

// Kategorie based on age
const categoryOptions = computed(() => {
    const currentYear = new Date().getFullYear()
    const birthYear = dateOfBirth.value ? new Date(dateOfBirth.value).getFullYear() : null
    const age = birthYear ? currentYear - birthYear : null

    if (!age) {
        return [
            { label: 'Vyberte nejdříve datum narození', value: '', disabled: true }
        ]
    }

    const categories = []

    if (age < 18) {
        categories.push({ label: 'Junioři (do 18 let)', value: 'junior' })
    } else if (age >= 18 && age < 35) {
        categories.push({ label: 'Dospělí (18-34 let)', value: 'adult' })
    } else if (age >= 35 && age < 50) {
        categories.push({ label: 'Masters (35-49 let)', value: 'masters' })
    } else {
        categories.push({ label: 'Senior (50+ let)', value: 'senior' })
    }

    return categories
})

const rules = {
    firstName: { required },
    lastName: { required },
    email: { required, email: emailValidator },
    phone: { required },
    dateOfBirth: { required },
    category: { required },
    agreeTerms: { required: (val: boolean) => val === true }
}

const validation = useVuelidate(rules, {
    firstName,
    lastName,
    email,
    phone,
    dateOfBirth,
    category,
    agreeTerms
})

const onSubmit = async () => {
    validation.value.$touch()

    if (validation.value.$invalid) {
        return
    }

    isLoading.value = true

    try {
        // Zde by bylo volání API
        console.log('Odesílám přihlášku:', {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            phone: phone.value,
            dateOfBirth: dateOfBirth.value,
            category: category.value,
            agreeTerms: agreeTerms.value
        })

        // Simulace async operace
        await new Promise(resolve => setTimeout(resolve, 2000))

        // Reset formuláře
        firstName.value = ''
        lastName.value = ''
        email.value = ''
        phone.value = ''
        dateOfBirth.value = ''
        category.value = ''
        agreeTerms.value = false
        validation.value.$reset()
    } catch (error) {
        console.error('Chyba při odesílání:', error)
    } finally {
        isLoading.value = false
    }
}
</script>
