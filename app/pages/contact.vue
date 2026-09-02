<script setup lang="ts">
const { generateBusinessSchema, setPageSEO } = useGlobalSEO();

setPageSEO({
  title: 'Contact | Enisa Healing & Massage Amsterdam Noord',
  description:
    'Neem contact op met Enisa in Amsterdam Noord voor vragen over behandelingen, tarieven of een afspraak. Bel, mail of stuur een WhatsApp-bericht.',
  path: '/contact',
  image: '/images/hero.webp',
  structuredData: [generateBusinessSchema()],
});
</script>

<template>
  <ContactPage />
</template>
