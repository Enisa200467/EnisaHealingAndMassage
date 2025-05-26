<script setup lang="ts">
useSeoMeta({
  title: 'Tarieven - Enisa Healing & Massage',
  description:
    'Overzicht van alle tarieven voor massage en healing behandelingen. Transparante prijzen zonder verborgen kosten. Bekijk ook onze kortingspakketten.',
});

// Pricing data
const healingTreatments = [
  {
    name: 'Chakra Balancering',
    duration: '60 minuten',
    price: '€70',
    description:
      "Energetische balancering van je chakra's voor innerlijke harmonie",
    intensity: 1,
    intensityLabel: 'Zeer Zacht',
    benefits: ['Energetische balans', 'Innerlijke rust', 'Emotionele healing'],
  },
  {
    name: 'Energetische Healing Sessie',
    duration: '90 minuten',
    price: '€90',
    description:
      'Uitgebreide energetische behandeling voor diepgaande genezing',
    intensity: 1,
    intensityLabel: 'Zeer Zacht',
    benefits: [
      'Diepe ontspanning',
      'Energetische reiniging',
      'Spirituele groei',
    ],
  },
];

const massageTreatments = [
  {
    name: 'Klassieke Ontspanningsmassage',
    duration: '60 minuten',
    price: '€65',
    description:
      'Traditionele massage voor volledige ontspanning van lichaam en geest',
    intensity: 2,
    intensityLabel: 'Zacht',
    benefits: ['Spierontspanning', 'Stressvermindering', 'Betere doorbloeding'],
  },
  {
    name: 'Zweedse Massage',
    duration: '60 minuten',
    price: '€65',
    description: 'Klassieke Zweedse massagetechniek voor diepe ontspanning',
    intensity: 3,
    intensityLabel: 'Medium',
    benefits: [
      'Diepe ontspanning',
      'Verbeterde flexibiliteit',
      'Pijnverlichting',
    ],
  },
  {
    name: 'Sportmassage',
    duration: '60 minuten',
    price: '€70',
    description: 'Gespecialiseerde massage voor sporters en actieve mensen',
    intensity: 4,
    intensityLabel: 'Stevig',
    benefits: [
      'Herstel na sport',
      'Blessure preventie',
      'Prestatieverbetering',
    ],
  },
  {
    name: 'Intuitieve Lichaamsmassage',
    duration: '75 minuten',
    price: '€80',
    description:
      "Op maat gemaakte massage afgestemd op jouw lichaam's behoeften",
    intensity: 2,
    intensityLabel: 'Zacht',
    benefits: [
      'Persoonlijke benadering',
      'Holistische aanpak',
      'Diepgaande ontspanning',
    ],
  },
];

const packages = [
  {
    name: '3 Behandelingen Pakket',
    description: 'Kies 3 willekeurige behandelingen',
    originalPrice: '€210',
    discountPrice: '€190',
    savings: '€20',
    validity: '6 maanden geldig',
  },
  {
    name: '5 Behandelingen Pakket',
    description: 'Kies 5 willekeurige behandelingen',
    originalPrice: '€350',
    discountPrice: '€300',
    savings: '€50',
    validity: '12 maanden geldig',
  },
];

// Generate intensity dots
const getIntensityDots = (intensity: number) => {
  return Array.from({ length: 5 }, (_, i) => i < intensity);
};
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section
      class="bg-gradient-to-br from-primary-50 to-secondary-50 py-16 sm:py-24"
    >
      <UContainer>
        <div class="max-w-4xl mx-auto text-center">
          <h1
            class="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6"
          >
            Tarieven
          </h1>
          <p class="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
            Transparante prijzen voor alle behandelingen. Geen verborgen kosten,
            geen verrassingen. Kwaliteit en eerlijkheid staan centraal.
          </p>
        </div>
      </UContainer>
    </section>

    <!-- Main Content -->
    <UContainer class="py-16 sm:py-24">
      <div class="max-w-7xl mx-auto">
        <!-- Healing Treatments -->
        <section class="mb-16">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-neutral-900 mb-4">
              Healing Behandelingen
            </h2>
            <p class="text-neutral-600 max-w-2xl mx-auto">
              Energetische behandelingen die werken op een dieper niveau voor
              genezing van lichaam, geest en ziel.
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <UCard
              v-for="treatment in healingTreatments"
              :key="treatment.name"
              class="h-full"
            >
              <template #header>
                <div class="flex justify-between items-start">
                  <div>
                    <h3 class="text-xl font-semibold text-neutral-900 mb-1">
                      {{ treatment.name }}
                    </h3>
                    <p class="text-sm text-neutral-500">
                      {{ treatment.duration }}
                    </p>
                  </div>
                  <div class="text-right">
                    <p class="text-2xl font-bold text-primary-600">
                      {{ treatment.price }}
                    </p>
                  </div>
                </div>
              </template>

              <div class="space-y-4">
                <p class="text-neutral-600">{{ treatment.description }}</p>

                <!-- Intensity -->
                <div class="flex items-center gap-3">
                  <span class="text-sm font-medium text-neutral-700"
                    >Intensiteit:</span
                  >
                  <div class="flex items-center gap-1">
                    <div
                      v-for="(filled, index) in getIntensityDots(
                        treatment.intensity
                      )"
                      :key="index"
                      :class="[
                        'w-2 h-2 rounded-full',
                        filled ? 'bg-primary-500' : 'bg-neutral-200',
                      ]"
                    />
                  </div>
                  <span class="text-sm text-neutral-500">{{
                    treatment.intensityLabel
                  }}</span>
                </div>

                <!-- Benefits -->
                <div>
                  <p class="text-sm font-medium text-neutral-700 mb-2">
                    Voordelen:
                  </p>
                  <ul class="space-y-1">
                    <li
                      v-for="benefit in treatment.benefits"
                      :key="benefit"
                      class="flex items-center gap-2 text-sm text-neutral-600"
                    >
                      <UIcon
                        name="i-mdi-check"
                        class="w-4 h-4 text-green-500"
                      />
                      {{ benefit }}
                    </li>
                  </ul>
                </div>
              </div>

              <template #footer>
                <UButton
                  :to="`/boeken?treatment=${treatment.name
                    .toLowerCase()
                    .replace(/\s+/g, '-')}`"
                  block
                  icon="i-mdi-calendar"
                >
                  Boek {{ treatment.name }}
                </UButton>
              </template>
            </UCard>
          </div>
        </section>

        <!-- Massage Treatments -->
        <section class="mb-16">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-neutral-900 mb-4">
              Massage Behandelingen
            </h2>
            <p class="text-neutral-600 max-w-2xl mx-auto">
              Professionele massagebehandelingen voor ontspanning,
              pijnverlichting en verbetering van je algemene welzijn.
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <UCard
              v-for="treatment in massageTreatments"
              :key="treatment.name"
              class="h-full"
            >
              <template #header>
                <div class="flex justify-between items-start">
                  <div>
                    <h3 class="text-xl font-semibold text-neutral-900 mb-1">
                      {{ treatment.name }}
                    </h3>
                    <p class="text-sm text-neutral-500">
                      {{ treatment.duration }}
                    </p>
                  </div>
                  <div class="text-right">
                    <p class="text-2xl font-bold text-secondary-600">
                      {{ treatment.price }}
                    </p>
                  </div>
                </div>
              </template>

              <div class="space-y-4">
                <p class="text-neutral-600">{{ treatment.description }}</p>

                <!-- Intensity -->
                <div class="flex items-center gap-3">
                  <span class="text-sm font-medium text-neutral-700"
                    >Intensiteit:</span
                  >
                  <div class="flex items-center gap-1">
                    <div
                      v-for="(filled, index) in getIntensityDots(
                        treatment.intensity
                      )"
                      :key="index"
                      :class="[
                        'w-2 h-2 rounded-full',
                        filled ? 'bg-secondary-500' : 'bg-neutral-200',
                      ]"
                    />
                  </div>
                  <span class="text-sm text-neutral-500">{{
                    treatment.intensityLabel
                  }}</span>
                </div>

                <!-- Benefits -->
                <div>
                  <p class="text-sm font-medium text-neutral-700 mb-2">
                    Voordelen:
                  </p>
                  <ul class="space-y-1">
                    <li
                      v-for="benefit in treatment.benefits"
                      :key="benefit"
                      class="flex items-center gap-2 text-sm text-neutral-600"
                    >
                      <UIcon
                        name="i-mdi-check"
                        class="w-4 h-4 text-green-500"
                      />
                      {{ benefit }}
                    </li>
                  </ul>
                </div>
              </div>

              <template #footer>
                <UButton
                  :to="`/boeken?treatment=${treatment.name
                    .toLowerCase()
                    .replace(/\s+/g, '-')}`"
                  block
                  icon="i-mdi-calendar"
                  color="teal"
                >
                  Boek {{ treatment.name }}
                </UButton>
              </template>
            </UCard>
          </div>
        </section>

        <!-- Package Deals -->
        <section class="mb-16">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-neutral-900 mb-4">
              Voordeelpakketten
            </h2>
            <p class="text-neutral-600 max-w-2xl mx-auto">
              Bespaar geld met onze voordeelpakketten. Perfect voor regelmatige
              behandelingen.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UCard
              v-for="pkg in packages"
              :key="pkg.name"
              class="border-2 border-primary-200 relative overflow-hidden"
            >
              <!-- Savings Badge -->
              <div
                class="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium"
              >
                Bespaar {{ pkg.savings }}
              </div>

              <template #header>
                <div>
                  <h3 class="text-xl font-semibold text-neutral-900 mb-2">
                    {{ pkg.name }}
                  </h3>
                  <p class="text-neutral-600">{{ pkg.description }}</p>
                </div>
              </template>

              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm text-neutral-500 line-through">
                      {{ pkg.originalPrice }}
                    </p>
                    <p class="text-3xl font-bold text-primary-600">
                      {{ pkg.discountPrice }}
                    </p>
                  </div>
                  <div class="text-right">
                    <p class="text-sm text-neutral-600">{{ pkg.validity }}</p>
                  </div>
                </div>

                <div class="bg-neutral-50 p-4 rounded-lg">
                  <h4 class="font-medium text-neutral-900 mb-2">
                    Pakket voordelen:
                  </h4>
                  <ul class="space-y-1 text-sm text-neutral-600">
                    <li class="flex items-center gap-2">
                      <UIcon
                        name="i-mdi-check"
                        class="w-4 h-4 text-green-500"
                      />
                      Vrije keuze uit alle behandelingen
                    </li>
                    <li class="flex items-center gap-2">
                      <UIcon
                        name="i-mdi-check"
                        class="w-4 h-4 text-green-500"
                      />
                      Geen vervaldatum stress
                    </li>
                    <li class="flex items-center gap-2">
                      <UIcon
                        name="i-mdi-check"
                        class="w-4 h-4 text-green-500"
                      />
                      Overdraagbaar aan familie/vrienden
                    </li>
                  </ul>
                </div>
              </div>

              <template #footer>
                <UButton
                  to="/contact"
                  block
                  variant="outline"
                  icon="i-mdi-email"
                >
                  Informeer naar dit pakket
                </UButton>
              </template>
            </UCard>
          </div>
        </section>

        <!-- Additional Information -->
        <section class="bg-neutral-50 rounded-2xl p-8">
          <h2 class="text-2xl font-bold text-neutral-900 mb-6 text-center">
            Belangrijke Informatie
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Payment -->
            <div class="text-center">
              <div
                class="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <UIcon
                  name="i-mdi-credit-card"
                  class="w-8 h-8 text-primary-600"
                />
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
                <UIcon
                  name="i-mdi-calendar-remove"
                  class="w-8 h-8 text-orange-600"
                />
              </div>
              <h3 class="font-semibold text-neutral-900 mb-2">
                Afzeggingsbeleid
              </h3>
              <p class="text-neutral-600 text-sm">
                Afzeggen tot 24 uur van tevoren gratis. Bij late afzegging 50%
                kosten.
              </p>
            </div>

            <!-- Insurance -->
            <div class="text-center">
              <div
                class="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <UIcon
                  name="i-mdi-shield-check"
                  class="w-8 h-8 text-green-600"
                />
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
                  Ja, bekijk onze voordeelpakketten voor aantrekkelijke
                  kortingen bij meerdere behandelingen.
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

        <!-- Call to Action -->
        <section class="text-center mt-16">
          <h2 class="text-3xl font-bold text-neutral-900 mb-6">
            Klaar om te boeken?
          </h2>
          <p class="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
            Kies je gewenste behandeling en plan direct je afspraak in. Heb je
            vragen over de tarieven? Neem gerust contact op.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <UButton to="/boeken" size="lg" icon="i-mdi-calendar">
              Boek Een Afspraak
            </UButton>
            <UButton
              to="/contact"
              size="lg"
              variant="outline"
              icon="i-mdi-help-circle"
            >
              Stel Een Vraag
            </UButton>
          </div>
        </section>
      </div>
    </UContainer>
  </div>
</template>
