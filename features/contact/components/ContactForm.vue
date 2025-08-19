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
      <UForm
        :state="formData"
        novalidate
        class="space-y-6"
        @submit="handleSubmit"
      >
        <fieldset class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <legend class="sr-only">Persoonlijke gegevens</legend>
          <UFormField name="firstName" label="Voornaam" required>
            <UInput
              v-model="formData.firstName"
              placeholder="Je voornaam"
              icon="i-mdi-account"
              required
            />
          </UFormField>
          <UFormField name="lastName" label="Achternaam" required>
            <UInput
              v-model="formData.lastName"
              placeholder="Je achternaam"
              required
            />
          </UFormField>
        </fieldset>

        <UFormField name="email" label="E-mailadres" required>
          <UInput
            v-model="formData.email"
            type="email"
            placeholder="je@email.nl"
            icon="i-mdi-email"
            required
          />
          <p class="text-xs text-neutral-500 mt-1">
            We gebruiken je e-mailadres alleen om te reageren op je bericht.
          </p>
        </UFormField>

        <UFormField name="phone" label="Telefoonnummer">
          <UInput
            v-model="formData.phone"
            type="tel"
            placeholder="+31 6 12 34 56 78"
            icon="i-mdi-phone"
          />
          <p class="text-xs text-neutral-500 mt-1">
            Optioneel - voor sneller contact.
          </p>
        </UFormField>

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
          />
        </UFormField>

        <UFormField name="message" label="Bericht" required>
          <UTextarea
            v-model="formData.message"
            placeholder="Vertel me waar ik je mee kan helpen..."
            :rows="5"
            required
          />
          <p class="text-xs text-neutral-500 mt-1">
            Beschrijf zo duidelijk mogelijk waar ik je mee kan helpen.
          </p>
        </UFormField>

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
