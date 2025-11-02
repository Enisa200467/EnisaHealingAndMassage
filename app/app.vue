<script setup lang="ts">
import { useTreatmentStore } from './features/treatments/store';

const treatmentStore = useTreatmentStore();

const { loading, error } = storeToRefs(treatmentStore);
</script>
<template>
  <UApp>
    <SkipNavigation />
    <div class="flex flex-col min-h-screen">
      <template v-if="!error && !loading">
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
      </template>
    </div>
  </UApp>
</template>
