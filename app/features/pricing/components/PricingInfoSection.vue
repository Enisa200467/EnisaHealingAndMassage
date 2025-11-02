<template>
  <section class="bg-neutral-50 rounded-2xl p-8 mb-16">
    <h2 class="text-2xl font-bold text-neutral-900 mb-6 text-center">
      Belangrijke Informatie
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Payment -->
      <div class="text-center">
        <div
          class="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <UIcon name="i-mdi-credit-card" class="w-8 h-8 text-primary-600" />
        </div>
        <h3 class="font-semibold text-neutral-900 mb-2">Betaling</h3>
        <p class="text-neutral-600 text-sm">
          Betaling na de behandeling mogelijk via pin, contant of
          bankoverschrijving.
        </p>
      </div>

      <!-- Cancellation -->
      <div class="text-center">
        <div
          class="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <UIcon name="i-mdi-calendar-remove" class="w-8 h-8 text-orange-600" />
        </div>
        <h3 class="font-semibold text-neutral-900 mb-2">Afzeggingsbeleid</h3>
        <p class="text-neutral-600 text-sm">
          Afzeggen tot 24 uur van tevoren gratis. Bij late afzegging 50% kosten.
        </p>
      </div>

      <!-- Insurance -->
      <div class="text-center">
        <div
          class="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <UIcon name="i-mdi-shield-check" class="w-8 h-8 text-green-600" />
        </div>
        <h3 class="font-semibold text-neutral-900 mb-2">Verzekering</h3>
        <p class="text-neutral-600 text-sm">
          Sommige behandelingen kunnen vergoed worden via aanvullende
          verzekering.
        </p>
      </div>
    </div>

    <!-- FAQ Section -->
    <div class="mt-12 pt-8 border-t border-neutral-200">
      <h3 class="text-xl font-semibold text-neutral-900 mb-6 text-center">
        Veelgestelde Vragen over Tarieven
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UCard>
          <template #header>
            <h4 class="font-medium">Kan ik achteraf betalen?</h4>
          </template>
          <p class="text-neutral-600 text-sm">
            Ja, betaling is mogelijk na afloop van de behandeling via pin,
            contant geld of bankoverschrijving.
          </p>
        </UCard>

        <UCard>
          <template #header>
            <h4 class="font-medium">
              Krijg ik korting bij meerdere behandelingen?
            </h4>
          </template>
          <p class="text-neutral-600 text-sm">
            Ja, bekijk onze voordeelpakketten voor aantrekkelijke kortingen bij
            meerdere behandelingen.
          </p>
        </UCard>

        <UCard>
          <template #header>
            <h4 class="font-medium">
              Wordt massage vergoed door de zorgverzekeraar?
            </h4>
          </template>
          <p class="text-neutral-600 text-sm">
            Dit hangt af van je aanvullende verzekering. Check dit bij je
            verzekeraar of vraag naar onze declaratiecodes.
          </p>
        </UCard>

        <UCard>
          <template #header>
            <h4 class="font-medium">Zijn er extra kosten?</h4>
          </template>
          <p class="text-neutral-600 text-sm">
            Nee, alle vermelde prijzen zijn inclusief BTW en er zijn geen
            verborgen kosten.
          </p>
        </UCard>
      </div>
    </div>
  </section>
</template>
