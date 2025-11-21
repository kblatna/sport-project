<template>   
    <PageWrapper>            
        <PageTitle title="Slovo o pořadateli" />
        <div class="flex flex-col md:flex-row md:gap-20 gap-8">
            <div class="flex flex-col flex-1">
                <h3 class="text-xl font-semibold mb-4">Spolek Defekt</h3>
                <p class="mb-6">
                    V&nbsp;současné době je pořadatelem závodu spolek Defekt. Skutečnými pořadateli jsou již od počátků stále titíž lidé,
                    do roku 1999 pod hlavičkou Vysokoškolského sportovního klubu Mendelovy zemědělské a&nbsp;lesnické univerzity (který
                    s&nbsp;vlastní organizací závodu neměl nic společného, nicméně umožňoval vyúčtování veškerých finančních transakcí
                    a&nbsp;zajištění potřebného „papírování“). Roku 2000 se pořadatelé rozhodli založit občanské sdružení, které by
                    převzalo veškerou agendu Soběšické Muldy a&nbsp;pořádalo závod pod svou hlavičkou. V&nbsp;roce 2014 se právní forma
                    změnila na „zapsaný spolek“ (z.s.).
                </p>                    

                <figure class="flex flex-col items-center mt-auto">
                    <img
                        :src="organizers"
                        alt="Organizátoři"
                        class="w-full h-auto rounded-md"
                    />
                    <figcaption class="mt-2 text-sm text-gray-500">Organizátorský tým při testování tratě</figcaption>
                </figure>
            </div>

            <div class="flex flex-col flex-1">
                <h3 class="text-xl font-semibold mb-4">Organizační tým</h3>
                <ul class="list-disc list-inside space-y-1 mb-6">
                    <li>Ing. Zdeněk Bartoš</li>
                    <li>Bc. Miroslav Borkovec</li>
                    <li>Mgr. Jana Dojivová</li>
                    <li>Mgr. Jan Hradil, Ph.D.</li>
                    <li>prof. RNDr. Jan Strejček, Ph.D.</li>
                    <li>Ing. Pavel Strejček</li>
                </ul>

                <p class="mb-10">
                    Jediným pořadatelem závodu je z.s. Defekt. Více informací o&nbsp;tomto spolku naleznete například <a class="text-blue-600 hover:underline" href="https://www.czex.cz/defekt/" target="_blank">zde</a>.
                </p>

                <figure class="flex flex-col items-center mt-auto">
                    <img
                        :src="volunteers"
                        alt="Dobrovolníci"
                        class="w-full h-auto mt-auto rounded-md"
                    />
                    <figcaption class="mt-2 text-sm text-gray-500">Naši dobrovolníci po zvládnutí dalšího ročníku</figcaption>
                </figure>
            </div>
        </div>            

        <h3 class="text-xl font-semibold mt-10 mb-4">Poděkování</h3>
        <p>
            Na pořádání Soběšické Muldy se podílí nepočítaně „bezejmenných“ pořadatelů - naši kamarádi a&nbsp;známí,
            rodinní příslušníci výše uvedeného organizačního týmu a&nbsp;jejich známí, atd.
            Ti se nám rozhodli zcela nezištně při pořádání závodu pomoci a&nbsp;bez jejichž účasti by nebylo
            v&nbsp;lidských silách hlavního šestičlenného pořadatelského týmu závod uspořádat. Nemůžeme zde všechny pořadatele
            vyjmenovat, protože bychom určitě na někoho zapomněli, ale tímto jim všem vyjadřujeme obrovský DÍK.
        </p>            
    </PageWrapper>
</template>


<script lang="ts" setup>
import organizers from '@/assets/images/organizers.webp'
import volunteers from '@/assets/images/volunteers.webp'
import PageTitle from '@/components/PageTitle.vue'
import PageWrapper from '@/components/PageWrapper.vue'
</script>
