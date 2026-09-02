<script setup lang="ts">
const { setPageSEO } = useGlobalSEO();

setPageSEO({
  title: 'Tarieven | Enisa Healing & Massage Amsterdam Noord',
  description:
    'Bekijk tarieven voor massage, chakra healing, hypnotherapie en andere behandelingen in Amsterdam Noord. Transparante prijzen en kortingspakketten.',
  path: '/tarieven',
  image: '/images/hero.webp',
});
</script>

<template>
  <PricingPage />
</template>
