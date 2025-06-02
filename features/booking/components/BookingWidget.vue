<script setup lang="ts">
// Component for Setmore booking widget integration

const { isLoading } = useSetmore();
</script>

<template>
  <UButton
    id="Setmore_button_iframe"
    as="a"
    href="https://enisahealingmassage.setmore.com"
    class="booking-widget-pill"
    color="primary"
    variant="solid"
    size="xl"
    icon="i-mdi-calendar"
    :loading="isLoading"
    :disabled="isLoading"
    aria-label="Boek een afspraak met Enisa Healing & Massage - opent boekingssysteem in nieuw venster"
    role="button"
    tabindex="0"
  >
    <span v-if="!isLoading" class="hidden sm:inline">Boek Afspraak</span>
    <span v-if="!isLoading" class="sm:hidden">Boek</span>
    <span v-if="isLoading" class="hidden sm:inline">Laden...</span>
    <span v-if="isLoading" class="sm:hidden">...</span>
  </UButton>
</template>

<style scoped>
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

<style>
#setmore-fancy-box,
#setmore-fancy-box-content,
#iframeContent,
iframe {
  border-radius: 12px !important;
}

#setmore-overlay {
  z-index: 9999 !important;
}
</style>
