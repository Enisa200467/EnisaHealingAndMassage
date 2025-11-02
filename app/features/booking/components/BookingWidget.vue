<script setup lang="ts">
// Component for Setmore booking widget integration

// Extend Window interface to include setmore
declare global {
  interface Window {
    setmore?: {
      init: () => void;
    };
  }
}

const isScriptLoaded = ref(false);

onMounted(() => {
  // Ensure the script is loaded when component mounts
  if (
    typeof window !== 'undefined' &&
    !document.getElementById('setmore_script')
  ) {
    const script = document.createElement('script');
    script.id = 'setmore_script';
    script.type = 'text/javascript';
    script.src =
      'https://assets.setmore.com/integration/static/setmoreIframeLive.js';
    script.async = true;

    // Wait for script to load before marking as ready
    script.onload = () => {
      isScriptLoaded.value = true;
    };

    document.head.appendChild(script);
  } else {
    // Script already exists, mark as loaded
    isScriptLoaded.value = true;
  }
});

// Handle click to ensure iframe behavior
const handleBookingClick = () => {
  // If script is loaded and setmore is available, let it handle the click
  if (isScriptLoaded.value && window.setmore) {
    // Setmore will handle this, don't follow the link
    return;
  }
};
</script>

<template>
  <div class="booking-widget-container">
    <UButton
      v-if="isScriptLoaded"
      id="Setmore_button_iframe"
      as="a"
      href="https://enisahealingmassage.setmore.com"
      class="booking-widget-pill"
      color="primary"
      variant="solid"
      size="xl"
      icon="i-mdi-calendar"
      aria-label="Boek een afspraak met Enisa Healing & Massage - opent boekingssysteem in nieuw venster"
      role="button"
      tabindex="0"
      @click="handleBookingClick"
      @keydown.enter="handleBookingClick"
      @keydown.space.prevent="handleBookingClick"
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
