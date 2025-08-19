<template>
  <UCard class="mb-8 border-2 border-primary-200">
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="text-xl font-bold flex items-center gap-3">
          <UIcon name="i-mdi-rocket-launch" class="w-6 h-6 text-primary-600" />
          Quick Start
        </h3>
        <UBadge color="primary" variant="soft" size="sm"> Begin hier </UBadge>
      </div>
    </template>

    <div class="space-y-6">
      <!-- Introduction -->
      <div
        class="text-center p-4 bg-primary-50 rounded-lg border border-primary-100"
      >
        <p class="text-primary-800 font-medium">
          👋 Welkom! Hier kun je snel aan de slag met het beheren van je
          behandelingen.
        </p>
      </div>

      <!-- Quick action cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          class="p-6 bg-green-50 border border-green-200 rounded-lg hover:shadow-md transition-shadow"
        >
          <div class="flex items-center gap-3 mb-3">
            <UIcon name="i-mdi-plus-circle" class="w-7 h-7 text-green-600" />
            <h4 class="font-semibold text-green-900 text-lg">
              Nieuwe Behandeling
            </h4>
          </div>
          <p class="text-green-700 text-sm mb-4 leading-relaxed">
            Begin met het toevoegen van een nieuwe behandeling aan je aanbod.
            Volg de eenvoudige stappen om alles correct in te stellen.
          </p>
          <UButton
            to="/admin/treatments"
            size="sm"
            color="success"
            variant="solid"
            class="w-full"
            icon="i-mdi-arrow-right"
            trailing
          >
            Naar Behandelingen
          </UButton>
        </div>

        <div
          class="p-6 bg-blue-50 border border-blue-200 rounded-lg hover:shadow-md transition-shadow"
        >
          <div class="flex items-center gap-3 mb-3">
            <UIcon name="i-mdi-pencil" class="w-7 h-7 text-blue-600" />
            <h4 class="font-semibold text-blue-900 text-lg">
              Bewerk Bestaande
            </h4>
          </div>
          <p class="text-blue-700 text-sm mb-4 leading-relaxed">
            Pas prijzen, beschrijvingen of details van bestaande behandelingen
            aan. Houd je aanbod altijd up-to-date.
          </p>
          <UButton
            to="/admin/treatments"
            size="sm"
            color="primary"
            variant="solid"
            class="w-full"
            icon="i-mdi-arrow-right"
            trailing
          >
            Bekijk Lijst
          </UButton>
        </div>
      </div>

      <!-- Key tips -->
      <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <div class="flex items-start gap-3">
          <UIcon
            name="i-mdi-lightbulb"
            class="w-6 h-6 text-yellow-600 mt-0.5"
          />
          <div class="flex-1">
            <h4 class="font-semibold text-yellow-900 mb-3 text-lg">
              Handige Tips voor Succes
            </h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ul class="text-yellow-800 text-sm space-y-2">
                <li class="flex items-start gap-2">
                  <span class="text-yellow-600 mt-0.5">✓</span>
                  <span>Kies duidelijke namen die klanten begrijpen</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-yellow-600 mt-0.5">✓</span>
                  <span
                    >Gebruik realistische tijdsduren (inclusief
                    voorbereiding)</span
                  >
                </li>
              </ul>
              <ul class="text-yellow-800 text-sm space-y-2">
                <li class="flex items-start gap-2">
                  <span class="text-yellow-600 mt-0.5">✓</span>
                  <span
                    >Voeg altijd een intensiteit toe voor
                    verwachtingsmanagement</span
                  >
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-yellow-600 mt-0.5">✓</span>
                  <span
                    >Controleer prijzen regelmatig en pas aan waar nodig</span
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </UCard>
</template>
