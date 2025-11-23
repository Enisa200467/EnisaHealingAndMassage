<script setup lang="ts">
import type { TreatmentFormData } from '../types/treatment.types';
import {
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
  const baseValid =
    formData.value.name.length >= 2 &&
    formData.value.duration_minutes > 0 &&
    formData.value.price_euros > 0;

  // If discount is enabled, validate discount price
  if (formData.value.discount_enabled) {
    const discountValid =
      formData.value.discount_price_euros > 0 &&
      formData.value.discount_price_euros < formData.value.price_euros;
    if (!discountValid) return false;
  }

  // If package is enabled, validate package fields
  if (formData.value.package_enabled) {
    const packageValid =
      formData.value.package_sessions > 1 &&
      formData.value.package_price_euros > 0 &&
      formData.value.package_price_euros < formData.value.price_euros * formData.value.package_sessions;
    if (!packageValid) return false;
  }

  return baseValid;
});

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

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <UFormField label="Behandelingsnaam" required>
          <UInput
            class="w-2/3"
            v-model="formData.name"
            placeholder="Bijv. Klassieke Ontspanningsmassage"
            :disabled="loading"
          />
        </UFormField>

        <!-- Description -->
        <UFormField label="Beschrijving">
          <UTextarea
            class="w-2/3"
            v-model="formData.description"
            placeholder="Korte beschrijving van de behandeling..."
            :rows="3"
            :disabled="loading"
          />
        </UFormField>
      </div>
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

      <!-- Discount Section -->
      <div class="space-y-4">
        <UFormField>
          <UCheckbox
            v-model="formData.discount_enabled"
            label="Korting ingeschakeld"
            :disabled="loading"
          />
          <template #help>
            Toon een kortingsprijs voor deze behandeling
          </template>
        </UFormField>

        <!-- Discount Price (only shown when discount is enabled) -->
        <UFormField
          v-if="formData.discount_enabled"
          label="Kortingsprijs (€)"
          required
        >
          <UInput
            v-model.number="formData.discount_price_euros"
            type="number"
            min="0"
            step="0.01"
            placeholder="55.00"
            :disabled="loading"
          />
          <template #help>
            Moet lager zijn dan de originele prijs
          </template>
        </UFormField>
      </div>

      <!-- Package Section -->
      <div class="space-y-4">
        <UFormField>
          <UCheckbox
            v-model="formData.package_enabled"
            label="Pakketaanbieding ingeschakeld"
            :disabled="loading"
          />
          <template #help>
            Bied deze behandeling aan als pakket van meerdere sessies
          </template>
        </UFormField>

        <div
          v-if="formData.package_enabled"
          class="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <!-- Package Sessions -->
          <UFormField label="Aantal sessies" required>
            <UInput
              v-model.number="formData.package_sessions"
              type="number"
              min="2"
              step="1"
              placeholder="5"
              :disabled="loading"
            />
            <template #help> Minimaal 2 sessies </template>
          </UFormField>

          <!-- Package Price -->
          <UFormField label="Pakketprijs (€)" required>
            <UInput
              v-model.number="formData.package_price_euros"
              type="number"
              min="0"
              step="0.01"
              placeholder="250.00"
              :disabled="loading"
            />
            <template #help>
              Moet lager zijn dan {{ formData.package_sessions }}x de losse prijs
            </template>
          </UFormField>
        </div>
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

          <UIcon :name="formData.icon" class="ml-2" />
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
