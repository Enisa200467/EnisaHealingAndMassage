<script setup lang="ts">
import { type Treatment } from '~/features/admin/types/treatment.types';

interface Props {
  // Content-based props (fallback)
  id?: string;
  subtitle?: string;
}

const props = defineProps<Props>();

// Try to inject treatment data from parent page
const injectedTreatmentData = inject<any>('treatmentData', null);

// Only fetch if ID is provided and no injected data
const shouldFetch = props.id && !injectedTreatmentData;
const { data: fetchedData, status } = shouldFetch
  ? await useFetch<Treatment>(`/api/treatments/${props.id}`)
  : { data: ref(null), status: ref('success') };

// Use injected data or fetched data
const treatmentData = computed(() => {
  if (injectedTreatmentData) {
    // Convert injected data format to Treatment format
    return {
      name: injectedTreatmentData.title,
      description: injectedTreatmentData.description,
      price_cents: injectedTreatmentData.price ? parseInt(injectedTreatmentData.price.replace(/[€\s]/g, '')) * 100 : undefined,
      duration_minutes: injectedTreatmentData.duration ? parseInt(injectedTreatmentData.duration) : undefined,
      icon: injectedTreatmentData.icon,
      intensity: injectedTreatmentData.intensity,
      intensity_label: injectedTreatmentData.intensityLabel,
    } as Treatment;
  }
  return fetchedData.value;
});

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
const displaySubtitle = computed(() => treatmentData.value?.description || props.subtitle);
const displayPrice = computed(() => treatmentData.value?.price_cents);
const displayDuration = computed(() => treatmentData.value?.duration_minutes);
const displayIcon = computed(() => treatmentData.value?.icon);

const intensityData = computed(() => {
  const intensity = treatmentData.value?.intensity;
  if (!intensity) return null;

  const rating = Math.min(Math.max(intensity, 1), 5);
  const label = treatmentData.value?.intensity_label || intensityLabels[rating as keyof typeof intensityLabels];

  return { rating, label };
});
</script>

<template>
  <section class="not-prose bg-gradient-to-b from-secondary-200 to-primary-50 py-12 sm:py-16">
    <UContainer v-if="displayTitle">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10 items-start">
          <!-- Title Section -->
          <div class="lg:col-span-2">
            <div class="flex items-center gap-3 mb-6">
            <UIcon v-if="displayIcon" :name="displayIcon" class="w-8 h-8 text-primary-600" aria-hidden="true" />
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900">
              {{ displayTitle }}
            </h1>
          </div>
          <p v-if="displaySubtitle" class="text-xl text-neutral-600 leading-relaxed">
            {{ displaySubtitle }}
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
  </section>
</template>
