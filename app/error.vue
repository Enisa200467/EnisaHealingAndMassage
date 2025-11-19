<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps({
  error: {
    type: Object as () => NuxtError,
    required: true,
  },
});

const { setPageSEO } = useGlobalSEO();

// Determine error type
const is404 = computed(() => props.error.statusCode === 404);
const is500 = computed(() => props.error.statusCode === 500);

// Error content based on status code
const errorContent = computed(() => {
  if (is404.value) {
    return {
      title: 'Pagina niet gevonden',
      statusCode: '404',
      heading: 'Deze pagina bestaat niet',
      description:
        'Helaas kunnen we de pagina die je zoekt niet vinden. Misschien is de link verouderd of is de pagina verplaatst.',
      suggestions: [
        'Ga terug naar de homepagina',
        'Bekijk onze behandelingen',
        'Neem contact met ons op',
      ],
      ctaText: 'Terug naar home',
      ctaLink: '/',
      secondaryCta: {
        text: 'Bekijk behandelingen',
        link: '/behandelingen',
      },
    };
  }

  return {
    title: 'Er is iets misgegaan',
    statusCode: props.error.statusCode?.toString() || '500',
    heading: 'Er is een fout opgetreden',
    description:
      'Excuses voor het ongemak. Er is een technische fout opgetreden bij het verwerken van je verzoek. We zijn op de hoogte gesteld en werken aan een oplossing.',
    suggestions: [
      'Probeer de pagina te vernieuwen',
      'Ga terug naar de homepagina',
      'Neem contact met ons op als het probleem blijft bestaan',
    ],
    ctaText: 'Terug naar home',
    ctaLink: '/',
    secondaryCta: {
      text: 'Neem contact op',
      link: '/contact',
    },
  };
});

// Set SEO meta
setPageSEO({
  title: errorContent.value.title,
  description: errorContent.value.description,
  robots: 'noindex, nofollow',
});

// Handle error clearing
const handleError = () => clearError({ redirect: errorContent.value.ctaLink });
</script>

<template>
  <UApp>
    <div class="flex flex-col min-h-screen">
      <SiteHeader />
      <main
        id="main-content"
        class="flex-1 flex items-center justify-center"
        role="main"
        aria-labelledby="error-heading"
      >
        <PageSection primary>
          <div class="text-center max-w-2xl mx-auto">
            <!-- Error Status Code -->
            <p
              class="text-sm font-semibold text-primary-600 uppercase tracking-wide"
              aria-label="Foutcode"
            >
              {{ errorContent.statusCode }} fout
            </p>

            <!-- Error Heading -->
            <h1
              id="error-heading"
              class="mt-4 text-3xl font-bold tracking-tight sm:text-5xl"
            >
              {{ errorContent.heading }}
            </h1>

            <!-- Error Description -->
            <p class="mt-6 text-base leading-7 text-neutral-600">
              {{ errorContent.description }}
            </p>

            <!-- Suggestions List -->
            <div class="mt-10 max-w-md mx-auto">
              <h2 class="text-sm font-semibold text-neutral-900 mb-4">
                Wat kun je doen?
              </h2>
              <ul class="text-sm text-neutral-600 space-y-2 text-left">
                <li
                  v-for="(suggestion, index) in errorContent.suggestions"
                  :key="index"
                  class="flex items-start"
                >
                  <UIcon
                    name="i-heroicons-check-circle"
                    class="h-5 w-5 text-primary-600 mr-2 flex-shrink-0 mt-0.5"
                  />
                  <span>{{ suggestion }}</span>
                </li>
              </ul>
            </div>

            <!-- Call to Action Buttons -->
            <div
              class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <UButton
                :to="errorContent.ctaLink"
                size="lg"
                color="primary"
                @click="handleError"
              >
                {{ errorContent.ctaText }}
              </UButton>
              <UButton
                :to="errorContent.secondaryCta.link"
                size="lg"
                color="white"
                variant="outline"
                @click="handleError"
              >
                {{ errorContent.secondaryCta.text }}
              </UButton>
            </div>

          </div>
        </PageSection>
      </main>
      <SiteFooter />
    </div>
  </UApp>
</template>
