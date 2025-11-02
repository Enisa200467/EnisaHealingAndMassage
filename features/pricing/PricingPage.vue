<template>
  <div>
    <PricingHero />
    <PageSection primary padding="sm">
      <PricingHealingSection
        :loading="loading"
        :error="error"
        :healing-treatments="healingData"
      />
    </PageSection>
    <PageSection padding="sm">
      <PricingMassageSection
        :loading="loading"
        :error="error"
        :massage-treatments="massageData"
      />
    </PageSection>
    <PageSection primary padding="sm">
      <PricingPackagesSection />
    </PageSection>
    <PageSection padding="sm">
      <PricingInfoSection />
    </PageSection>
    <PageSection primary padding="sm">
      <PricingCTA />
    </PageSection>
  </div>
</template>

<script setup lang="ts">
import { useTreatmentStore } from '../treatments/store';

const { setPageSEO, businessInfo } = useGlobalSEO();
const treatmentStore = useTreatmentStore();
const { healingTreatments, massageTreatments, loading, error } =
  storeToRefs(treatmentStore);
const { data: sections } = await useAsyncData(() => {
  return queryCollection('treatments').select('body', 'title').all();
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

const healingData = computed(() =>
  healingTreatments.value.map((treatment) => ({
    treatment: treatment,
    benefits:
      benefitList.value.find((benefit) => benefit.title === treatment.title)
        ?.items || [],
  }))
);

const massageData = computed(() =>
  massageTreatments.value.map((treatment) => ({
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

  const itemListElement: SchemaItem[] = [];
  let position = 1;

  // Add healing treatments
  healingTreatments.value.forEach((treatment) => {
    itemListElement.push({
      '@type': 'ListItem',
      position: position++,
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
    });
  });

  // Add massage treatments
  massageTreatments.value.forEach((treatment) => {
    itemListElement.push({
      '@type': 'ListItem',
      position: position++,
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
          price: treatment.price.replace('€', ''),
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
        },
      },
    });
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Tarieven Enisa Healing & Massage',
    description:
      'Transparante prijzen voor alle healing en massage behandelingen',
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
      'Overzicht van alle tarieven voor massage en healing behandelingen. Transparante prijzen zonder verborgen kosten. Bekijk ook onze kortingspakketten.',
    path: '/tarieven',
    structuredData: [pricingSchema.value],
  });
});
</script>
