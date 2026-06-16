<template>
  <section id="behandelingen" class="py-12 sm:py-16 scroll-mt-20">
    <UContainer>
      <div class="text-center">
        <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
          Ontdek Mijn Behandelingen
        </h2>
        <div
          class="mx-auto mt-6 max-w-3xl rounded-3xl border border-amber-200/80 bg-gradient-to-r from-amber-50 via-white to-orange-50 px-6 py-6 shadow-sm ring-1 ring-black/5"
        >
          <p class="text-xl font-semibold tracking-tight text-neutral-900 sm:text-2xl">
            Vertrouwd door meer dan 350 cliënten
          </p>
          <div
            class="mt-3 flex items-center justify-center gap-1.5"
            aria-label="5 van de 5 sterren"
          >
            <UIcon
              v-for="star in 5"
              :key="star"
              name="i-mdi-star"
              class="h-7 w-7 text-amber-500"
              aria-hidden="true"
            />
          </div>
          <p class="mt-3 text-base font-medium leading-7 text-neutral-700 sm:text-lg">
            Gemiddeld beoordeeld met 5 sterren op Google, Treatwell en mijn
            website.
          </p>
        </div>
        <p class="mt-5 text-lg leading-8 text-gray-600">
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
  'Met behulp van Ericksoniaanse hypnose begeleid ik je in Amsterdam Noord bij stress, angst, onzekerheid, het versterken van zelfvertrouwen en het doorbreken van terugkerende patronen. Ook mogelijk in combinatie met chakra healing.';

const ANTI_STRESS_HOMEPAGE_DESCRIPTION =
  'In deze sessies leer je om bewust aanwezig te zijn in het hier en nu. Waardoor je meer rust en tevredenheid zult ervaren en meer vertrouwen zult krijgen in jezelf en de toekomst.';

const HYPNOTHERAPIE_HOMEPAGE_PRICE_CENTS = 15500;
const ENERGETISCHE_BLOKKADES_OPHEFFEN_HOMEPAGE_PRICE_CENTS = 16000;

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

    if (
      treatment.slug === 'energetische-blokkades-opheffen' ||
      treatment.title.toLowerCase().includes('energetische blokkades opheffen')
    ) {
      return {
        ...treatment,
        description,
        price: ENERGETISCHE_BLOKKADES_OPHEFFEN_HOMEPAGE_PRICE_CENTS,
      };
    }

    return {
      ...treatment,
      description,
    };
  })
);
</script>
