<template>
  <PageSection primary aria-labelledby="intro-heading">
    <div class="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
      <div class="relative w-full max-w-md mx-auto">
        <!-- Carousel Pause/Play Control -->
        <button
          @click="toggleAutoplay"
          class="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 flex items-center justify-center"
          :aria-label="
            isPaused
              ? 'Start automatische diavoorstelling'
              : 'Pauzeer automatische diavoorstelling'
          "
          :aria-pressed="!isPaused"
        >
          <UIcon
            :name="isPaused ? 'i-mdi-play' : 'i-mdi-pause'"
            class="w-5 h-5 text-neutral-700 flex-shrink-0"
          />
        </button>

        <!-- Live region for screen reader announcements -->
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          class="sr-only"
        >
          {{ currentSlideAnnouncement }}
        </div>

        <UCarousel
          ref="carouselRef"
          v-slot="{ item }"
          dots
          loop
          :autoplay="autoplayConfig"
          :items="carouselItems"
          class="w-full"
          aria-label="Fotogalerij van Enisa"
          @update:modelValue="onSlideChange"
        >
          <NuxtImg
            :src="item.src"
            :alt="item.alt"
            class="w-full h-full object-cover rounded-lg"
            loading="lazy"
            format="webp"
            quality="80"
          />
        </UCarousel>
      </div>

      <div class="text-center md:text-left">
        <h2 id="intro-heading" class="text-3xl font-bold text-neutral-900 mb-6">
          Welkom bij Enisa Healing & Massage Amsterdam Noord
        </h2>
        <p class="text-lg text-neutral-600 leading-relaxed mb-8">
          In mijn praktijk in Amsterdam Noord combineer ik chakra healing,
          energetische healing, massage en hypnotherapie met moderne methoden om
          jou te helpen bij het vinden van balans en welzijn. Elke behandeling is
          aangepast aan jouw unieke behoeften en gericht op het ondersteunen van
          jouw natuurlijke genezingsproces.
        </p>
        <p class="text-neutral-600 leading-relaxed mb-8">
          Of je nu komt voor ontspanning, pijnverlichting, of spirituele groei,
          ik begeleid je met zorg en aandacht naar het welzijn dat je zoekt.
          Samen creëren we ruimte voor healing en transformatie op dat moment.
        </p>
        <UButton
          variant="link"
          icon="i-mdi-arrow-right-circle"
          :to="routes.pages.about"
          label="Lees meer over mijn aanpak"
          :padded="false"
        />
      </div>
    </div>
  </PageSection>
</template>

<script setup lang="ts">
const routes = useRoutes();

const carouselItems = [
  {
    src: "/images/enisa_closup.jpg",
    alt: "Close-up van Enisa, energetisch therapeut in Amsterdam Noord",
  },
  {
    src: "/images/enisa-intro.jpg",
    alt: "Enisa - Gecertificeerd massagetherapeut en healing practitioner met meer dan 10 jaar ervaring in holistische therapie",
  },
  {
    src: "/images/enisa-healing-in-studio.jpg",
    alt: "Enisa - Gecertificeerd massagetherapeut en healing practitioner met meer dan 10 jaar ervaring in holistische therapie",
  },
  {
    src: "/images/healing-behandeling.jpg",
    alt: "Healing behandeling in de praktijk van Enisa",
  },
  {
    src: "/images/healing-behandeling-2.jpg",
    alt: "Energetische healing sessie in een rustige behandelruimte",
  },
  {
    src: "/images/healing-behandeling-3.jpg",
    alt: "Healing behandeling met zachte handoplegging",
  },
  {
    src: "/images/healing-behandeling-4.jpg",
    alt: "Ontspannende healing behandeling bij Enisa",
  },
  {
    src: "/images/buddha.jpg",
    alt: "Buddha beeld in de praktijk voor een rustige sfeer",
  },
  {
    src: "/images/bos.jpg",
    alt: "Rustig boslandschap dat ontspanning en balans uitstraalt",
  },
];

// Carousel accessibility controls
const isPaused = ref(false);
const currentSlide = ref(0);
const carouselRef = ref();

// Computed autoplay config
const autoplayConfig = computed(() => {
  return isPaused.value ? false : { delay: 3000 };
});

// Live region announcement
const currentSlideAnnouncement = computed(() => {
  if (carouselItems[currentSlide.value]) {
    return `Dia ${currentSlide.value + 1} van ${carouselItems.length}`;
  }
  return "";
});

// Toggle autoplay
const toggleAutoplay = () => {
  isPaused.value = !isPaused.value;
};

// Handle slide change
const onSlideChange = (index: number) => {
  currentSlide.value = index;
};

// Pause on keyboard interaction (accessibility)
onMounted(() => {
  const carousel = carouselRef.value?.$el;
  if (carousel) {
    carousel.addEventListener("focusin", () => {
      if (!isPaused.value) {
        isPaused.value = true;
      }
    });
  }
});
</script>
