<template>
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
        <div class="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
          <h3
            class="text-lg font-semibold text-purple-900 mb-2 flex items-center gap-2"
          >
            <UIcon name="i-mdi-star" class="w-5 h-5" />
            Twee Content Systemen
          </h3>
          <div class="text-purple-800 space-y-2">
            <p>
              <strong>
                <NuxtLink
                  to="/admin/treatments"
                  class="text-blue-600 hover:text-blue-800 underline"
                >
                  Database (Admin Interface) </NuxtLink
                >:
              </strong>
              Voor prijzen, duur, intensiteit en metadata
            </p>
            <p>
              <strong>Nuxt Studio CMS:</strong> Voor rijke content, teksten,
              afbeeldingen en componenten
            </p>
          </div>
        </div>

        <h3 class="text-xl font-bold text-gray-900 mt-8 mb-6">
          Content Beheer via Nuxt Studio
        </h3>

        <p class="text-lg leading-relaxed mb-6">
          Alle behandeling content wordt beheerd via Nuxt Studio. Dit is de
          enige methode voor het aanmaken en bewerken van behandeling content.
        </p>

        <h4 class="mt-8 mb-4">Toegang tot Nuxt Studio:</h4>
        <ol class="space-y-3 mb-8">
          <li class="leading-relaxed">
            Ga naar
            <a
              href="https://nuxt.studio"
              target="_blank"
              class="text-blue-600 underline"
              >nuxt.studio ↗</a
            >
          </li>
          <li class="leading-relaxed">Verbind met Enisa's GitHub account</li>
          <li class="leading-relaxed">
            Selecteer je repository: EnisaHealingAndMassage
          </li>
          <li class="leading-relaxed">
            Navigeer naar de map: <code>/content/treatments/</code>
          </li>
        </ol>

        <h4 class="mt-8 mb-4">Content Workflow:</h4>
        <ol class="space-y-4 mb-8">
          <li class="leading-relaxed">
            <strong>Maak eerst de database record aan</strong> via de
            <NuxtLink
              to="/admin/treatments"
              class="text-blue-600 hover:text-blue-800 underline"
            >
              admin interface
            </NuxtLink>
            <div class="text-gray-600 text-sm mt-1">
              (naam, slug, prijs, duur, intensiteit, icoon)
            </div>
          </li>
          <li class="leading-relaxed">
            <strong>Open Nuxt Studio</strong> en navigeer naar
            <code>/content/treatments/</code>
          </li>
          <li class="leading-relaxed">
            <strong>Maak een nieuw bestand aan</strong> met de exacte slug uit
            de database
            <div class="text-gray-600 text-sm mt-1">
              Bijvoorbeeld: <code>klassieke-ontspanningsmassage.md</code>
            </div>
          </li>
          <li class="leading-relaxed">
            <strong>Voeg content componenten toe</strong> voor beschrijvingen,
            voordelen, en afbeeldingen
          </li>
          <li class="leading-relaxed">
            <strong>Publiceer de wijzigingen</strong> direct vanuit Nuxt Studio
          </li>
        </ol>

        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 my-6">
          <h4 class="text-lg font-semibold text-blue-900 mb-2">
            Verdeling van Verantwoordelijkheden
          </h4>
          <div class="text-blue-800 space-y-2 text-sm">
            <p>
              <strong>Admin Interface:</strong> Naam, slug, prijs, duur,
              intensiteit, icoon, status
            </p>
            <p>
              <strong>Nuxt Studio:</strong> Beschrijvingen, voordelen,
              afbeeldingen, tekstcontent
            </p>
          </div>
        </div>

        <h3 class="text-xl font-bold text-gray-900 mt-12 mb-8">
          Beschikbare Content Components
        </h3>

        <div class="space-y-8">
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
            <h4 class="font-semibold text-lg mb-2">::treatmentSection</h4>
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
            <pre class="bg-gray-100 p-2 rounded text-sm"><code>### ::benefitList
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
            <pre class="bg-gray-100 p-2 rounded text-sm"><code>### ::forWhom
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
            <pre class="bg-gray-100 p-2 rounded text-sm"><code>## ::infoBox
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

        <h3 class="text-xl font-bold text-gray-900 mt-12 mb-6">
          Afbeelding Beheer
        </h3>

        <ul class="space-y-3 leading-relaxed mb-8">
          <li>
            <strong>Upload via Nuxt Studio:</strong> Gebruik de media manager in
            Nuxt Studio
          </li>
          <li>
            <strong>Bestandsformaat:</strong> WebP wordt automatisch gegenereerd
          </li>
          <li>
            <strong>Alt tekst:</strong> Altijd toevoegen voor toegankelijkheid
          </li>
          <li>
            <strong>Locatie:</strong> Afbeeldingen worden opgeslagen in
            <code>/public/images/</code>
          </li>
        </ul>

        <div class="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-6">
          <h4 class="text-lg font-semibold text-amber-900 mb-2">Belangrijk</h4>
          <p class="text-amber-800">
            Gebruik uitsluitend Nuxt Studio voor content beheer. Directe
            bewerking van markdown bestanden wordt niet ondersteund en kan tot
            conflicten leiden.
          </p>
        </div>
      </div>
    </UCard>
  </section>
</template>
