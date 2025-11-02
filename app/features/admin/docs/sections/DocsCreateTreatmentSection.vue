<script setup lang="ts">
interface Emits {
  (e: 'nav-to-content'): void;
}

const emit = defineEmits<Emits>();

const handleNavigateToContent = () => {
  emit('nav-to-content');
};
</script>

<template>
  <section id="create-treatment" class="scroll-mt-8">
    <UCard>
      <template #header>
        <h2 class="text-2xl font-bold flex items-center gap-3">
          <UIcon name="i-mdi-plus-circle" class="w-6 h-6 text-green-600" />
          Nieuwe Behandeling Aanmaken
        </h2>
      </template>

      <div class="prose prose-neutral max-w-none">
        <div class="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <h3 class="text-lg font-semibold text-green-900 mb-2">
            Stap-voor-stap proces:
          </h3>
        </div>

        <h3 class="text-xl font-bold text-gray-900 mt-8 mb-4">
          1. Database Record Aanmaken
        </h3>
        <ol class="space-y-3">
          <li>
            <strong>
              <NuxtLink
                to="/admin/treatments"
                class="text-blue-600 hover:text-blue-800 underline"
              >
                Ga naar Admin → Behandelingen
              </NuxtLink>
            </strong>
            <p class="text-neutral-600">
              Navigeer naar de behandelingen sectie via het admin menu
            </p>
          </li>
          <li>
            <strong>Klik op "Nieuwe Behandeling"</strong>
            <p class="text-neutral-600">
              Dit opent het formulier voor een nieuwe behandeling
            </p>
          </li>
          <li>
            <strong>Vul de vereiste velden in:</strong>
            <ul class="mt-2">
              <li><strong>Naam:</strong> Volledige naam van de behandeling</li>
              <li>
                <strong>Slug:</strong> URL-vriendelijke versie (automatisch
                gegenereerd)
              </li>
              <li><strong>Prijs:</strong> In euro's (bijvoorbeeld: 65.00)</li>
              <li><strong>Duur:</strong> In minuten (bijvoorbeeld: 60)</li>
              <li>
                <strong>Intensiteit:</strong> Schaal 1-5 (1 = Zeer Zacht, 5 =
                Zeer Stevig)
              </li>
              <li>
                <strong>Intensiteit Label:</strong> Tekstuele beschrijving
                (optioneel)
              </li>
              <li>
                <strong>Icoon:</strong> Icon naam (bijvoorbeeld: i-mdi-spa)
              </li>
            </ul>
            <div
              class="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-3"
            >
              <p class="text-amber-800 text-sm">
                <strong>⚠️ Belangrijk:</strong> Voeg ook dezelfde behandeling
                met identieke prijs toe aan
                <a
                  href="https://www.setmore.com/"
                  target="_blank"
                  rel="noopener"
                  class="text-blue-600 hover:text-blue-800 underline"
                  >Setmore</a
                >
                voor afspraken!
              </p>
            </div>
          </li>
          <li>
            <strong>Opslaan</strong>
            <p class="text-neutral-600">
              De behandeling wordt opgeslagen en krijgt automatisch status
              "actief"
            </p>
          </li>
        </ol>

        <h3 class="text-xl font-bold text-gray-900 mt-8 mb-4">
          2. Content Bestand Aanmaken
        </h3>
        <p class="leading-relaxed mb-4">
          Na het aanmaken van de database record, moet je een bijbehorend
          content bestand maken via Nuxt Studio.
        </p>

        <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div class="flex items-start gap-4">
            <UIcon
              name="i-mdi-arrow-right-circle"
              class="w-8 h-8 text-blue-600 mt-1"
            />
            <div>
              <h4 class="text-lg font-semibold text-blue-900 mb-2">
                Ga naar Content Beheer
              </h4>
              <p class="text-blue-800 mb-4 leading-relaxed">
                Voor gedetailleerde instructies over het aanmaken van content
                bestanden, het gebruik van templates, en het werken met Nuxt
                Studio, bekijk de Content Beheer sectie.
              </p>
              <p class="text-sm text-blue-700 mb-4">
                Je vindt daar een complete template en stap-voor-stap
                instructies voor het maken van behandeling content.
              </p>
              <button
                class="text-sm text-blue-600 font-medium hover:text-blue-800 transition-all duration-200 cursor-pointer bg-blue-100 hover:bg-blue-200 px-4 py-2 rounded-lg border border-blue-300 hover:border-blue-400 hover:shadow-sm flex items-center gap-2 group"
                @click="handleNavigateToContent"
              >
                <span>📍 Content Beheer → Content Bestand Template</span>
                <UIcon
                  name="i-mdi-arrow-right"
                  class="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </UCard>
  </section>
</template>
