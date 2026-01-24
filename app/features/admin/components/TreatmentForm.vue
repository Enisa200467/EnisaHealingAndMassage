<script setup lang="ts">
import type { TreatmentFormData, TreatmentTrajectFormData } from "../types/treatment.types";
import { COMMON_ICONS } from "../types/treatment.types";

interface Props {
  modelValue: TreatmentFormData;
  loading?: boolean;
}

interface Emits {
  (e: "update:modelValue", value: TreatmentFormData): void;
  (e: "submit" | "cancel"): void;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
});

const emit = defineEmits<Emits>();

const formData = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const addTraject = () => {
  const updated = {
    ...formData.value,
    trajects: [
      ...formData.value.trajects,
      { sessions: 2, price_euros: 0, is_active: true },
    ],
  };
  emit("update:modelValue", updated);
};

const updateTraject = (
  index: number,
  updates: Partial<TreatmentTrajectFormData>
) => {
  const updatedTrajects = formData.value.trajects.map((traject, trajectIndex) =>
    trajectIndex === index ? { ...traject, ...updates } : traject
  );

  emit("update:modelValue", {
    ...formData.value,
    trajects: updatedTrajects,
  });
};

const removeTraject = (index: number) => {
  const updatedTrajects = formData.value.trajects.filter(
    (_, trajectIndex) => trajectIndex !== index
  );

  emit("update:modelValue", {
    ...formData.value,
    trajects: updatedTrajects,
  });
};



// Form validation
const isFormValid = computed(() => {
  const baseValid =
    formData.value.name.length >= 2 &&
    formData.value.duration_minutes > 0 &&
    (formData.value.price_euros > 0 || formData.value.trajects.length > 0);

  // If discount is enabled, validate discount price
  if (formData.value.discount_enabled) {
    const discountValid =
      formData.value.discount_price_euros > 0 &&
      formData.value.discount_price_euros < formData.value.price_euros;
    if (!discountValid) return false;
  }

  const trajectsValid = formData.value.trajects.every((traject) => {
    if (traject.sessions < 1 || traject.price_euros <= 0) return false;
    return true;
  });

  if (!trajectsValid) return false;

  return baseValid;
});

const handleSubmit = () => {
  if (isFormValid.value) {
    emit("submit");
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

      <!-- Content Info Alert -->
      <UAlert
        color="blue"
        variant="subtle"
        icon="i-mdi-information"
        title="Content beheren via Nuxt Studio"
      >
        <template #description>
          Beschrijving wordt beheerd in het markdown bestand via
          <a
            href="https://nuxt.studio"
            target="_blank"
            class="underline font-medium"
            >Nuxt Studio</a
          >. Zie de documentatie voor meer informatie.
        </template>
      </UAlert>
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
            placeholder="60"
            :disabled="loading"
          />
        </UFormField>

        <!-- Price -->
        <UFormField label="Prijs (€)" :required="formData.trajects.length === 0">
          <UInput
            v-model.number="formData.price_euros"
            type="number"
            min="0"
            step="0.01"
            placeholder="65.00"
            :disabled="loading"
          />
          <template #help>
            Laat leeg als deze behandeling alleen als traject wordt aangeboden
          </template>
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
          <template #help> Moet lager zijn dan de originele prijs </template>
        </UFormField>
      </div>

      <!-- Traject Section -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h4 class="text-base font-semibold text-neutral-900">Trajecten</h4>
            <p class="text-sm text-neutral-600">
              Voeg trajecten toe met sessies en prijs per traject.
            </p>
          </div>
          <UButton
            size="sm"
            icon="i-mdi-plus"
            variant="outline"
            :disabled="loading"
            @click="addTraject"
          >
            Traject toevoegen
          </UButton>
        </div>

        <div v-if="formData.trajects.length === 0" class="text-sm text-neutral-500">
          Nog geen trajecten toegevoegd.
        </div>

        <div v-else class="space-y-4">
          <UCard
            v-for="(traject, index) in formData.trajects"
            :key="traject.id || index"
            class="p-4"
          >
            <div class="flex flex-col gap-4">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <h5 class="font-semibold text-neutral-900">
                    Traject {{ index + 1 }}
                  </h5>
                  <p v-if="traject.id" class="text-xs text-neutral-500 mt-1">
                    ID: {{ traject.id }}
                  </p>
                  <p v-else class="text-xs text-neutral-400 mt-1">
                    ID wordt aangemaakt na opslaan
                  </p>
                </div>
                <UButton
                  size="xs"
                  color="error"
                  variant="outline"
                  icon="i-mdi-delete"
                  :disabled="loading"
                  @click="removeTraject(index)"
                >
                  Verwijderen
                </UButton>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <UFormField label="Aantal sessies" required>
                  <UInput
                    :model-value="traject.sessions"
                    type="number"
                    min="1"
                    step="1"
                    placeholder="3"
                    :disabled="loading"
                    @update:model-value="(value) => updateTraject(index, { sessions: Number(value) })"
                  />
                </UFormField>

                <UFormField label="Trajectprijs (€)" required>
                  <UInput
                    :model-value="traject.price_euros"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="345.00"
                    :disabled="loading"
                    @update:model-value="(value) => updateTraject(index, { price_euros: Number(value) })"
                  />
                  <template #help>
                    Geef de prijs voor het volledige traject op
                  </template>
                </UFormField>
              </div>

              <UFormField>
                <UCheckbox
                  :model-value="traject.is_active"
                  label="Traject is actief"
                  :disabled="loading"
                  @update:model-value="(value) => updateTraject(index, { is_active: Boolean(value) })"
                />
              </UFormField>
            </div>
          </UCard>
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
