<script setup lang="ts">
import { useTreatmentStore } from '~/features/treatments/store';
import type { ReviewSubmission } from '../types/reviews';

const emit = defineEmits<{
  submit: [data: ReviewSubmission];
}>();

const formData = reactive<ReviewSubmission>({
  name: '',
  email: '',
  rating: 0,
  treatment: '',
  review: '',
});
const { treatments: treatmentsData } = useTreatmentStore();

const treatments = computed(() =>
  treatmentsData.map((treatment) => treatment.name)
);
const isSubmitting = ref(false);

const onSubmit = async () => {
  isSubmitting.value = true;
  try {
    emit('submit', formData);

    // Reset form after submission
    formData.name = '';
    formData.email = '';
    formData.rating = 5;
    formData.treatment = '';
    formData.review = '';
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex items-center gap-3">
        <UIcon name="i-mdi-star" class="w-6 h-6 text-yellow-500" />
        <h2 class="text-xl font-bold">Deel je Ervaring</h2>
      </div>
    </template>

    <USkeleton v-if="isSubmitting" class="h-12 w-12 rounded-full" />
    <form v-else class="space-y-6" @submit.prevent="onSubmit">
      <!-- Personal Information -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <UFormField label="Naam" required>
          <UInput v-model="formData.name" placeholder="Je naam" required />
        </UFormField>

        <UFormField label="E-mailadres" required>
          <UInput
            v-model="formData.email"
            type="email"
            placeholder="je@email.nl"
            required
          />
        </UFormField>
      </div>

      <!-- Rating -->
      <UFormField label="Beoordeling" required class="mb-4">
        <div class="flex items-center gap-4">
          <StarRating v-model="formData.rating" :editable="true" size="lg" />
          <span class="text-sm text-neutral-600">
            {{ formData.rating }} van 5 sterren
          </span>
        </div>
      </UFormField>

      <!-- Treatment -->
      <UFormField
        label="Behandeling"
        description="Welke behandeling heb je ondergaan?"
        class="mb-4"
      >
        <USelectMenu
          v-model="formData.treatment"
          :items="treatments"
          placeholder="Selecteer een behandeling"
        />
      </UFormField>

      <!-- Review Content -->
      <UFormField label="Je Review" required class="mb-4">
        <UTextarea
          v-model="formData.review"
          placeholder="Vertel over je ervaring met de behandeling..."
          :rows="6"
          required
        />
        <template #help>
          <p class="text-sm text-neutral-500">
            Deel je eerlijke ervaring om anderen te helpen bij hun keuze.
          </p>
        </template>
      </UFormField>

      <!-- Privacy Notice -->
      <div class="bg-blue-50 p-4 rounded-lg">
        <div class="flex items-start gap-3">
          <UIcon
            name="i-mdi-information"
            class="w-5 h-5 text-blue-600 mt-0.5"
          />
          <div class="text-sm text-blue-800">
            <p class="font-medium mb-1">Review Beleid</p>
            <ul class="space-y-1 text-blue-700">
              <li>
                • Je review wordt eerst gecontroleerd voordat deze wordt
                gepubliceerd
              </li>
              <li>
                • We respecteren je privacy en delen geen persoonlijke gegevens
              </li>
              <li>
                • Alleen constructieve en eerlijke reviews worden geplaatst
              </li>
            </ul>
          </div>
        </div>
      </div>
    </form>

    <template #footer>
      <div class="flex justify-end gap-3">
        <UButton variant="outline" type="button"> Annuleren </UButton>
        <UButton type="submit" :loading="isSubmitting" @click="onSubmit">
          Review Versturen
        </UButton>
      </div>
    </template>
  </UCard>
</template>
