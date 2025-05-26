<script setup lang="ts">
import type { AccordionItem } from '@nuxt/ui';

// Define SEO meta tags for this page
useSeoMeta({
  title: 'Veelgestelde Vragen - Enisa Healing & Massage',
  description:
    'Vind antwoorden op veelgestelde vragen over behandelingen, boekingen en meer bij Enisa Healing & Massage.',
  ogTitle: 'Veelgestelde Vragen - Enisa Healing & Massage',
  ogDescription: 'Bekijk de FAQ voor meer informatie over onze diensten.',
});

const faqItems = ref<AccordionItem[]>([
  {
    label: 'Wat voor soort behandelingen bieden jullie aan?',
    content:
      'Wij bieden een scala aan behandelingen gericht op zowel heling als ontspanning, waaronder energetische healing, intuïtieve massages en klassieke ontspanningsmassages. Bekijk onze behandelingenpagina voor een volledig overzicht.',
  },
  {
    label: 'Hoe kan ik een afspraak boeken?',
    content:
      'U kunt eenvoudig online een afspraak boeken via onze boekingspagina. Kies de gewenste behandeling en een tijdstip dat u het beste uitkomt.',
  },
  {
    label: 'Wat moet ik meenemen naar mijn afspraak?',
    content:
      'U hoeft niets speciaals mee te nemen. Draag comfortabele kleding. Handdoeken en andere benodigdheden worden door ons verzorgd.',
  },
  {
    label: 'Wat zijn de openingstijden?',
    content:
      'Onze openingstijden variëren. Raadpleeg de boekingspagina voor de meest actuele beschikbaarheid.',
  },
  {
    label: 'Is er parkeergelegenheid?',
    content:
      'Ja, er is voldoende gratis parkeergelegenheid in de buurt van de praktijk.',
  },
]);
</script>

<template>
  <article>
    <UContainer class="my-16 sm:my-12">
      <header class="mb-16 sm:mb-12">
        <h1 class="text-3xl font-bold tracking-tight sm:text-4xl">
          Veelgestelde Vragen
        </h1>
        <p class="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
          Vind hier antwoorden op de meest voorkomende vragen.
        </p>
      </header>

      <div class="max-w-3xl">
        <UAccordion :items="faqItems" />
      </div>
    </UContainer>
  </article>
</template>
