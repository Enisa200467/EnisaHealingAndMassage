<script setup lang="ts">
import type { ReviewFormData } from '../types/reviews';

const emit = defineEmits<{
  submit: [data: ReviewFormData];
}>();

const formData = reactive<ReviewFormData>({
  name: '',
  email: '',
  rating: 5,
  treatment: '',
  content: '',
});

const treatments = [
  { value: 'chakra-balancering', label: 'Chakra Balancering' },
  {
    value: 'energetische-healing-sessie',
    label: 'Energetische Healing Sessie',
  },
  { value: 'intuitieve-lichaamsmassage', label: 'Intuitieve Lichaamsmassage' },
  {
    value: 'klassieke-ontspanningsmassage',
    label: 'Klassieke Ontspanningsmassage',
  },
  { value: 'sportmassage', label: 'Sportmassage' },
  { value: 'zweedse-massage', label: 'Zweedse Massage' },
];

const isSubmitting = ref(false);

const onSubmit = async () => {
  isSubmitting.value = true;
  try {
    emit('submit', formData);
    // Reset form after successful submission
    Object.assign(formData, {
      name: '',
      email: '',
      rating: 5,
      treatment: '',
      content: '',
    });
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

    <form class="space-y-6" @submit.prevent="onSubmit">
      <!-- Personal Information -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <UFormGroup label="Naam" required>
          <UInput v-model="formData.name" placeholder="Je naam" required />
        </UFormGroup>

        <UFormGroup label="E-mailadres" required>
          <UInput
            v-model="formData.email"
            type="email"
            placeholder="je@email.nl"
            required
          />
        </UFormGroup>
      </div>

      <!-- Rating -->
      <UFormGroup label="Beoordeling" required>
        <div class="flex items-center gap-4">
          <StarRating v-model="formData.rating" :editable="true" size="lg" />
          <span class="text-sm text-neutral-600">
            {{ formData.rating }} van 5 sterren
          </span>
        </div>
      </UFormGroup>

      <!-- Treatment -->
      <UFormGroup
        label="Behandeling"
        description="Welke behandeling heb je ondergaan?"
      >
        <USelectMenu
          v-model="formData.treatment"
          :options="treatments"
          placeholder="Selecteer een behandeling"
        />
      </UFormGroup>

      <!-- Review Content -->
      <UFormGroup label="Je Review" required>
        <UTextarea
          v-model="formData.content"
          placeholder="Vertel over je ervaring met de behandeling..."
          :rows="6"
          required
        />
        <template #help>
          <p class="text-sm text-neutral-500">
            Deel je eerlijke ervaring om anderen te helpen bij hun keuze.
          </p>
        </template>
      </UFormGroup>

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
