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
                        Soběšická Mulda 2026
                    </h1>

                    <p class="text-lg md:text-2xl leading-snug mb-8">
                        28. ročník tradičního závodu horských kol <br />
                        pro veřejnost se uskuteční 12. října 2026
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

    <section class="my-20">
        <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 justify-item-center">
            <Card class="equal-card w-full max-w-sm flex flex-col h-full">
                <template #header>
                    <Image
                        :src="adults"
                        alt="Organizátoři"
                        image-class="rounded-t-xl"
                    />
                </template>

                <template #title>
                    Mulda
                </template>

                <template #subtitle>
                    Mládež (10-17 let) a&nbsp;dospělí (18+)
                </template>

                <template #content>
                    <p class="m-0">
                        Vzhledem k očekávanému počtu startujících a&nbsp;nutnosti zajištění jejich bezpečnosti jsme Soběšickou Muldu rozdělili do čtyř samostatných závodů. První tři v&nbsp;každé kategorii jednotlivců obdrží diplom, první tři v&nbsp;mládežnických kategoriích (10-17 let) dostanou navíc originální dřevěnou medaili.
                    </p>
                </template>

                <template #footer>
                    <div class="flex gap-4 mt-auto pt-4">
                        <Button
                            label="Informace"
                            variant="outlined"
                            class="w-full"
                        />
                        <Button
                            label="Registrace"
                            class="w-full"
                        />
                    </div>
                </template>
            </Card>

            <Card class="equal-card w-full max-w-sm flex flex-col h-full">
                <template #header>
                    <Image
                        :src="kids"
                        alt="Organizátoři"
                        image-class="rounded-t-xl"
                    />
                </template>

                <template #title>
                    Muldička
                </template>

                <template #subtitle>
                    Děti (4-9 let)
                </template>

                <template #content>
                    <p class="m-0">
                        Zařazení do kategorie je určeno ročníkem narození, jednotlivé kategorie startují dle harmonogramu. Děti startují zdarma, drobné ceny budou určeny pro každého předem přihlášeného malého závodníka. První tři v&nbsp;každé kategorii obdrží diplom.
                    </p>
                </template>

                <template #footer>
                    <div class="flex gap-4 mt-auto pt-4">
                        <Button
                            label="Informace"
                            variant="outlined"
                            class="w-full"
                        />
                        <Button
                            label="Registrace"
                            class="w-full"
                        />
                    </div>
                </template>
            </Card>
        </div>
    </section>

    <section class="my-20 py-20 px-5 bg-gradient-to-b from-slate-50 to-slate-100">
        <div class="max-w-4xl mx-auto text-center">
            <p class="uppercase tracking-widest text-sm text-slate-500">
                MTB závod v Brně – od roku 1996
            </p>
            <h3 class="text-4xl md:text-5xl font-bold mt-3">
                28. ročník Soběšické Muldy 2026
            </h3>

            <div class="w-20 h-1 bg-teal-500 rounded mx-auto mt-6"></div>

            <ul class="grid md:grid-cols-2 gap-y-3 gap-x-10 text-center md:text-left mt-14 text-lg">
                <li>atraktivní a&nbsp;dobře zabezpečená trať</li>
                <li>skvělá atmosféra</li>
                <li>měření časů pomocí nevratných čipů</li>
                <li>možnost bezplatného použití sprch</li>
                <li>možnost bezplatného umytí kol</li>
                <li>losování cen od našich sponzorů</li>
                <li>soutěž rodinných týmů</li>
                <li>možnost vynechání nejobtížnějšího sjezdu na trati dospělých</li>
            </ul>
        </div>
    </section>

    <section class="my-20">
        <div class="container">
            <template v-if="isLoading">
                <div class="grid grid-cols-12 gap-4 w-full">
                    <Skeleton
                        v-for="n in 8"
                        :key="n"
                        class="col-span-12 sm:col-span-6 lg:col-span-3 aspect-[4/3] min-h-[180px] w-full rounded-lg"
                    />
                </div>
            </template>

            <template v-else>
                <Galleria
                    v-model:active-index="activeIndex"
                    v-model:visible="displayCustom"
                    :value="images"
                    :num-visible="7"
                    :circular="true"
                    :full-screen="true"
                    :show-item-navigators="true"
                    :show-thumbnails="false"
                    class="max-w-50"
                >
                    <template #item="slotProps">
                        <Image
                            :src="slotProps.item.thumbnailImageSrc"
                            :alt="slotProps.item.alt"
                            image-class="block w-full rounded-md w-full"
                        />
                    </template>
                    <template #thumbnail="slotProps">
                        <Image
                            :src="slotProps.item.thumbnailImageSrc"
                            :alt="slotProps.item.alt"
                            image-class="block w-full rounded-md"
                        />
                    </template>
                </Galleria>

                <div
                    v-if="images"
                    class="grid grid-cols-12 gap-4 w-full"
                >
                    <div
                        v-for="(image, index) of images"
                        :key="index"
                        class="col-span-12 sm:col-span-6 lg:col-span-3"
                    >
                        <Image
                            :src="image.thumbnailImageSrc"
                            :alt="image.alt"
                            image-class="w-full rounded-md cursor-pointer"
                            @click="imageClick(index)"
                        />
                    </div>
                </div>
            </template>
        </div>
    </section>
</template>

<script lang="ts" setup>
import adults from '@/assets/images/adults.webp'
import kids from '@/assets/images/kids.webp'
import { PhotoService } from '@/services/photoService'
import { Button, Card, Galleria, Image, Skeleton } from 'primevue'
import { onMounted, ref } from 'vue'

const images = ref()
const activeIndex = ref(0)
const displayCustom = ref(false)
const isLoading = ref(false)

onMounted(async () => {
    getImages()
})

const imageClick = (index) => {
    activeIndex.value = index
    displayCustom.value = true
}

async function getImages() {
    isLoading.value = true
    try {
        const data = await PhotoService.getImages()
        images.value = data
    } catch (error) {
        console.error('Nepodařilo se načíst obrázky:', error)
    } finally {
        isLoading.value = false
    }
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

.equal-card .p-card-body {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.equal-card .p-card-content {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.equal-card .p-card-footer {
    margin-top: auto;
}

</style>
