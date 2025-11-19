<script setup lang="ts">
import type { AccordionItem } from '@nuxt/ui';

const { generateFAQSchema, setPageSEO } = useGlobalSEO();

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
  {
    label: 'Wat kan ik verwachten tijdens mijn eerste behandeling?',
    content:
      'Tijdens uw eerste afspraak nemen we uitgebreid de tijd voor een intake gesprek om uw behoeften en verwachtingen te bespreken. Vervolgens wordt de behandeling volledig op maat uitgevoerd.',
  },
  {
    label: 'Zijn de behandelingen geschikt voor zwangere vrouwen?',
    content:
      'Ja, wij bieden speciale zwangerschapsmassages aan die veilig zijn tijdens de zwangerschap. Gelieve dit wel vooraf te vermelden bij het boeken.',
  },
  {
    label: 'Hoe lang duurt een gemiddelde behandeling?',
    content:
      'De meeste behandelingen duren tussen de 60 en 90 minuten. De exacte duur hangt af van het type behandeling dat u kiest.',
  },
  {
    label: 'Kan ik een behandeling annuleren of verzetten?',
    content:
      'Ja, u kunt uw afspraak tot 24 uur van tevoren kosteloos annuleren of verzetten. Voor wijzigingen binnen 24 uur kunnen kosten in rekening worden gebracht.',
  },
]);

// Generate structured data for FAQ
const faqData = faqItems.value.map((item) => ({
  question: item.label || '',
  answer: item.content || '',
}));

// Set comprehensive SEO with structured data
setPageSEO({
  title: 'Veelgestelde Vragen - Enisa Healing & Massage',
  description:
    'Vind antwoorden op veelgestelde vragen over behandelingen, boekingen en meer bij Enisa Healing & Massage.',
  path: '/faq',
  structuredData: [generateFAQSchema(faqData)],
});
</script>

<template>
  <article role="main" aria-labelledby="faq-heading">
    <PageSection primary>
      <header class="mb-12 sm:mb-12">
        <h1
          id="faq-heading"
          class="text-3xl font-bold tracking-tight sm:text-4xl"
        >
          Veelgestelde Vragen
        </h1>
        <p class="mt-6 text-lg leading-8 text-neutral-600">
          Hier vind je antwoorden op de meest gestelde vragen over onze
          behandelingen, werkwijze en praktijk.
        </p>
      </header>

      <section class="max-w-3xl" aria-labelledby="faq-heading">
        <UAccordion
          :items="faqItems"
          aria-label="Veelgestelde vragen over Enisa Healing & Massage"
        />
      </section>
    </PageSection>
  </article>
</template>
