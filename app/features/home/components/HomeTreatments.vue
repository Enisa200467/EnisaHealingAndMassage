<template>
  <section id="behandelingen" class="py-12 sm:py-16 scroll-mt-20">
    <UContainer>
      <div class="text-center">
        <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
          Ontdek Onze Behandelingen
        </h2>
        <p class="mt-4 text-lg leading-8 text-gray-600">
          Kies de behandeling die bij jou past voor heling en ontspanning.
        </p>
      </div>

      <div class="mt-16">
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <TreatmentDetails
            v-for="treatment in allTreatments"
            :key="treatment.title"
            :title="treatment.title"
            :icon="treatment.icon || 'i-mdi-sparkles'"
            :short-description="treatment.description"
            :price="treatment.price"
            :discount-enabled="treatment.discountEnabled"
            :discount-price="treatment.discountPrice"
            :package-enabled="treatment.packageEnabled"
            :package-sessions="treatment.packageSessions"
            :package-price="treatment.packagePrice"
            :show-link-button="true"
            :to="treatment.path"
            :show-book-button="true"
            book-button-text="Direct Boeken"
            size="sm"
          />
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import { useTreatmentStore } from '~/features/treatments/store';

const routes = useRoutes();
const treatmentStore = useTreatmentStore();

// Get all active treatments sorted by display order
const allTreatments = computed(() => {
  return treatmentStore.treatments
    .filter((t) => t.is_active)
    .map((t) => treatmentStore.formatTreatment(t))
    .sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
});
</script>
