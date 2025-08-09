<script setup lang="ts">
// Admin documentation page - Dutch guide for treatment management
useSeoMeta({
  title: 'Admin Documentatie - Behandelingen Beheren',
  description:
    'Handleiding voor het aanmaken en bewerken van behandelingen in het admin systeem',
  robots: 'noindex, nofollow',
});

// Protect admin page with authentication
definePageMeta({
  layout: false,
});

// Get dynamic routes
const routes = useRoutes();

// Add scroll function
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};
</script>

<template>
  <div class="min-h-screen bg-neutral-50">
    <UContainer class="py-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center gap-4 mb-4">
          <UButton
            :to="routes.admin.dashboard"
            variant="ghost"
            icon="i-mdi-arrow-left"
            size="sm"
          >
            Terug naar Admin
          </UButton>
        </div>

        <div class="flex items-center gap-3 mb-4">
          <UIcon
            name="i-mdi-book-open-variant"
            class="w-8 h-8 text-primary-600"
          />
          <h1 class="text-4xl font-bold text-neutral-900">
            Admin Documentatie
          </h1>
        </div>

        <p class="text-xl text-neutral-600">
          Handleiding voor het beheren van behandelingen
        </p>
      </div>

      <!-- Navigation within docs -->
      <div class="grid grid-cols-1 xl:grid-cols-4 gap-8">
        <!-- Table of Contents -->
        <div class="xl:col-span-1">
          <UCard class="sticky top-8">
            <template #header>
              <h2 class="font-semibold flex items-center gap-2">
                <UIcon name="i-mdi-format-list-bulleted" class="w-5 h-5" />
                Inhoudsopgave
              </h2>
            </template>

            <nav class="space-y-2">
              <UButton
                variant="ghost"
                size="sm"
                justify="start"
                class="w-full text-left"
                @click="scrollToSection('overview')"
              >
                Overzicht Systeem
              </UButton>

              <UButton
                variant="ghost"
                size="sm"
                justify="start"
                class="w-full text-left"
                @click="scrollToSection('create-treatment')"
              >
                Nieuwe Behandeling
              </UButton>

              <UButton
                variant="ghost"
                size="sm"
                justify="start"
                class="w-full text-left"
                @click="scrollToSection('edit-treatment')"
              >
                Behandeling Bewerken
              </UButton>

              <UButton
                variant="ghost"
                size="sm"
                justify="start"
                class="w-full text-left"
                @click="scrollToSection('content-management')"
              >
                Content Beheer
              </UButton>

              <UButton
                variant="ghost"
                size="sm"
                justify="start"
                class="w-full text-left"
                @click="scrollToSection('troubleshooting')"
              >
                Probleemoplossing
              </UButton>
            </nav>
          </UCard>
        </div>

        <!-- Main Content -->
        <div class="xl:col-span-3 space-y-12">
          <!-- System Overview -->
          <section id="overview" class="scroll-mt-8">
            <UCard>
              <template #header>
                <h2 class="text-2xl font-bold flex items-center gap-3">
                  <UIcon
                    name="i-mdi-information"
                    class="w-6 h-6 text-primary-600"
                  />
                  Overzicht van het Behandelingen Systeem
                </h2>
              </template>

              <div class="prose prose-neutral max-w-none">
                <p class="text-lg text-neutral-700 mb-6">
                  Het behandelingen systeem gebruikt een hybride architectuur
                  waarbij gegevens worden opgeslagen in de database en rijke
                  content in markdown bestanden.
                </p>

                <div
                  class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6"
                >
                  <h3
                    class="text-lg font-semibold text-blue-900 mb-2 flex items-center gap-2"
                  >
                    <UIcon name="i-mdi-lightbulb" class="w-5 h-5" />
                    Belangrijke Concepten
                  </h3>
                  <ul class="text-blue-800 space-y-1">
                    <li>
                      <strong>Database:</strong> Bevat metadata (naam, prijs,
                      duur, intensiteit)
                    </li>
                    <li>
                      <strong>Content bestanden:</strong> Bevatten rijke
                      beschrijvingen en componenten
                    </li>
                    <li>
                      <strong>Slug:</strong> URL-vriendelijke identifier
                      (automatisch gegenereerd)
                    </li>
                    <li>
                      <strong>Status:</strong> Actief/inactief voor publicatie
                      controle
                    </li>
                  </ul>
                </div>

                <h3>Bestandslocaties:</h3>
                <ul>
                  <li>
                    <code>/pages/admin/treatments</code> - Admin interface
                  </li>
                  <li>
                    <code>/content/treatments/</code> - Content bestanden (.md)
                  </li>
                  <li>
                    <code>/pages/behandelingen/[...slug].vue</code> - Publieke
                    behandeling pagina's
                  </li>
                </ul>
              </div>
            </UCard>
          </section>

          <!-- Create New Treatment -->
          <section id="create-treatment" class="scroll-mt-8">
            <UCard>
              <template #header>
                <h2 class="text-2xl font-bold flex items-center gap-3">
                  <UIcon
                    name="i-mdi-plus-circle"
                    class="w-6 h-6 text-green-600"
                  />
                  Nieuwe Behandeling Aanmaken
                </h2>
              </template>

              <div class="prose prose-neutral max-w-none">
                <div
                  class="bg-green-50 border border-green-200 rounded-lg p-4 mb-6"
                >
                  <h3 class="text-lg font-semibold text-green-900 mb-2">
                    Stap-voor-stap proces:
                  </h3>
                </div>

                <h3>1. Database Record Aanmaken</h3>
                <ol class="space-y-3">
                  <li>
                    <strong>Ga naar Admin → Behandelingen</strong>
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
                      <li>
                        <strong>Naam:</strong> Volledige naam van de behandeling
                      </li>
                      <li>
                        <strong>Slug:</strong> URL-vriendelijke versie
                        (automatisch gegenereerd)
                      </li>
                      <li>
                        <strong>Prijs:</strong> In euro's (bijvoorbeeld: 65.00)
                      </li>
                      <li>
                        <strong>Duur:</strong> In minuten (bijvoorbeeld: 60)
                      </li>
                      <li>
                        <strong>Intensiteit:</strong> Schaal 1-5 (1 = Zeer
                        Zacht, 5 = Zeer Stevig)
                      </li>
                      <li>
                        <strong>Intensiteit Label:</strong> Tekstuele
                        beschrijving (optioneel)
                      </li>
                      <li>
                        <strong>Icoon:</strong> Icon naam (bijvoorbeeld:
                        i-mdi-spa)
                      </li>
                    </ul>
                  </li>
                  <li>
                    <strong>Opslaan</strong>
                    <p class="text-neutral-600">
                      De behandeling wordt opgeslagen en krijgt automatisch
                      status "actief"
                    </p>
                  </li>
                </ol>

                <h3>2. Content Bestand Aanmaken</h3>
                <p>
                  Na het aanmaken van de database record, moet je een
                  bijbehorend content bestand maken:
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

          <!-- Edit Treatment -->
          <section id="edit-treatment" class="scroll-mt-8">
            <UCard>
              <template #header>
                <h2 class="text-2xl font-bold flex items-center gap-3">
                  <UIcon name="i-mdi-pencil" class="w-6 h-6 text-blue-600" />
                  Behandeling Bewerken
                </h2>
              </template>

              <div class="prose prose-neutral max-w-none">
                <h3>Database Gegevens Wijzigen</h3>
                <ol class="space-y-3">
                  <li>
                    <strong>Ga naar Admin → Behandelingen</strong>
                    <p class="text-neutral-600">
                      Je ziet een overzicht van alle behandelingen
                    </p>
                  </li>
                  <li>
                    <strong
                      >Klik op "Bewerken" bij de gewenste behandeling</strong
                    >
                    <p class="text-neutral-600">
                      Dit opent het bewerkingsformulier
                    </p>
                  </li>
                  <li>
                    <strong>Wijzig de gewenste velden</strong>
                    <ul class="mt-2">
                      <li>
                        <strong>Prijs aanpassen:</strong> Directe impact op alle
                        pagina's
                      </li>
                      <li>
                        <strong>Duur wijzigen:</strong> Automatisch
                        geformatteerd
                      </li>
                      <li>
                        <strong>Intensiteit:</strong> Update zowel nummer als
                        label indien gewenst
                      </li>
                      <li>
                        <strong>Status:</strong> Schakel tussen actief/inactief
                      </li>
                    </ul>
                  </li>
                  <li>
                    <strong>Opslaan</strong>
                    <p class="text-neutral-600">
                      Wijzigingen zijn direct zichtbaar op de website
                    </p>
                  </li>
                </ol>

                <div
                  class="bg-orange-50 border border-orange-200 rounded-lg p-4 my-6"
                >
                  <h4
                    class="text-lg font-semibold text-orange-900 mb-2 flex items-center gap-2"
                  >
                    <UIcon name="i-mdi-alert" class="w-5 h-5" />
                    Let op bij Slug wijzigen
                  </h4>
                  <p class="text-orange-800">
                    Als je de slug wijzigt, moet je ook het content bestand
                    hernoemen van
                    <code>/content/treatments/oude-slug.md</code> naar
                    <code>/content/treatments/nieuwe-slug.md</code>
                  </p>
                </div>

                <h3>Content Wijzigen</h3>
                <p>
                  Voor het wijzigen van de rijke content (beschrijvingen,
                  voordelen, etc.):
                </p>
                <ol class="space-y-2">
                  <li>
                    Open het bijbehorende <code>.md</code> bestand in
                    <code>/content/treatments/</code>
                  </li>
                  <li>
                    Bewerk de content components zoals
                    <code>::treatmentSection</code>, <code>::benefitList</code>,
                    etc.
                  </li>
                  <li>
                    Sla het bestand op - wijzigingen zijn direct zichtbaar
                  </li>
                </ol>
              </div>
            </UCard>
          </section>

          <!-- Content Management -->
          <section id="content-management" class="scroll-mt-8">
            <UCard>
              <template #header>
                <h2 class="text-2xl font-bold flex items-center gap-3">
                  <UIcon
                    name="i-mdi-file-document-edit"
                    class="w-6 h-6 text-purple-600"
                  />
                  Content Beheer
                </h2>
              </template>

              <div class="prose prose-neutral max-w-none">
                <div
                  class="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6"
                >
                  <h3
                    class="text-lg font-semibold text-purple-900 mb-2 flex items-center gap-2"
                  >
                    <UIcon name="i-mdi-star" class="w-5 h-5" />
                    Twee Content Systemen
                  </h3>
                  <div class="text-purple-800 space-y-2">
                    <p>
                      <strong>Database (Admin Interface):</strong> Voor prijzen,
                      duur, intensiteit en metadata
                    </p>
                    <p>
                      <strong>Nuxt Studio CMS:</strong> Voor rijke content,
                      teksten, afbeeldingen en componenten
                    </p>
                  </div>
                </div>

                <h3>Nuxt Studio - Content Management System</h3>
                <p>
                  Nuxt Studio is geïntegreerd als een visuele content editor
                  voor het bewerken van behandeling content, afbeeldingen en
                  teksten zonder technische kennis.
                </p>

                <h4>Toegang tot Nuxt Studio:</h4>
                <ol class="space-y-2">
                  <li>
                    Ga naar
                    <a
                      href="https://nuxt.studio"
                      target="_blank"
                      class="text-blue-600 underline"
                      >nuxt.studio ↗</a
                    >
                  </li>
                  <li>Verbind je GitHub account</li>
                  <li>Selecteer je repository: EnisaHealingAndMassage</li>
                  <li>Begin met bewerken van content bestanden</li>
                </ol>

                <h4>Voordelen van Nuxt Studio:</h4>
                <ul>
                  <li>Visuele editor - geen code kennis nodig</li>
                  <li>Live preview van wijzigingen</li>
                  <li>Automatische afbeelding optimalisatie</li>
                  <li>Samenwerking met meerdere editors</li>
                  <li>Versie controle via Git</li>
                </ul>

                <h3>Beschikbare Content Components</h3>

                <div class="space-y-6">
                  <div class="border border-gray-200 rounded-lg p-4">
                    <h4 class="font-semibold text-lg mb-2">::treatmentHero</h4>
                    <p class="text-gray-600 mb-2">Hero sectie met subtitle</p>
                    <pre
                      class="bg-gray-100 p-2 rounded text-sm"
                    ><code>## ::treatmentHero
subtitle: Korte beschrijving
---
::</code></pre>
                  </div>

                  <div class="border border-gray-200 rounded-lg p-4">
                    <h4 class="font-semibold text-lg mb-2">
                      ::treatmentSection
                    </h4>
                    <p class="text-gray-600 mb-2">
                      Sectie met titel, afbeelding en lijst items
                    </p>
                    <pre
                      class="bg-gray-100 p-2 rounded text-sm"
                    ><code>## ::treatmentSection
title: Sectie Titel
image: /images/foto.webp
imageAlt: Alt tekst
items:
- Item 1
- Item 2
---
::</code></pre>
                  </div>

                  <div class="border border-gray-200 rounded-lg p-4">
                    <h4 class="font-semibold text-lg mb-2">::benefitList</h4>
                    <p class="text-gray-600 mb-2">Lijst met voordelen</p>
                    <pre
                      class="bg-gray-100 p-2 rounded text-sm"
                    ><code>### ::benefitList
title: Voordelen
items:
- Voordeel 1
- Voordeel 2
---
::</code></pre>
                  </div>

                  <div class="border border-gray-200 rounded-lg p-4">
                    <h4 class="font-semibold text-lg mb-2">::forWhom</h4>
                    <p class="text-gray-600 mb-2">
                      Voor wie is de behandeling geschikt
                    </p>
                    <pre
                      class="bg-gray-100 p-2 rounded text-sm"
                    ><code>### ::forWhom
title: Voor wie?
items:
- Doelgroep 1
- Doelgroep 2
---
::</code></pre>
                  </div>

                  <div class="border border-gray-200 rounded-lg p-4">
                    <h4 class="font-semibold text-lg mb-2">::infoBox</h4>
                    <p class="text-gray-600 mb-2">Informatievak met icoon</p>
                    <pre
                      class="bg-gray-100 p-2 rounded text-sm"
                    ><code>## ::infoBox
icon: i-mdi-information
title: Titel
---
Inhoud van het informatievak
::</code></pre>
                  </div>

                  <div class="border border-gray-200 rounded-lg p-4">
                    <h4 class="font-semibold text-lg mb-2">::expandableInfo</h4>
                    <p class="text-gray-600 mb-2">
                      Inklapbare sectie voor extra informatie
                    </p>
                    <pre
                      class="bg-gray-100 p-2 rounded text-sm"
                    ><code>## ::expandableInfo
title: Meer informatie
---
Uitgebreide content die ingeklapt kan worden
::</code></pre>
                  </div>
                </div>

                <h3>Afbeeldingen</h3>
                <ul>
                  <li>Plaats afbeeldingen in <code>/public/images/</code></li>
                  <li>Gebruik WebP formaat voor betere prestaties</li>
                  <li>Voeg altijd beschrijvende alt tekst toe</li>
                  <li>
                    Aanbevolen formaten:
                    <ul>
                      <li>Hero/grote afbeeldingen: 1200x800px</li>
                      <li>Sectie afbeeldingen: 600x400px</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </UCard>
          </section>

          <!-- Troubleshooting -->
          <section id="troubleshooting" class="scroll-mt-8">
            <UCard>
              <template #header>
                <h2 class="text-2xl font-bold flex items-center gap-3">
                  <UIcon
                    name="i-mdi-help-circle"
                    class="w-6 h-6 text-red-600"
                  />
                  Probleemoplossing
                </h2>
              </template>

              <div class="prose prose-neutral max-w-none">
                <h3>Veel Voorkomende Problemen</h3>

                <div class="space-y-6">
                  <div class="border-l-4 border-red-500 pl-4">
                    <h4 class="font-semibold text-red-700">
                      Behandeling niet zichtbaar op website
                    </h4>
                    <ul class="text-gray-700">
                      <li>
                        Controleer of de status op "actief" staat in de admin
                      </li>
                      <li>
                        Zorg dat er een bijbehorend <code>.md</code> bestand
                        bestaat
                      </li>
                      <li>Controleer of de slug correct is</li>
                    </ul>
                  </div>

                  <div class="border-l-4 border-yellow-500 pl-4">
                    <h4 class="font-semibold text-yellow-700">
                      Prijs of duur worden niet getoond
                    </h4>
                    <ul class="text-gray-700">
                      <li>
                        Database data heeft altijd voorrang over content data
                      </li>
                      <li>Controleer de waarden in de admin interface</li>
                      <li>Herlaad de pagina om cache te vernieuwen</li>
                    </ul>
                  </div>

                  <div class="border-l-4 border-blue-500 pl-4">
                    <h4 class="font-semibold text-blue-700">
                      Content wordt niet correct weergegeven
                    </h4>
                    <ul class="text-gray-700">
                      <li>
                        Controleer de markdown syntax in het
                        <code>.md</code> bestand
                      </li>
                      <li>
                        Zorg dat component definities correct zijn (met
                        <code>::</code>)
                      </li>
                      <li>
                        Controleer of alle vereiste parameters zijn ingevuld
                      </li>
                    </ul>
                  </div>

                  <div class="border-l-4 border-green-500 pl-4">
                    <h4 class="font-semibold text-green-700">Slug wijzigen</h4>
                    <ul class="text-gray-700">
                      <li>Wijzig eerst de slug in de admin interface</li>
                      <li>
                        Hernoem daarna het content bestand naar de nieuwe slug
                      </li>
                      <li>
                        Test de nieuwe URL om te controleren of alles werkt
                      </li>
                    </ul>
                  </div>
                </div>

                <h3>Hulp Nodig?</h3>
                <p>
                  Als je problemen ondervindt die niet in deze documentatie
                  staan, neem dan contact op met de technische beheerder of
                  raadpleeg de technische documentatie in de
                  <code>/docs</code> map.
                </p>

                <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 class="font-semibold text-blue-900 mb-2">
                    Nuttige Admin Links:
                  </h4>
                  <ul class="text-blue-800 space-y-2">
                    <li>
                      <NuxtLink :to="routes.admin.treatments" class="underline"
                        >Behandelingen Beheren (Database)</NuxtLink
                      >
                    </li>
                    <li>
                      <NuxtLink :to="routes.admin.seoOverview" class="underline"
                        >SEO Overzicht</NuxtLink
                      >
                    </li>
                    <li>
                      <NuxtLink :to="routes.admin.dashboard" class="underline"
                        >Admin Dashboard</NuxtLink
                      >
                    </li>
                  </ul>
                </div>

                <div
                  class="bg-purple-50 border border-purple-200 rounded-lg p-4 mt-4"
                >
                  <h4
                    class="font-semibold text-purple-900 mb-2 flex items-center gap-2"
                  >
                    <UIcon name="i-mdi-pencil-box" class="w-5 h-5" />
                    Content Management (Nuxt Studio):
                  </h4>
                  <ul class="text-purple-800 space-y-2">
                    <li>
                      <a
                        href="https://nuxt.studio"
                        target="_blank"
                        rel="noopener"
                        class="underline"
                        >Nuxt Studio CMS ↗</a
                      >
                    </li>
                    <li class="text-sm text-purple-600">
                      Voor het bewerken van content, afbeeldingen en teksten
                    </li>
                  </ul>
                </div>
              </div>
            </UCard>
          </section>
        </div>
      </div>
    </UContainer>
  </div>
</template>
