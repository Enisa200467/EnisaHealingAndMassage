<script setup lang="ts">
import type { ContactFormData } from '../types/contact.types';

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
  successMessage: 'Bedankt voor je bericht! We nemen zo snel mogelijk contact met je op.',
  errorMessage: 'Er is iets misgegaan bij het versturen. Probeer het later opnieuw.',
});

// Define emits
interface Emits {
  (e: 'submit', data: ContactFormData): void;
}

const emit = defineEmits<Emits>();

// Client-side sanitization (defense in depth - server still validates)
const { sanitizeFormData } = useSanitize();

// Form state
const formData = reactive<ContactFormData>({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  agreeToTerms: false,
});

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
    Object.assign(formData, {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      agreeToTerms: false,
    });
  }
});

watch(() => props.isError, (newVal) => {
  if (newVal) {
    submitStatus.value = 'error';
    submitMessage.value = props.errorMessage;
    isSubmitting.value = false;
  }
});

const handleSubmit = async () => {
  if (!formData.agreeToTerms) {
    submitMessage.value = 'Je moet akkoord gaan met de privacyverklaring om door te gaan.';
    return;
  }

  isSubmitting.value = true;
  submitStatus.value = 'submitting';
  submitMessage.value = 'Formulier wordt verzonden...';

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
  <div>
    <h2 class="text-3xl font-bold text-neutral-900 mb-8">Stuur een bericht</h2>

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
      title="Bericht verzonden!"
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

    <UCard>
      <UForm
        :state="formData"
        novalidate
        class="space-y-6"
        @submit="handleSubmit"
      >
        <fieldset class="grid grid-cols-1 sm:grid-cols-2 gap-4 border-0 p-0">
          <legend class="sr-only">Persoonlijke gegevens</legend>
          <UFormField name="firstName" label="Voornaam" required>
            <UInput
              v-model="formData.firstName"
              placeholder="Je voornaam"
              icon="i-mdi-account"
              required
              aria-required="true"
            />
          </UFormField>
          <UFormField name="lastName" label="Achternaam" required>
            <UInput
              v-model="formData.lastName"
              placeholder="Je achternaam"
              required
              aria-required="true"
            />
          </UFormField>
        </fieldset>

        <fieldset class="border-0 p-0">
          <legend class="sr-only">Contactinformatie</legend>
          <UFormField name="email" label="E-mailadres" required>
            <UInput
              v-model="formData.email"
              type="email"
              placeholder="je@email.nl"
              icon="i-mdi-email"
              required
              aria-required="true"
              aria-describedby="email-help"
            />
            <p id="email-help" class="text-xs text-neutral-500 mt-1">
              We gebruiken je e-mailadres alleen om te reageren op je bericht.
            </p>
          </UFormField>

          <UFormField name="phone" label="Telefoonnummer" class="mt-6">
            <UInput
              v-model="formData.phone"
              type="tel"
              placeholder="+31 6 12 34 56 78"
              icon="i-mdi-phone"
              aria-describedby="phone-help"
            />
            <p id="phone-help" class="text-xs text-neutral-500 mt-1">
              Optioneel - voor sneller contact.
            </p>
          </UFormField>
        </fieldset>

        <fieldset class="border-0 p-0">
          <legend class="sr-only">Berichtinformatie</legend>
          <UFormField name="subject" label="Onderwerp" required>
            <USelect
              v-model="formData.subject"
              :items="[
                'Algemene vraag',
                'Afspraak maken',
                'Behandeling informatie',
                'Tarieven',
                'Anders',
              ]"
              placeholder="Selecteer een onderwerp"
              required
              aria-required="true"
            />
          </UFormField>

          <UFormField name="message" label="Bericht" required class="mt-6">
            <UTextarea
              v-model="formData.message"
              placeholder="Vertel me waar ik je mee kan helpen..."
              :rows="5"
              required
              aria-required="true"
              aria-describedby="message-help"
            />
            <p id="message-help" class="text-xs text-neutral-500 mt-1">
              Beschrijf zo duidelijk mogelijk waar ik je mee kan helpen.
            </p>
          </UFormField>
        </fieldset>

        <UFormField name="agreeToTerms">
          <div class="flex items-start gap-3">
            <UCheckbox v-model="formData.agreeToTerms" required />
            <p class="text-sm text-neutral-600">
              Ik ga akkoord met de
              <ULink
                to="/privacy"
                class="text-primary-600 hover:underline"
                aria-label="Lees de privacyverklaring (opent in nieuw tabblad)"
                target="_blank"
                rel="noopener noreferrer"
              >
                privacyverklaring
              </ULink>
              en geef toestemming voor het verwerken van mijn gegevens.
            </p>
          </div>
        </UFormField>

        <UButton
          type="submit"
          size="lg"
          block
          icon="i-mdi-send"
          :loading="isSubmitting"
          :disabled="!formData.agreeToTerms"
          :aria-label="
            isSubmitting ? 'Bericht wordt verzonden...' : 'Verstuur bericht'
          "
        >
          {{ isSubmitting ? 'Verzenden...' : 'Verstuur Bericht' }}
        </UButton>
      </UForm>
    </UCard>

    <!-- Contact Info -->
    <UAlert
      class="mt-6"
      icon="i-mdi-information-outline"
      color="primary"
      variant="subtle"
      title="Reactietijd"
      description="Ik reageer meestal binnen 24 uur op berichten. Voor urgente vragen kun je beter bellen of WhatsApp gebruiken."
      role="note"
      aria-label="Informatie over reactietijd"
    />
  </div>
</template>
