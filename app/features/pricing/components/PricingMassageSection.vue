<template>
  <section class="mb-16">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-neutral-900 mb-4">
        Massage Behandelingen
      </h2>
      <p class="text-neutral-600 max-w-2xl mx-auto">
        Professionele massagebehandelingen voor ontspanning, pijnverlichting en
        verbetering van je algemene welzijn.
      </p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-12">
      <UIcon
        name="i-mdi-loading"
        class="w-8 h-8 animate-spin mx-auto mb-4 text-secondary-500"
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
      <UCard
        v-for="treatment in treatments"
        :key="treatment.title"
        class="h-full"
      >
        <template #header>
          <div class="flex justify-between items-start">
            <div>
              <h3 class="text-xl font-semibold text-neutral-900 mb-1">
                {{ treatment.title }}
              </h3>
              <p class="text-sm text-neutral-500">
                {{ treatment.duration }}
              </p>
            </div>
            <div class="text-right">
              <p class="text-2xl font-bold text-secondary-600">
                {{ treatment.price }}
              </p>
            </div>
          </div>
        </template>

        <div class="space-y-4">
          <p class="text-neutral-600">{{ treatment.description }}</p>

          <!-- Intensity -->
          <IntensityIndicator
            :intensity="treatment.intensity"
            :label="treatment.intensityLabel"
            size="md"
          />

          <!-- Benefits -->
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
        </div>

        <template #footer>
          <UButton
            :to="`/boeken?treatment=${treatment.slug}`"
            block
            icon="i-mdi-calendar"
            color="secondary"
          >
            Boek {{ treatment.title }}
          </UButton>
        </template>
      </UCard>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { TreatmentData } from '~/features/treatments/store';

export interface Treatment {
  treatment: TreatmentData;
  benefits: string[];
}

const props = defineProps<{
  massageTreatments: Treatment[];
  loading: boolean;
  error: string | null;
}>();

const treatments = props.massageTreatments.map((t) => ({
  ...t.treatment,
  benefits: t.benefits,
}));
</script>
