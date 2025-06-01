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

// Generate pricing service schema
const pricingSchema = {
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
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@type': 'Service',
        name: 'Chakra Balancering',
        description: 'Energetische healing voor balans in je chakras',
        provider: {
          '@type': 'Organization',
          name: businessInfo.name,
        },
        offers: {
          '@type': 'Offer',
          price: '70',
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
        },
      },
    },
    {
      '@type': 'ListItem',
      position: 2,
      item: {
        '@type': 'Service',
        name: 'Energetische Healing Sessie',
        description: 'Diepgaande energetische healing behandeling',
        provider: {
          '@type': 'Organization',
          name: businessInfo.name,
        },
        offers: {
          '@type': 'Offer',
          price: '80',
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
        },
      },
    },
    {
      '@type': 'ListItem',
      position: 3,
      item: {
        '@type': 'Service',
        name: 'Klassieke Ontspanningsmassage',
        description: 'Traditionele massage voor diepe ontspanning',
        provider: {
          '@type': 'Organization',
          name: businessInfo.name,
        },
        offers: {
          '@type': 'Offer',
          price: '65',
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
        },
      },
    },
    {
      '@type': 'ListItem',
      position: 4,
      item: {
        '@type': 'Service',
        name: 'Zweedse Massage',
        description: 'Therapeutische massage met Zweedse technieken',
        provider: {
          '@type': 'Organization',
          name: businessInfo.name,
        },
        offers: {
          '@type': 'Offer',
          price: '70',
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
        },
      },
    },
    {
      '@type': 'ListItem',
      position: 5,
      item: {
        '@type': 'Service',
        name: 'Sportmassage',
        description: 'Gespecialiseerde massage voor sporters',
        provider: {
          '@type': 'Organization',
          name: businessInfo.name,
        },
        offers: {
          '@type': 'Offer',
          price: '75',
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
        },
      },
    },
    {
      '@type': 'ListItem',
      position: 6,
      item: {
        '@type': 'Service',
        name: 'Intuïtieve Lichaamsmassage',
        description: 'Persoonlijke en intuïtieve massagebehandeling',
        provider: {
          '@type': 'Organization',
          name: businessInfo.name,
        },
        offers: {
          '@type': 'Offer',
          price: '75',
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
        },
      },
    },
  ],
};

// Set comprehensive page SEO with pricing schema
setPageSEO({
  title: 'Tarieven - Enisa Healing & Massage',
  description:
    'Overzicht van alle tarieven voor massage en healing behandelingen. Transparante prijzen zonder verborgen kosten. Bekijk ook onze kortingspakketten.',
  path: '/tarieven',
  structuredData: [pricingSchema],
});
</script>
