<template>
  <section class="mb-12">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-neutral-900 mb-4">
        Alle Behandelingen
      </h2>
      <p class="text-neutral-600 max-w-2xl mx-auto">
        Professionele behandelingen voor ontspanning, pijnverlichting en
        verbetering van je algemene welzijn.
      </p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-12">
      <UIcon
        name="i-mdi-loading"
        class="w-8 h-8 animate-spin mx-auto mb-4 text-primary-500"
      />
      <p class="text-neutral-600">Behandelingen laden...</p>
    </div>

    <!-- Error State -->
    <UAlert
      v-else-if="error"
      icon="i-mdi-alert-circle"
      color="error"
      variant="soft"
      :title="error"
      class="mb-6"
    />

    <!-- Treatments Grid -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <TreatmentDetails
        v-for="treatment in treatments"
        :key="treatment.title"
        :title="treatment.title"
        :short-description="treatment.description"
        :discount-enabled="treatment.discountEnabled"
        :discount-price="treatment.discountPrice"
        :show-link-button="false"
        :book-button-text="`Boek ${treatment.title}`"
        :book-button-link="`/boeken?treatment=${treatment.slug}`"
        book-button-color="primary"
        size="md"
      >
        <template #header>
          <div class="flex justify-between items-start">
            <div>
              <h3 class="text-xl font-semibold text-neutral-900 mb-1">
                {{ treatment.title }}
              </h3>
              <p class="text-sm text-neutral-500">
                {{ formatDuration(treatment.duration) }}
              </p>
            </div>
            <div class="text-right">
              <p class="text-2xl font-bold text-primary-600">
                {{ formatPrice(treatment.price) }}
              </p>
            </div>
          </div>
        </template>

        <!-- Benefits in default slot -->
        <div>
          <p class="text-sm font-medium text-neutral-700 mb-2">Voordelen:</p>
          <ul class="space-y-1">
            <li
              v-for="benefit in treatment.benefits"
              :key="benefit"
              class="flex items-center gap-2 text-sm text-neutral-600"
            >
              <UIcon name="i-mdi-check" class="w-4 h-4 text-green-500" />
              {{ benefit }}
            </li>
          </ul>
        </div>
      </TreatmentDetails>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { TreatmentData } from '~/features/treatments/store';
import { useTreatmentDetailsFormatter } from '~/composables/useTreatmentData';

export interface Treatment {
  treatment: TreatmentData;
  benefits: string[];
}

const props = defineProps<{
  treatments: Treatment[];
  loading: boolean;
  error: string | null;
}>();

const { formatPrice, formatDuration } = useTreatmentDetailsFormatter();

const treatments = props.treatments.map((t) => ({
  ...t.treatment,
  benefits: t.benefits,
}));
</script>
