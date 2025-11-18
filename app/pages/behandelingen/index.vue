<script setup lang="ts">
import { useTreatmentStore } from '~/features/treatments/store';

const routes = useRoutes();
const treatmentStore = useTreatmentStore();
const { setPageSEO, businessInfo } = useGlobalSEO();

// Fetch treatments from the database

const { healingTreatments, massageTreatments, loading } = storeToRefs(treatmentStore);

// Group treatments by category for the tabs
const treatmentCategories = computed(() => [
  {
    label: 'Helende Behandelingen',
    slot: 'item',
    treatments: healingTreatments.value,
  },
  {
    label: 'Reguliere Massages',
    slot: 'item',
    treatments: massageTreatments.value,
  },
]);

// Generate structured data for treatment catalog
const treatmentCatalogSchema = computed(() => {
  const allTreatments = [
    ...healingTreatments.value,
    ...massageTreatments.value,
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: 'Behandelingen - Enisa Healing & Massage',
    description:
      'Volledig overzicht van helende behandelingen en reguliere massages',
    provider: {
      '@type': 'LocalBusiness',
      name: businessInfo.name,
      url: businessInfo.url,
    },
    itemListElement: allTreatments.map((treatment, index) => ({
      '@type': 'Offer',
      position: index + 1,
      itemOffered: {
        '@type': 'Service',
        name: treatment.title,
        description: treatment.description,
        category: treatment.category === 'healing' ? 'Healing' : 'Massage',
      },
      price: treatment.price?.replace('€', '').trim(),
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: `${businessInfo.url}/behandelingen/${treatment.slug}`,
    })),
  };
});

// Enhanced SEO with structured data
watchEffect(() => {
  if (healingTreatments.value.length || massageTreatments.value.length) {
    setPageSEO({
      title: 'Alle Behandelingen - Enisa Healing & Massage',
      description:
        'Ontdek ons complete aanbod van helende behandelingen en reguliere massages. Van energetische healing tot klassieke ontspanningsmassage. Kies de behandeling die bij jou past.',
      path: '/behandelingen',
      type: 'website',
      structuredData: [treatmentCatalogSchema.value],
    });
  } else {
    // Fallback SEO without structured data
    useSeoMeta({
      title: 'Alle Behandelingen - Enisa Healing & Massage',
      description:
        'Ontdek ons complete aanbod van helende behandelingen en reguliere massages. Van energetische healing tot klassieke ontspanningsmassage. Kies de behandeling die bij jou past.',
      ogTitle: 'Alle Behandelingen - Enisa Healing & Massage',
      ogDescription:
        'Ontdek ons complete aanbod van helende behandelingen en reguliere massages.',
      ogType: 'website',
    });
  }
});

const getSlug = (slug: string) => `${routes.pages.treatments}/${slug}`;
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <UContainer>
      <!-- Page Header -->
      <div class="py-16 sm:py-24">
        <div class="text-center">
          <h1 class="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Alle Behandelingen
          </h1>
          <p class="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
            Kies de behandeling die bij jou past. Of je nu op zoek bent naar
            diepe ontspanning, energetische balans of het verlichten van fysieke
            klachten - er is altijd een behandeling die aansluit bij jouw
            behoeften.
          </p>
        </div>

        <!-- Treatment Categories Tabs -->
        <div class="mt-16">
          <!-- Loading State -->
          <div v-if="loading" class="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3">
            <div v-for="i in 6" :key="i" class="bg-white rounded-lg shadow-sm p-6 space-y-4">
              <LoadingSkeleton type="circle" width="48px" height="48px" />
              <LoadingSkeleton type="text" width="60%" />
              <LoadingSkeleton type="text" count="2" />
              <div class="flex gap-4">
                <LoadingSkeleton type="button" width="50%" />
                <LoadingSkeleton type="button" width="50%" />
              </div>
            </div>
          </div>

          <!-- Treatment Content -->
          <UTabs v-else :items="treatmentCategories" class="w-full">
            <template #item="{ item }">
              <div
                v-if="item.treatments && item.treatments.length > 0"
                class="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3"
              >
                <div
                  v-for="treatment in item.treatments"
                  :key="treatment.slug"
                  class="flex flex-col hover:shadow-lg transition-shadow duration-200"
                  variant="outline"
                >
                  <TreatmentDetails
                    size="sm"
                    :title="treatment.title"
                    :short-description="treatment.description"
                    :icon="treatment.icon"
                    :duration="treatment.duration"
                    :price="treatment.price"
                    :intensity="treatment.intensity"
                    :intensity-label="treatment.intensityLabel"
                    show-book-button
                    show-link-button
                    :to="getSlug(treatment.slug)"
                  />
                </div>
              </div>
              <div
                v-else
                class="mt-8 text-center py-12 text-gray-500 bg-gray-100 rounded-lg"
              >
                <p class="text-lg">
                  Er zijn momenteel geen behandelingen in deze categorie.
                </p>
              </div>
            </template>
          </UTabs>
        </div>

        <!-- Call to Action -->
        <div class="mt-16 text-center bg-white rounded-lg shadow-sm p-8">
          <h2 class="text-2xl font-semibold">
            Nog niet zeker welke te kiezen?
          </h2>
          <p class="mt-4 text-gray-600 max-w-xl mx-auto">
            Neem gerust contact op voor persoonlijk advies. Ik help je graag bij
            het kiezen van de behandeling die het beste bij jou past.
          </p>
          <div class="mt-6 flex gap-4 justify-center flex-wrap">
            <UButton
              :to="routes.pages.contact"
              size="lg"
              label="Contact Opnemen"
            />
            <UButton
              :to="routes.pages.booking"
              size="lg"
              variant="outline"
              label="Direct Boeken"
            />
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>
