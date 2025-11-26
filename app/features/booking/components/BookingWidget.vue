<script setup lang="ts">
// Component for Setmore booking widget - opens in new window
</script>

<template>
  <div class="booking-widget-container">
    <UButton
      as="a"
      href="https://enisahealingmassage.setmore.com"
      target="_blank"
      rel="noopener noreferrer"
      class="booking-widget-pill"
      color="primary"
      variant="solid"
      size="xl"
      icon="i-mdi-calendar"
      aria-label="Boek een afspraak met Enisa Healing & Massage - opent boekingssysteem in nieuw venster"
    >
      <span class="hidden sm:inline">Boek Afspraak</span>
      <span class="sm:hidden">Boek</span>
    </UButton>
  </div>
</template>

<style scoped>
.booking-widget-container {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 9999;
}

.booking-widget-pill {
  position: fixed !important;
  bottom: 1rem !important;
  right: 1rem !important;
  z-index: 9999;
  border-radius: 9999px;
  box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.booking-widget-pill:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 35px -3px rgba(0, 0, 0, 0.15),
    0 8px 10px -2px rgba(0, 0, 0, 0.1);
}

/* Mobile responsiveness */
@media screen and (max-width: 640px) {
  .booking-widget-pill {
    bottom: 0.75rem !important;
    right: 0.75rem !important;
  }
}

@media screen and (max-width: 480px) {
  .booking-widget-pill {
    bottom: 0.5rem !important;
    right: 0.5rem !important;
  }
}
</style>

