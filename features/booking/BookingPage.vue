<script setup lang="ts">
import { useBooking } from './composables/useBooking';

useSeoMeta({
  title: 'Boek Een Afspraak - Enisa Healing & Massage',
  description:
    'Boek eenvoudig online een afspraak voor massage of healing behandelingen. Kies je gewenste behandeling, datum en tijd. Direct bevestiging per e-mail.',
});

const { submitBooking } = useBooking();

const handleBookingSubmission = async (bookingData: any) => {
  const result = await submitBooking(bookingData);
  return result;
};
</script>

<template>
  <div>
    <BookingHero />

    <UContainer class="py-16 sm:py-24">
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <!-- Booking Form -->
          <div class="lg:col-span-2">
            <BookingForm @submit="handleBookingSubmission" />
          </div>

          <!-- Booking Info -->
          <div class="lg:col-span-1">
            <BookingInfo />
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>
