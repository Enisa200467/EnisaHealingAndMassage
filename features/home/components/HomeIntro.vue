<template>
  <section class="py-16 sm:py-24">
    <UContainer>
      <div class="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
        <UCarousel
          v-slot="{ item }"
          dots
          loop
          :autoplay="{ delay: 3000 }"
          :items="carouselItems"
          class="w-full max-w-md mx-auto"
        >
          <NuxtImg
            :src="item"
            alt="[Naam Masseuse], uw therapeut voor heling en ontspanning"
            class="object-cover w-full h-auto rounded-lg shadow-lg aspect-square"
            format="webp"
            quality="75"
            loading="lazy"
          />
        </UCarousel>

        <div
          class="prose prose-lg text-gray-700 max-w-none prose-headings:text-green-800 prose-a:text-green-600"
        >
          <h2>Maak Kennis Met [Naam Masseuse]</h2>
          <p>
            Welkom! Mijn naam is [Naam Masseuse] en mijn passie ligt bij het
            begeleiden van mensen naar een dieper gevoel van welzijn en balans.
            Met een holistische benadering combineer ik [korte beschrijving van
            technieken, bijv. intuïtieve massage, energetisch werk] om zowel
            fysieke spanning los te laten als innerlijke rust te bevorderen.
          </p>
          <p>
            Of je nu komt voor verlichting van specifieke klachten, behoefte
            hebt aan diepe ontspanning, of op zoek bent naar energetische
            heling, ik bied een veilige en warme omgeving waarin jij centraal
            staat. Elke behandeling is afgestemd op jouw unieke behoeften van
            dat moment.
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
    </UContainer>
  </section>
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
