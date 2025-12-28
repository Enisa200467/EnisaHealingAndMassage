<script setup lang="ts">
const { setPageSEO, businessInfo } = useGlobalSEO();

// Generate structured data for booking service
const bookingServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ReservationService",
  name: "Afspraken Boeken - Enisa Healing & Massage",
  description: "Online afsprakenplanning voor healing en massage behandelingen",
  provider: {
    "@type": "LocalBusiness",
    name: businessInfo.name,
    url: businessInfo.url,
    telephone: businessInfo.telephone,
    email: businessInfo.email,
    address: businessInfo.address,
  },
  serviceType: "Massage & Healing Behandelingen",
  url: `${businessInfo.url}/boeken`,
  potentialAction: {
    "@type": "ReserveAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://enisahealingmassage.setmore.com",
      actionPlatform: [
        "http://schema.org/DesktopWebPlatform",
        "http://schema.org/MobileWebPlatform",
      ],
    },
    result: {
      "@type": "Reservation",
      name: "Behandeling Reservering",
    },
  },
};

// Set comprehensive SEO with booking schema
setPageSEO({
  title: "Boek Een Afspraak - Enisa Healing & Massage",
  description:
    "Boek eenvoudig online een afspraak voor massage of healing behandelingen. Kies je gewenste behandeling, datum en tijd. Direct bevestiging per e-mail.",
  path: "/boeken",
  structuredData: [bookingServiceSchema],
});
</script>

<template>
  <article>
    <BookingHero />

    <PageSection primary>
      <div class="max-w-4xl mx-auto">
        <header class="text-center mb-12">
          <h2 class="text-3xl font-bold text-neutral-900 mb-4">
            Kies je gewenste behandeling en tijd
          </h2>
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
              as="a"
              href="https://enisahealingmassage.setmore.com"
              target="_blank"
              rel="noopener noreferrer"
              class="setmore-booking-button"
              color="primary"
              variant="solid"
              size="xl"
              icon="i-mdi-calendar-heart"
              aria-label="Open boekingsagenda - plan uw afspraak voor massage of healing behandeling in nieuw venster"
            >
              Open Agenda & Boek Afspraak
            </UButton>
          </div>

          <div class="border-t pt-8">
            <BookingInfo />
          </div>
        </div>
      </div>
    </PageSection>
  </article>
</template>

<style scoped>
.setmore-booking-button {
  transition:
    transform 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
  min-width: 280px;
}

.setmore-booking-button:hover {
  transform: translateY(-2px);
  box-shadow:
    0 20px 35px -3px rgba(0, 0, 0, 0.15),
    0 8px 10px -2px rgba(0, 0, 0, 0.1);
}

/* Mobile responsiveness */
@media screen and (max-width: 640px) {
  .setmore-booking-button {
    min-width: 250px;
  }
}
</style>

