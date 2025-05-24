<script setup lang="ts">
interface Props {
  title?: string;
  subtitle?: string;
  duration?: string;
  price?: string;
  intensity?: number;
  intensityLabel?: string;
  icon?: string;
}

const props = defineProps<Props>();

// Intensity labels for each rating
const intensityLabels = {
  1: 'Zeer Zacht',
  2: 'Zacht', 
  3: 'Medium',
  4: 'Stevig',
  5: 'Zeer Stevig'
} as const;

const intensityData = computed(() => {
  if (!props.intensity) return null;
  
  const rating = Math.min(Math.max(props.intensity, 1), 5);
  const label = props.intensityLabel || intensityLabels[rating as keyof typeof intensityLabels];
  
  return { rating, label };
});
</script>

<template>
  <section class="not-prose">
    <UContainer class="py-12 sm:py-16">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
        <!-- Title Section -->
        <div class="lg:col-span-2">
          <div class="flex items-center gap-3 mb-4">
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              {{ title }}
            </h1>
          </div>
          <p v-if="subtitle" class="text-lg sm:text-xl text-gray-600 leading-relaxed">
            {{ subtitle }}
          </p>
        </div>

        <!-- Price Box -->
        <div class="lg:col-span-1">
          <UCard class="shadow-lg border border-primary-100">
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-heroicons-clock" class="w-5 h-5 text-primary-500" />
                <h3 class="font-semibold text-gray-900">Behandelingsdetails</h3>
              </div>
            </template>

            <div class="space-y-3">
              <div v-if="duration" class="flex justify-between items-center">
                <span class="text-gray-600">Duur:</span>
                <span class="font-medium text-gray-900">{{ duration }}</span>
              </div>
              <div v-if="price" class="flex justify-between items-center">
                <span class="text-gray-600">Prijs:</span>
                <span class="font-semibold text-lg text-primary-600">{{ price }}</span>
              </div>
              <div v-if="intensityData" class="space-y-1">
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">Intensiteit:</span>
                  <div class="flex items-center gap-2">
                    <!-- Intensity dots -->
                    <div class="flex items-center gap-1">
                      <div 
                        v-for="dot in 5" 
                        :key="dot"
                        class="w-2 h-2 rounded-full"
                        :class="dot <= intensityData.rating ? 'bg-primary-500' : 'bg-gray-200'"
                      />
                    </div>
                  </div>
                </div>
                <div class="text-right">
                  <span class="text-xs text-gray-500">{{ intensityData.label }}</span>
                </div>
              </div>
            </div>

            <template #footer>
              <UButton 
                color="primary" 
                size="lg" 
                block
                icon="i-heroicons-calendar"
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
