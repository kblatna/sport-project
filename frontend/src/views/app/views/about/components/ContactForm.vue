<template>
    <div class="max-w-3xl mx-auto">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">
            Kontaktní formulář
        </h2>

        <form
            @submit.prevent="onSubmit"
            :data-is-loading="isLoading"
            class="space-y-6"
        >
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <FloatLabel>
                        <InputText
                            id="name"
                            v-model="name"
                            :invalid="validation.name.$invalid && validation.name.$dirty"
                            class="w-full"
                        />
                        <label for="name">Jméno</label>
                    </FloatLabel>
                    <small
                        v-if="validation.name.$invalid && validation.name.$dirty"
                        class="text-red-500 text-sm mt-1 block"
                    >
                        Jméno je povinné
                    </small>
                </div>

                <div>
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
            </div>

            <div>
                <FloatLabel>
                    <InputText
                        id="subject"
                        v-model="subject"
                        :invalid="validation.subject.$invalid && validation.subject.$dirty"
                        class="w-full"
                    />
                    <label for="subject">Předmět</label>
                </FloatLabel>
                <small
                    v-if="validation.subject.$invalid && validation.subject.$dirty"
                    class="text-red-500 text-sm mt-1 block"
                >
                    Předmět je povinný
                </small>
            </div>

            <div>
                <FloatLabel>
                    <Textarea
                        id="message"
                        v-model="message"
                        :invalid="validation.message.$invalid && validation.message.$dirty"
                        class="w-full"
                        rows="5"
                    />
                    <label for="message">Vaše zpráva</label>
                </FloatLabel>
                <small
                    v-if="validation.message.$invalid && validation.message.$dirty"
                    class="text-red-500 text-sm mt-1 block"
                >
                    Zpráva je povinná
                </small>
            </div>

            <div class="flex justify-end">
                <Button
                    type="submit"
                    :disabled="isLoading"
                    :loading="isLoading"
                    label="Odeslat zprávu"
                    icon="pi pi-send"
                />
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email as emailValidator } from '@vuelidate/validators'

// PrimeVue Components
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import FloatLabel from 'primevue/floatlabel'

const name = ref('')
const email = ref('')
const subject = ref('')
const message = ref('')
const isLoading = ref(false)

const rules = {
    name: { required },
    email: { required, email: emailValidator },
    subject: { required },
    message: { required }
}

const validation = useVuelidate(rules, { name, email, subject, message })

const onSubmit = async () => {
    validation.value.$touch()

    if (validation.value.$invalid) {
        return
    }

    isLoading.value = true

    try {
        // Zde by bylo volání API
        console.log('Odesílám kontaktní formulář:', {
            name: name.value,
            email: email.value,
            subject: subject.value,
            message: message.value
        })

        // Simulace async operace
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Reset formuláře
        name.value = ''
        email.value = ''
        subject.value = ''
        message.value = ''
        validation.value.$reset()
    } catch (error) {
        console.error('Chyba při odesílání:', error)
    } finally {
        isLoading.value = false
    }
}
</script>
