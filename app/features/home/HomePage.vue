<template>
  <div>
    <HomeHero />
    <HomeIntro />
    <HomeTreatments />
  </div>
</template>

<script setup lang="ts">
// SEO Meta tags for the homepage
useSeoMeta({
  title:
    'Enisa Healing & Massage - Helende Massages & Ontspanning in Nederland',
  description:
    'Ervaar diepe ontspanning en heling met persoonlijke massages en behandelingen door Enisa. Boek vandaag nog uw sessie voor rust en balans.',
  ogTitle: 'Enisa Healing & Massage - Helende Massages & Ontspanning',
  ogDescription:
    'Ontdek de kracht van helende aanraking. Persoonlijke massages en energetische behandelingen voor lichaam en geest.',
  ogImage: '/images/hero-banner.jpg',
  ogType: 'website',
  ogUrl: 'https://enisahealingmassage.nl',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Enisa Healing & Massage - Helende Massages & Ontspanning',
  twitterDescription:
    'Ontdek de kracht van helende aanraking. Persoonlijke massages en energetische behandelingen voor lichaam en geest.',
  twitterImage: '/images/hero-banner.jpg',
});

// Add structured data for the business
useSchemaOrg([
  defineOrganization({
    name: 'Enisa Healing & Massage',
    url: 'https://enisahealingmassage.nl',
    logo: '/images/logo.jpg',
    sameAs: [
      // Add social media URLs when available
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+31-6-12345678',
      contactType: 'customer service',
      areaServed: 'NL',
      availableLanguage: ['Dutch', 'English'],
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'NL',
      addressLocality: 'Amsterdam', // Update with actual location
      postalCode: '1000 AA', // Update with actual postal code
    },
  }),
  defineLocalBusiness({
    name: 'Enisa Healing & Massage',
    description:
      'Professionele massage en healing praktijk gespecialiseerd in ontspanning, stressvermindering en energetische behandelingen.',
    image: '/images/hero-banner.jpg',
    telephone: '+31-6-12345678',
    url: 'https://enisahealingmassage.nl',
    priceRange: '€40-€90',
    openingHours: ['Mo-Fr 09:00-18:00', 'Sa 09:00-15:00'],
    serviceArea: {
      '@type': 'City',
      name: 'Amsterdam', // Update with actual service area
    },
  }),
]);
</script>
