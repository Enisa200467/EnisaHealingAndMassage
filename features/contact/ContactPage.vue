<script setup lang="ts">
import { useContact } from './composables/useContact';

const { submitContactForm } = useContact();
const { setPageSEO, businessInfo } = useGlobalSEO();

// Generate business contact schema
const businessContactSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': businessInfo.url,
  name: businessInfo.name,
  description: businessInfo.description,
  url: businessInfo.url,
  telephone: businessInfo.telephone,
  email: businessInfo.email,
  address: businessInfo.address,
  contactPoint: businessInfo.contactPoint,
  openingHours: businessInfo.openingHours,
  serviceArea: businessInfo.serviceArea,
  priceRange: businessInfo.priceRange,
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Healing & Massage Behandelingen',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Healing Behandelingen',
          description:
            'Energetische healing sessies, chakra balancering en Reiki behandelingen',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Massage Behandelingen',
          description:
            'Klassieke ontspanningsmassage, Zweedse massage en sportmassage',
        },
      },
    ],
  },
};

// Set comprehensive page SEO with business schema
setPageSEO({
  title: 'Contact - Enisa Healing & Massage',
  description:
    'Neem contact op met Enisa voor vragen over behandelingen, tarieven of om een afspraak in te plannen. Bel, mail of gebruik ons contactformulier.',
  path: '/contact',
  structuredData: [businessContactSchema],
});
</script>

<template>
  <div>
    <ContactHero />

    <!-- Main Content -->
    <section class="py-16 sm:py-24 bg-purple-50">
      <UContainer>
        <div class="max-w-6xl mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactInfo />
            <ContactForm @submit="submitContactForm" />
          </div>
        </div>
      </UContainer>
    </section>

    <ContactFAQ />
    <ContactMap />
  </div>
</template>
