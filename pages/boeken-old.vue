<script setup lang="ts">
useSeoMeta({
  title: 'Boek Een Afspraak - Enisa Healing & Massage',
  description:
    'Boek eenvoudig online een afspraak voor massage of healing behandelingen. Kies je gewenste behandeling, datum en tijd. Direct bevestiging per e-mail.',
});

// Reactive form data
const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  treatment: '',
  date: '',
  time: '',
  message: '',
  agreeToTerms: false,
});

// Available treatments for booking
const treatments = [
  { label: 'Chakra Balancering (60 min) - €70', value: 'chakra-balancering' },
  {
    label: 'Energetische Healing Sessie (90 min) - €90',
    value: 'energetische-healing-sessie',
  },
  {
    label: 'Intuitieve Lichaamsmassage (75 min) - €80',
    value: 'intuitieve-lichaamsmassage',
  },
  {
    label: 'Klassieke Ontspanningsmassage (60 min) - €65',
    value: 'klassieke-ontspanningsmassage',
  },
  { label: 'Sportmassage (60 min) - €70', value: 'sportmassage' },
  { label: 'Zweedse Massage (60 min) - €65', value: 'zweedse-massage' },
];

// Available time slots
const timeSlots = [
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
];

// Form submission handler
const isSubmitting = ref(false);

const submitBooking = async () => {
  isSubmitting.value = true;

  try {
    // Here you would normally send the data to your backend
    console.log('Booking submitted:', formData.value);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Show success message (you could use a toast notification here)
    alert(
      'Bedankt! Je afspraak is succesvol ingepland. Je ontvangt binnen 24 uur een bevestiging per e-mail.'
    );

    // Reset form
    Object.keys(formData.value).forEach((key) => {
      if (typeof formData.value[key] === 'boolean') {
        formData.value[key] = false;
      } else {
        formData.value[key] = '';
      }
    });
  } catch (error) {
    console.error('Booking error:', error);
    alert(
      'Er is een fout opgetreden. Probeer het opnieuw of neem contact met ons op.'
    );
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section
      class="bg-gradient-to-br from-primary-50 to-secondary-50 py-16 sm:py-24"
    >
      <UContainer>
        <div class="max-w-4xl mx-auto text-center">
          <h1
            class="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6"
          >
            Boek Een Afspraak
          </h1>
          <p class="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
            Plan eenvoudig je behandeling in. Kies je gewenste behandeling,
            datum en tijd. Je ontvangt binnen 24 uur een bevestiging.
          </p>
        </div>
      </UContainer>
    </section>

    <!-- Main Booking Form -->
    <UContainer class="py-16 sm:py-24">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl font-bold text-neutral-900 mb-8">Afspraak Maken</h2>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <!-- Booking Form -->
          <div class="lg:col-span-2">
            <UCard>
              <UForm
                :state="formData"
                class="space-y-6"
                @submit="submitBooking"
              >
                <!-- Personal Information -->
                <div>
                  <h3 class="text-lg font-semibold text-neutral-900 mb-4">
                    Persoonlijke Gegevens
                  </h3>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <UFormGroup label="Voornaam" required>
                      <UInput
                        v-model="formData.firstName"
                        placeholder="Je voornaam"
                        icon="i-mdi-account"
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

                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <UFormGroup label="E-mailadres" required>
                      <UInput
                        v-model="formData.email"
                        type="email"
                        placeholder="je@email.nl"
                        icon="i-mdi-email"
                        required
                      />
                    </UFormGroup>
                    <UFormGroup label="Telefoonnummer" required>
                      <UInput
                        v-model="formData.phone"
                        type="tel"
                        placeholder="+31 6 12 34 56 78"
                        icon="i-mdi-phone"
                        required
                      />
                    </UFormGroup>
                  </div>
                </div>

                <USeparator />

                <!-- Treatment Selection -->
                <div>
                  <h3 class="text-lg font-semibold text-neutral-900 mb-4">
                    Behandeling Selecteren
                  </h3>
                  <UFormGroup label="Gewenste behandeling" required>
                    <USelect
                      v-model="formData.treatment"
                      :options="treatments"
                      placeholder="Kies een behandeling"
                      required
                    />
                  </UFormGroup>
                </div>

                <USeparator />

                <!-- Date & Time Selection -->
                <div>
                  <h3 class="text-lg font-semibold text-neutral-900 mb-4">
                    Datum & Tijd
                  </h3>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <UFormGroup label="Datum" required>
                      <UInput
                        v-model="formData.date"
                        type="date"
                        icon="i-mdi-calendar"
                        :min="new Date().toISOString().split('T')[0]"
                        required
                      />
                    </UFormGroup>
                    <UFormGroup label="Gewenste tijd" required>
                      <USelect
                        v-model="formData.time"
                        :options="
                          timeSlots.map((time) => ({
                            label: time,
                            value: time,
                          }))
                        "
                        placeholder="Kies een tijd"
                        required
                      />
                    </UFormGroup>
                  </div>
                </div>

                <USeparator />

                <!-- Additional Information -->
                <div>
                  <h3 class="text-lg font-semibold text-neutral-900 mb-4">
                    Aanvullende Informatie
                  </h3>
                  <UFormGroup label="Bijzonderheden of vragen (optioneel)">
                    <UTextarea
                      v-model="formData.message"
                      placeholder="Vertel me over eventuele klachten, allergieën of speciale wensen..."
                      :rows="4"
                    />
                  </UFormGroup>
                </div>

                <!-- Terms Agreement -->
                <div class="flex items-start gap-3">
                  <UCheckbox v-model="formData.agreeToTerms" required />
                  <p class="text-sm text-neutral-600">
                    Ik ga akkoord met de
                    <ULink
                      to="/algemene-voorwaarden"
                      class="text-primary-600 hover:underline"
                    >
                      algemene voorwaarden
                    </ULink>
                    en
                    <ULink
                      to="/privacy"
                      class="text-primary-600 hover:underline"
                    >
                      privacyverklaring </ULink
                    >.
                  </p>
                </div>

                <!-- Submit Button -->
                <UButton
                  type="submit"
                  size="lg"
                  block
                  icon="i-mdi-calendar-check"
                  :loading="isSubmitting"
                  :disabled="!formData.agreeToTerms"
                >
                  {{
                    isSubmitting
                      ? 'Afspraak Wordt Ingepland...'
                      : 'Afspraak Inplannen'
                  }}
                </UButton>
              </UForm>
            </UCard>
          </div>

          <!-- Booking Information Sidebar -->
          <div class="lg:col-span-1">
            <div class="sticky top-8 space-y-6">
              <!-- Contact Information -->
              <UCard>
                <template #header>
                  <h3 class="font-semibold text-neutral-900">Direct Contact</h3>
                </template>
                <div class="space-y-4">
                  <div class="flex items-center gap-3">
                    <UIcon
                      name="i-mdi-phone"
                      class="w-5 h-5 text-primary-500"
                    />
                    <div>
                      <p class="font-medium text-sm">Telefoon</p>
                      <ULink
                        href="tel:+31612345678"
                        class="text-sm text-neutral-600 hover:text-primary-600"
                      >
                        +31 6 12 34 56 78
                      </ULink>
                    </div>
                  </div>
                  <div class="flex items-center gap-3">
                    <UIcon
                      name="i-mdi-whatsapp"
                      class="w-5 h-5 text-green-500"
                    />
                    <div>
                      <p class="font-medium text-sm">WhatsApp</p>
                      <ULink
                        href="https://wa.me/31612345678"
                        target="_blank"
                        class="text-sm text-neutral-600 hover:text-green-600"
                      >
                        Direct bericht
                      </ULink>
                    </div>
                  </div>
                  <div class="flex items-center gap-3">
                    <UIcon
                      name="i-mdi-email"
                      class="w-5 h-5 text-secondary-500"
                    />
                    <div>
                      <p class="font-medium text-sm">E-mail</p>
                      <ULink
                        href="mailto:info@enisahealing.nl"
                        class="text-sm text-neutral-600 hover:text-secondary-600"
                      >
                        info@enisahealing.nl
                      </ULink>
                    </div>
                  </div>
                </div>
              </UCard>

              <!-- Opening Hours -->
              <UCard>
                <template #header>
                  <h3 class="font-semibold text-neutral-900">Openingstijden</h3>
                </template>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-neutral-600">Maandag - Vrijdag</span>
                    <span class="font-medium">9:00 - 18:00</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-neutral-600">Zaterdag</span>
                    <span class="font-medium">9:00 - 16:00</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-neutral-600">Zondag</span>
                    <span class="font-medium text-red-500">Gesloten</span>
                  </div>
                </div>
              </UCard>

              <!-- Important Notes -->
              <UCard>
                <template #header>
                  <h3 class="font-semibold text-neutral-900">Belangrijk</h3>
                </template>
                <div class="space-y-3 text-sm text-neutral-600">
                  <div class="flex items-start gap-2">
                    <UIcon
                      name="i-mdi-clock-outline"
                      class="w-4 h-4 text-orange-500 mt-0.5"
                    />
                    <p>Kom 10 minuten voor je afspraak</p>
                  </div>
                  <div class="flex items-start gap-2">
                    <UIcon
                      name="i-mdi-cancel"
                      class="w-4 h-4 text-red-500 mt-0.5"
                    />
                    <p>Afzeggen tot 24u van tevoren gratis</p>
                  </div>
                  <div class="flex items-start gap-2">
                    <UIcon
                      name="i-mdi-shield-check"
                      class="w-4 h-4 text-green-500 mt-0.5"
                    />
                    <p>Alle materialen zijn hygienisch en worden vervangen</p>
                  </div>
                  <div class="flex items-start gap-2">
                    <UIcon
                      name="i-mdi-car"
                      class="w-4 h-4 text-blue-500 mt-0.5"
                    />
                    <p>Gratis parkeren voor de deur</p>
                  </div>
                </div>
              </UCard>

              <!-- Quick Links -->
              <UCard>
                <template #header>
                  <h3 class="font-semibold text-neutral-900">Handige Links</h3>
                </template>
                <div class="space-y-2">
                  <UButton
                    to="/tarieven"
                    variant="ghost"
                    icon="i-mdi-currency-eur"
                    block
                    justify="start"
                    size="sm"
                  >
                    Bekijk Tarieven
                  </UButton>
                  <UButton
                    to="/faq"
                    variant="ghost"
                    icon="i-mdi-help-circle"
                    block
                    justify="start"
                    size="sm"
                  >
                    Veelgestelde Vragen
                  </UButton>
                  <UButton
                    to="/contact"
                    variant="ghost"
                    icon="i-mdi-map-marker"
                    block
                    justify="start"
                    size="sm"
                  >
                    Routebeschrijving
                  </UButton>
                </div>
              </UCard>
            </div>
          </div>
        </div>
      </div>
    </UContainer>

    <!-- Alternative Booking Methods -->
    <section class="bg-neutral-50 py-16 sm:py-24">
      <UContainer>
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl font-bold text-neutral-900 mb-8">
            Andere Manieren om te Boeken
          </h2>
          <p class="text-neutral-600 mb-12">
            Liever persoonlijk contact? Je kunt ook op andere manieren een
            afspraak maken.
          </p>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Phone Booking -->
            <UCard>
              <div class="text-center">
                <div
                  class="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <UIcon name="i-mdi-phone" class="w-8 h-8 text-primary-600" />
                </div>
                <h3 class="font-semibold text-neutral-900 mb-2">Bellen</h3>
                <p class="text-neutral-600 text-sm mb-4">
                  Direct contact voor vragen en afspraken
                </p>
                <UButton href="tel:+31612345678" icon="i-mdi-phone" size="sm">
                  +31 6 12 34 56 78
                </UButton>
              </div>
            </UCard>

            <!-- WhatsApp Booking -->
            <UCard>
              <div class="text-center">
                <div
                  class="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <UIcon name="i-mdi-whatsapp" class="w-8 h-8 text-green-600" />
                </div>
                <h3 class="font-semibold text-neutral-900 mb-2">WhatsApp</h3>
                <p class="text-neutral-600 text-sm mb-4">
                  Snelle reactie via berichtjes
                </p>
                <UButton
                  href="https://wa.me/31612345678"
                  target="_blank"
                  icon="i-mdi-whatsapp"
                  color="green"
                  size="sm"
                >
                  Start Chat
                </UButton>
              </div>
            </UCard>

            <!-- Email Booking -->
            <UCard>
              <div class="text-center">
                <div
                  class="bg-secondary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <UIcon
                    name="i-mdi-email"
                    class="w-8 h-8 text-secondary-600"
                  />
                </div>
                <h3 class="font-semibold text-neutral-900 mb-2">E-mail</h3>
                <p class="text-neutral-600 text-sm mb-4">
                  Uitgebreide informatie mogelijk
                </p>
                <UButton
                  href="mailto:info@enisahealing.nl"
                  icon="i-mdi-email"
                  color="teal"
                  size="sm"
                >
                  Stuur E-mail
                </UButton>
              </div>
            </UCard>
          </div>
        </div>
      </UContainer>
    </section>
  </div>
</template>
