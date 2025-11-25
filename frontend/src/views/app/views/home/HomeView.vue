<template>
    <section class="relative h-[65vh]">
        <div
            class="absolute inset-0 bg-cover bg-start"
            :style="{
                backgroundImage:
                    'linear-gradient(to left, rgba(245,246,252,0.52), rgba(0,0,0,0.73)), url(https://images.unsplash.com/photo-1633707167682-9068729bc84c)'
            }"
        ></div>

        <div class="absolute inset-0 bg-black/20"></div>

        <div class="relative z-10 flex items-center h-full">
            <div class="container">
                <div class="max-w-2xl text-white">
                    <h1 class="text-4xl md:text-6xl font-extrabold mb-10">
                        Soběšická Mulda 2025
                    </h1>

                    <p class="text-lg md:text-2xl leading-snug mb-8">
                        27. ročník tradičního závodu horských kol <br />
                        pro veřejnost se uskuteční 12. října 2025
                    </p>

                    <div class="flex gap-5">
                        <div class="flex gap-5">
                            <Button
                                :to="{ name: 'Info' }"
                                router-link
                                class="border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-black transition"
                                label="Informace"
                            />

                            <Button
                                :to="{ name: 'Signup' }"
                                router-link
                                class="border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-black transition"
                                label="Registrace"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
import { Button } from 'primevue'

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
