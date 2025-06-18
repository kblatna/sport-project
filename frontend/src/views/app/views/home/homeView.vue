<template>
    <section>
        <div
            id="intro"
            class="bg-image"
            style="
          background-image: linear-gradient(to left, rgba(245, 246, 252, 0.52), rgba(0, 0, 0, 0.73)), url('https://images.unsplash.com/photo-1633707167682-9068729bc84c');
          height: 65vh;
          background-repeat: no-repeat;
          background-size: cover;
          background-position: top center;
        "
        >
            <div
                class="mask"
                style="background-color: rgba(0, 0, 0, 0.2);"
            >
                <div class="container d-flex justify-content-start align-items-center text-white h-100">
                    <div class="row align-items-center">
                        <div class="col-12">
                            <h1 class="text-white display-1 fw-bold">
                                Soběšická Mulda 2025
                            </h1>
                            <p class="fs-3">
                                27. ročník tradičního závodu horských kol <br />pro veřejnost se uskuteční 12. října 2025
                            </p>

                            <button
                                type="button"
                                class="btn btn-outline-light mt-4 rounded-3"
                                @click="onSignup"
                            >
                                Registrace
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const $router = useRouter()

function onSignup() {
    console.log('Button clicked! Redirecting to Signup...')
    void $router.push({ name: 'Signup' })
    // You can add more logic here if needed
}

</script>

<style>
.mask {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
}

</style>
