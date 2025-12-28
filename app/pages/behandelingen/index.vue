<script setup lang="ts">
const routes = useRoutes();
const { setPageSEO, businessInfo } = useGlobalSEO();

// Fetch treatments using the global composable
const { activeTreatments: allTreatments, loading } = useTreatments();

// Generate structured data for treatment catalog
const treatmentCatalogSchema = computed(() => {
  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: 'Behandelingen - Enisa Healing & Massage',
    description:
      'Volledig overzicht van alle behandelingen',
    provider: {
      '@type': 'LocalBusiness',
      name: businessInfo.name,
      url: businessInfo.url,
    },
    itemListElement: allTreatments.value.map((treatment, index) => ({
      '@type': 'Offer',
      position: index + 1,
      itemOffered: {
        '@type': 'Service',
        name: treatment.title,
        description: treatment.description,
      },
      price: treatment.price ? (treatment.price / 100).toFixed(0) : undefined,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: `${businessInfo.url}/behandelingen/${treatment.slug}`,
    })),
  };
});

// Enhanced SEO with structured data
watchEffect(() => {
  if (allTreatments.value.length) {
    setPageSEO({
      title: 'Alle Behandelingen - Enisa Healing & Massage',
      description:
        'Ontdek ons complete aanbod van behandelingen voor heling en ontspanning. Kies de behandeling die bij jou past.',
      path: '/behandelingen',
      type: 'website',
      structuredData: [treatmentCatalogSchema.value],
    });
  } else {
    // Fallback SEO without structured data
    useSeoMeta({
      title: 'Alle Behandelingen - Enisa Healing & Massage',
      description:
        'Ontdek ons complete aanbod van behandelingen voor heling en ontspanning.',
      ogTitle: 'Alle Behandelingen - Enisa Healing & Massage',
      ogDescription:
        'Ontdek ons complete aanbod van behandelingen.',
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
      <div class="py-12 sm:py-16">
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

        <!-- Treatments Grid -->
        <div class="mt-16">
          <!-- Loading State -->
          <div v-if="loading" class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
          <div
            v-else-if="allTreatments.length > 0"
            class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            <div
              v-for="treatment in allTreatments"
              :key="treatment.slug"
              class="flex flex-col hover:shadow-lg transition-shadow duration-200"
            >
              <TreatmentDetails
                size="sm"
                :title="treatment.title"
                :short-description="treatment.description"
                :icon="treatment.icon"
                :duration="treatment.duration"
                :price="treatment.price"
                :discount-enabled="treatment.discountEnabled"
                :discount-price="treatment.discountPrice"
                show-book-button
                show-link-button
                :to="getSlug(treatment.slug)"
              />
            </div>
          </div>

          <!-- Empty State -->
          <div
            v-else
            class="mt-8 text-center py-12 text-gray-500 bg-gray-100 rounded-lg"
          >
            <p class="text-lg">
              Er zijn momenteel geen behandelingen beschikbaar.
            </p>
          </div>
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
