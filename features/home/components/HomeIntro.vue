<template>
  <PageSection purple aria-labelledby="intro-heading">
    <div class="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
      <UCarousel
        v-slot="{ item }"
        dots
        loop
        :autoplay="{ delay: 3000 }"
        :items="carouselItems"
        class="w-full max-w-md mx-auto"
        aria-label="Fotogalerij van Enisa"
      >
        <NuxtImg
          :src="item"
          alt="Enisa Healing & Massage"
          class="w-full h-full object-cover rounded-lg"
          loading="lazy"
          format="webp"
          quality="80"
        />
      </UCarousel>

      <div class="text-center md:text-left">
        <h2 id="intro-heading" class="text-3xl font-bold text-neutral-900 mb-6">
          Welkom bij Enisa Healing & Massage
        </h2>
        <p class="text-lg text-neutral-600 leading-relaxed mb-8">
          In mijn praktijk combineer ik traditionele massagetechnieken met
          moderne healing methoden om jou te helpen bij het vinden van balans en
          welzijn. Elke behandeling is aangepast aan jouw unieke behoeften en
          gericht op het ondersteunen van jouw natuurlijke genezingsproces.
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
  'https://picsum.photos/640/640?random=1',
  'https://picsum.photos/640/640?random=2',
  'https://picsum.photos/640/640?random=3',
  'https://picsum.photos/640/640?random=4',
  'https://picsum.photos/640/640?random=5',
  'https://picsum.photos/640/640?random=6',
];
</script>
