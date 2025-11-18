<script setup lang="ts">
import { useTreatmentStore } from './features/treatments/store';
import { SpeedInsights } from "@vercel/speed-insights/nuxt"
import { inject } from '@vercel/analytics';

const treatmentStore = useTreatmentStore();

// Initialize Vercel Analytics (only in production)
if (process.client && process.env.NODE_ENV === 'production') {
  inject();
}
</script>
<template>
  <UApp>
    <SpeedInsights />
    <SkipNavigation />
    <div class="flex flex-col min-h-screen">
      <SiteHeader />
      <main
        id="main-content"
        class="flex-1"
        role="main"
        aria-label="Main content"
      >
        <NuxtPage />
      </main>
      <SiteFooter />
      <BookingWidget />
    </div>
  </UApp>
</template>
