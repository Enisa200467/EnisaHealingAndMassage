<template>
  <section id="behandelingen" class="py-12 sm:py-16 scroll-mt-20">
    <UContainer>
      <div class="text-center">
        <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
          Ontdek Onze Behandelingen
        </h2>
        <p class="mt-4 text-lg leading-8 text-gray-600">
          Kies de behandeling die bij jou past voor heling en ontspanning in
          Amsterdam Noord.
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

const { data: treatmentsContent } = await useAsyncData(
  'home-treatments-content',
  () => queryCollection('behandelingen').all()
);

const contentDescriptionsBySlug = computed(() => {
  const descriptions: Record<string, string> = {};

  (treatmentsContent.value || []).forEach((item) => {
    if (!item?.path) {
      return;
    }

    const slug = item.path.split('/').pop();

    if (!slug || typeof item.description !== 'string') {
      return;
    }

    descriptions[slug] = item.description;
  });

  return descriptions;
});

const HYPNOTHERAPIE_HOMEPAGE_DESCRIPTION =
  'Waar echte transformatie begint. Combinatie van hypnotherapie en energetische healing voor duurzame verandering op mentaal, emotioneel en energetisch niveau.';

const ANTI_STRESS_HOMEPAGE_DESCRIPTION =
  'In deze sessies leer je om bewust aanwezig te zijn in het hier en nu. Waardoor je meer rust en tevredenheid zult ervaren en meer vertrouwen zult krijgen in jezelf en de toekomst.';

const HYPNOTHERAPIE_HOMEPAGE_PRICE_CENTS = 13000;

const displayedTreatments = computed(() =>
  allTreatments.value.map((treatment) => {
    const description =
      contentDescriptionsBySlug.value[treatment.slug] || treatment.description;

    if (
      treatment.slug === 'hypnotherapie' ||
      treatment.title.toLowerCase().includes('hypnotherapie')
    ) {
      return {
        ...treatment,
        description: HYPNOTHERAPIE_HOMEPAGE_DESCRIPTION,
        price: HYPNOTHERAPIE_HOMEPAGE_PRICE_CENTS,
      };
    }

    if (
      treatment.slug === 'anti-stress' ||
      treatment.title.toLowerCase().includes('anti stress')
    ) {
      return {
        ...treatment,
        description: ANTI_STRESS_HOMEPAGE_DESCRIPTION,
      };
    }

    return {
      ...treatment,
      description,
    };
  })
);
</script>
