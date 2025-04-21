<template>
  <article>
    <!-- Hero Section -->
    <section class="relative text-center text-white">
      <!-- Background Image using NuxtImg -->
      <NuxtImg
        src="/images/placeholder.webp"
        image
        path
        alt="Ontspannende massage omgeving"
        class="absolute inset-0 object-cover w-full h-full -z-10 brightness-75"
        format="webp"
        quality="80"
        preload
      />
      <UContainer class="py-32 md:py-48">
        <h1
          class="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl drop-shadow-md"
        >
          Vind Balans en Diepe Ontspanning
        </h1>
        <p class="mb-8 text-lg leading-8 text-gray-200 lg:text-xl drop-shadow">
          Ervaar de kracht van helende aanraking en gun jezelf een moment van
          pure rust.
        </p>
        <div class="flex items-center justify-center gap-4">
          <UButton
            color="primary"
            size="xl"
            icon="i-heroicons-calendar-days"
            label="Boek Nu Je Sessie"
            aria-label="Boek nu direct je sessie"
          />
          <UButton
            to="#behandelingen"
            size="xl"
            variant="outline"
            color="primary"
            icon="i-heroicons-sparkles"
            label="Ontdek de Behandelingen"
            aria-label="Scroll naar de beschikbare behandelingen"
          />
        </div>
      </UContainer>
    </section>

    <!-- Intro Section -->
    <section class="py-16 bg-gradient-to-b sm:py-24">
      <UContainer>
        <div class="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
          <div>
            <!-- Placeholder for an image of the masseuse or practice -->
            <NuxtImg
              src="/images/placeholder.webp"
              alt="[Naam Masseuse], uw therapeut voor
            heling en ontspanning"
              class="object-cover w-full h-auto rounded-lg shadow-lg aspect-square"
              format="webp"
              quality="75"
              loading="lazy"
            />
          </div>
          <div
            class="prose prose-lg text-gray-700 max-w-none prose-headings:text-green-800 prose-a:text-green-600"
          >
            <h2>Maak Kennis Met [Naam Masseuse]</h2>
            <p>
              Welkom! Mijn naam is [Naam Masseuse] en mijn passie ligt bij het
              begeleiden van mensen naar een dieper gevoel van welzijn en
              balans. Met een holistische benadering combineer ik [korte
              beschrijving van technieken, bijv. intuïtieve massage, energetisch
              werk] om zowel fysieke spanning los te laten als innerlijke rust
              te bevorderen.
            </p>
            <p>
              Of je nu komt voor verlichting van specifieke klachten, behoefte
              hebt aan diepe ontspanning, of op zoek bent naar energetische
              heling, ik bied een veilige en warme omgeving waarin jij centraal
              staat. Elke behandeling is afgestemd op jouw unieke behoeften van
              dat moment.
            </p>
            <UButton
              variant="link"
              icon="i-heroicons-arrow-right-circle"
              to="/over-mij"
              label="Lees meer over mijn aanpak"
              :padded="false"
            />
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Services/Products Section -->
    <section id="behandelingen" class="py-16 sm:py-24 scroll-mt-20">
      <UContainer>
        <div class="text-center">
          <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
            Ontdek Onze Behandelingen
          </h2>
          <p class="mt-4 text-lg leading-8 text-gray-600">
            Kies de behandeling die bij jou past: focus op heling of pure
            ontspanning.
          </p>
        </div>

        <div class="mt-16">
          <!-- Using Nuxt UI Tabs to separate Healing & Regular -->
          <UTabs :items="massageTypes" class="w-full">
            <template #item="{ item }">
              <div
                class="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3"
              >
                <UCard
                  v-for="massage in item.massages"
                  :key="massage.title"
                  class="flex flex-col"
                  variant="outline"
                >
                  <template #header>
                    <h3 class="text-lg font-semibold leading-6">
                      <UIcon :name="massage.icon" class="mr-2" />{{
                        massage.title
                      }}
                    </h3>
                  </template>

                  <p class="text-sm text-gray-600 grow">
                    {{ massage.description }}
                  </p>

                  <template #footer>
                    <UButton
                      variant="outline"
                      :to="`/boeken?service=${massage.id}`"
                      label="Meer Info / Boeken"
                      size="sm"
                    />
                    <!-- Or just a generic book button -->
                    <!-- <UButton to="/boeken" label="Boek Nu" size="sm" /> -->
                  </template>
                </UCard>
              </div>
            </template>
          </UTabs>
        </div>
      </UContainer>
    </section>
  </article>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Define SEO meta tags for this page
useSeoMeta({
  title:
    'Praktijk [Naam Masseuse] - Helende Massages & Ontspanning in [Stad/Regio]', // <-- REPLACE with actual name and location
  description:
    'Ervaar diepe ontspanning en heling met persoonlijke massages en behandelingen door [Naam Masseuse]. Boek vandaag nog uw sessie voor rust en balans.', // <-- REPLACE
  ogTitle: 'Praktijk [Naam Masseuse] - Helende Massages & Ontspanning', // <-- REPLACE
  ogDescription:
    'Ontdek de kracht van helende aanraking. Persoonlijke massages en energetische behandelingen voor lichaam en geest.',
  ogImage: '/images/hero-banner.jpg', // <-- REPLACE with the actual URL of your main image after deployment
  // Add twitter card tags if needed
  // twitterCard: 'summary_large_image',
});

// Define the structure for the Tabs component
// Use appropriate icons from https://icones.js.org/ (included via @nuxt/icon)
const massageTypes = ref([
  {
    label: 'Helende Behandelingen',
    slot: 'item', // Use the #item slot template
    massages: [
      {
        id: 'healing-1',
        title: 'Energetische Healing Sessie',
        description:
          'Een diepgaande sessie gericht op het herstellen van de energiebalans en het loslaten van blokkades. Werkt op fysiek, mentaal en emotioneel niveau.',
        icon: 'i-heroicons-sun',
      },
      {
        id: 'healing-2',
        title: 'Chakra Balancering',
        description:
          "Brengt de energiecentra (chakra's) in het lichaam in harmonie voor een betere doorstroming en vitaliteit.",
        icon: 'i-heroicons-sparkles',
      },
      {
        id: 'healing-3',
        title: 'Intuïtieve Lichaamsmassage',
        description:
          'Een zachte massage waarbij intuïtief wordt ingespeeld op wat jouw lichaam nodig heeft voor heling en loslaten.',
        icon: 'i-heroicons-heart',
      },
    ],
  },
  {
    label: 'Reguliere Massages',
    slot: 'item',
    massages: [
      {
        id: 'relax-1',
        title: 'Klassieke Ontspanningsmassage',
        description:
          'Een traditionele massage met zachte tot medium druk om spierspanning te verlichten en diepe ontspanning te bevorderen.',
        icon: 'i-heroicons-user-group',
      }, // Placeholder icon
      {
        id: 'relax-2',
        title: 'Zweedse Massage',
        description:
          'Populaire techniek met verschillende knedingen en strijkingen om de bloedsomloop te stimuleren en spieren los te maken.',
        icon: 'i-heroicons-hand-thumb-up',
      }, // Placeholder icon
      {
        id: 'sport-1',
        title: 'Sportmassage (Voorbereidend/Herstel)',
        description:
          'Stevigere massage gericht op spierherstel, flexibiliteit en het voorkomen van blessures. Zowel voor als na inspanning.',
        icon: 'i-heroicons-bolt',
      }, // Placeholder icon
    ],
  },
]);
</script>
