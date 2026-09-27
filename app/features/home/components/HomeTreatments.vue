<template>
  <section
    id="behandelingen"
    class="py-12 sm:py-16 scroll-mt-20"
    aria-labelledby="behandelingen-heading"
  >
    <UContainer>
      <div class="text-center">
        <h2
          id="behandelingen-heading"
          class="text-3xl font-bold tracking-tight sm:text-4xl"
        >
          Ontdek Mijn Behandelingen
        </h2>
        <div
          class="mx-auto mt-6 max-w-3xl rounded-3xl border border-amber-200/80 bg-gradient-to-r from-amber-50 via-white to-orange-50 px-6 py-6 shadow-sm ring-1 ring-black/5"
        >
          <p class="text-xl font-semibold tracking-tight text-neutral-900 sm:text-2xl">
            Vertrouwd door meer dan 350 cliënten
          </p>
          <div
            class="mt-3 flex items-center justify-center gap-1.5"
            aria-label="5 van de 5 sterren"
          >
            <UIcon
              v-for="star in 5"
              :key="star"
              name="i-mdi-star"
              class="h-7 w-7 text-amber-500"
              aria-hidden="true"
            />
          </div>
          <p class="mt-3 text-base font-medium leading-7 text-neutral-700 sm:text-lg">
            Gemiddeld beoordeeld met 5 sterren op Google, Treatwell en mijn
            website.
          </p>
        </div>
        <p class="mt-5 text-lg leading-8 text-gray-600">
          Mijn meest gekozen behandelingen in Amsterdam Noord.
        </p>
      </div>

      <ul class="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
        <li v-for="treatment in featuredTreatments" :key="treatment.slug">
          <article
            class="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-xl"
          >
            <NuxtLink
              :to="treatment.path"
              class="relative block aspect-[4/3] overflow-hidden"
              tabindex="-1"
              aria-hidden="true"
            >
              <NuxtImg
                :src="treatment.image"
                :alt="treatment.imageAlt"
                format="webp"
                quality="80"
                loading="lazy"
                sizes="sm:100vw md:33vw lg:400px"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-neutral-900/10 to-transparent"
              />
              <span
                class="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-sm font-medium text-primary-700 shadow-sm backdrop-blur"
              >
                <UIcon :name="treatment.icon" class="h-4 w-4" />
                {{ treatment.tagline }}
              </span>
            </NuxtLink>

            <div class="flex flex-1 flex-col p-6">
              <h3 class="text-xl font-semibold tracking-tight text-neutral-900">
                <NuxtLink
                  :to="treatment.path"
                  class="hover:text-primary-700 focus-visible:text-primary-700"
                >
                  {{ treatment.title }}
                </NuxtLink>
              </h3>
              <p class="mt-3 flex-1 leading-7 text-neutral-600">
                {{ treatment.teaser }}
              </p>
              <p
                v-if="treatment.duration"
                class="mt-4 flex items-center gap-2 text-sm text-neutral-500"
              >
                <UIcon
                  name="i-mdi-clock-outline"
                  class="h-4 w-4"
                  aria-hidden="true"
                />
                <span>Sessie van {{ formatDuration(treatment.duration) }}</span>
              </p>
              <div class="mt-6 flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
                <UButton
                  :to="treatment.path"
                  color="primary"
                  size="lg"
                  class="flex-1 justify-center"
                  trailing-icon="i-mdi-arrow-right"
                  :aria-label="`Lees meer over ${treatment.title}`"
                >
                  Lees meer
                </UButton>
                <UButton
                  :to="bookingUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="primary"
                  variant="outline"
                  size="lg"
                  class="flex-1 justify-center"
                  icon="i-mdi-calendar"
                  :aria-label="`Boek ${treatment.title} direct (opent in nieuw venster)`"
                >
                  Direct boeken
                </UButton>
              </div>
            </div>
          </article>
        </li>
      </ul>

      <div class="mt-10 text-center">
        <UButton
          :to="routes.pages.treatments"
          color="neutral"
          variant="ghost"
          size="lg"
          trailing-icon="i-mdi-arrow-right"
        >
          Bekijk alle behandelingen
        </UButton>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const routes = useRoutes();
const { formatDuration } = useTreatmentDetailsFormatter();
const { activeTreatments } = useTreatments();

const bookingUrl = 'https://enisa-healing-massage.setmore.com';

// Top three treatments promoted on the homepage, in display order.
// Title and duration come from the database; copy and image live here.
const FEATURED_TREATMENTS = [
  {
    slug: 'regressietherapie-amsterdam-noord',
    fallbackTitle: 'Regressietherapie & SoulKey Therapy',
    tagline: 'Reis van je ziel',
    icon: 'i-mdi-infinity',
    teaser:
      'Krijg diepgaand inzicht in terugkerende patronen, vorige levens en Life Between Lives, in een veilige en persoonlijke setting.',
    image: '/images/soulkey.jpg',
    imageAlt: 'Symbolische SoulKey Therapy-reis naar innerlijke helderheid',
  },
  {
    slug: 'hypnotherapie',
    fallbackTitle: 'Hypnotherapie',
    tagline: 'Werken met je onderbewuste',
    icon: 'i-mdi-head-lightbulb-outline',
    teaser:
      'Met Ericksoniaanse hypnose werk je aan rust, zelfvertrouwen en het doorbreken van patronen. Ook mogelijk in combinatie met chakra healing.',
    image: '/images/single-sessions-hypnotherapie.webp',
    imageAlt: 'Hypnotherapie sessie in een rustige praktijk in Amsterdam Noord',
  },
  {
    slug: 'chakra-healing',
    fallbackTitle: 'Chakra Healing',
    tagline: 'Emotionele balans',
    icon: 'i-mdi-meditation',
    teaser:
      "Breng je zeven hoofdchakra's weer in balans en laat energetische blokkades los, voor meer innerlijke rust en levensenergie.",
    image: '/images/enisa-healing-handen-in-de-lucht.jpg',
    imageAlt: 'Chakra healing sessie in rustige behandelruimte in Amsterdam Noord',
  },
];

const featuredTreatments = computed(() =>
  FEATURED_TREATMENTS.map((featured) => {
    const treatment = activeTreatments.value.find(
      (t) => t.slug === featured.slug
    );

    return {
      ...featured,
      title: treatment?.title || featured.fallbackTitle,
      duration: treatment?.duration,
      path: `/behandelingen/${featured.slug}`,
    };
  })
);
</script>
