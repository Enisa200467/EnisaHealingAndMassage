<script setup lang="ts">
import { type Treatment } from '~/features/admin/types/treatment.types';

interface Props {
  // Content-based props (fallback)
  id?: string;
}

const props = defineProps<Props>();


// Use injected data or props

const { data: treatmentData, status, error, refresh, clear } = await useFetch<Treatment>(`/api/treatments/${props.id}`);

// Intensity labels for each rating
const intensityLabels = {
  1: 'Zeer Zacht',
  2: 'Zacht', 
  3: 'Medium',
  4: 'Stevig',
  5: 'Zeer Stevig'
} as const;

// Computed values that prioritize database data over content data
const displayTitle = computed(() => treatmentData.value?.name);
const subtitle = computed(() => treatmentData.value?.description );
const displayPrice = computed(() => treatmentData.value?.price_cents );
const displayDuration = computed(() => treatmentData.value?.duration_minutes);
const displayIcon = computed(() => treatmentData.value?.icon );

const intensityData = computed(() => {
  const intensity = treatmentData.value?.intensity ;
  if (!intensity) return null;
  
  const rating = Math.min(Math.max(intensity, 1), 5);
  const label = treatmentData.value?.intensity_label || intensityLabels[rating as keyof typeof intensityLabels];
  
  return { rating, label };
});
</script>

<template>
  <section class="not-prose bg-gradient-to-b from-secondary-200 to-primary-50 py-16 sm:py-24">
    <template v-if="status === 'pending'">
      <USkeleton />
    </template>
    <template v-else>

      <UContainer>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          <!-- Title Section -->
          <div class="lg:col-span-2">
            <div class="flex items-center gap-3 mb-6">
            <UIcon v-if="displayIcon" :name="displayIcon" class="w-8 h-8 text-primary-600" aria-hidden="true" />
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900">
              {{ displayTitle }}
            </h1>
          </div>
          <p v-if="subtitle" class="text-xl text-neutral-600 leading-relaxed">
            {{ subtitle }}
          </p>
        </div>

        <!-- Price Box -->
        <div class="lg:col-span-1">
          <TreatmentDetails
            variant="card"
            :duration="displayDuration"
            :price="displayPrice"
            :intensity="intensityData?.rating"
            :intensity-label="intensityData?.label"
            show-book-button
          />
        </div>
      </div>
    </UContainer>
          </template>
  </section>
</template>
