<script setup lang="ts">
interface TreatmentData {
  id?: string;
  name?: string;
  price_formatted?: string;
  duration_formatted?: string;
  intensity?: number;
  intensity_label?: string;
  icon?: string;
}

interface Props {
  // Content-based props (fallback)
  title?: string;
  subtitle?: string;
  duration?: string;
  price?: string;
  intensity?: number;
  intensityLabel?: string;
  icon?: string;
  // Database-based props (priority)
  treatmentData?: TreatmentData;
}

const props = defineProps<Props>();
const routes = useRoutes();

// Try to inject treatment data from parent component
const injectedTreatmentData = inject<TreatmentData | null>('treatmentData', null);

// Use injected data or props
const treatmentData = computed(() => props.treatmentData || injectedTreatmentData);

// Intensity labels for each rating
const intensityLabels = {
  1: 'Zeer Zacht',
  2: 'Zacht', 
  3: 'Medium',
  4: 'Stevig',
  5: 'Zeer Stevig'
} as const;

// Computed values that prioritize database data over content data
const displayTitle = computed(() => treatmentData.value?.name || props.title);
const displayPrice = computed(() => treatmentData.value?.price_formatted || props.price);
const displayDuration = computed(() => treatmentData.value?.duration_formatted || props.duration);
const displayIcon = computed(() => treatmentData.value?.icon || props.icon);

const intensityData = computed(() => {
  const intensity = treatmentData.value?.intensity ?? props.intensity;
  if (!intensity) return null;
  
  const rating = Math.min(Math.max(intensity, 1), 5);
  const label = treatmentData.value?.intensity_label || props.intensityLabel || intensityLabels[rating as keyof typeof intensityLabels];
  
  return { rating, label };
});
</script>

<template>
  <section class="not-prose bg-gradient-to-br from-primary-50 to-secondary-50 py-16 sm:py-24">
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
          <UCard class="shadow-lg border border-primary-200 bg-white" role="region" aria-labelledby="pricing-info">
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-mdi-clock-outline" class="w-5 h-5 text-primary-500" aria-hidden="true" />
                <h2 id="pricing-info" class="font-semibold text-neutral-900">Behandelingsdetails</h2>
              </div>
            </template>            
            <div class="space-y-4">
              <div v-if="displayDuration" class="flex justify-between items-center">
                <span class="text-neutral-600">Duur:</span>
                <span class="font-medium text-neutral-900">{{ displayDuration }}</span>
              </div>
              <div v-if="displayPrice" class="flex justify-between items-center">
                <span class="text-neutral-600">Prijs:</span>
                <span class="font-semibold text-lg text-primary-600">{{ displayPrice }}</span>
              </div>
              <div v-if="intensityData" class="space-y-2">
                <div class="flex justify-between items-center">
                  <span class="text-neutral-600">Intensiteit:</span>
                  <div class="flex items-center gap-2">
                    <!-- Intensity dots -->
                    <div class="flex items-center gap-1" role="img" :aria-label="`Intensiteit ${intensityData.rating} van 5`">
                      <div 
                        v-for="dot in 5" 
                        :key="dot"
                        class="w-2 h-2 rounded-full"
                        :class="dot <= intensityData.rating ? 'bg-primary-500' : 'bg-neutral-200'"
                        :aria-hidden="true"
                      />
                    </div>
                  </div>
                </div>
                <div class="text-right">
                  <span class="text-xs text-neutral-500">{{ intensityData.label }}</span>
                </div>
              </div>
            </div>

            <template #footer>
              <UButton 
                color="primary" 
                size="lg" 
                block
                :to="routes.pages.booking"
                icon="i-mdi-calendar"
                aria-label="Boek een afspraak voor deze behandeling"
              >
                Afspraak maken
              </UButton>
            </template>
          </UCard>
        </div>
      </div>
    </UContainer>
  </section>
</template>
