<script setup lang="ts">
import { type Treatment } from '~/features/admin/types/treatment.types';

interface Props {
  // Content-based props (fallback)
  id?: string;
  subtitle?: string;
}

const props = defineProps<Props>();

// Always fetch from database for SEO and consistency
const { data: treatmentData } = await useFetch<Treatment>(
  `/api/treatments/${props.id}`,
  {
    // This will run server-side during SSR, making it SEO-friendly
    server: true,
  }
);

// Computed values that prioritize database data over content data
const displayTitle = computed(() => treatmentData.value?.name);
const displaySubtitle = computed(() => treatmentData.value?.description || props.subtitle);
const displayPrice = computed(() => treatmentData.value?.price_cents);
const displayDuration = computed(() => treatmentData.value?.duration_minutes);
const displayIcon = computed(() => treatmentData.value?.icon);
const displayDiscountEnabled = computed(() => treatmentData.value?.discount_enabled || false);
const displayDiscountPrice = computed(() => treatmentData.value?.discount_price_cents);
const displayPackageEnabled = computed(() => treatmentData.value?.package_enabled || false);
const displayPackageSessions = computed(() => treatmentData.value?.package_sessions);
const displayPackagePrice = computed(() => treatmentData.value?.package_price_cents);
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
            :discount-enabled="displayDiscountEnabled"
            :discount-price="displayDiscountPrice"
            :package-enabled="displayPackageEnabled"
            :package-sessions="displayPackageSessions"
            :package-price="displayPackagePrice"
            show-book-button
          />
        </div>
      </div>
    </UContainer>
  </section>
</template>
