<script setup lang="ts">
import type { ContactFormData } from '../types/contact.types'

// Define emits
interface Emits {
  (e: 'submit', data: ContactFormData): void
}

const emit = defineEmits<Emits>()

// Form state
const formData = reactive<ContactFormData>({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  agreeToTerms: false,
})

const isSubmitting = ref(false)

const handleSubmit = async () => {
  if (!formData.agreeToTerms) {
    return
  }
  
  isSubmitting.value = true
  try {
    emit('submit', { ...formData })
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div>
    <h2 class="text-3xl font-bold text-neutral-900 mb-8">
      Stuur een bericht
    </h2>

    <UCard>
      <UForm class="space-y-6" @submit="handleSubmit">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <UFormField label="Voornaam" required>
            <UInput v-model="formData.firstName" placeholder="Je voornaam" icon="i-mdi-account" />
          </UFormField>
          <UFormField label="Achternaam" required>
            <UInput v-model="formData.lastName" placeholder="Je achternaam" />
          </UFormField>
        </div>

        <UFormField label="E-mailadres" required>
          <UInput
            v-model="formData.email"
            type="email"
            placeholder="je@email.nl"
            icon="i-mdi-email"
          />
        </UFormField>

        <UFormField label="Telefoonnummer">
          <UInput
            v-model="formData.phone"
            type="tel"
            placeholder="+31 6 12 34 56 78"
            icon="i-mdi-phone"
          />
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
          />
        </UFormField>

        <UFormField label="Bericht" required>
          <UTextarea
            v-model="formData.message"
            placeholder="Vertel me waar ik je mee kan helpen..."
            :rows="5"
          />
        </UFormField>

        <div class="flex items-start gap-3">
          <UCheckbox v-model="formData.agreeToTerms" />
          <p class="text-sm text-neutral-600">
            Ik ga akkoord met de
            <ULink to="/privacy" class="text-primary-600 hover:underline">
              privacyverklaring
            </ULink>
            en geef toestemming voor het verwerken van mijn gegevens.
          </p>
        </div>

        <UButton 
          type="submit" 
          size="lg" 
          block 
          icon="i-mdi-send"
          :loading="isSubmitting"
          :disabled="!formData.agreeToTerms"
        >
          Verstuur Bericht
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
    />
  </div>
</template>
