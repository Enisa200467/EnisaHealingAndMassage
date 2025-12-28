<script setup lang="ts">
// Keep import for future use when email contact is re-enabled
// import { useContact } from './composables/useContact';
// import type { ContactFormData } from './types/contact.types';

// const { submitContactForm } = useContact();
const { setPageSEO, businessInfo } = useGlobalSEO();

// Keep form submission logic for future use when email contact is re-enabled
// Track form submission state
// const isSuccess = ref(false);
// const isError = ref(false);
// const errorMessage = ref('');

// Handle form submission
// const handleSubmit = async (data: ContactFormData) => {
//   // Reset states
//   isSuccess.value = false;
//   isError.value = false;
//   errorMessage.value = '';

//   const result = await submitContactForm(data);

//   if (result.success) {
//     isSuccess.value = true;
//   } else {
//     isError.value = true;
//     errorMessage.value = result.error?.message || 'Er is iets misgegaan. Probeer het later opnieuw.';
//   }
// };

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
    'Neem contact op met Enisa voor vragen over behandelingen, tarieven of om een afspraak in te plannen. Bel of stuur een WhatsApp bericht.',
  path: '/contact',
  structuredData: [businessContactSchema],
});
</script>

<template>
  <div>
    <ContactHero />

    <!-- Main Content -->
    <PageSection primary aria-label="Contactgegevens">
      <div class="max-w-3xl mx-auto">
        <ContactInfo />
        <!-- Contact form disabled - uncomment to re-enable email contact -->
        <!-- <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <ContactInfo />
          <ContactForm
            :is-success="isSuccess"
            :is-error="isError"
            :error-message="errorMessage"
            @submit="handleSubmit"
          />
        </div> -->
      </div>
    </PageSection>

    <ContactFAQ />
    <ContactMap />
  </div>
</template>
