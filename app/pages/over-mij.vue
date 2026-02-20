<script setup lang="ts">
import { useVideos } from "~/composables/useVideos";

const { setPageSEO, businessInfo } = useGlobalSEO();
const { aboutVideos } = useVideos();

// Generate Person schema for Enisa
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Enisa",
  jobTitle: "Energetisch Therapeut gespecialiseerd in Hypnotherapie",
  description:
    "Energetisch therapeut in Amsterdam Noord gespecialiseerd in holistische healing, energetische therapie en hypnotherapie.",
  worksFor: {
    "@type": "Organization",
    name: businessInfo.name,
    url: businessInfo.url,
  },
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      name: "Erkend Wellnessmasseur",
      credentialCategory: "Professional Certification",
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Mindfulnesstrainer MBSR (Mindfulness Academie)",
      credentialCategory: "Professional Certification",
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Ericksoniaanse Hypnose - Hypnotherapie (UNLP Instituut)",
      credentialCategory: "Professional Certification",
    },
  ],
  knowsAbout: [
    "Energetische Therapie",
    "Energy Healing",
    "Hypnotherapie",
    "Mindfulness (MBSR)",
    "Holistische Gezondheid",
    "Stressmanagement",
    "Wellness Massage",
    "Healing op Afstand",
  ],
  email: businessInfo.email,
  telephone: businessInfo.telephone,
  address: businessInfo.address,
  sameAs: [],
};

// Set comprehensive SEO with person schema
setPageSEO({
  title: "Over Mij - Enisa Healing & Massage",
  description:
    "Leer meer over Enisa, energetisch therapeut in Amsterdam Noord met 11+ jaar ervaring in hypnotherapie. Ontdek haar achtergrond, certificeringen en passie voor holistische healing en energetische therapie.",
  path: "/over-mij",
  type: "profile",
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
                Welkom! Mijn naam is Enisa Erovic, energetisch therapeut in
                Amsterdam Noord met een focus op hypnotherapie. Ik begeleid
                mensen vanuit het hart en werk met de helende energie die door
                mijn handen stroomt. Met meer dan 11 jaar ervaring combineer ik
                energetische therapie, chakra healing, hypnotherapie en massage
                om mensen te helpen bij hun innerlijke reis naar balans en
                welzijn.
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
                  as="a"
                  href="https://enisa-healing-massage.setmore.com"
                  target="_blank"
                  rel="noopener noreferrer"
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
            Ik ben geboren in het voormalige Joegoslavië en heb daar gewoond tot
            mijn 25ste. Na mijn studie economie heb ik gewerkt als manager
            binnen de detailhandel. Sinds 1993 woon ik in Nederland en sinds
            1995 in Amsterdam. Naast mijn school en werk heb ik altijd al mensen
            geholpen door met mijn handen helende energie te geven. Het helpen
            van mensen gaf mij zoveel voldoening dat ik besloot hiervan mijn
            beroep te maken.
          </p>
          <p class="text-neutral-600 leading-relaxed mb-6">
            Ik beschik al van kinds af aan over de bijzondere gave om mensen
            geneeskrachtige energie te geven die via mijn handen stroomt. Deze
            energie komt niet vanuit mij – ik geef deze door uit het universum.
            Met mijn handen voel ik in welke delen van het lichaam iemand
            blokkades of spanning heeft en waar ik de energie mag richten. Het
            gebeurt vaak dat ik in mijn eigen lichaam aanvoel waar iemand pijn
            heeft.
          </p>
          <p class="text-neutral-600 leading-relaxed">
            Om mensen nog beter te kunnen begeleiden, heb ik verschillende
            opleidingen gevolgd. Ik werk inmiddels meer dan 11 jaar officieel
            als energetisch therapeut, met veel liefde en toewijding aan mijn
            vak. Tijdens mijn sessies combineer ik energetische therapie,
            chakra healing en hypnotherapie op een manier die afgestemd is op de
            persoon die bij mij komt.
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
                <h3 class="text-xl font-semibold">Kwalificaties</h3>
              </div>
            </template>
            <ul class="space-y-3">
              <li class="flex items-start gap-3">
                <UIcon
                  name="i-mdi-check-circle"
                  class="w-5 h-5 text-green-500 mt-0.5"
                />
                <span class="text-neutral-600">Erkend Wellnessmasseur</span>
              </li>
              <li class="flex items-start gap-3">
                <UIcon
                  name="i-mdi-check-circle"
                  class="w-5 h-5 text-green-500 mt-0.5"
                />
                <span class="text-neutral-600">Mindfulnesstrainer MBSR</span>
              </li>
              <li class="flex items-start gap-3">
                <UIcon
                  name="i-mdi-check-circle"
                  class="w-5 h-5 text-green-500 mt-0.5"
                />
                <span class="text-neutral-600"
                  >Ericksoniaanse Hypnose - Hypnotherapie</span
                >
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
                  >11+ jaar ervaring in energetische therapie</span
                >
              </li>
              <li class="flex items-start gap-3">
                <UIcon
                  name="i-mdi-star"
                  class="w-5 h-5 text-yellow-500 mt-0.5"
                />
                <span class="text-neutral-600"
                  >Positieve recensies op Treatwell, Google, Facebook en deze
                  website</span
                >
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
                  >Expertise in energetische healing & hypnotherapie</span
                >
              </li>
              <li class="flex items-start gap-3">
                <UIcon
                  name="i-mdi-star"
                  class="w-5 h-5 text-yellow-500 mt-0.5"
                />
                <span class="text-neutral-600"
                  >Combinatie van traditionele en moderne technieken</span
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

      <!-- Video Section -->
      <section class="mb-12">
        <VideoCarousel
          :videos="aboutVideos"
          heading="Ontdek Meer Over Mijn Werk"
          aria-label="Video's over Enisa en haar werkwijze"
        />
      </section>

      <!-- Personal Approach Section -->
      <section class="mb-12 max-w-3xl mx-auto">
        <h2 class="text-3xl font-bold text-neutral-900 mb-8 text-center">
          Mijn Werkwijze
        </h2>
        <div class="prose prose-lg">
          <p class="text-neutral-600 leading-relaxed mb-6">
            Door de jaren heen heb ik veel mensen mogen helpen om weer in
            contact te komen met zichzelf, hun innerlijke rust te hervinden,
            klachten te verminderen en met een blij gevoel verder te gaan in het
            leven.
          </p>
          <p class="text-neutral-600 leading-relaxed mb-6">
            Voor mij voelt dit als wanneer een klein vogeltje in een kooi
            langzaam leert vliegen – eerst onzeker, niet wetend waar de uitgang
            is. Met geduld, vertrouwen en gezamenlijke inspanning lukt het om de
            vleugels te spreiden en weer te vliegen. Dat moment, wanneer iemand
            zijn eigen kracht en vrijheid terugvindt, is voor mij een grote
            zegen en diepe vreugde.
          </p>
          <p class="text-neutral-600 leading-relaxed mb-6">
            Het allerbelangrijkste voor mij is dat mensen zich bij mij veilig en
            op hun gemak voelen – alleen dan kan echte heling plaatsvinden. Ik
            ben daarnaast moeder van twee kinderen, wat mij nog dieper heeft
            geleerd hoe belangrijk zachtheid, vertrouwen en warmte zijn in het
            contact met anderen.
          </p>
          <p class="text-neutral-600 leading-relaxed">
            Vanuit liefde en intuïtie begeleid ik mensen om weer in hun kracht
            te komen – dat is waar ik mijn diepste voldoening uit haal.
          </p>
        </div>
      </section>

      <!-- Conditions Helped Section -->
      <section class="mb-12">
        <h2 class="text-3xl font-bold text-neutral-900 mb-8 text-center">
          Klachten Waarbij Ik Al Geholpen Heb
        </h2>
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto"
        >
          <UCard class="text-center">
            <div class="flex flex-col items-center gap-2">
              <UIcon
                name="i-mdi-head-outline"
                class="w-8 h-8 text-primary-500"
              />
              <span class="text-neutral-700">Hoofdpijn</span>
            </div>
          </UCard>
          <UCard class="text-center">
            <div class="flex flex-col items-center gap-2">
              <UIcon
                name="i-mdi-neck-outline"
                class="w-8 h-8 text-primary-500"
              />
              <span class="text-neutral-700">Pijn in de nek</span>
            </div>
          </UCard>
          <UCard class="text-center">
            <div class="flex flex-col items-center gap-2">
              <UIcon
                name="i-mdi-arm-flex-outline"
                class="w-8 h-8 text-primary-500"
              />
              <span class="text-neutral-700">Pijn in de schouders</span>
            </div>
          </UCard>
          <UCard class="text-center">
            <div class="flex flex-col items-center gap-2">
              <UIcon
                name="i-mdi-head-snowflake-outline"
                class="w-8 h-8 text-primary-500"
              />
              <span class="text-neutral-700">Stress en vermoeidheid</span>
            </div>
          </UCard>
          <UCard class="text-center">
            <div class="flex flex-col items-center gap-2">
              <UIcon name="i-mdi-lungs" class="w-8 h-8 text-primary-500" />
              <span class="text-neutral-700">Astmatische Bronchitis</span>
            </div>
          </UCard>
          <UCard class="text-center">
            <div class="flex flex-col items-center gap-2">
              <UIcon
                name="i-mdi-flower-outline"
                class="w-8 h-8 text-primary-500"
              />
              <span class="text-neutral-700">Allergieën</span>
            </div>
          </UCard>
          <UCard class="text-center">
            <div class="flex flex-col items-center gap-2">
              <UIcon
                name="i-mdi-hand-back-right-outline"
                class="w-8 h-8 text-primary-500"
              />
              <span class="text-neutral-700">Carpaletunnelsyndroom</span>
            </div>
          </UCard>
          <UCard class="text-center">
            <div class="flex flex-col items-center gap-2">
              <UIcon name="i-mdi-bone" class="w-8 h-8 text-primary-500" />
              <span class="text-neutral-700">Botbreuk (pijnverlichting)</span>
            </div>
          </UCard>
          <UCard class="text-center">
            <div class="flex flex-col items-center gap-2">
              <UIcon
                name="i-mdi-hospital-box-outline"
                class="w-8 h-8 text-primary-500"
              />
              <span class="text-neutral-700">Herstel na ingreep</span>
            </div>
          </UCard>
          <UCard class="text-center">
            <div class="flex flex-col items-center gap-2">
              <UIcon
                name="i-mdi-human-handsdown"
                class="w-8 h-8 text-primary-500"
              />
              <span class="text-neutral-700">Spier- en gewrichtspijn</span>
            </div>
          </UCard>
          <UCard class="text-center">
            <div class="flex flex-col items-center gap-2">
              <UIcon
                name="i-mdi-heart-pulse"
                class="w-8 h-8 text-primary-500"
              />
              <span class="text-neutral-700">Lusteloosheid</span>
            </div>
          </UCard>
          <UCard class="text-center">
            <div class="flex flex-col items-center gap-2">
              <UIcon
                name="i-mdi-shield-heart"
                class="w-8 h-8 text-primary-500"
              />
              <span class="text-neutral-700"
                >Emotionele blokkades</span
              >
            </div>
          </UCard>
        </div>
      </section>

      <!-- Success Stories Section -->
      <section class="mb-12 max-w-4xl mx-auto">
        <h2 class="text-3xl font-bold text-neutral-900 mb-8 text-center">
          Ervaringen uit Mijn Praktijk
        </h2>
        <div class="space-y-6">
          <UCard>
            <template #header>
              <h3 class="text-xl font-semibold text-primary-600">
                Stress en Welzijn
              </h3>
            </template>
            <p class="text-neutral-600 leading-relaxed">
              Het leven is een geschenk daarom moeten wij er zuinig op zijn. In
              het dagelijks leven worden we vaak blootgesteld aan stress. Deze
              kan verschillende oorzaken hebben, maar ons lichaam reageert er in
              alle gevallen hetzelfde op. Elke vorm van stress kost namelijk
              energie en langdurige stress put u op den duur uit. Met behulp van
              de helende energie die door mijn handen stroomt kan ik ervoor
              zorgen dat stressklachten verdwijnen.
            </p>
          </UCard>

          <UCard>
            <template #header>
              <h3 class="text-xl font-semibold text-primary-600">
                Pijn door een Hernia
              </h3>
            </template>
            <p class="text-neutral-600 leading-relaxed">
              Een goede vriend heeft maandenlang letterlijk krom gelopen van de
              pijn als gevolg van een hernia. De uitstraling in de benen was
              ondragelijk. Hoe sceptisch hij ook was, onder het mom van “baat
              het niet, schaadt het niet”, heb ik hem energie gegeven. Na een
              aantal behandelingen was er een opmerkelijke verbetering en was de
              pijn zover gezakt dat hij weer zonder pijn kon lopen.
            </p>
          </UCard>

          <UCard>
            <template #header>
              <h3 class="text-xl font-semibold text-primary-600">
                Suikerziekte
              </h3>
            </template>
            <p class="text-neutral-600 leading-relaxed">
              Met succes heb ik mijn eigen broer ondersteund toen hij
              geconfronteerd werd met de diagnose suikerziekte. Hij had veel
              zenuwpijn in zijn benen en voeten en kon slecht slapen. Na een
              periode van intensieve behandelingen werd een duidelijke
              verbetering waargenomen: zijn bloedsuikerwaarden stabiliseerden
              en de pijn in zijn benen en voeten nam sterk af. Doordat de pijn
              verminderde, kon hij ook weer beter slapen.
            </p>
          </UCard>

          <UCard>
            <template #header>
              <h3 class="text-xl font-semibold text-primary-600">
                Bijna Fatale Longontsteking
              </h3>
            </template>
            <p class="text-neutral-600 leading-relaxed">
              Een van mijn goede vrienden uit Assen worstelde al lange tijd met
              verschillende gezondheidsproblemen en toen hij voor de zoveelste
              keer weer in het ziekenhuis belandde met een longontsteking,
              meldden de dokters niets meer voor hem te kunnen betekenen. Hij
              kon elk moment wegzakken in een coma. Ik ben diezelfde dag naar
              Assen afgereisd en heb hem in het ziekenhuis bezocht. Na twee
              bezoeken op één dag en nog één de volgende dag, is hij al
              opgestaan uit bed, heeft zelf gedoucht en een stukje gewandeld
              door het ziekenhuis. De volgende dag mocht hij naar huis en was er
              geen spoor meer over van zijn ziekte. De dokters konden dit op
              geen enkele manier verklaren! Ik was dolgelukkig toen ik dit
              nieuws hoorde en zijn familie natuurlijk ook.
            </p>
          </UCard>

          <UCard>
            <template #header>
              <h3 class="text-xl font-semibold text-primary-600">Tumor</h3>
            </template>
            <p class="text-neutral-600 leading-relaxed mb-4">
              In een geval heb ik gewerkt met iemand die een hersentumor had die
              niet geheel verwijderd kon worden door middel van een operatie. Ik
              kan met veel blijdschap in mijn hart zeggen dat de tumor gekrompen
              is tot een zeer klein formaat. Daarbij zijn de klachten waarmee
              deze persoon kampte na de operatie, zoals lichte epileptische
              aanvallen, moeite met spreken en depressie volledig verdwenen.
            </p>
            <p class="text-neutral-600 leading-relaxed">
              Ik wil hier wel bij vertellen dat ik op dat moment niet zeker wist
              of ik hierbij kon helpen. Ik wilde dit met heel mijn hart, maar
              wist ook dat het hier om een ernstige ziekte gaat. Ik heb dus
              toegezegd om het te proberen, maar beloofde niets. Diezelfde nacht
              werd mij in een droom verteld dat ik de vraag om hulp moest
              aannemen.
            </p>
          </UCard>

          <UCard>
            <template #header>
              <h3 class="text-xl font-semibold text-primary-600">
                Bij Artsen Onbekende Afwijking in het Bloed
              </h3>
            </template>
            <p class="text-neutral-600 leading-relaxed">
              Letterlijk is een wonder gebeurd toen ik gevraagd werd een vriend
              van m'n vriendin te helpen toen deze in het ziekenhuis lag met een
              ernstige bloedafwijking waarvan het diagnosticeren alleen al weken
              duurde, zo zeldzaam was de aandoening. Voor de behandeling in het
              ziekenhuis werd hij bij elkaar drie weken kunstmatig in coma
              gehouden. De artsen konden uiteindelijk niet veel meer betekenen,
              behalve te stellen dat het maanden zou duren voordat hij hiervan
              hersteld zou zijn. Ik ben daar geweest en heb aan zijn bed energie
              gegeven. Het wonder gebeurde dat hij na twee dagen al weer naast
              z'n bed stond en een week later alweer op de fiets naar zijn werk.
              Dit is naast de ernstige longontsteking toch wel de meest
              bijzondere ervaring die ik heb mogen hebben.
            </p>
          </UCard>

          <UCard>
            <template #header>
              <h3 class="text-xl font-semibold text-primary-600">Botbreuk</h3>
            </template>
            <p class="text-neutral-600 leading-relaxed">
              In 2014 brak mijn zoon zijn knie. Zijn been zwol meteen helemaal
              op en terwijl wij op straat aan het wachten waren op de ambulance,
              legde ik mijn handen op zijn been en bad tot god om hem te helpen
              en te zorgen dat hij geen pijn zou hebben. De pijn verdween bijna
              onmiddellijk. In het ziekenhuis zagen ze op de röntgenfoto dat
              zijn been onder de knie gebroken was. De dokter kon niet begrijpen
              hoe het kon dat hij geen pijn voelde. Mijn zoon kwam uit het
              ziekenhuis en zijn been genas zonder gevolgen voor zijn groei (de
              breuklijn liep dwars door de groeischijf). Zijn gips ging er veel
              eerder af dan de dokter had gezegd.
            </p>
          </UCard>
        </div>
      </section>

      <!-- Final Note Section -->
      <section class="mb-12 max-w-3xl mx-auto">
        <UCard class="bg-gradient-to-br from-secondary-50 to-primary-50">
          <div class="text-center">
            <UIcon
              name="i-mdi-heart-multiple"
              class="w-16 h-16 text-secondary-500 mx-auto mb-6"
            />
            <p class="text-lg text-neutral-700 leading-relaxed">
              Wellicht ten overvloede, maar deze energie en deze gave die ik heb
              mogen ontvangen is voor iedereen – mensen met religie, mensen
              zonder religie. Het is zuivere energie van een goede bron, het
              universum. Het is een liefdevolle energie waarvoor ik zeer
              dankbaar ben dat ik hem mag overbrengen om u te kunnen helpen.
            </p>
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
          <UButton
            as="a"
            href="https://enisa-healing-massage.setmore.com"
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            icon="i-mdi-calendar"
          >
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
