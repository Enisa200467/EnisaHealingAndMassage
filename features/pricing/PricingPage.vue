<template>
  <div>
    <PricingHero />
    <PageSection purple padding="sm">
      <PricingHealingSection :healing-treatments="healingData" />
    </PageSection>
    <PageSection padding="sm">
      <PricingMassageSection :massage-treatments="massageData" />
    </PageSection>
    <PageSection purple padding="sm">
      <PricingPackagesSection />
    </PageSection>
    <PageSection padding="sm">
      <PricingInfoSection />
    </PageSection>
    <PageSection purple padding="sm">
      <PricingCTA />
    </PageSection>
  </div>
</template>

<script setup lang="ts">
const { setPageSEO, businessInfo } = useGlobalSEO();
const { healingTreatments, massageTreatments } = useDatabasePricing();
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
  healingTreatments.map((treatment) => ({
    ...treatment,
    benefits:
      benefitList.value.find((benefit) => benefit.title === treatment.title)
        ?.items || [],
  }))
);

const massageData = computed(() =>
  massageTreatments.map((treatment) => ({
    ...treatment,
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
  healingTreatments.forEach((treatment) => {
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
  massageTreatments.forEach((treatment) => {
    itemListElement.push({
      '@type': 'ListItem',
      position: position++,
      item: {
        '@type': 'Service',
        name: treatment.name,
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
