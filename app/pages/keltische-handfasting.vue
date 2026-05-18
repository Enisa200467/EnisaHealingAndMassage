<script setup lang="ts">
import type { AccordionItem } from "@nuxt/ui";

const { generateFAQSchema, setPageSEO } = useGlobalSEO();
const routes = useRoutes();

const faqItems: AccordionItem[] = [
  {
    label: "Wat is een Handfasting ceremonie?",
    content:
      "Een symbolisch ritueel waarbij de handen van het paar worden verbonden met linten. Het staat symbool voor jullie bewuste keuze en verbintenis.",
  },
  {
    label: "Is een spirituele zegening officieel voor de wet?",
    content:
      "Mijn ceremonies zijn puur spiritueel en symbolisch. Voor het wettelijke gedeelte gaan de meeste koppels naar het gemeentehuis.",
  },
  {
    label: "Vindt de ceremonie buiten plaats?",
    content:
      "Ja, ik begeleid ceremonies op elke gewenste locatie, zoals in het bos, op het strand of in de achtertuin.",
  },
];

const faqData = faqItems.map((item) => ({
  question: item.label || "",
  answer: item.content || "",
}));

const galleryItems = [
  {
    src: "/images/handfasting/flowers-detail.webp",
    alt: "Bloemendetail tijdens een Keltische Handfasting ceremonie",
  },
  {
    src: "/images/handfasting/couple-portrait.webp",
    alt: "Koppel tijdens de ceremonie in een natuurlijke omgeving",
  },
  {
    src: "/images/handfasting/ceremony-wide.webp",
    alt: "Breed moment van de ceremonie met het bruidspaar en de setting",
  },
];

setPageSEO({
  title:
    "Keltische Handfasting & Spirituele Huwelijkszegening - Enisa Healing & Massage Amsterdam Noord",
  description:
    "Ervaar een unieke en authentieke Keltische Handfasting & spirituele huwelijkszegening door Enisa. Persoonlijk, symbolisch en volledig afgestemd op jullie liefdesverhaal.",
  path: "/keltische-handfasting",
  image: "/images/handfasting/hero-tree-ceremony.webp",
  structuredData: [generateFAQSchema(faqData)],
});
</script>

<template>
  <div>
    <section
      class="bg-gradient-to-b from-secondary-200 via-primary-50 to-white py-12 sm:py-16"
      aria-labelledby="handfasting-heading"
    >
      <UContainer>
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-10">
            <h1
              id="handfasting-heading"
              class="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-4"
            >
              Keltische Handfasting & Spirituele Huwelijkszegening
            </h1>
            <h2
              class="text-xl sm:text-2xl lg:text-3xl font-medium text-primary-700 mb-6"
            >
              Een unieke en authentieke verbintenis door Enisa
            </h2>

            <div
              class="inline-flex flex-wrap items-center justify-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm ring-1 ring-primary-100 mb-6"
            >
              <div class="flex items-center gap-1 text-amber-500">
                <UIcon
                  v-for="star in 5"
                  :key="star"
                  name="i-mdi-star"
                  class="w-4 h-4"
                />
              </div>
              <p class="text-sm sm:text-base font-medium text-neutral-700">
                Meer dan 350+ klantbeoordelingen met 5 sterren op Google,
                Treatwell en mijn website.
              </p>
            </div>

            <p
              class="max-w-4xl mx-auto text-lg sm:text-xl text-neutral-600 leading-relaxed"
            >
              Stap in een wereld waar liefde, traditie en energie samenkomen.
              Ik nodig jullie uit om de magie van een Keltische ceremonie te
              beleven, een moment van pure verbinding, diep geworteld in de
              wijsheid van de natuur, maar volledig afgestemd op jullie unieke
              verhaal. Geen theater, maar echte emotie.
            </p>
          </div>

          <div class="space-y-6">
            <div class="overflow-hidden rounded-[2rem] shadow-2xl">
              <NuxtImg
                src="/images/handfasting/hero-tree-ceremony.webp"
                alt="Keltische Handfasting ceremonie onder een boom in de natuur"
                class="w-full h-full object-cover aspect-[16/10] lg:aspect-[21/9]"
                width="1600"
                height="900"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px"
                loading="eager"
                fetchpriority="high"
                format="webp"
                quality="82"
              />
            </div>

            <div class="flex justify-center">
              <UButton
                :to="routes.pages.contact"
                size="lg"
                icon="i-mdi-heart-plus"
              >
                Plan een gratis kennismakingsgesprek
              </UButton>
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <PageSection aria-labelledby="emotion-heading">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-8">
          <h2
            id="emotion-heading"
            class="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4"
          >
            Een ceremonie die je voelt
          </h2>
          <p class="text-lg text-neutral-600 max-w-3xl mx-auto">
            Geen ingestudeerd moment, maar een oprechte verbintenis waarin rust,
            liefde en aanwezigheid centraal staan.
          </p>
        </div>

        <div class="overflow-hidden rounded-[2rem] shadow-xl">
          <NuxtImg
            src="/images/handfasting/emotional-kiss.webp"
            alt="Zwart-wit moment van een kus tijdens de huwelijkszegening"
            class="w-full h-full object-cover aspect-[4/5] md:aspect-[16/9]"
            width="1400"
            height="900"
            sizes="(max-width: 768px) 100vw, 960px"
            loading="lazy"
            format="webp"
            quality="82"
          />
        </div>
      </div>
    </PageSection>

    <PageSection primary aria-labelledby="werkwijze-heading">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div>
          <h2
            id="werkwijze-heading"
            class="text-3xl sm:text-4xl font-bold text-neutral-900 mb-6"
          >
            Mijn werkwijze
          </h2>
          <p class="text-lg text-neutral-600 leading-relaxed mb-6">
            Mijn benadering is puur en oprecht. Tijdens een Handfasting verbind
            ik jullie handen met een lint, wat symbool staat voor jullie
            bewuste keuze voor elkaar. Ik vier de liefde met krachtige
            symbolen, zoals het licht van een kaars en de zegening van de
            handen, zonder onnodige opsmuk.
          </p>

          <div
            class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-primary-100"
          >
            <div class="flex items-start gap-4">
              <UIcon
                name="i-mdi-hand-heart"
                class="w-8 h-8 text-primary-500 shrink-0 mt-1"
              />
              <div>
                <h3 class="text-xl font-semibold text-neutral-900 mb-2">
                  Symbolisch, persoonlijk en helder
                </h3>
                <p class="text-neutral-600 leading-relaxed">
                  Elke ceremonie wordt afgestemd op jullie verhaal, energie en
                  de sfeer die jullie willen neerzetten. De rituelen blijven
                  herkenbaar en betekenisvol, zonder zwaar of afstandelijk te
                  worden.
                </p>
              </div>
            </div>
          </div>
        </div>

        <figure class="max-w-xl mx-auto lg:max-w-none">
          <div class="overflow-hidden rounded-[1.75rem] shadow-xl">
            <NuxtImg
              src="/images/handfasting/hands-ribbons-detail.webp?v=2"
              alt="Detail van handen en linten tijdens een handfasting ceremonie"
              class="w-full h-full object-cover aspect-[4/5] md:aspect-[5/4]"
              width="1200"
              height="960"
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading="lazy"
              format="webp"
              quality="82"
            />
          </div>
          <figcaption
            class="mt-4 rounded-2xl bg-white/80 px-5 py-3 text-sm italic leading-relaxed text-neutral-600 text-center shadow-sm ring-1 ring-primary-100"
          >
            De verbinding van harten, gesymboliseerd door handfasting.
          </figcaption>
        </figure>
      </div>
    </PageSection>

    <PageSection aria-labelledby="about-heading">
      <div class="max-w-6xl mx-auto">
        <div class="max-w-3xl mb-10">
          <h2
            id="about-heading"
            class="text-3xl sm:text-4xl font-bold text-neutral-900 mb-6"
          >
            Vertrouwen & over mij
          </h2>
          <p class="text-lg text-neutral-600 leading-relaxed mb-6">
            Als spiritueel begeleider en healer breng ik rust en diepgang in
            jullie ceremonie.
          </p>
          <p class="text-neutral-600 leading-relaxed mb-6">
            Ik werk vanuit aanwezigheid, zachtheid en intentie. Daardoor
            ontstaat er ruimte voor een ceremonie die niet alleen mooi oogt,
            maar ook echt landt. Voor jullie, en voor iedereen die erbij
            aanwezig is.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          <UCard class="h-full">
            <template #header>
              <div class="flex items-center gap-3">
                <UIcon
                  name="i-mdi-candle"
                  class="w-6 h-6 text-primary-500"
                />
                <h3 class="text-lg font-semibold">Rust in het moment</h3>
              </div>
            </template>
            <div class="space-y-4">
              <p class="text-neutral-700 leading-relaxed">
                Ik help jullie vertragen, zodat de ceremonie niet alleen mooi
                oogt, maar ook echt gevoeld wordt. Er ontstaat ruimte voor
                aandacht, verbinding en aanwezigheid in het moment zelf.
              </p>
              <blockquote
                class="border-l-2 border-primary-200 pl-4 text-sm italic leading-relaxed text-neutral-500"
              >
                “Hier komt een echte quote van een bruidspaar over de rust, de
                warmte en de oprechtheid van de ceremonie.”
              </blockquote>
            </div>
          </UCard>

          <div class="overflow-hidden rounded-[1.75rem] shadow-xl">
            <NuxtImg
              src="/images/handfasting/enisa-with-guest.webp"
              alt="Enisa lachend samen met een gast tijdens de ceremonie"
              class="w-full h-full object-cover aspect-[5/4]"
              width="1000"
              height="800"
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading="lazy"
              format="webp"
              quality="82"
            />
          </div>

          <div class="overflow-hidden rounded-[1.75rem] shadow-xl">
            <NuxtImg
              src="/images/handfasting/enisa-microphone.webp"
              alt="Enisa met microfoon tijdens een spirituele huwelijksceremonie"
              class="w-full h-full object-cover aspect-[5/4]"
              width="1000"
              height="800"
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading="lazy"
              format="webp"
              quality="82"
            />
          </div>

          <UCard class="h-full">
            <template #header>
              <div class="flex items-center gap-3">
                <UIcon
                  name="i-mdi-microphone"
                  class="w-6 h-6 text-secondary-500"
                />
                <h3 class="text-lg font-semibold">Warme begeleiding</h3>
              </div>
            </template>
            <div class="space-y-4">
              <p class="text-neutral-700 leading-relaxed">
                Ik begeleid het ritueel met aandacht en zachtheid, zodat jullie
                je veilig en ontspannen kunnen richten op elkaar en op de
                beleving van de ceremonie.
              </p>
              <blockquote
                class="border-l-2 border-secondary-200 pl-4 text-sm italic leading-relaxed text-neutral-500"
              >
                “Hier komt een echte quote van een bruidspaar over de
                begeleiding, de sfeer en hoe persoonlijk het moment voelde.”
              </blockquote>
            </div>
          </UCard>
        </div>
      </div>
    </PageSection>

    <PageSection primary aria-labelledby="investment-heading">
      <div class="grid grid-cols-1 lg:grid-cols-[1fr_0.95fr] gap-10 items-start">
        <div>
          <h2
            id="investment-heading"
            class="text-3xl sm:text-4xl font-bold text-neutral-900 mb-6"
          >
            Praktische informatie & investering
          </h2>
          <div class="space-y-5 text-lg text-neutral-600 leading-relaxed">
            <p>
              De investering voor een Keltische Handfasting & spirituele
              huwelijkszegening is
              <span class="font-semibold text-neutral-900">
                € 588,- exclusief reiskosten
              </span>
              .
            </p>
            <p>
              In dit bedrag zijn een kennismakingsgesprek, een persoonlijk
              geschreven script en de ceremonie zelf inbegrepen.
            </p>
            <p>
              Het lint voor de handfasting kiezen jullie zelf uit, zodat het
              volledig aansluit bij jullie persoonlijke kleuren en energie.
            </p>
          </div>
        </div>

        <UCard class="shadow-lg">
          <template #header>
            <div class="flex items-center gap-3">
              <UIcon
                name="i-mdi-check-decagram"
                class="w-6 h-6 text-primary-500"
              />
              <h3 class="text-xl font-semibold">Inbegrepen</h3>
            </div>
          </template>

          <ul class="space-y-4 mb-8">
            <li class="flex items-start gap-3 text-neutral-600">
              <UIcon
                name="i-mdi-check-circle"
                class="w-5 h-5 text-green-500 mt-0.5"
              />
              <span>Kennismakingsgesprek</span>
            </li>
            <li class="flex items-start gap-3 text-neutral-600">
              <UIcon
                name="i-mdi-check-circle"
                class="w-5 h-5 text-green-500 mt-0.5"
              />
              <span>Persoonlijk geschreven script</span>
            </li>
            <li class="flex items-start gap-3 text-neutral-600">
              <UIcon
                name="i-mdi-check-circle"
                class="w-5 h-5 text-green-500 mt-0.5"
              />
              <span>De ceremonie zelf</span>
            </li>
          </ul>

          <UButton
            :to="routes.pages.contact"
            block
            size="lg"
            icon="i-mdi-heart-plus"
          >
            Plan een gratis kennismakingsgesprek
          </UButton>
        </UCard>
      </div>
    </PageSection>

    <PageSection aria-labelledby="gallery-heading">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-8">
          <h2
            id="gallery-heading"
            class="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4"
          >
            Meer sfeer van de ceremonie
          </h2>
          <p class="text-lg text-neutral-600 max-w-3xl mx-auto">
            Een kleine impressie van de details, de setting en de verbinding
            die tijdens een handfasting voelbaar wordt.
          </p>
        </div>

        <UCarousel
          v-slot="{ item }"
          :items="galleryItems"
          :ui="{ item: 'basis-full md:basis-1/2 lg:basis-1/3 px-2' }"
          indicators
          arrows
          class="w-full"
          aria-label="Fotocarrousel van Keltische Handfasting ceremonie"
          aria-roledescription="carousel"
        >
          <figure class="overflow-hidden rounded-[1.5rem] shadow-lg bg-white">
            <NuxtImg
              :src="item.src"
              :alt="item.alt"
              class="w-full h-full object-cover aspect-[4/5]"
              width="900"
              height="1125"
              sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 30vw"
              loading="lazy"
              format="webp"
              quality="80"
            />
          </figure>
        </UCarousel>
      </div>
    </PageSection>

    <PageSection primary aria-label="Veelgestelde vragen over handfasting">
      <div class="max-w-3xl mx-auto">
        <div class="text-center mb-8">
          <h2 class="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
            Veelgestelde vragen
          </h2>
          <p class="text-lg text-neutral-600">
            Antwoorden op de meest gestelde vragen over de ceremonie en de
            praktische invulling.
          </p>
        </div>

        <UCard>
          <UAccordion
            :items="faqItems"
            aria-label="Veelgestelde vragen over Keltische Handfasting"
          />
        </UCard>
      </div>
    </PageSection>
  </div>
</template>
