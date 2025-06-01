<script setup lang="ts">
import type { ContactFormData } from '../types/contact.types';

// Define emits
interface Emits {
  (e: 'submit', data: ContactFormData): void;
}

const emit = defineEmits<Emits>();

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

const handleSubmit = async () => {
  if (!formData.agreeToTerms) {
    return;
  }

  isSubmitting.value = true;
  try {
    emit('submit', { ...formData });
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div>
    <h2 class="text-3xl font-bold text-neutral-900 mb-8">Stuur een bericht</h2>

    <UCard>
      <UForm novalidate class="space-y-6" @submit="handleSubmit">
        <fieldset class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <legend class="sr-only">Persoonlijke gegevens</legend>
          <UFormField label="Voornaam" required>
            <UInput
              v-model="formData.firstName"
              placeholder="Je voornaam"
              icon="i-mdi-account"
              required
              aria-describedby="firstName-error"
              :invalid="!formData.firstName && isSubmitting"
            />
          </UFormField>
          <UFormField label="Achternaam" required>
            <UInput
              v-model="formData.lastName"
              placeholder="Je achternaam"
              required
              aria-describedby="lastName-error"
              :invalid="!formData.lastName && isSubmitting"
            />
          </UFormField>
        </fieldset>

        <UFormField label="E-mailadres" required>
          <UInput
            v-model="formData.email"
            type="email"
            placeholder="je@email.nl"
            icon="i-mdi-email"
            required
            aria-describedby="email-error email-help"
            :invalid="!formData.email && isSubmitting"
          />
          <p id="email-help" class="text-xs text-neutral-500 mt-1">
            We gebruiken je e-mailadres alleen om te reageren op je bericht.
          </p>
        </UFormField>

        <UFormField label="Telefoonnummer">
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

        <UFormField label="Onderwerp" required>
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
            aria-describedby="subject-error"
            :invalid="!formData.subject && isSubmitting"
          />
        </UFormField>

        <UFormField label="Bericht" required>
          <UTextarea
            v-model="formData.message"
            placeholder="Vertel me waar ik je mee kan helpen..."
            :rows="5"
            required
            aria-describedby="message-error message-help"
            :invalid="!formData.message && isSubmitting"
          />
          <p id="message-help" class="text-xs text-neutral-500 mt-1">
            Beschrijf zo duidelijk mogelijk waar ik je mee kan helpen.
          </p>
        </UFormField>

        <fieldset class="flex items-start gap-3">
          <legend class="sr-only">Privacyverklaring</legend>
          <UCheckbox
            v-model="formData.agreeToTerms"
            required
            aria-describedby="privacy-error"
            :invalid="!formData.agreeToTerms && isSubmitting"
          />
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
        </fieldset>

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
