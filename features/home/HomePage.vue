<template>
  <article>
    <HomeHero />
    <HomeIntro />
    <HomeTreatments />
  </article>
</template>

<script setup lang="ts">
// SEO Meta tags for the homepage
useSeoMeta({
  title:
    'Praktijk [Naam Masseuse] - Helende Massages & Ontspanning in [Stad/Regio]',
  description:
    'Ervaar diepe ontspanning en heling met persoonlijke massages en behandelingen door [Naam Masseuse]. Boek vandaag nog uw sessie voor rust en balans.',
  ogTitle: 'Praktijk [Naam Masseuse] - Helende Massages & Ontspanning',
  ogDescription:
    'Ontdek de kracht van helende aanraking. Persoonlijke massages en energetische behandelingen voor lichaam en geest.',
  ogImage: '/images/hero-banner.jpg',
});
</script>
