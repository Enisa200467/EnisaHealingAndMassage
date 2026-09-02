<template>
  <div>
    <PricingHero />
    <PageSection primary padding="sm" aria-label="Kortingspakketten">
      <PricingPackagesSection />
    </PageSection>
    <PageSection padding="sm" aria-label="Alle behandelingen en tarieven">
      <PricingTreatmentsSection :treatments="allTreatmentsData" />
    </PageSection>
    <PageSection
      primary
      padding="sm"
      aria-label="Betalingsinformatie en voorwaarden"
    >
      <PricingInfoSection />
    </PageSection>
    <PageSection padding="sm" aria-label="Boek een behandeling">
      <PricingCTA />
    </PageSection>
  </div>
</template>

<script setup lang="ts">
const { businessInfo } = useGlobalSEO();

// Fetch treatments using the global composable
const { activeTreatments } = useTreatments();

const allTreatmentsData = computed(() => activeTreatments.value);

const pricingSchema = computed(() => {
  interface SchemaItem {
    "@type": string;
    position: number;
    item: {
      "@type": string;
      name: string;
      description: string;
      provider: {
        "@type": string;
        name: string;
      };
      offers: {
        "@type": string;
        price?: string;
        priceCurrency: string;
        availability: string;
      };
    };
  }

  const itemListElement: SchemaItem[] = activeTreatments.value.map(
    (treatment, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: treatment.title,
        description:
          treatment.description ||
          `Behandeling bij Enisa Healing & Massage in Amsterdam Noord`,
        provider: {
          "@type": "LocalBusiness",
          name: businessInfo.name,
        },
        offers: {
          "@type": "Offer",
          price: treatment.price
            ? (treatment.price / 100).toFixed(0)
            : undefined,
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
        },
      },
    }),
  );

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Tarieven Enisa Healing & Massage Amsterdam Noord",
    description:
      "Transparante prijzen voor alle behandelingen in Amsterdam Noord",
    provider: {
      "@type": "Organization",
      name: businessInfo.name,
      url: businessInfo.url,
    },
    itemListElement,
  };
});

useHead(() => ({
  script: [
    {
      key: 'pricing-schema',
      type: 'application/ld+json',
      innerHTML: JSON.stringify(pricingSchema.value),
    },
  ],
}));
</script>
