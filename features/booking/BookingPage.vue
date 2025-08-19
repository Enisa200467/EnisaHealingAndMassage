<script setup lang="ts">
// Extend Window interface to include setmore
declare global {
  interface Window {
    setmore?: {
      init: () => void;
    };
  }
}

useSeoMeta({
  title: 'Boek Een Afspraak - Enisa Healing & Massage',
  description:
    'Boek eenvoudig online een afspraak voor massage of healing behandelingen. Kies je gewenste behandeling, datum en tijd. Direct bevestiging per e-mail.',
  ogTitle: 'Boek Een Afspraak - Enisa Healing & Massage',
  ogDescription:
    'Plan direct je behandeling online. Kies uit healing sessies, massages en ontspanningsbehandelingen.',
  twitterTitle: 'Boek Een Afspraak - Enisa Healing & Massage',
  twitterDescription:
    'Plan direct je behandeling online. Kies uit healing sessies, massages en ontspanningsbehandelingen.',
});
</script>

<template>
  <article>
    <BookingHero />

    <section class="py-16 sm:py-24 bg-purple-50">
      <UContainer>
        <div class="max-w-4xl mx-auto">
          <header class="text-center mb-12">
            <h1 class="text-3xl font-bold text-neutral-900 mb-4">
              Kies je gewenste behandeling en tijd
            </h1>
            <p class="text-lg text-neutral-600 max-w-2xl mx-auto">
              Gebruik onze online agenda om direct een afspraak in te plannen.
              Selecteer je behandeling, kies een beschikbare tijd en ontvang
              direct een bevestiging.
            </p>
          </header>

          <!-- Setmore Booking Integration -->
          <div class="bg-white rounded-2xl shadow-xl p-8 sm:p-12">
            <div class="text-center mb-8">
              <UButton
                id="Setmore_button_iframe"
                as="a"
                href="https://enisahealingmassage.setmore.com"
                class="setmore-booking-button"
                color="primary"
                variant="solid"
                size="xl"
                icon="i-mdi-calendar-heart"
                aria-label="Open boekingsagenda - plan uw afspraak voor massage of healing behandeling"
              >
                Open Agenda & Boek Afspraak
              </UButton>
            </div>

            <div class="border-t pt-8">
              <BookingInfo />
            </div>
          </div>
        </div>
      </UContainer>
    </section>
  </article>
</template>

<style scoped>
.setmore-booking-button {
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  min-width: 280px;
}

.setmore-booking-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 35px -3px rgba(0, 0, 0, 0.15),
    0 8px 10px -2px rgba(0, 0, 0, 0.1);
}

/* Mobile responsiveness */
@media screen and (max-width: 640px) {
  .setmore-booking-button {
    min-width: 250px;
  }
}
</style>

<style>
/* Global styles for Setmore iframe styling */
#setmore-fancy-box,
#setmore-fancy-box-content,
#iframeContent,
iframe {
  border-radius: 12px !important;
}

/* Ensure the iframe modal has proper styling */
#setmore-fancy-box {
  z-index: 10000 !important;
}

#setmore-fancy-box-content {
  background: white !important;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
}
</style>
