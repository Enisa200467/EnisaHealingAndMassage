<template>
  <section id="create-treatment" class="scroll-mt-8">
    <UCard>
      <template #header>
        <h2 class="text-2xl font-bold flex items-center gap-3">
          <UIcon name="i-mdi-plus-circle" class="w-6 h-6 text-green-600" />
          Nieuwe Behandeling Aanmaken
        </h2>
      </template>

      <div class="prose prose-neutral max-w-none">
        <div class="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <h3 class="text-lg font-semibold text-green-900 mb-2">
            Stap-voor-stap proces:
          </h3>
        </div>

        <h3 class="text-xl font-bold text-gray-900 mt-8 mb-4">
          1. Database Record Aanmaken
        </h3>
        <ol class="space-y-3">
          <li>
            <strong>
              <NuxtLink
                to="/admin/treatments"
                class="text-blue-600 hover:text-blue-800 underline"
              >
                Ga naar Admin → Behandelingen
              </NuxtLink>
            </strong>
            <p class="text-neutral-600">
              Navigeer naar de behandelingen sectie via het admin menu
            </p>
          </li>
          <li>
            <strong>Klik op "Nieuwe Behandeling"</strong>
            <p class="text-neutral-600">
              Dit opent het formulier voor een nieuwe behandeling
            </p>
          </li>
          <li>
            <strong>Vul de vereiste velden in:</strong>
            <ul class="mt-2">
              <li><strong>Naam:</strong> Volledige naam van de behandeling</li>
              <li>
                <strong>Slug:</strong> URL-vriendelijke versie (automatisch
                gegenereerd)
              </li>
              <li><strong>Prijs:</strong> In euro's (bijvoorbeeld: 65.00)</li>
              <li><strong>Duur:</strong> In minuten (bijvoorbeeld: 60)</li>
              <li>
                <strong>Intensiteit:</strong> Schaal 1-5 (1 = Zeer Zacht, 5 =
                Zeer Stevig)
              </li>
              <li>
                <strong>Intensiteit Label:</strong> Tekstuele beschrijving
                (optioneel)
              </li>
              <li>
                <strong>Icoon:</strong> Icon naam (bijvoorbeeld: i-mdi-spa)
              </li>
            </ul>
            <div
              class="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-3"
            >
              <p class="text-amber-800 text-sm">
                <strong>⚠️ Belangrijk:</strong> Voeg ook dezelfde behandeling
                met identieke prijs toe aan
                <a
                  href="https://www.setmore.com/"
                  target="_blank"
                  rel="noopener"
                  class="text-blue-600 hover:text-blue-800 underline"
                  >Setmore</a
                >
                voor afspraken!
              </p>
            </div>
          </li>
          <li>
            <strong>Opslaan</strong>
            <p class="text-neutral-600">
              De behandeling wordt opgeslagen en krijgt automatisch status
              "actief"
            </p>
          </li>
        </ol>

        <h3 class="text-xl font-bold text-gray-900 mt-8 mb-4">
          2. Content Bestand Aanmaken
        </h3>
        <p>
          Na het aanmaken van de database record, moet je een bijbehorend
          content bestand maken:
        </p>

        <div class="bg-gray-100 rounded-lg p-4 my-4">
          <p class="font-semibold mb-2">Bestandslocatie:</p>
          <code>/content/treatments/[slug].md</code>
          <p class="text-sm text-gray-600 mt-1">
            Waarbij [slug] de slug is die je hebt ingevoerd
          </p>
        </div>

        <h4>Basis template voor content bestand:</h4>
        <pre
          class="bg-gray-100 rounded-lg p-4 text-sm overflow-x-auto"
        ><code>---
title: Naam van de Behandeling
description: SEO beschrijving voor deze behandeling (150-160 karakters)
---

## ::treatmentHero
subtitle: Korte beschrijving van de behandeling
---
::

## ::treatmentSection
title: Wat kun je verwachten?
image: /images/behandeling-foto.webp
imageAlt: Beschrijvende alt tekst voor de foto
items:
- Eerste verwachting of stap
- Tweede verwachting of stap
- Derde verwachting of stap
---
::

## ::twoColumnSection
---

### ::benefitList
title: Belangrijkste Voordelen
items:
- Voordeel 1
- Voordeel 2
- Voordeel 3
---
::

### ::forWhom
title: Voor wie is deze behandeling?
items:
- Doelgroep 1
- Doelgroep 2
- Doelgroep 3
---
::

::

## ::infoBox
icon: i-mdi-information
title: Belangrijk om te weten
---
Eventuele belangrijke informatie, waarschuwingen of opmerkingen.
::

## ::expandableInfo
title: Meer informatie
---
Uitgebreide informatie die ingeklapt kan worden om de pagina overzichtelijk te houden.
::</code></pre>
      </div>
    </UCard>
  </section>
</template>
