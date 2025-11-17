<script setup lang="ts">
import { useTreatmentStore } from '../store';

// TODO: make SSR friendly if needed
const treatmentStore = useTreatmentStore();

// Get related treatments organized by category
const healingTreatments = computed(() =>
  treatmentStore.healingTreatments.slice(0, 3)
);
const massageTreatments = computed(() =>
  treatmentStore.massageTreatments.slice(0, 3)
);
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
        Ontdek onze andere healing en massage behandelingen die perfect kunnen
        aanvullen op jouw welzijnsreis.
      </p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Healing Treatment -->
      <UCard class="group hover:shadow-lg transition-shadow duration-300">
        <template #header>
          <div class="flex items-center gap-3">
            <UIcon
              name="i-mdi-sparkles"
              class="w-6 h-6 text-primary-500"
              aria-hidden="true"
            />
            <h3 class="text-lg font-semibold">Healing Behandelingen</h3>
          </div>
        </template>

        <div class="space-y-3">
          <p class="text-neutral-600 text-sm">
            Energetische behandelingen voor diepere genezing en balans.
          </p>
          <ul class="space-y-2 text-sm" role="list">
            <li v-for="treatment in healingTreatments" :key="treatment.slug">
              <ULink
                :to="treatment.path"
                class="flex items-center gap-2 text-neutral-700 hover:text-primary-600 transition-colors group"
              >
                <UIcon
                  :name="treatment.icon || 'i-mdi-sparkles'"
                  class="w-4 h-4 text-primary-500 group-hover:text-primary-600"
                  aria-hidden="true"
                />
                {{ treatment.title }}
              </ULink>
            </li>
          </ul>
        </div>

        <template #footer>
          <UButton to="/behandelingen" variant="ghost" size="sm" block>
            Bekijk Healing
            <UIcon
              name="i-mdi-arrow-right"
              class="w-4 h-4 ml-1"
              aria-hidden="true"
            />
          </UButton>
        </template>
      </UCard>

      <!-- Massage Treatment -->
      <UCard class="group hover:shadow-lg transition-shadow duration-300">
        <template #header>
          <div class="flex items-center gap-3">
            <UIcon
              name="i-mdi-account-group"
              class="w-6 h-6 text-secondary-500"
              aria-hidden="true"
            />
            <h3 class="text-lg font-semibold">Massage Behandelingen</h3>
          </div>
        </template>

        <div class="space-y-3">
          <p class="text-neutral-600 text-sm">
            Traditionele massages voor ontspanning en herstel.
          </p>
          <ul class="space-y-2 text-sm" role="list">
            <li v-for="treatment in massageTreatments" :key="treatment.slug">
              <ULink
                :to="treatment.path"
                class="flex items-center gap-2 text-neutral-700 hover:text-secondary-600 transition-colors group"
              >
                <UIcon
                  :name="treatment.icon || 'i-mdi-account-group'"
                  class="w-4 h-4 text-secondary-500 group-hover:text-secondary-600"
                  aria-hidden="true"
                />
                {{ treatment.title }}
              </ULink>
            </li>
          </ul>
        </div>

        <template #footer>
          <UButton to="/behandelingen" variant="ghost" size="sm" block>
            Bekijk Massages
            <UIcon
              name="i-mdi-arrow-right"
              class="w-4 h-4 ml-1"
              aria-hidden="true"
            />
          </UButton>
        </template>
      </UCard>

      <!-- All Treatments -->
      <UCard
        class="group hover:shadow-lg transition-shadow duration-300 border-2 border-primary-200"
      >
        <template #header>
          <div class="flex items-center gap-3">
            <UIcon
              name="i-mdi-heart"
              class="w-6 h-6 text-green-500"
              aria-hidden="true"
            />
            <h3 class="text-lg font-semibold">Alle Behandelingen</h3>
          </div>
        </template>

        <div class="space-y-3">
          <p class="text-neutral-600 text-sm">
            Bekijk ons complete aanbod aan healing en massage behandelingen.
          </p>
          <div class="bg-green-50 p-3 rounded-lg">
            <p class="text-xs text-green-700 font-medium">
              💡 Niet zeker welke behandeling het beste bij je past? Bekijk alle
              opties!
            </p>
          </div>
        </div>

        <template #footer>
          <UButton to="/behandelingen" size="sm" block>
            Alle Behandelingen
            <UIcon
              name="i-mdi-arrow-right"
              class="w-4 h-4 ml-1"
              aria-hidden="true"
            />
          </UButton>
        </template>
      </UCard>
    </div>
  </PageSection>
</template>
