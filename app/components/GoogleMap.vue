<script setup lang="ts">
interface Props {
  latitude: number;
  longitude: number;
  zoom?: number;
  markerTitle?: string;
  height?: string;
}

const props = withDefaults(defineProps<Props>(), {
  zoom: 15,
  markerTitle: 'Enisa Healing & Massage',
  height: '400px',
});

const config = useRuntimeConfig();
const mapContainer = ref<HTMLDivElement | null>(null);
const isLoading = ref(true);
const hasError = ref(false);
const errorMessage = ref('');

// Google Maps instance
let map: google.maps.Map | null = null;
let marker: google.maps.Marker | null = null;

// Load Google Maps API
const loadGoogleMaps = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Check if already loaded
    if (window.google && window.google.maps) {
      resolve();
      return;
    }

    // Check if API key is available
    if (!config.public.googleMapsApiKey) {
      reject(new Error('Google Maps API key niet geconfigureerd'));
      return;
    }

    // Create script element
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${config.public.googleMapsApiKey}&libraries=places`;
    script.async = true;
    script.defer = true;

    script.addEventListener('load', () => resolve());
    script.addEventListener('error', () => reject(new Error('Google Maps kon niet worden geladen')));

    document.head.appendChild(script);
  });
};

// Initialize map
const initializeMap = async () => {
  if (!mapContainer.value) return;

  try {
    isLoading.value = true;
    hasError.value = false;

    // Load Google Maps API
    await loadGoogleMaps();

    // Create map
    map = new google.maps.Map(mapContainer.value, {
      center: { lat: props.latitude, lng: props.longitude },
      zoom: props.zoom,
      mapTypeControl: true,
      streetViewControl: true,
      fullscreenControl: true,
      zoomControl: true,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }],
        },
      ],
    });

    // Add marker
    marker = new google.maps.Marker({
      position: { lat: props.latitude, lng: props.longitude },
      map: map,
      title: props.markerTitle,
      animation: google.maps.Animation.DROP,
    });

    // Add info window
    const infoWindow = new google.maps.InfoWindow({
      content: `<div style="padding: 8px; font-family: system-ui, sans-serif;">
        <h3 style="margin: 0 0 4px 0; font-size: 16px; font-weight: 600;">${props.markerTitle}</h3>
        <p style="margin: 0; color: #666; font-size: 14px;">Klik voor routebeschrijving</p>
      </div>`,
    });

    // Open info window on marker click
    marker.addListener('click', () => {
      infoWindow.open(map, marker);
      // Open Google Maps directions in new tab
      const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${props.latitude},${props.longitude}`;
      window.open(directionsUrl, '_blank');
    });

    isLoading.value = false;
  } catch (error) {
    console.error('Error initializing Google Maps:', error);
    hasError.value = true;
    errorMessage.value = error instanceof Error ? error.message : 'Er is een fout opgetreden';
    isLoading.value = false;
  }
};

// Only initialize on client side
onMounted(() => {
  initializeMap();
});

// Cleanup on unmount
onUnmounted(() => {
  if (marker) {
    marker.setMap(null);
  }
  if (map) {
    map = null;
  }
});
</script>

<template>
  <div class="google-map-container" :style="{ height }">
    <!-- Loading state -->
    <div
      v-if="isLoading"
      class="flex items-center justify-center h-full bg-gray-100 rounded-lg"
    >
      <div class="text-center">
        <UIcon name="i-mdi-loading" class="w-8 h-8 text-primary-500 animate-spin mx-auto mb-2" />
        <p class="text-gray-600">Kaart laden...</p>
      </div>
    </div>

    <!-- Error state -->
    <div
      v-else-if="hasError"
      class="flex items-center justify-center h-full bg-red-50 rounded-lg border border-red-200"
    >
      <div class="text-center px-4">
        <UIcon name="i-mdi-alert-circle" class="w-8 h-8 text-red-500 mx-auto mb-2" />
        <p class="text-red-700 font-medium">Kaart kon niet worden geladen</p>
        <p class="text-red-600 text-sm mt-1">{{ errorMessage }}</p>
      </div>
    </div>

    <!-- Map container -->
    <div
      ref="mapContainer"
      class="w-full h-full rounded-lg"
      :class="{ 'opacity-0': isLoading || hasError }"
    />
  </div>
</template>

<style scoped>
.google-map-container {
  position: relative;
  width: 100%;
  min-height: 300px;
}

/* Ensure map fills container */
.google-map-container > div {
  border-radius: 0.5rem;
}
</style>
