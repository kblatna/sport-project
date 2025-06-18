<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-12 col-lg-6 mx-auto bg-white p-5 mt-5 rounded-3 shadow">
                <h2 class="text-center mb-4">
                    Přihláška
                    <iconify-icon
                        :inline="true"
                        icon="mdi:cow"
                    />
                </h2>
                <SignupForm />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import SignupForm from './components/SignupForm.vue'

</script>
