<script setup lang="ts">
// FAQ section for contact page
</script>

<template>
  <PageSection background="bg-neutral-50">
    <div class="max-w-4xl mx-auto">
      <h2 class="text-3xl font-bold text-neutral-900 mb-8 text-center">
        Veelgestelde Vragen
      </h2>
      <p class="text-neutral-600 text-center mb-12">
        Vind snel antwoorden op de meest gestelde vragen, of bekijk onze
        uitgebreide FAQ pagina.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <UCard>
          <template #header>
            <h3 class="font-semibold">Hoe maak ik een afspraak?</h3>
          </template>
          <p class="text-neutral-600 text-sm">
            Je kunt online boeken via onze website, bellen, mailen of WhatsApp
            gebruiken. Online boeken is 24/7 beschikbaar.
          </p>
        </UCard>

        <UCard>
          <template #header>
            <h3 class="font-semibold">Wat moet ik meenemen?</h3>
          </template>
          <p class="text-neutral-600 text-sm">
            Je hoeft niets mee te nemen. Handdoeken en alle benodigdheden zijn
            aanwezig. Draag comfortabele kleding die je makkelijk uit kunt
            trekken.
          </p>
        </UCard>

        <UCard>
          <template #header>
            <h3 class="font-semibold">Kan ik afzeggen?</h3>
          </template>
          <p class="text-neutral-600 text-sm">
            Afzeggen kan tot 24 uur van tevoren zonder kosten. Bij late
            afzegging of no-show wordt 50% van het tarief berekend.
          </p>
        </UCard>

        <UCard>
          <template #header>
            <h3 class="font-semibold">Worden de kosten vergoed?</h3>
          </template>
          <p class="text-neutral-600 text-sm">
            Onze behandelingen worden niet vergoed door zorgverzekeraars.
          </p>
        </UCard>
      </div>

      <div class="text-center">
        <UButton to="/faq" variant="outline" icon="i-mdi-help-circle">
          Bekijk Alle Vragen
        </UButton>
      </div>
    </div>
  </PageSection>
</template>
