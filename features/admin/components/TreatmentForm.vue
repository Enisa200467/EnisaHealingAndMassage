<script setup lang="ts">
import type { TreatmentFormData } from '../types/treatment.types';
import {
  TREATMENT_CATEGORIES,
  INTENSITY_LEVELS,
  COMMON_ICONS,
} from '../types/treatment.types';

interface Props {
  modelValue: TreatmentFormData;
  loading?: boolean;
}

interface Emits {
  (e: 'update:modelValue', value: TreatmentFormData): void;
  (e: 'submit' | 'cancel'): void;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
});

const emit = defineEmits<Emits>();

// Form data reactive reference
const formData = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

// Form validation
const isFormValid = computed(() => {
  return (
    formData.value.name.length >= 2 &&
    formData.value.duration_minutes > 0 &&
    formData.value.price_euros > 0 &&
    formData.value.intensity >= 1 &&
    formData.value.intensity <= 5
  );
});

// Auto-generate intensity label based on intensity level
watch(
  () => formData.value.intensity,
  (newIntensity) => {
    const level = INTENSITY_LEVELS.find((l) => l.value === newIntensity);
    if (level && !formData.value.intensity_label) {
      formData.value.intensity_label = level.label;
    }
  }
);

const handleSubmit = () => {
  if (isFormValid.value) {
    emit('submit');
  }
};
</script>

<template>
  <form class="space-y-6" @submit.prevent="handleSubmit">
    <!-- Basic Information -->
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-neutral-900">Basis Informatie</h3>

      <!-- Name -->
      <UFormField label="Behandelingsnaam" required>
        <UInput
          v-model="formData.name"
          placeholder="Bijv. Klassieke Ontspanningsmassage"
          :disabled="loading"
        />
      </UFormField>

      <!-- Description -->
      <UFormField label="Beschrijving">
        <UTextarea
          v-model="formData.description"
          placeholder="Korte beschrijving van de behandeling..."
          :rows="3"
          :disabled="loading"
        />
      </UFormField>

      <!-- Category -->
      <UFormField label="Categorie">
        <USelect
          v-model="formData.category"
          :items="TREATMENT_CATEGORIES"
          placeholder="Selecteer een categorie"
          :disabled="loading"
        />
      </UFormField>
    </div>

    <!-- Pricing & Duration -->
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-neutral-900">Prijs & Duur</h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Duration -->
        <UFormField label="Duur (minuten)" required>
          <UInput
            v-model.number="formData.duration_minutes"
            type="number"
            min="15"
            max="180"
            step="15"
            placeholder="60"
            :disabled="loading"
          />
        </UFormField>

        <!-- Price -->
        <UFormField label="Prijs (€)" required>
          <UInput
            v-model.number="formData.price_euros"
            type="number"
            min="0"
            step="0.01"
            placeholder="65.00"
            :disabled="loading"
          />
        </UFormField>
      </div>
    </div>

    <!-- Intensity -->
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-neutral-900">Intensiteit</h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Intensity Level -->
        <UFormField label="Intensiteitsniveau" required>
          <USelect
            v-model="formData.intensity"
            :items="INTENSITY_LEVELS"
            placeholder="Selecteer intensiteit"
            :disabled="loading"
          />
        </UFormField>

        <!-- Custom Intensity Label -->
        <UFormField label="Intensiteit label (optioneel)">
          <UInput
            v-model="formData.intensity_label"
            placeholder="Bijv. Zeer Zacht (Energetisch werk)"
            :disabled="loading"
          />
        </UFormField>
      </div>

      <!-- Intensity Preview -->
      <div class="flex items-center space-x-2 text-sm text-neutral-600">
        <span>Preview:</span>
        <div class="flex space-x-1">
          <div
            v-for="i in 5"
            :key="i"
            class="w-2 h-2 rounded-full"
            :class="
              i <= formData.intensity ? 'bg-primary-500' : 'bg-neutral-300'
            "
          />
        </div>
        <span>{{
          formData.intensity_label ||
          INTENSITY_LEVELS.find((l) => l.value === formData.intensity)?.label
        }}</span>
      </div>
    </div>

    <!-- Visual Settings -->
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-neutral-900">
        Visuele Instellingen
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Icon -->
        <UFormField label="Icoon">
          <USelect
            v-model="formData.icon"
            :items="COMMON_ICONS"
            placeholder="Selecteer een icoon"
            :disabled="loading"
          />
        </UFormField>

        <!-- Display Order -->
        <UFormField label="Volgorde">
          <UInput
            v-model.number="formData.display_order"
            type="number"
            min="0"
            placeholder="0"
            :disabled="loading"
          />
          <template #help> Lagere nummers worden eerder weergegeven </template>
        </UFormField>
      </div>
    </div>

    <!-- Status -->
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-neutral-900">Status</h3>

      <UFormField>
        <UCheckbox
          v-model="formData.is_active"
          label="Behandeling is actief"
          :disabled="loading"
        />
        <template #help>
          Alleen actieve behandelingen zijn zichtbaar voor bezoekers
        </template>
      </UFormField>
    </div>

    <!-- Actions -->
    <div class="flex justify-end space-x-3 pt-6 border-t border-neutral-200">
      <UButton
        type="button"
        variant="outline"
        :disabled="loading"
        @click="emit('cancel')"
      >
        Annuleren
      </UButton>

      <UButton
        type="submit"
        :loading="loading"
        :disabled="!isFormValid || loading"
      >
        Opslaan
      </UButton>
    </div>
  </form>
</template>
