<script setup lang="ts">
import type { ReviewSubmission } from '../types/reviews';

// Define props
interface Props {
  isSuccess?: boolean;
  isError?: boolean;
  successMessage?: string;
  errorMessage?: string;
}

const props = withDefaults(defineProps<Props>(), {
  isSuccess: false,
  isError: false,
  successMessage: 'Bedankt voor je review! Deze wordt eerst gecontroleerd voordat deze wordt gepubliceerd.',
  errorMessage: 'Er is iets misgegaan bij het versturen. Probeer het later opnieuw.',
});

const emit = defineEmits<{
  submit: [data: ReviewSubmission];
}>();

// Client-side sanitization (defense in depth - server still validates)
const { sanitizeFormData } = useSanitize();

const formData = reactive<ReviewSubmission>({
  name: '',
  email: '',
  rating: 0,
  treatment: '',
  review: '',
});
const { activeTreatments } = useTreatments();

const treatments = computed(() =>
  activeTreatments.value.map((treatment) => treatment.title)
);
const isSubmitting = ref(false);
const submitStatus = ref<'idle' | 'submitting' | 'success' | 'error'>('idle');
const submitMessage = ref('');

// Watch for success/error props from parent
watch(() => props.isSuccess, (newVal) => {
  if (newVal) {
    submitStatus.value = 'success';
    submitMessage.value = props.successMessage;
    isSubmitting.value = false;

    // Reset form on success
    formData.name = '';
    formData.email = '';
    formData.rating = 0;
    formData.treatment = '';
    formData.review = '';
  }
});

watch(() => props.isError, (newVal) => {
  if (newVal) {
    submitStatus.value = 'error';
    submitMessage.value = props.errorMessage;
    isSubmitting.value = false;
  }
});

const onSubmit = async () => {
  isSubmitting.value = true;
  submitStatus.value = 'submitting';
  submitMessage.value = 'Review wordt verzonden...';

  try {
    // Sanitize form data before submission
    const sanitizedData = sanitizeFormData({ ...formData });
    emit('submit', sanitizedData);
  } catch (error) {
    isSubmitting.value = false;
    submitStatus.value = 'error';
    submitMessage.value = 'Er is een fout opgetreden. Probeer het opnieuw.';
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

    <!-- Screen reader status announcements -->
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      class="sr-only"
    >
      {{ submitMessage }}
    </div>

    <!-- Visual success/error feedback -->
    <UAlert
      v-if="submitStatus === 'success'"
      class="mb-6"
      color="green"
      icon="i-mdi-check-circle"
      title="Review verzonden!"
      :description="submitMessage"
      variant="soft"
    />

    <UAlert
      v-if="submitStatus === 'error'"
      class="mb-6"
      color="red"
      icon="i-mdi-alert-circle"
      title="Fout bij verzenden"
      :description="submitMessage"
      variant="soft"
    />

    <USkeleton v-if="isSubmitting" class="h-12 w-12 rounded-full" />
    <form v-else class="space-y-6" @submit.prevent="onSubmit">
      <!-- Personal Information -->
      <fieldset class="border-0 p-0">
        <legend class="sr-only">Persoonlijke gegevens</legend>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <UFormField label="Naam" required>
            <UInput
              v-model="formData.name"
              placeholder="Je naam"
              required
              aria-required="true"
            />
          </UFormField>

          <UFormField label="E-mailadres" required>
            <UInput
              v-model="formData.email"
              type="email"
              placeholder="je@email.nl"
              required
              aria-required="true"
              aria-describedby="email-privacy-note"
            />
          </UFormField>
        </div>
      </fieldset>

      <!-- Rating -->
      <fieldset class="border-0 p-0">
        <legend class="sr-only">Beoordeling</legend>
        <UFormField label="Beoordeling" required class="mb-4">
          <div class="flex items-center gap-4">
            <StarRating
              v-model="formData.rating"
              :editable="true"
              size="lg"
              aria-label="Geef een beoordeling van 1 tot 5 sterren"
            />
            <span
              class="text-sm text-neutral-600"
              aria-live="polite"
              aria-atomic="true"
            >
              {{ formData.rating }} van 5 sterren
            </span>
          </div>
        </UFormField>
      </fieldset>

      <!-- Treatment -->
      <fieldset class="border-0 p-0">
        <legend class="sr-only">Behandelingsinformatie</legend>
        <UFormField
          label="Behandeling"
          description="Welke behandeling heb je ondergaan?"
          class="mb-4"
        >
          <USelectMenu
            v-model="formData.treatment"
            :items="treatments"
            placeholder="Selecteer een behandeling"
            aria-label="Selecteer de behandeling die je hebt ondergaan"
          />
        </UFormField>
      </fieldset>

      <!-- Review Content -->
      <fieldset class="border-0 p-0">
        <legend class="sr-only">Review tekst</legend>
        <UFormField label="Je Review" required class="mb-4">
          <UTextarea
            v-model="formData.review"
            placeholder="Vertel over je ervaring met de behandeling..."
            :rows="6"
            required
            aria-required="true"
            aria-describedby="review-help"
          />
          <template #help>
            <p id="review-help" class="text-sm text-neutral-500">
              Deel je eerlijke ervaring om anderen te helpen bij hun keuze.
            </p>
          </template>
        </UFormField>
      </fieldset>

      <!-- Privacy Notice -->
      <div
        class="bg-blue-50 p-4 rounded-lg"
        role="region"
        aria-labelledby="review-policy-heading"
        id="email-privacy-note"
      >
        <div class="flex items-start gap-3">
          <UIcon
            name="i-mdi-information"
            class="w-5 h-5 text-blue-600 mt-0.5"
            aria-hidden="true"
          />
          <div class="text-sm text-blue-800">
            <p id="review-policy-heading" class="font-medium mb-1">
              Review Beleid
            </p>
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
