<script setup lang="ts">
import { type Treatment } from '~/features/admin/types/treatment.types';
import type { TreatmentData } from '~/composables/useTreatments';

interface Props {
  // Content-based props (fallback)
  id?: string;
  description?: string;
}

const props = defineProps<Props>();
const pageTreatmentData = inject<TreatmentData | null>('treatmentData', null);

// Always fetch from database for SEO and consistency
const { data: treatmentData } = await useFetch<Treatment>(
  `/api/treatments/${props.id}`,
  {
    // This will run server-side during SSR, making it SEO-friendly
    server: true,
  }
);

// Computed values that prioritize database data over content data
const displayTitle = computed(
  () => treatmentData.value?.name || pageTreatmentData?.title
);
const displayPrice = computed(
  () => treatmentData.value?.price_cents || pageTreatmentData?.price
);
const displayDuration = computed(
  () => treatmentData.value?.duration_minutes || pageTreatmentData?.duration
);
const displayIcon = computed(
  () => treatmentData.value?.icon || pageTreatmentData?.icon
);
const displayDiscountEnabled = computed(
  () =>
    treatmentData.value?.discount_enabled ||
    pageTreatmentData?.discountEnabled ||
    false
);
const displayDiscountPrice = computed(
  () =>
    treatmentData.value?.discount_price_cents || pageTreatmentData?.discountPrice
);
const displayTrajects = computed(
  () => treatmentData.value?.trajects || pageTreatmentData?.trajects || []
);
</script>

<template>
  <section
    class="not-prose bg-gradient-to-b from-secondary-200 to-primary-50 py-12 sm:py-16"
  >
    <UContainer v-if="displayTitle">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10 items-start">
        <!-- Title Section -->
        <div class="lg:col-span-2">
          <div class="flex items-center gap-3 mb-6">
            <UIcon
              v-if="displayIcon"
              :name="displayIcon"
              class="w-8 h-8 text-primary-600"
              aria-hidden="true"
            />
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900">
              {{ displayTitle }}
            </h1>
          </div>
          <p v-if="description" class="text-xl text-neutral-600 leading-relaxed">
            {{ description }}
          </p>
        </div>

        <!-- Price Box -->
        <div class="lg:col-span-1">
          <TreatmentDetails
            variant="card"
            :duration="displayDuration"
            :price="displayPrice"
            :discount-enabled="displayDiscountEnabled"
            :discount-price="displayDiscountPrice"
            :trajects="displayTrajects"
            show-book-button
          />
        </div>
      </div>
    </UContainer>
  </section>
</template>
