<script setup lang="ts">
interface Props {
  // Display data
  duration?: string;
  price?: string;
  intensity?: number;
  intensityLabel?: string;
  shortDescription?: string;
  showLinkButton?: boolean;
  to?: string;
  showBookButton?: boolean;
  size?: 'sm' | 'md' | 'lg';

  // Customization
  title?: string;
  icon?: string;
}

const props = withDefaults(defineProps<Props>(), {
  showBookButton: true,
  size: 'md',
  title: 'Behandelingsdetails',
  icon: 'i-mdi-clock-outline',
});

const routes = useRoutes();

// Intensity labels for each rating
const intensityLabels = {
  1: 'Zeer Zacht',
  2: 'Zacht',
  3: 'Medium',
  4: 'Stevig',
  5: 'Zeer Stevig',
} as const;

const intensityData = computed(() => {
  if (!props.intensity) return null;

  const rating = Math.min(Math.max(props.intensity, 1), 5);
  const label =
    props.intensityLabel ||
    intensityLabels[rating as keyof typeof intensityLabels];

  return { rating, label };
});

// Size-based styling
const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return {
        text: 'text-sm',
        gap: 'space-y-2',
        label: 'text-xs',
        price: 'text-base',
      };
    case 'lg':
      return {
        text: 'text-base',
        gap: 'space-y-4',
        label: 'text-sm',
        price: 'text-xl',
      };
    default:
      return {
        text: 'text-sm',
        gap: 'space-y-3',
        label: 'text-xs',
        price: 'text-lg',
      };
  }
});
</script>

<template>
  <UCard
    class="shadow-lg border border-primary-200 bg-white"
    role="region"
    :aria-labelledby="title ? 'treatment-details-title' : undefined"
  >
    <template #header>
      <div class="flex items-center gap-2">
        <UIcon
          :name="icon"
          class="w-5 h-5 text-primary-500"
          aria-hidden="true"
        />
        <h2
          v-if="title"
          id="treatment-details-title"
          class="font-semibold text-neutral-900"
        >
          {{ title }}
        </h2>
      </div>
    </template>

    <div :class="sizeClasses.gap">
      <div v-if="shortDescription" class="mb-2">
        <p class="text-sm text-gray-600 line-clamp-3">
          {{ shortDescription }}
        </p>
      </div>

      <!-- Duration -->
      <div v-if="duration" class="flex justify-between items-center">
        <span class="text-neutral-600" :class="sizeClasses.text">Duur:</span>
        <span class="font-medium text-neutral-900" :class="sizeClasses.text">
          {{ duration }}
        </span>
      </div>

      <!-- Price -->
      <div v-if="price" class="flex justify-between items-center">
        <span class="text-neutral-600" :class="sizeClasses.text">Prijs:</span>
        <span class="font-semibold text-primary-600" :class="sizeClasses.price">
          {{ price }}
        </span>
      </div>

      <!-- Intensity -->
      <div v-if="intensityData" class="space-y-2">
        <div class="flex justify-between items-center">
          <span class="text-neutral-600" :class="sizeClasses.text">
            Intensiteit:
          </span>
          <div class="flex items-center gap-2">
            <!-- Intensity dots -->
            <div
              class="flex items-center gap-1"
              role="img"
              :aria-label="`Intensiteit ${intensityData.rating} van 5`"
            >
              <div
                v-for="dot in 5"
                :key="dot"
                class="w-2 h-2 rounded-full"
                :class="
                  dot <= intensityData.rating
                    ? 'bg-primary-500'
                    : 'bg-neutral-200'
                "
                :aria-hidden="true"
              />
            </div>
          </div>
        </div>
        <div class="text-right">
          <span class="text-neutral-500" :class="sizeClasses.label">
            {{ intensityData.label }}
          </span>
        </div>
        <IntensityIndicator
          :intensity="intensityData.rating"
          :label="intensityLabel"
          :size="size"
        />
      </div>
    </div>

    <template v-if="showBookButton || showLinkButton" #footer>
      <div class="flex flex-col md:flex-row gap-4">
        <UButton
          v-if="showLinkButton && to"
          color="primary"
          size="lg"
          block
          variant="outline"
          :to="to"
          icon="i-mdi-information-outline"
          aria-label="Meer informatie over deze behandeling"
        >
          Meer info
        </UButton>
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
      </div>
    </template>
  </UCard>
</template>
