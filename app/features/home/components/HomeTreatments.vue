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
          <UCard
            v-for="treatment in allTreatments"
            :key="treatment.title"
            class="flex flex-col"
            variant="outline"
          >
            <template #header>
              <div class="flex items-center">
                <UIcon
                  :name="treatment.icon || 'i-mdi-sparkles'"
                  class="mr-2 text-primary-500"
                />
                <h3 class="text-lg font-semibold leading-6">
                  {{ treatment.title }}
                </h3>
              </div>
            </template>

            <p class="text-sm text-gray-600 grow">
              {{ treatment.description }}
            </p>

            <template #footer>
              <UButton
                variant="outline"
                :to="treatment.path"
                label="Meer Info"
                size="sm"
              />
              <UButton
                :to="routes.pages.booking"
                label="Direct Boeken"
                size="sm"
                class="ml-2"
              />
            </template>
          </UCard>
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
