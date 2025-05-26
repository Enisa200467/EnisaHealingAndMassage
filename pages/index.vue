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
        <div
          class="flex flex-col sm:grid sm:grid-cols-2 items-center gap-4 max-w-2xs md:max-w-fit mx-auto"
        >
          <UButton
            class="w-full"
            color="primary"
            size="xl"
            :to="routes.pages.booking"
            icon="i-mdi-calendar"
            label="Boek Nu Je Sessie"
            aria-label="Boek nu direct je sessie"
          />
          <UButton
            class="w-full"
            to="#behandelingen"
            size="xl"
            variant="solid"
            color="secondary"
            icon="i-mdi-sparkles"
            label="Ontdek de Behandelingen"
            aria-label="Scroll naar de beschikbare behandelingen"
          />
        </div>
      </UContainer>
    </section>

    <!-- Intro Section -->
    <section class="py-16 sm:py-24">
      <UContainer>
        <div class="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
          <UCarousel
            v-slot="{ item }"
            dots
            loop
            :autoplay="{ delay: 3000 }"
            :items="items"
            class="w-full max-w-md mx-auto"
            ><NuxtImg
              :src="item"
              alt="[Naam Masseuse], uw therapeut voor
            heling en ontspanning"
              class="object-cover w-full h-auto rounded-lg shadow-lg aspect-square"
              format="webp"
              quality="75"
              loading="lazy"
            />
          </UCarousel>
          <!-- Placeholder for an image of the masseuse or practice -->
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
              icon="i-mdi-arrow-right-circle"
              :to="routes.pages.about"
              label="Lees meer over mijn aanpak"
              :padded="false"
            />
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Services/Products Section -->
    <section
      id="behandelingen"
      class="py-16 sm:py-24 scroll-mt-20 bg-gradient-to-br from-primary-50 to-secondary-50"
    >
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
                    <div class="flex items-center">
                      <UIcon
                        :name="massage.icon"
                        class="mr-2 text-primary-500"
                      />
                      <h3 class="text-lg font-semibold leading-6">
                        {{ massage.title }}
                      </h3>
                    </div>
                  </template>

                  <p class="text-sm text-gray-600 grow">
                    {{ massage.description }}
                  </p>

                  <template #footer>
                    <UButton
                      variant="outline"
                      :to="massage.slug"
                      label="Meer Info"
                      size="sm"
                    />
                    <!-- Keep a separate Book Now button if desired, linking to the main booking page -->
                    <UButton
                      :to="routes.pages.booking"
                      label="Direct Boeken"
                      size="sm"
                      class="ml-2"
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
import { computed } from 'vue';

// Use routes composable for centralized route management
const routes = useRoutes();

// Fetch dynamic treatment data
const { data: allTreatments } = await useAsyncData(
  'homepage-treatments',
  async (): Promise<
    {
      id: string;
      slug: string;
      title: string;
      description: string;
      icon: string;
      category: string;
    }[]
  > => {
    // Get all treatments with full metadata
    const treatments = await queryCollection('treatments').all();

    return treatments.map((treatment) => ({
      id: treatment.id,
      slug: treatment.path,
      title: treatment.title,
      description: treatment.description,
      icon: (treatment.meta.icon as string) || 'i-mdi-sparkles',
      category: (treatment.meta.category as string) || 'healing',
    }));
  }
);

// Group treatments by category for the tabs
const massageTypes = computed(() => {
  if (!allTreatments.value) return [];
  const healingTreatments = allTreatments.value.filter(
    (treatment) => treatment.category === 'healing'
  );
  const massageTreatments = allTreatments.value.filter(
    (treatment) => treatment.category === 'massage'
  );

  return [
    {
      label: 'Helende Behandelingen',
      slot: 'item',
      massages: healingTreatments,
    },
    {
      label: 'Reguliere Massages',
      slot: 'item',
      massages: massageTreatments,
    },
  ];
});

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

const items = [
  'https://picsum.photos/640/640?random=1',
  'https://picsum.photos/640/640?random=2',
  'https://picsum.photos/640/640?random=3',
  'https://picsum.photos/640/640?random=4',
  'https://picsum.photos/640/640?random=5',
  'https://picsum.photos/640/640?random=6',
];
</script>
