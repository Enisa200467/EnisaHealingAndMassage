<template>
  <UContainer class="py-12 md:py-16 space-y-12">
    <section class="text-center space-y-6">
      <UBadge color="primary" variant="soft" size="lg">Nieuwe service</UBadge>
      <h1 class="text-4xl md:text-5xl font-bold text-primary-700">
        Keltisch Trouwen
      </h1>
      <p class="mx-auto max-w-3xl text-lg text-gray-700 leading-relaxed">
        Welkom op de tijdelijke servicepagina voor Keltisch Trouwen. Hier komt
        binnenkort de volledige uitleg over de ceremonie, opbouw en mogelijkheden.
      </p>
      <UButton
        size="xl"
        as="a"
        href="https://enisa-healing-massage.setmore.com"
        target="_blank"
        rel="noopener noreferrer"
        icon="i-mdi-calendar"
        aria-label="Boek Keltisch Trouwen via het online boekingssysteem"
      >
        Boek jouw ceremonie
      </UButton>
    </section>

    <section class="space-y-4" aria-labelledby="ceremonie-carousel-title">
      <div class="text-center space-y-2">
        <h2 id="ceremonie-carousel-title" class="text-2xl md:text-3xl font-semibold text-primary-700">
          Ceremonie impressie
        </h2>
        <p class="text-gray-600">
          Tijdelijke carousel met bestaande afbeeldingen. Deze vervangen we later met ceremonie-foto’s.
        </p>
      </div>

      <LazyCarousel
        v-slot="{ item }"
        :items="carouselItems"
        :ui="{ item: 'basis-full md:basis-1/2 lg:basis-1/3 p-2' }"
        arrows
        dots
        loop
        class="w-full"
        aria-label="Carousel met ceremonie impressies"
        aria-roledescription="carousel"
      >
        <NuxtImg
          :src="item.src"
          :alt="item.alt"
          width="1024"
          height="768"
          class="h-72 w-full rounded-xl object-cover shadow-md"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          format="webp"
          quality="80"
          loading="lazy"
        />
      </LazyCarousel>
    </section>

    <section class="max-w-3xl mx-auto text-center space-y-4">
      <h2 class="text-2xl font-semibold text-primary-700">Definitieve content volgt</h2>
      <p class="text-gray-700">
        Zodra alle ceremonieteksten en details klaar zijn, vervangen we de tijdelijke inhoud,
        de afbeeldingen en eventuele secties op deze pagina.
      </p>
    </section>
  </UContainer>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";

const LazyCarousel = defineAsyncComponent(
  () => import("~/components/LazyCarousel.vue"),
);

const carouselItems = [
  {
    src: "/images/bos.webp",
    alt: "Sfeervolle tijdelijke afbeelding voor Keltisch Trouwen",
  },
  {
    src: "/images/healing-behandeling-4.webp",
    alt: "Tijdelijke ceremonie impressie met rustgevende sfeer",
  },
  {
    src: "/images/enisa-healing-in-studio.webp",
    alt: "Tijdelijke impressie van de ceremonie-omgeving",
  },
  {
    src: "/images/healing-behandeling-3.webp",
    alt: "Tijdelijke sfeerfoto voor Keltisch Trouwen",
  },
];

useSeoMeta({
  title: "Keltisch Trouwen | Enisa Healing & Massage",
  description:
    "Nieuwe dedicated servicepagina voor Keltisch Trouwen met tijdelijke inhoud, boekings-CTA en ceremonie carousel.",
});
</script>
