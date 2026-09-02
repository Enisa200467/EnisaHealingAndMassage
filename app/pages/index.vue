<script setup lang="ts">
const { generateBusinessSchema, setPageSEO } = useGlobalSEO();

setPageSEO({
  title: 'Massage & Healing Amsterdam Noord | Enisa Healing',
  description:
    'Massage en healing in Amsterdam Noord voor diepe ontspanning, meer balans en persoonlijke aandacht in een rustige praktijk aan het IJplein.',
  path: '/',
  image: '/images/hero.webp',
  structuredData: [generateBusinessSchema()],
});
</script>

<template>
  <HomePage />
</template>
