<script setup lang="ts">
const routes = useRoutes();

useSeoMeta({
  title: 'Anti-stress - Enisa Healing & Massage',
  description:
    'Kom tot rust met onze anti-stress behandelingen. Ontspan, laad op en herstel je balans met massage en energetische healing.',
  ogTitle: 'Anti-stress - Enisa Healing & Massage',
  ogDescription:
    'Kom tot rust met onze anti-stress behandelingen. Ontspan, laad op en herstel je balans.',
  ogImage: 'https://enisahealingmassage.nl/images/hero.png',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Anti-stress - Enisa Healing & Massage',
  twitterDescription:
    'Kom tot rust met onze anti-stress behandelingen. Ontspan, laad op en herstel je balans.',
  twitterImage: 'https://enisahealingmassage.nl/images/hero.png',
});

const stressSignals = [
  {
    title: 'Hoofd vol en moe wakker',
    description:
      'Je hoofd blijft aanstaan en je wordt moe wakker, zelfs na een lange nacht slapen.',
  },
  {
    title: 'Spanning in nek en schouders',
    description:
      'Je voelt voortdurend spanning of pijn in je nek, schouders of rug.',
  },
  {
    title: 'Onrust of prikkelbaarheid',
    description:
      'Je ervaart onrust, korte lontjes of moeite om te ontspannen.',
  },
  {
    title: 'Geen tijd voor jezelf',
    description:
      'Je agenda zit vol en je hebt het gevoel dat je leegloopt in plaats van oplaadt.',
  },
];

const benefits = [
  'Diepe ontspanning en rust in je hoofd',
  'Verbeterde slaap en herstel',
  'Meer energie en een lichter gevoel',
  'Herstel van balans tussen lichaam en geest',
];

const treatments = [
  {
    title: 'Ontspanningsmassage',
    description:
      'Vermindert spierspanning en brengt je lichaam snel tot rust met zachte, vloeiende massagegrepen.',
    to: '/behandelingen/ontspanningsmassage',
  },
  {
    title: 'Energetische Healing',
    description:
      'Helpt blokkades loslaten en brengt je energiesysteem weer in balans.',
    to: '/behandelingen/energetische-healing',
  },
  {
    title: 'Chakra Healing',
    description:
      'Brengt rust en helderheid door het balanceren van je chakra’s en emotionele systeem.',
    to: '/behandelingen/chakra-healing',
  },
];
</script>

<template>
  <div>
    <section
      class="bg-gradient-to-b from-primary-50 to-secondary-50 py-12 sm:py-16"
    >
      <UContainer>
        <div class="max-w-4xl mx-auto text-center">
          <UIcon
            name="i-mdi-heart-pulse"
            class="w-16 h-16 text-primary-500 mx-auto mb-6"
          />
          <h1 class="text-4xl sm:text-5xl font-bold text-neutral-900 mb-6">
            Anti-stress behandeling
          </h1>
          <p class="text-xl text-neutral-600 max-w-2xl mx-auto">
            Je hoeft niet altijd “aan” te staan. Met persoonlijke anti-stress
            behandelingen helpen we je spanning los te laten, te vertragen en
            weer op te laden.
          </p>
          <div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <UButton
              :to="routes.pages.booking"
              size="lg"
              icon="i-mdi-calendar"
            >
              Boek een anti-stress sessie
            </UButton>
            <UButton
              :to="routes.pages.contact"
              size="lg"
              variant="outline"
              icon="i-mdi-message-text-outline"
            >
              Vraag persoonlijk advies
            </UButton>
          </div>
        </div>
      </UContainer>
    </section>

    <PageSection primary aria-labelledby="stress-signals-heading">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-10">
          <h2
            id="stress-signals-heading"
            class="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4"
          >
            Herken je deze signalen?
          </h2>
          <p class="text-lg text-neutral-600">
            Langdurige stress laat zich vaak zien in lichaam én hoofd. Deze
            signalen zijn een uitnodiging om te vertragen.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UCard v-for="signal in stressSignals" :key="signal.title">
            <div class="flex items-start gap-4">
              <UIcon
                name="i-mdi-alert-circle-outline"
                class="w-6 h-6 text-secondary-500 mt-1"
              />
              <div>
                <h3 class="text-lg font-semibold text-neutral-900 mb-2">
                  {{ signal.title }}
                </h3>
                <p class="text-neutral-600">
                  {{ signal.description }}
                </p>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </PageSection>

    <PageSection aria-labelledby="anti-stress-benefits">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-10">
          <h2
            id="anti-stress-benefits"
            class="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4"
          >
            Wat levert het je op?
          </h2>
          <p class="text-lg text-neutral-600">
            Een anti-stress behandeling zorgt voor directe ontspanning én helpt
            je op de lange termijn beter met stress om te gaan.
          </p>
        </div>

        <ul class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <li
            v-for="benefit in benefits"
            :key="benefit"
            class="flex items-center gap-3 rounded-lg bg-white border border-neutral-200 p-4"
          >
            <UIcon name="i-mdi-check-circle" class="w-6 h-6 text-green-500" />
            <span class="text-neutral-700">{{ benefit }}</span>
          </li>
        </ul>
      </div>
    </PageSection>

    <PageSection primary aria-labelledby="treatments-heading">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-10">
          <h2
            id="treatments-heading"
            class="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4"
          >
            Behandelingen die stress verminderen
          </h2>
          <p class="text-lg text-neutral-600">
            Samen kiezen we de behandeling die bij jou past. Dit zijn populaire
            keuzes voor rust en herstel.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <UCard
            v-for="treatment in treatments"
            :key="treatment.title"
            class="flex flex-col h-full"
          >
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-neutral-900 mb-2">
                {{ treatment.title }}
              </h3>
              <p class="text-neutral-600 mb-6">
                {{ treatment.description }}
              </p>
            </div>
            <UButton :to="treatment.to" variant="outline" block>
              Bekijk behandeling
            </UButton>
          </UCard>
        </div>
      </div>
    </PageSection>

    <PageSection aria-label="Plan een rustmoment">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
          Tijd om op te laden?
        </h2>
        <p class="text-lg text-neutral-600 mb-8">
          Gun jezelf een moment van rust. Boek direct online of neem contact op
          voor persoonlijk advies.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <UButton
            :to="routes.pages.booking"
            size="lg"
            icon="i-mdi-calendar"
          >
            Plan je afspraak
          </UButton>
          <UButton
            :to="routes.pages.contact"
            size="lg"
            variant="outline"
            icon="i-mdi-phone"
          >
            Bel of WhatsApp
          </UButton>
        </div>
      </div>
    </PageSection>
  </div>
</template>
