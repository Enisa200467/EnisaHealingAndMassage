<script setup lang="ts">
import { useTreatmentDetailsFormatter } from "~/composables/useTreatmentData";

interface Props {
  // Display data
  duration?: number;
  price?: number;
  discountEnabled?: boolean;
  discountPrice?: number;
  packageEnabled?: boolean;
  packageSessions?: number;
  packagePrice?: number | string;
  shortDescription?: string;
  showLinkButton?: boolean;
  to?: string;
  showBookButton?: boolean;
  size?: "sm" | "md" | "lg";

  // Customization
  title?: string;
  icon?: string;
  bookButtonText?: string;
  bookButtonLink?: string;
  bookButtonColor?: "primary" | "secondary" | "green" | "red" | "orange";
}

const props = withDefaults(defineProps<Props>(), {
  showBookButton: true,
  size: "md",
  title: "",
  icon: "i-mdi-clock-outline",
  bookButtonText: "Afspraak maken",
  bookButtonColor: "primary",
  discountEnabled: false,
  packageEnabled: false,
});

const routes = useRoutes();

// Size-based styling
const sizeClasses = computed(() => {
  switch (props.size) {
    case "sm":
      return {
        text: "text-sm",
        gap: "space-y-2",
        label: "text-xs",
        price: "text-base",
      };
    case "lg":
      return {
        text: "text-base",
        gap: "space-y-4",
        label: "text-sm",
        price: "text-xl",
      };
    default:
      return {
        text: "text-sm",
        gap: "space-y-3",
        label: "text-xs",
        price: "text-lg",
      };
  }
});

const { formatPrice, formatDuration } = useTreatmentDetailsFormatter();
</script>

<template>
  <UCard
    class="shadow-lg border border-primary-200 bg-white h-full"
    :ui="{
      base: 'flex flex-col h-full',
      body: { base: 'flex-1 flex flex-col' },
    }"
    role="region"
    :aria-labelledby="title ? 'treatment-details-title' : undefined"
  >
    <template #header v-if="title">
      <slot name="header">
        <div v-if="title" class="flex items-center gap-2">
          <UIcon
            :name="icon"
            class="w-5 h-5 text-primary-500"
            aria-hidden="true"
          />
          <h2
            id="treatment-details-title"
            class="font-semibold text-neutral-900"
          >
            {{ title }}
          </h2>
        </div>
      </slot>
    </template>

    <!-- Content area with flex-1 to push footer down -->
    <div :class="[sizeClasses.gap, 'flex flex-col flex-1']">
      <div v-if="shortDescription" class="mb-2">
        <p class="text-sm text-gray-600 line-clamp-3">
          {{ shortDescription }}
        </p>
      </div>

      <!-- Price -->
      <div
        v-if="!packageEnabled && price"
        class="flex justify-between items-center"
      >
        <span class="text-neutral-600" :class="sizeClasses.text">Prijs:</span>
        <div
          v-if="discountEnabled && discountPrice"
          class="flex flex-col items-end gap-1"
        >
          <!-- Original priie with strikethrough -->
          <span
            class="font-medium text-neutral-500 line-through"
            :class="sizeClasses.text"
          >
            {{ formatPrice(price) }}
          </span>
          <!-- Discount price in green -->
          <span class="font-bold text-green-600" :class="sizeClasses.price">
            {{ formatPrice(discountPrice) }}
          </span>
        </div>
        <span
          v-else
          class="font-semibold text-primary-600"
          :class="sizeClasses.price"
        >
          {{ formatPrice(price) }}
        </span>
      </div>

      <!-- Package Deal -->
      <div
        v-if="packageEnabled && packageSessions && packagePrice"
        class="mt-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-700"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <UIcon
              name="i-mdi-package-variant"
              class="w-4 h-4 text-purple-600 dark:text-purple-400"
            />
            <span
              class="font-semibold text-purple-900 dark:text-purple-100"
              :class="sizeClasses.text"
            >
              Pakket
            </span>
          </div>
        </div>
        <div class="mt-2 flex items-baseline justify-between">
          <span
            class="text-purple-800 dark:text-purple-200"
            :class="sizeClasses.text"
          >
            {{ packageSessions }} sessies
          </span>
          <span
            class="font-bold text-purple-600 dark:text-purple-400"
            :class="sizeClasses.price"
          >
            {{ formatPrice(packagePrice) }}
          </span>
        </div>
      </div>

      <!-- Duration -->
      <div v-if="duration" class="flex justify-between items-center">
        <span class="text-neutral-600" :class="sizeClasses.text">Duur:</span>
        <span class="font-medium text-neutral-900" :class="sizeClasses.text">
          {{ formatDuration(duration) }}
          {{ packageEnabled ? "per sessie" : "" }}
        </span>
      </div>

      <!-- Spacer to push slot content to bottom -->
      <div class="flex-1"></div>

      <!-- Custom content slot (e.g., benefits list) -->
      <div v-if="$slots.default" class="pt-4">
        <slot />
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
          v-if="showBookButton"
          :color="bookButtonColor"
          size="lg"
          block
          :to="bookButtonLink || routes.pages.booking"
          icon="i-mdi-calendar"
          aria-label="Boek een afspraak voor deze behandeling"
        >
          {{ bookButtonText }}
        </UButton>
      </div>
    </template>
  </UCard>
</template>
