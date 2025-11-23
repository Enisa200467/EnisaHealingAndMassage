<script setup lang="ts">
import { useTreatmentStore } from '../store';

// TODO: make SSR friendly if needed
const treatmentStore = useTreatmentStore();

// Get first 6 treatments for related section
const allTreatments = computed(() => {
  return treatmentStore.treatments
    .filter((t) => t.is_active)
    .map((t) => treatmentStore.formatTreatment(t))
    .sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
    .slice(0, 6);
});
</script>

<template>
  <PageSection aria-labelledby="related-treatments-heading">
    <header class="text-center mb-12">
      <h2
        id="related-treatments-heading"
        class="text-3xl font-bold text-neutral-900 mb-4"
      >
        Andere Behandelingen
      </h2>
      <p class="text-neutral-600 max-w-2xl mx-auto">
        Ontdek onze andere behandelingen die perfect kunnen aanvullen op jouw welzijnsreis.
      </p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <UCard
        v-for="treatment in allTreatments"
        :key="treatment.slug"
        class="group hover:shadow-lg transition-shadow duration-300"
      >
        <template #header>
          <div class="flex items-center gap-3">
            <UIcon
              :name="treatment.icon || 'i-mdi-sparkles'"
              class="w-6 h-6 text-primary-500"
              aria-hidden="true"
            />
            <h3 class="text-lg font-semibold">{{ treatment.title }}</h3>
          </div>
        </template>

        <div class="space-y-3">
          <p class="text-neutral-600 text-sm">
            {{ treatment.description }}
          </p>
        </div>

        <template #footer>
          <UButton :to="treatment.path" variant="ghost" size="sm" block>
            Meer Info
            <UIcon
              name="i-mdi-arrow-right"
              class="w-4 h-4 ml-1"
              aria-hidden="true"
            />
          </UButton>
        </template>
      </UCard>
    </div>

    <div class="mt-12 text-center">
      <UButton to="/behandelingen" size="lg">
        Alle Behandelingen Bekijken
      </UButton>
    </div>
  </PageSection>
</template>
