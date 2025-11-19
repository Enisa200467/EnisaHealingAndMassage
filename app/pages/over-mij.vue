<script setup lang="ts">
const { setPageSEO, businessInfo } = useGlobalSEO();

// Generate Person schema for Enisa
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Enisa',
  jobTitle: 'Massagetherapeut en Healing Practitioner',
  description:
    'Gecertificeerd massagetherapeut en healing practitioner gespecialiseerd in holistische gezondheid en welzijn.',
  worksFor: {
    '@type': 'Organization',
    name: businessInfo.name,
    url: businessInfo.url,
  },
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Gecertificeerd Massagetherapeut (NVMT)',
      credentialCategory: 'Professional Certification',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Reiki Master Level III',
      credentialCategory: 'Professional Certification',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Chakra Healing Specialist',
      credentialCategory: 'Professional Certification',
    },
  ],
  knowsAbout: [
    'Massage Therapy',
    'Energy Healing',
    'Reiki',
    'Chakra Balancing',
    'Holistic Health',
    'Stress Management',
    'Swedish Massage',
    'Sports Massage',
  ],
  email: businessInfo.email,
  telephone: businessInfo.telephone,
  address: businessInfo.address,
  sameAs: [],
};

// Set comprehensive SEO with person schema
setPageSEO({
  title: 'Over Mij - Enisa Healing & Massage',
  description:
    'Leer meer over Enisa, gecertificeerd massagetherapeut en healing practitioner met 10+ jaar ervaring. Ontdek haar achtergrond, certificeringen en passie voor holistische gezondheid.',
  path: '/over-mij',
  type: 'profile',
  structuredData: [personSchema],
});
</script>

<template>
  <article role="main" aria-labelledby="about-heading">
    <!-- Hero Section -->
    <section
      class="bg-gradient-to-b from-secondary-200 to-primary-50 py-12 sm:py-16"
      aria-labelledby="about-heading"
    >
      <UContainer>
        <div class="max-w-7xl mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <!-- Content -->
            <div class="text-center lg:text-left">
              <h1
                id="about-heading"
                class="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6"
              >
                Over Mij
              </h1>
              <p class="text-xl text-neutral-600 mb-8 leading-relaxed">
                Welkom! Ik ben Enisa, een gecertificeerd massagetherapeut en
                healing practitioner met een passie voor holistische gezondheid
                en welzijn.
              </p>
              <div
                class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                role="group"
                aria-label="Contact en afspraak opties"
              >
                <UButton to="/contact" size="lg" icon="i-mdi-email">
                  Neem Contact Op
                </UButton>
                <UButton
                  to="/boeken"
                  size="lg"
                  variant="outline"
                  icon="i-mdi-calendar"
                >
                  Boek Een Afspraak
                </UButton>
              </div>
            </div>

            <!-- Profile Image -->
            <div class="flex justify-center lg:justify-end">
              <div class="relative">
                <NuxtImg
                  src="/images/enisa-intro.jpg"
                  alt="Enisa - Gecertificeerd massagetherapeut en healing practitioner met meer dan 10 jaar ervaring in holistische therapie"
                  class="w-80 h-80 object-cover rounded-full shadow-2xl"
                  format="jpg"
                  quality="80"
                  loading="eager"
                  sizes="320px"
                />
              </div>
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Main Content -->
    <PageSection padding="sm" primary>
      <!-- About Story -->
      <section class="mb-12">
        <h2 class="text-3xl font-bold text-neutral-900 mb-8 text-center">
          Mijn Verhaal
        </h2>
        <div class="prose prose-lg max-w-3xl mx-auto">
          <p class="text-neutral-600 leading-relaxed mb-6">
            Mijn reis in de wereld van healing en massage begon meer dan 10 jaar
            geleden. Na een succesvolle carrière in de zakelijke wereld, voelde
            ik een sterke roeping om mensen te helpen bij hun fysieke en
            emotionele welzijn.
          </p>
          <p class="text-neutral-600 leading-relaxed mb-6">
            Wat begon als persoonlijke interesse in holistische gezondheid,
            groeide uit tot een passie die mijn leven volledig veranderde. Ik
            besloot mijn carrière om te gooien en me volledig te wijden aan het
            helpen van anderen op hun pad naar genezing en balans.
          </p>
          <p class="text-neutral-600 leading-relaxed">
            Vandaag de dag combineer ik traditionele massagetechnieken met
            energetische healing om een unieke en transformerende ervaring te
            bieden. Elke sessie is op maat gemaakt voor de individuele behoeften
            van mijn cliënten.
          </p>
        </div>
      </section>

      <!-- Qualifications & Experience -->
      <section class="mb-12">
        <h2 class="text-3xl font-bold text-neutral-900 mb-8 text-center">
          Kwalificaties & Ervaring
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Certifications -->
          <UCard>
            <template #header>
              <div class="flex items-center gap-3">
                <UIcon
                  name="i-mdi-certificate"
                  class="w-6 h-6 text-primary-500"
                />
                <h3 class="text-xl font-semibold">Certificeringen</h3>
              </div>
            </template>
            <ul class="space-y-3">
              <li class="flex items-start gap-3">
                <UIcon
                  name="i-mdi-check-circle"
                  class="w-5 h-5 text-green-500 mt-0.5"
                />
                <span class="text-neutral-600"
                  >Gecertificeerd Massagetherapeut (NVMT)</span
                >
              </li>
              <li class="flex items-start gap-3">
                <UIcon
                  name="i-mdi-check-circle"
                  class="w-5 h-5 text-green-500 mt-0.5"
                />
                <span class="text-neutral-600">Reiki Master Level III</span>
              </li>
              <li class="flex items-start gap-3">
                <UIcon
                  name="i-mdi-check-circle"
                  class="w-5 h-5 text-green-500 mt-0.5"
                />
                <span class="text-neutral-600">Chakra Healing Specialist</span>
              </li>
              <li class="flex items-start gap-3">
                <UIcon
                  name="i-mdi-check-circle"
                  class="w-5 h-5 text-green-500 mt-0.5"
                />
                <span class="text-neutral-600">Zweedse Massage Techniek</span>
              </li>
              <li class="flex items-start gap-3">
                <UIcon
                  name="i-mdi-check-circle"
                  class="w-5 h-5 text-green-500 mt-0.5"
                />
                <span class="text-neutral-600">Sportmassage Therapie</span>
              </li>
            </ul>
          </UCard>

          <!-- Experience -->
          <UCard>
            <template #header>
              <div class="flex items-center gap-3">
                <UIcon
                  name="i-mdi-clock-outline"
                  class="w-6 h-6 text-secondary-500"
                />
                <h3 class="text-xl font-semibold">Ervaring</h3>
              </div>
            </template>
            <ul class="space-y-3">
              <li class="flex items-start gap-3">
                <UIcon
                  name="i-mdi-star"
                  class="w-5 h-5 text-yellow-500 mt-0.5"
                />
                <span class="text-neutral-600"
                  >10+ jaar ervaring in holistische therapie</span
                >
              </li>
              <li class="flex items-start gap-3">
                <UIcon
                  name="i-mdi-star"
                  class="w-5 h-5 text-yellow-500 mt-0.5"
                />
                <span class="text-neutral-600">500+ tevreden cliënten</span>
              </li>
              <li class="flex items-start gap-3">
                <UIcon
                  name="i-mdi-star"
                  class="w-5 h-5 text-yellow-500 mt-0.5"
                />
                <span class="text-neutral-600"
                  >Gespecialiseerd in stress & burnout</span
                >
              </li>
              <li class="flex items-start gap-3">
                <UIcon
                  name="i-mdi-star"
                  class="w-5 h-5 text-yellow-500 mt-0.5"
                />
                <span class="text-neutral-600"
                  >Expertise in energetische healing</span
                >
              </li>
              <li class="flex items-start gap-3">
                <UIcon
                  name="i-mdi-star"
                  class="w-5 h-5 text-yellow-500 mt-0.5"
                />
                <span class="text-neutral-600"
                  >Continue professionele ontwikkeling</span
                >
              </li>
            </ul>
          </UCard>
        </div>
      </section>
    </PageSection>
    <PageSection>
      <!-- Philosophy -->
      <section class="mb-12 max-w-3xl mx-auto">
        <h2 class="text-3xl font-bold text-neutral-900 mb-8 text-center">
          Mijn Filosofie
        </h2>
        <UCard class="bg-gradient-to-br from-primary-50 to-secondary-50">
          <div class="text-center">
            <UIcon
              name="i-mdi-meditation"
              class="w-16 h-16 text-primary-500 mx-auto mb-6"
            />
            <blockquote class="text-xl italic text-neutral-700 mb-6">
              "Echte genezing gebeurt wanneer lichaam, geest en ziel in harmonie
              zijn. Mijn missie is om mensen te begeleiden op hun unieke reis
              naar balans en welzijn."
            </blockquote>
            <div class="prose max-w-none">
              <p class="text-neutral-600 leading-relaxed">
                Ik geloof dat ieder mens een natuurlijke gave heeft tot
                zelfgenezing. Mijn rol is om deze natuurlijke processen te
                ondersteunen door een veilige, liefdevolle ruimte te creëren
                waar transformatie kan plaatsvinden. Door intuïtie, ervaring en
                bewezen technieken te combineren, help ik mijn cliënten om hun
                innerlijke kracht te herontdekken.
              </p>
            </div>
          </div>
        </UCard>
      </section>

      <!-- Call to Action -->
      <section class="text-center">
        <h2 class="text-3xl font-bold text-neutral-900 mb-6">
          Klaar om je reis te beginnen?
        </h2>
        <p class="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
          Ik nodig je uit om een afspraak te maken en samen te ontdekken hoe
          massage en healing jouw welzijn kunnen verbeteren.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <UButton to="/boeken" size="lg" icon="i-mdi-calendar">
            Boek Een Afspraak
          </UButton>
          <UButton to="/contact" size="lg" variant="outline" icon="i-mdi-phone">
            Bel Voor Vragen
          </UButton>
        </div>
      </section>
    </PageSection>
  </article>
</template>
