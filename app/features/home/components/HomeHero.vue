<template>
  <section
    class="relative text-center text-white"
    aria-labelledby="hero-heading"
  >
    <!-- Background Image using NuxtImg -->
    <NuxtImg
      src="/images/hero.webp"
      alt="Serene lotus flower floating on water with soft pink glow, symbolizing tranquility and healing"
      role="presentation"
      class="absolute inset-0 object-cover w-full h-full -z-10 brightness-75"
      format="webp"
      quality="80"
      fetchpriority="high"
      preload
    />
    <UContainer class="py-20 md:py-32">
      <h1
        id="hero-heading"
        class="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl drop-shadow-md"
      >
        Vind Balans en Diepe Ontspanning
      </h1>
      <p class="mb-6 text-lg leading-8 text-gray-200 lg:text-xl drop-shadow">
        Ervaar de kracht van helende aanraking in Amsterdam Noord en gun jezelf
        een moment van pure rust.
      </p>
      <div
        class="flex flex-col sm:grid sm:grid-cols-2 items-center gap-4 max-w-2xs md:max-w-fit mx-auto"
        role="group"
        aria-label="Hoofdacties"
      >
        <UButton
          class="w-full"
          color="primary"
          size="xl"
          as="a"
          href="https://enisa-healing-massage.setmore.com"
          target="_blank"
          rel="noopener noreferrer"
          icon="i-mdi-calendar"
          label="Boek Nu Je Sessie"
          aria-label="Boek nu direct een afspraak voor je sessie"
        />
        <UButton
          class="w-full"
          to="#behandelingen"
          size="xl"
          variant="solid"
          color="secondary"
          icon="i-mdi-sparkles"
          label="Ontdek de Behandelingen"
          aria-label="Scroll naar de sectie met beschikbare behandelingen"
        />
      </div>
    </UContainer>
  </section>
</template>
