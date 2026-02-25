<script setup lang="ts">
import type { AccordionItem } from '@nuxt/ui';

const { generateFAQSchema, setPageSEO } = useGlobalSEO();

const faqItems: AccordionItem[] = [
  {
    label: 'Wat voor soort behandelingen bieden jullie aan?',
    content:
      'Wij bieden een scala aan behandelingen gericht op zowel heling als ontspanning, waaronder energetische healing, intuïtieve massages en hypnotherapie. Bekijk onze behandelingenpagina voor een volledig overzicht.',
  },
  {
    label: 'Hoe kan ik een afspraak boeken?',
    content:
      'U kunt eenvoudig online een afspraak boeken via onze boekingspagina. Kies de gewenste behandeling en een tijdstip dat u het beste uitkomt.',
  },
  {
    label: 'Wat moet ik meenemen naar mijn afspraak?',
    content:
      'Niets, ik zorg voor alles zodat jij volledig kunt ontspannen.',
  },
  {
    label: 'Wat zijn de openingstijden?',
    content:
      'Onze openingstijden variëren. Raadpleeg de boekingspagina voor de meest actuele beschikbaarheid.',
  },
  {
    label: 'Is er parkeergelegenheid?',
    content:
      'Ja, er is parkeergelegenheid direct voor het gebouw. Parkeren is betaald (ongeveer € 2,50 per uur).',
  },
  {
    label: 'Wat kan ik verwachten tijdens mijn eerste behandeling?',
    content:
      'Tijdens uw eerste afspraak nemen we uitgebreid de tijd voor een intake gesprek om uw behoeften en verwachtingen te bespreken. Vervolgens wordt de behandeling volledig op maat uitgevoerd.',
  },
  {
    label: 'Zijn de behandelingen geschikt tijdens de zwangerschap?',
    content: `Ja, gezichtsmassage, healing en meditatie zijn ook mogelijk tijdens de zwangerschap. Ik werk op een zachte en veilige manier. Vermeld bij het boeken dat je zwanger bent.

En hypnotherapie tijdens de zwangerschap?
Hypnotherapie is mogelijk in overleg en gericht op:
✔ ontspanningshypnose
✔ stressvermindering
✔ zelfvertrouwen
✔ verbinding met de baby
✔ positieve affirmaties
✔ rust en ademhaling

Tijdens de zwangerschap werk ik niet met:
❌ diep regressiewerk (trauma of emotionele catharsis)
❌ sterke emotionele ontlading
❌ intensief loslaten van oud zeer`,
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
];

// Generate structured data for FAQ
const faqData = faqItems.map((item) => ({
  question: item.label || '',
  answer: item.content || '',
}));

// Set comprehensive SEO with structured data
setPageSEO({
  title: 'Veelgestelde Vragen - Enisa Healing & Massage Amsterdam Noord',
  description:
    'Vind antwoorden op veelgestelde vragen over behandelingen, boekingen en meer bij Enisa Healing & Massage in Amsterdam Noord.',
  path: '/faq',
  structuredData: [generateFAQSchema(faqData)],
});
</script>

<template>
  <div>
    <FAQHero />

    <PageSection primary aria-label="Veelgestelde vragen">
      <div class="max-w-3xl mx-auto">
        <UCard>
          <UAccordion
            :items="faqItems"
            aria-label="Veelgestelde vragen over Enisa Healing & Massage"
          />
        </UCard>
      </div>
    </PageSection>

    <!-- CTA Section -->
    <PageSection aria-label="Neem contact op of maak een afspraak">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-2xl sm:text-3xl font-bold text-neutral-900 mb-4">
          Nog vragen?
        </h2>
        <p class="text-lg text-neutral-600 mb-8">
          Kon je het antwoord op je vraag niet vinden? Neem gerust contact met
          ons op.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <UButton
            to="/contact"
            size="lg"
            icon="i-mdi-email"
            aria-label="Ga naar contactpagina"
          >
            Neem Contact Op
          </UButton>
          <UButton
            as="a"
            href="https://enisa-healing-massage.setmore.com"
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            variant="outline"
            icon="i-mdi-calendar"
            aria-label="Ga naar boekingspagina"
          >
            Afspraak Maken
          </UButton>
        </div>
      </div>
    </PageSection>
  </div>
</template>
