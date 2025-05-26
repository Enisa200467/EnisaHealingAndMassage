<script setup lang="ts">
import type { BookingFormData } from '../types/booking.types'

const emit = defineEmits<{
  submit: [data: BookingFormData]
}>()

const formData = reactive<BookingFormData>({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  treatment: '',
  preferredDate: '',
  preferredTime: '',
  message: ''
})

const treatments = [
  { value: 'chakra-balancering', label: 'Chakra Balancering' },
  { value: 'energetische-healing-sessie', label: 'Energetische Healing Sessie' },
  { value: 'intuitieve-lichaamsmassage', label: 'Intuitieve Lichaamsmassage' },
  { value: 'klassieke-ontspanningsmassage', label: 'Klassieke Ontspanningsmassage' },
  { value: 'sportmassage', label: 'Sportmassage' },
  { value: 'zweedse-massage', label: 'Zweedse Massage' }
]

const timeSlots = [
  { value: '09:00', label: '09:00' },
  { value: '10:00', label: '10:00' },
  { value: '11:00', label: '11:00' },
  { value: '14:00', label: '14:00' },
  { value: '15:00', label: '15:00' },
  { value: '16:00', label: '16:00' }
]

const isSubmitting = ref(false)

const onSubmit = async () => {
  isSubmitting.value = true
  try {
    emit('submit', formData)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <UCard class="max-w-2xl mx-auto">
    <template #header>
      <div class="flex items-center gap-3">
        <UIcon name="i-mdi-calendar-check" class="w-6 h-6 text-primary-500" />
        <h2 class="text-2xl font-bold">Boek je Afspraak</h2>
      </div>
    </template>

    <form @submit.prevent="onSubmit" class="space-y-6">
      <!-- Personal Information -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <UFormGroup label="Voornaam" required>
          <UInput 
            v-model="formData.firstName" 
            placeholder="Je voornaam"
            required
          />
        </UFormGroup>
        
        <UFormGroup label="Achternaam" required>
          <UInput 
            v-model="formData.lastName" 
            placeholder="Je achternaam"
            required
          />
        </UFormGroup>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <UFormGroup label="E-mailadres" required>
          <UInput 
            v-model="formData.email" 
            type="email"
            placeholder="je@email.nl"
            required
          />
        </UFormGroup>
        
        <UFormGroup label="Telefoonnummer" required>
          <UInput 
            v-model="formData.phone" 
            type="tel"
            placeholder="+31 6 12 34 56 78"
            required
          />
        </UFormGroup>
      </div>

      <!-- Treatment Selection -->
      <UFormGroup label="Gewenste Behandeling" required>
        <USelectMenu 
          v-model="formData.treatment"
          :options="treatments"
          placeholder="Selecteer een behandeling"
          required
        />
      </UFormGroup>

      <!-- Date and Time -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <UFormGroup label="Gewenste Datum" required>
          <UInput 
            v-model="formData.preferredDate"
            type="date"
            :min="new Date().toISOString().split('T')[0]"
            required
          />
        </UFormGroup>
        
        <UFormGroup label="Gewenste Tijd" required>
          <USelectMenu 
            v-model="formData.preferredTime"
            :options="timeSlots"
            placeholder="Selecteer een tijd"
            required
          />
        </UFormGroup>
      </div>

      <!-- Additional Message -->
      <UFormGroup label="Aanvullende Informatie" description="Eventuele bijzonderheden of vragen">
        <UTextarea 
          v-model="formData.message"
          placeholder="Vertel ons over eventuele klachten, wensen of vragen..."
          :rows="4"
        />
      </UFormGroup>

      <!-- Privacy Notice -->
      <div class="bg-neutral-50 p-4 rounded-lg">
        <p class="text-sm text-neutral-600">
          <UIcon name="i-mdi-shield-check" class="w-4 h-4 text-green-500 inline mr-1" />
          Je gegevens worden vertrouwelijk behandeld en alleen gebruikt voor het verwerken van je afspraak.
        </p>
      </div>
    </form>

    <template #footer>
      <div class="flex justify-end gap-3">
        <UButton variant="outline" type="button">
          Annuleren
        </UButton>
        <UButton 
          type="submit" 
          :loading="isSubmitting"
          @click="onSubmit"
        >
          Afspraak Aanvragen
        </UButton>
      </div>
    </template>
  </UCard>
</template>
