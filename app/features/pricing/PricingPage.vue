<template>
  <div>
    <PricingHero />
    <PageSection
      primary
      padding="sm"
      aria-label="Alle behandelingen en tarieven"
    >
      <PricingTreatmentsSection
        :loading="loading"
        :error="error"
        :treatments="allTreatmentsData"
      />
    </PageSection>
    <PageSection primary padding="sm" aria-label="Kortingspakketten">
      <PricingPackagesSection />
    </PageSection>
    <PageSection padding="sm" aria-label="Betalingsinformatie en voorwaarden">
      <PricingInfoSection />
    </PageSection>
    <PageSection primary padding="sm" aria-label="Boek een behandeling">
      <PricingCTA />
    </PageSection>
  </div>
</template>

<script setup lang="ts">
import { useTreatmentStore } from '../treatments/store';

const { setPageSEO, businessInfo } = useGlobalSEO();
const treatmentStore = useTreatmentStore();
const { loading, error } = storeToRefs(treatmentStore);

const { data: sections } = await useAsyncData(() => {
  return queryCollection('treatments').select('body', 'title').all();
});

// Get all active treatments sorted by display order
const allTreatments = computed(() => {
  return treatmentStore.treatments
    .filter((t) => t.is_active)
    .map((t) => treatmentStore.formatTreatment(t))
    .sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
});

const benefitList = computed(() => {
  return (
    sections.value?.map((section) => {
      const itemsString = section.body.value[2][2][1][':items'];
      const items = JSON.parse(itemsString);

      return {
        title: section.title,
        items: items as string[],
      };
    }) || []
  );
});

const allTreatmentsData = computed(() =>
  allTreatments.value.map((treatment) => ({
    treatment: treatment,
    benefits:
      benefitList.value.find((benefit) => benefit.title === treatment.title)
        ?.items || [],
  }))
);

const pricingSchema = computed(() => {
  interface SchemaItem {
    '@type': string;
    position: number;
    item: {
      '@type': string;
      name: string;
      description: string;
      provider: {
        '@type': string;
        name: string;
      };
      offers: {
        '@type': string;
        price: string;
        priceCurrency: string;
        availability: string;
      };
    };
  }

  const itemListElement: SchemaItem[] = allTreatments.value.map((treatment, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'Service',
      name: treatment.title,
      description: treatment.description,
      provider: {
        '@type': 'Organization',
        name: businessInfo.name,
      },
      offers: {
        '@type': 'Offer',
        price: treatment.price?.replace('€', ''),
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
      },
    },
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Tarieven Enisa Healing & Massage',
    description:
      'Transparante prijzen voor alle behandelingen',
    provider: {
      '@type': 'Organization',
      name: businessInfo.name,
      url: businessInfo.url,
    },
    itemListElement,
  };
});

// Set comprehensive page SEO with dynamic pricing schema
watchEffect(() => {
  setPageSEO({
    title: 'Tarieven - Enisa Healing & Massage',
    description:
      'Overzicht van alle tarieven voor behandelingen. Transparante prijzen zonder verborgen kosten. Bekijk ook onze kortingspakketten.',
    path: '/tarieven',
    structuredData: [pricingSchema.value],
  });
});
</script>
