<script setup lang="ts">
const { generateBusinessSchema, setPageSEO } = useGlobalSEO();

setPageSEO({
  title: 'Chakra Healing & Massage Amsterdam-Noord | Enisa Healing',
  description:
    'Pijn, stress, lichamelijke spanning of emotionele blokkades? Chakra healing, energetische healing, massage en hypnotherapie in Amsterdam-Noord. Boek online.',
  path: '/',
  image: '/images/hero.webp',
  structuredData: [generateBusinessSchema()],
});
</script>

<template>
  <HomePage />
</template>
