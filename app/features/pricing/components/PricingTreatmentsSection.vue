<template>
  <section class="mb-12">
    <div class="text-center mb-8">
      <h2 class="text-3xl font-bold text-neutral-900">
        Alle Behandelingen
      </h2>
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
        :duration="treatment.duration"
        :price="treatment.price"
        :discount-enabled="treatment.discountEnabled"
        :discount-price="treatment.discountPrice"
        :icon="treatment.icon || 'i-mdi-clock-outline'"
        :show-single-session-label="Boolean(treatment.price) && Boolean(treatment.trajects?.length)"
        :show-link-button="true"
        :to="treatment.path"
        :book-button-text="`Boek ${treatment.title}`"
        :book-button-link="'https://enisa-healing-massage.setmore.com'"
        book-button-color="primary"
        size="md"
      >
        <div
          v-if="treatment.trajects?.length"
          class="mt-2 rounded-lg border border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 p-4"
        >
          <div class="flex items-center gap-2 text-purple-900 mb-2">
            <UIcon name="i-mdi-timeline" class="w-4 h-4 text-purple-600" />
            <p class="text-sm font-semibold">Trajecten</p>
          </div>
          <ul class="space-y-1">
            <li
              v-for="traject in treatment.trajects"
              :key="traject.id"
              class="flex items-center justify-between text-sm text-purple-800"
            >
              <span>{{ traject.sessions }} sessies</span>
              <span class="font-semibold text-purple-700">
                {{ formatPrice(traject.price_cents) }}
              </span>
            </li>
          </ul>
        </div>
      </TreatmentDetails>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { TreatmentData } from '~/composables/useTreatments';
import { useTreatmentDetailsFormatter } from '~/composables/useTreatmentData';

  const props = withDefaults(
  defineProps<{
    treatments: TreatmentData[];
    loading?: boolean;
    error?: string | null;
  }>(),
  {
    loading: false,
    error: null,
  }
);

const { formatPrice } = useTreatmentDetailsFormatter();
const treatments = computed(() => props.treatments);
</script>
