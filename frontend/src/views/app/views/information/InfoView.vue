<template>
    <SectionWrapper
        padding-y="md"
    >
        <SectionHeader title="Informace k závodu Mulda" />
        <div class="text-center mb-5">
            <h3 class="font-bold mb-5">
                Mulda pro mládež od 10 let a dospělé
            </h3>
            <p>Zařazení do kategorie je určeno ročníkem narození, jednotlivé kategorie startují dle harmonogramu v tabulce.</p>
        </div>

        <div class="rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 md:p-10 border border-gray-200/60">
            <CategoryDataTable id="categoryTable" />
        </div>
    </SectionWrapper>

    <SectionWrapper
        padding-y="md"
        background="gray"
    >
        <SectionHeader
            title="Mapa okruhů"
            :show-divider="false"
        />

        <Tabs
            value="0"
            class="transparent-tabs w-full"
        >
            <TabList>
                <Tab value="0">
                    Okruh 2,5 km
                </Tab>
                <Tab value="1">
                    Okruh 5 km
                </Tab>
            </TabList>
            <TabPanels>
                <TabPanel value="0">
                    <div class="rounded-2xl shadow-2xl overflow-hidden border border-white/50">
                        <iframe
                            style="border:none"
                            src="https://mapy.com/s/dedabafaha"
                            frameborder="0"
                            class="w-full h-[20rem]"
                        ></iframe>
                    </div>
                </TabPanel>
                <TabPanel value="1">
                    <div class="rounded-2xl shadow-2xl overflow-hidden border border-white/50">
                        <iframe
                            style="border:none"
                            src="https://mapy.com/s/redogopahu"
                            frameborder="0"
                            class="w-full h-[20rem]"
                        ></iframe>
                    </div>
                </TabPanel>
            </TabPanels>
        </Tabs>
    </SectionWrapper>

    <SectionWrapper
        padding-y="md"
    >
        <SectionHeader
            title="Startovné"
            :show-divider="false"
        />
        <div class="mx-auto mt-6">
            <div class="md:col-span-2 space-y-4">
                <div>
                    <h4 class="text-lg font-semibold mb-2">
                        Přihlášení a platba
                    </h4>
                    <p class="text-gray-600 mb-8">
                        Výše startovného se liší podle data přihlášení a způsobu platby. Startovné lze platit bankovním převodem do 9. 10. 2026. V případě platby na účet je třeba uvést variabilní symbol, jež zjistíte v emailu po odeslání elektronické přihlášky (pokud vám nic nepřijde, zkontrolujte si adresář „Spam", „Nevyžádaná pošta" atd.). Vezměte si na prezenci kopii platebního dokladu, můžete tím předejít případným komplikacím.
                    </p>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div class="border rounded-lg p-4">
                            <div class="flex items-baseline justify-between">
                                <div>
                                    <div class="font-medium">
                                        Dospělí
                                    </div>
                                    <div class="text-md text-gray-500">
                                        M15/30, Z15/ZV15/ZW15, V15/30, W15/30, WV15/30
                                    </div>
                                </div>
                                <div class="text-right">
                                    <div class="text-2xl font-semibold">
                                        150 Kč
                                    </div>
                                </div>
                            </div>
                            <p class="mt-3">
                                Platba převodem do pátku 9. 10. 2026 nebo na místě za <strong>250 Kč</strong>.
                            </p>
                        </div>

                        <div class="border rounded-lg p-4">
                            <div class="flex items-baseline justify-between">
                                <div>
                                    <div class="font-medium">
                                        Mládež
                                    </div>
                                    <div class="text-md text-gray-500">
                                        M5/7/10 a Z5/7/10
                                    </div>
                                </div>
                                <div class="text-right">
                                    <div class="text-2xl font-semibold">
                                        0 Kč
                                    </div>
                                </div>
                            </div>
                            <p class="mt-3">
                                Zdarma při přihlášení do pátku 9. 10. 2026 23:59. Na místě <strong>50 Kč</strong>.
                            </p>
                        </div>
                    </div>

                    <div class="mt-8">
                        <h5 class="font-semibold mb-3">
                            Platba převodem
                        </h5>
                        <div class=" mb-3">
                            <p class="font-medium">
                                Č. účtu:
                            </p>
                            <p>
                                2900161474/2010
                            </p>
                        </div>
                        <div class="mb-3">
                            <p class="font-medium">
                                Variabilní symbol:
                            </p>
                            <p>zjistíte v emailu po odeslání elektronické přihlášky</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </SectionWrapper>

    <SectionWrapper
        padding-y="md"
        background="gray"
    >
        <div>
            <SectionHeader
                title="Prezence závodníků"
                :show-divider="false"
            />
            <ContentImageCard
                image-src="https://mapy.com/s/mabosuromu"
                image-position="left"
            >
                <template #default>
                    <div class="space-y-4">
                        <p>
                            Prezence závodníků je možná jen v den závodu v době (viz <a href="#categoryTable">tabulka</a>). Prezence proběhne na startovní a cílové louce (viz <a
                                href="http://mapy.cz/s/lS2O"
                                target="_blank"
                            >mapa</a>), vedle vysoké červené budovy (Okružní 29a, červená budova s vysílačem), nedaleko konečné autobusu č. 46 a 57 - Haškova (příchod bude vyznačen).
                        </p>
                        <p>Závodník se nejprve zaregistruje (vyplní přihlášku - není-li přihlášen předem), zaplatí startovné, nebo ukáže doklad o zaplacení a převezme startovní číslo a tři plastové pásky. Na startovním čísle bude nalepen <strong>nevratný čip</strong> (záloha na čip nebude tedy vybírána). Závodník si startovní číslo co nejdříve připevní plastovými pásky na řídítka svého kola (bez startovního čísla nebude možné změřit čas). Start i cíl bude na téže louce.</p>
                    </div>
                </template>
            </ContentImageCard>
        </div>
    </SectionWrapper>

    <SectionWrapper
        padding-y="md"
    >
        <SectionHeader
            title="Losované ceny"
            :show-divider="false"
        />
        <ContentImageCard image-src="/public/images/tombola.webp">
            <template #default>
                <p>
                    Ceny od sponzorů budou rozděleny formou losování startovních čísel počítačem. Celkem budou dvě losování, jedno pro mládež 10-17 let a jedno pro dospělé (18+ let, účastníci závodu na 15 km i 30 km). Seznam výherců bude vyvěšen na „nástěnku" vedle prezence asi v 11:30 (pro mládež 10-17 let) a ve 14:30 (pro 18+ let). Vylosované ceny se budou vydávat po předložení startovního čísla u stolku poblíž prezence. Výdej vylosovaných cen bude ukončen v cca 16:45.
                </p>
            </template>
        </ContentImageCard>
    </SectionWrapper>

    <SectionWrapper
        padding-y="md"
        background="gray"
    >
        <div>
            <SectionHeader
                title="Ocenění a vyhlášení vítězů"
                :show-divider="false"
            />
            <ContentImageCard
                image-src="/public/images/pohar.webp"
                image-position="left"
            >
                <template #default>
                    <div class="space-y-4">
                        <p>První tři v každé kategorii jednotlivců obdrží diplom, první tři v mládežnických kategoriích (10-17 let) dostanou navíc originální dřevěnou medaili. Časy vyhlášení individuálních medailistů uvádí tabulka výše.</p>
                        <p>Jedinečnou gravírovanou dřevěnou medaili dostane také absolutní vítěz závodu na 30 km, kterému bude navíc na rok zapůjčen putovní křišťálový pohár starosty ÚMČ Brno-sever.</p>
                        <p>Nejstarší úspěšná žena Muldy a nejstarší úspěšný muž Muldy dostanou originální dřevěnou medaili.</p>
                        <p>První tři rodinné týmy obdrží diplom, úspěšné rodinné týmy získají při odměnu od sponzorského cykloobchodu.</p>
                    </div>
                </template>
            </ContentImageCard>
        </div>
    </SectionWrapper>

    <SectionWrapper
        padding-y="md"
    >
        <SectionHeader
            title="Mytí"
            :show-divider="false"
        />
        <ContentImageCard
            image-src="https://mapy.com/s/kenuramono"
            image-width="600"
            image-height="350"
            image-position="right"
        >
            <template #default>
                <div class="space-y-4">
                    <p>Mytí těl bude možné zdarma v době od 11:00 do 16:30 v budově Nadačního fondu Maják, Dusíkova 5, Brno - Lesná</p>
                    <p>Mytí kol bude možné zdarma u branky na severní straně plotu areálu Nadačního fondu Maják, Dusíkova 5, Brno - Lesná.</p>
                </div>
            </template>
        </ContentImageCard>
    </SectionWrapper>

    <SectionWrapper
        padding-y="md"
        background="gray"
    >
        <div>
            <SectionHeader
                title="Parkování"
                :show-divider="false"
            />
            <p>Parkujte na parkovišti u prodejny Billa a přilehlých zpevněných plochách. Startovní louka není parkoviště.</p>
        </div>
    </SectionWrapper>

    <SectionWrapper
        padding-y="md"
    >
        <SectionHeader
            title="Servis kol a nákup náhradních dílů"
            :show-divider="false"
        />
        <ContentImageCard
            image-src="/public/images/cykloprodejna_fabianek.webp"
            image-position="left"
        >
            <template #default>
                <p>Placený servis kol a nákup náhradních dílů bude možný v době od 9:00 do 13:00 v blízké cykloprodejně M. Fabiánka na Okružní 39 - asi 500 metrů vzdušnou čarou ze startovní louky. (mobil 773 145 656)</p>
            </template>
        </ContentImageCard>
    </SectionWrapper>
</template>

<script setup lang="ts">
import SectionHeader from '@/components/SectionHeader.vue'
import SectionWrapper from '@/components/SectionWrapper.vue'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primevue'
import CategoryDataTable from './components/CategoryDataTable.vue'
import ContentImageCard from './components/ContentImageCard.vue'
</script>

<style scoped>
/* Původní PrimeVue styly pro Tabs */
.p-tabpanels {
    --p-tabs-tabpanel-background: rgb(249 250 251 / var(--tw-bg-opacity, 1));
}

.p-tablist-content {
    margin-bottom: 0.5rem;
}

.p-tablist {
    --p-tabs-tablist-background: rgb(249 250 251 / var(--tw-bg-opacity, 1));

}
::v-deep .p-tablist-tab-list {
    justify-content: center; gap: 1.5rem; --p-tabs-tablist-border-width: 0; margin-bottom: 20px;
}

::v-deep .p-tablist-active-bar,
::v-deep .p-tabview .p-tabview-ink-bar,
::v-deep .p-tabview .p-tabview-nav::after {
    display: none;
}

.p-tab {
    --p-tabs-tab-border-width: 1px;
    border-radius: 0.5rem;
    --p-tabs-tab-background: var(--p-button-secondary-background);
    --p-tabs-tab-color: var(--p-button-secondary-color);
    --p-tabs-tab-border-width: 0;
}

.p-tab:not(.p-tab-active):not(.p-disabled):hover {
    --p-tabs-tab-hover-background: var(--p-button-secondary-hover-background);

}
.p-tab[aria-selected="true"] {
    --p-tabs-tab-active-background: var(--p-button-primary-background);
    --p-tabs-tab-active-color: var(--p-button-primary-color);
    --p-tabs-tab-active-border-color: transparent;
}

</style>
