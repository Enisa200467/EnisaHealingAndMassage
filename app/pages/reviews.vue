<script setup lang="ts">
const { setPageSEO } = useGlobalSEO();

setPageSEO({
  title: 'Reviews | Enisa Healing & Massage Amsterdam Noord',
  description:
    'Lees ervaringen van cliënten met massage, healing en hypnotherapie bij Enisa in Amsterdam Noord, of deel jouw eigen ervaring met de praktijk.',
  path: '/reviews',
  image: '/images/hero.webp',
});
</script>

<template>
  <ReviewsPage />
</template>
