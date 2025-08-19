<template>
  <div>
    <PricingHero />
    <UContainer class="py-16 sm:py-24">
      <div class="max-w-7xl mx-auto">
        <PricingHealingSection />
        <PricingMassageSection />
        <PricingPackagesSection />
        <PricingInfoSection />
        <PricingCTA />
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
const { setPageSEO, businessInfo } = useGlobalSEO();
const { healingTreatments, massageTreatments } = useDatabasePricing();

// Generate pricing service schema dynamically from database treatments
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

  // Add massage treatments
  massageTreatments.value.forEach((treatment) => {
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
