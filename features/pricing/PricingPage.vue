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
// SEO Meta tags for pricing page
useSeoMeta({
  title: 'Tarieven - Enisa Healing & Massage',
  description: 'Overzicht van alle tarieven voor massage en healing behandelingen. Transparante prijzen zonder verborgen kosten. Bekijk ook onze kortingspakketten.',
})
</script>
