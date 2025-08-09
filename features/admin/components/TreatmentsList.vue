<script setup lang="ts">
import type { Treatment } from '../types/treatment.types';

interface Props {
  treatments: ReadonlyArray<Treatment>;
  loading?: boolean;
}

interface Emits {
  (e: 'edit' | 'delete' | 'toggle-status', treatment: Treatment): void;
  (e: 'create'): void;
}

withDefaults(defineProps<Props>(), {
  loading: false,
});

const emit = defineEmits<Emits>();

// Get dynamic routes
const routes = useRoutes();

// Format price for display
const formatPrice = (priceCents: number): string => {
  return `€ ${(priceCents / 100).toFixed(2)}`;
};

// Format duration for display
const formatDuration = (minutes: number): string => {
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) {
      return `${hours}h`;
    }
    return `${hours}h ${remainingMinutes}min`;
  }
  return `${minutes}min`;
};

// Render intensity dots
const getIntensityDots = (intensity?: number | null): number => {
  return intensity || 1;
};

// Get category color
const getCategoryColor = (category?: string | null) => {
  switch (category) {
    case 'massage':
      return 'primary';
    case 'healing':
      return 'secondary';
    default:
      return 'neutral';
  }
};
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h2 class="text-2xl font-bold text-neutral-900">
          Behandelingen Beheer
        </h2>
        <p class="text-neutral-600 mt-1">
          Beheer alle beschikbare behandelingen en hun details.
        </p>
      </div>

      <div class="flex items-center gap-3">
        <UButton
          :to="routes.admin.docs"
          variant="ghost"
          icon="i-mdi-help-circle"
          size="sm"
          aria-label="Open documentatie"
        >
          Hulp
        </UButton>

        <UButton icon="i-mdi-plus" :disabled="loading" @click="emit('create')">
          Nieuwe Behandeling
        </UButton>
      </div>
    </div>

    <!-- Statistics -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <UCard class="p-4">
        <div class="flex items-center space-x-3">
          <div class="p-2 bg-primary-100 rounded-lg">
            <UIcon
              name="i-mdi-format-list-numbered"
              class="w-5 h-5 text-primary-600"
            />
          </div>
          <div>
            <p class="text-sm text-neutral-600">Totaal</p>
            <p class="text-2xl font-bold text-neutral-900">
              {{ treatments.length }}
            </p>
          </div>
        </div>
      </UCard>

      <UCard class="p-4">
        <div class="flex items-center space-x-3">
          <div class="p-2 bg-green-100 rounded-lg">
            <UIcon name="i-mdi-check-circle" class="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p class="text-sm text-neutral-600">Actief</p>
            <p class="text-2xl font-bold text-neutral-900">
              {{ treatments.filter((t) => t.is_active).length }}
            </p>
          </div>
        </div>
      </UCard>

      <UCard class="p-4">
        <div class="flex items-center space-x-3">
          <div class="p-2 bg-yellow-100 rounded-lg">
            <UIcon name="i-mdi-pause-circle" class="w-5 h-5 text-yellow-600" />
          </div>
          <div>
            <p class="text-sm text-neutral-600">Inactief</p>
            <p class="text-2xl font-bold text-neutral-900">
              {{ treatments.filter((t) => !t.is_active).length }}
            </p>
          </div>
        </div>
      </UCard>

      <UCard class="p-4">
        <div class="flex items-center space-x-3">
          <div class="p-2 bg-secondary-100 rounded-lg">
            <UIcon
              name="i-mdi-currency-eur"
              class="w-5 h-5 text-secondary-600"
            />
          </div>
          <div>
            <p class="text-sm text-neutral-600">Gem. Prijs</p>
            <p class="text-2xl font-bold text-neutral-900">
              {{
                treatments.length > 0
                  ? formatPrice(
                      Math.round(
                        treatments.reduce((sum, t) => sum + t.price_cents, 0) /
                          treatments.length
                      )
                    )
                  : '€ 0'
              }}
            </p>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Treatments Grid -->
    <div
      v-if="treatments.length > 0"
      class="grid grid-cols-1 lg:grid-cols-2 gap-6"
    >
      <UCard v-for="treatment in treatments" :key="treatment.id" class="p-6">
        <div class="space-y-4">
          <!-- Header -->
          <div class="flex items-start justify-between">
            <div class="flex items-center space-x-3">
              <div
                class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center"
              >
                <UIcon
                  :name="treatment.icon || 'i-mdi-spa'"
                  class="w-5 h-5 text-primary-600"
                />
              </div>
              <div>
                <h3 class="font-semibold text-lg text-neutral-900">
                  {{ treatment.name }}
                </h3>
                <p class="text-sm text-neutral-500">{{ treatment.slug }}</p>
              </div>
            </div>

            <!-- Status Toggle -->
            <USwitch
              :model-value="treatment.is_active"
              :disabled="loading"
              @update:model-value="emit('toggle-status', treatment)"
            />
          </div>

          <!-- Details -->
          <div class="space-y-3">
            <!-- Category -->
            <div class="flex items-center justify-between">
              <span class="text-sm text-neutral-600">Categorie:</span>
              <UBadge
                :label="treatment.category || 'Algemeen'"
                variant="subtle"
                :color="getCategoryColor(treatment.category)"
              />
            </div>

            <!-- Duration & Price -->
            <div class="flex items-center justify-between">
              <span class="text-sm text-neutral-600">Duur:</span>
              <span class="text-sm font-medium">{{
                formatDuration(treatment.duration_minutes)
              }}</span>
            </div>

            <div class="flex items-center justify-between">
              <span class="text-sm text-neutral-600">Prijs:</span>
              <span class="text-sm font-medium">{{
                formatPrice(treatment.price_cents)
              }}</span>
            </div>

            <!-- Intensity -->
            <div class="flex items-center justify-between">
              <span class="text-sm text-neutral-600">Intensiteit:</span>
              <div class="flex items-center space-x-2">
                <div class="flex space-x-1">
                  <div
                    v-for="i in 5"
                    :key="i"
                    class="w-2 h-2 rounded-full"
                    :class="
                      i <= getIntensityDots(treatment.intensity)
                        ? 'bg-primary-500'
                        : 'bg-neutral-300'
                    "
                  />
                </div>
                <span class="text-xs text-neutral-500">{{
                  treatment.intensity_label || ''
                }}</span>
              </div>
            </div>

            <!-- Description -->
            <div
              v-if="treatment.description"
              class="pt-2 border-t border-neutral-200"
            >
              <p class="text-sm text-neutral-600 line-clamp-2">
                {{ treatment.description }}
              </p>
            </div>
          </div>

          <!-- Actions -->
          <div
            class="flex justify-end space-x-2 pt-4 border-t border-neutral-200"
          >
            <UButton
              variant="outline"
              size="sm"
              icon="i-mdi-pencil"
              :disabled="loading"
              @click="emit('edit', treatment)"
            >
              Bewerken
            </UButton>

            <UButton
              variant="outline"
              size="sm"
              icon="i-mdi-delete"
              color="error"
              :disabled="loading"
              @click="emit('delete', treatment)"
            >
              Verwijderen
            </UButton>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Empty State -->
    <UCard v-else class="p-12">
      <div class="text-center">
        <UIcon
          name="i-mdi-format-list-numbered"
          class="w-16 h-16 text-neutral-400 mx-auto mb-4"
        />
        <h3 class="text-lg font-semibold text-neutral-900 mb-2">
          Geen behandelingen gevonden
        </h3>
        <p class="text-neutral-600 mb-6">
          Voeg je eerste behandeling toe om te beginnen.
        </p>
        <UButton icon="i-mdi-plus" :disabled="loading" @click="emit('create')">
          Nieuwe Behandeling
        </UButton>
      </div>
    </UCard>
  </div>
</template>
