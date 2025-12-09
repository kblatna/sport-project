<template>
    <SectionWrapper>
        <SectionHeader title="Slovo o pořadateli" />

        <div class="container max-w-6xl mx-auto">
            <div class="flex flex-col md:flex-row md:gap-20 gap-8 mb-12">
                <div class="flex flex-col flex-1">
                    <h3 class="text-xl font-semibold mb-4 flex items-center gap-2">
                        <iconify-icon
                            icon="mdi:account-group"
                            :inline="true"
                            class="text-primary"
                        />
                        Spolek Defekt
                    </h3>
                    <p class="mb-6 text-gray-700 leading-relaxed">
                        V&nbsp;současné době je pořadatelem závodu spolek Defekt. Skutečnými pořadateli jsou již od počátků stále titíž lidé,
                        do roku 1999 pod hlavičkou Vysokoškolského sportovního klubu Mendelovy zemědělské a&nbsp;lesnické univerzity (který
                        s&nbsp;vlastní organizací závodu neměl nic společného, nicméně umožňoval vyúčtování veškerých finančních transakcí
                        a&nbsp;zajištění potřebného „papírování"). Roku 2000 se pořadatelé rozhodli založit občanské sdružení, které by
                        převzalo veškerou agendu Soběšické Muldy a&nbsp;pořádalo závod pod svou hlavičkou. V&nbsp;roce 2014 se právní forma
                        změnila na „zapsaný spolek" (z.s.).
                    </p>

                    <figure class="flex flex-col items-center mt-auto">
                        <Image
                            :src="organizers"
                            alt="Organizátoři"
                            image-class="w-full max-w-[35rem] rounded-md"
                            preview
                        />
                        <figcaption class="mt-2 text-sm text-gray-500 italic">
                            Organizátorský tým při testování tratě
                        </figcaption>
                    </figure>
                </div>

                <div class="flex flex-col flex-1">
                    <h3 class="text-xl font-semibold mb-4 flex items-center gap-2">
                        <iconify-icon
                            icon="mdi:clipboard-account"
                            :inline="true"
                            class="text-primary"
                        />
                        Organizační tým
                    </h3>
                    <ul class="space-y-2 mb-6">
                        <li
                            v-for="member in teamMembers"
                            :key="member"
                            class="flex items-center gap-2 text-gray-700"
                        >
                            <iconify-icon
                                icon="mdi:account-check"
                                :inline="true"
                                class="text-primary text-sm"
                            />
                            <span>{{ member }}</span>
                        </li>
                    </ul>

                    <p class="mb-10 text-gray-700 leading-relaxed">
                        Jediným pořadatelem závodu je z.s. Defekt. Více informací o&nbsp;tomto spolku naleznete například <a
                            class="text-primary hover:underline font-medium"
                            href="https://www.czex.cz/defekt/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >zde</a>.
                    </p>

                    <figure class="flex flex-col items-center mt-auto">
                        <Image
                            :src="volunteers"
                            alt="Dobrovolníci"
                            image-class="w-full max-w-[35rem] rounded-md"
                            preview
                        />
                        <figcaption class="mt-2 text-sm text-gray-500 italic">
                            Naši dobrovolníci po zvládnutí dalšího ročníku
                        </figcaption>
                    </figure>
                </div>
            </div>

            <div class="mt-10 md:mt-20">
                <h3 class="text-xl font-semibold mb-4">
                    Poděkování
                </h3>
                <p>
                    Na pořádání Soběšické Muldy se podílí nepočítaně „bezejmenných“ pořadatelů - naši kamarádi a&nbsp;známí,
                    rodinní příslušníci výše uvedeného organizačního týmu a&nbsp;jejich známí, atd.
                    Ti se nám rozhodli zcela nezištně při pořádání závodu pomoci a&nbsp;bez jejichž účasti by nebylo
                    v&nbsp;lidských silách hlavního šestičlenného pořadatelského týmu závod uspořádat. Nemůžeme zde všechny pořadatele
                    vyjmenovat, protože bychom určitě na někoho zapomněli, ale tímto jim všem vyjadřujeme obrovský DÍK.
                </p>
            </div>
        </div>
    </SectionWrapper>
</template>

<script lang="ts" setup>
import organizers from '@/assets/images/organizers.webp'
import volunteers from '@/assets/images/volunteers.webp'
import SectionHeader from '@/components/SectionHeader.vue'
import SectionWrapper from '@/components/SectionWrapper.vue'
import { Image } from 'primevue'

const teamMembers = [
    'Ing. Zdeněk Bartoš',
    'Bc. Miroslav Borkovec',
    'Mgr. Jana Dojivová',
    'Mgr. Jan Hradil, Ph.D.',
    'prof. RNDr. Jan Strejček, Ph.D.',
    'Ing. Pavel Strejček'
]
</script>
