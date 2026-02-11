<template>
  <section id="behandelingen" class="py-12 sm:py-16 scroll-mt-20">
    <UContainer>
      <div class="text-center">
        <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
          Ontdek Onze Behandelingen
        </h2>
        <p class="mt-4 text-lg leading-8 text-gray-600">
          Kies de behandeling die bij jou past voor heling en ontspanning.
        </p>
      </div>

      <div class="mt-16">
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <TreatmentDetails
            v-for="treatment in displayedTreatments"
            :key="treatment.title"
            :title="treatment.title"
            :icon="treatment.icon || 'i-mdi-sparkles'"
            :short-description="treatment.description"
            :price="treatment.price"
            :discount-enabled="treatment.discountEnabled"
            :discount-price="treatment.discountPrice"
            :traject-enabled="treatment.trajectEnabled"
            :traject-sessions="treatment.trajectSessions"
            :traject-price="treatment.trajectPrice"
            :package-enabled="treatment.packageEnabled"
            :package-sessions="treatment.packageSessions"
            :package-price="treatment.packagePrice"
            :show-link-button="true"
            :to="treatment.path"
            :show-book-button="true"
            book-button-text="Direct Boeken"
            size="sm"
          />
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const routes = useRoutes();

// Get all active treatments using global composable
const { activeTreatments: allTreatments } = useTreatments();

const HYPNOTHERAPIE_HOMEPAGE_DESCRIPTION =
  'Waar echte transformatie begint. Combinatie van hypnotherapie en energetische healing voor duurzame verandering op mentaal, emotioneel en energetisch niveau.';

const displayedTreatments = computed(() =>
  allTreatments.value.map((treatment) => {
    if (
      treatment.slug === 'hypnotherapie' ||
      treatment.title.toLowerCase().includes('hypnotherapie')
    ) {
      return {
        ...treatment,
        description: HYPNOTHERAPIE_HOMEPAGE_DESCRIPTION,
      };
    }

    return treatment;
  })
);
</script>
