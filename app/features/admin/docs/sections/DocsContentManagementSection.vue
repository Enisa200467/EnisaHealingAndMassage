<template>
  <section id="content-management" class="scroll-mt-8">
    <UCard>
      <template #header>
        <h2 class="text-2xl font-bold flex items-center gap-3">
          <UIcon
            name="i-mdi-file-document-edit"
            class="w-6 h-6 text-purple-600"
          />
          Content Beheer - Complete Gids
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
              Bijvoorbeeld: <code>chakra-balancering.md</code>
            </div>
          </li>
          <li class="leading-relaxed">
            <strong>Kopieer de basis template</strong> (zie hieronder) en vul
            deze aan
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

        <!-- COMPLETE COMPONENT DOCUMENTATION -->
        <h3 class="text-xl font-bold text-gray-900 mt-12 mb-8">
          📚 Beschikbare Content Componenten
        </h3>

        <p class="text-gray-600 mb-6">
          Alle componenten gebruiken <strong>Nederlandse kebab-case namen</strong> voor makkelijk onderhoud.
          Hieronder vind je een complete beschrijving van elk component met voorbeelden.
        </p>

        <div class="space-y-8">
          <!-- 1. behandeling-hero -->
          <div class="border-2 border-purple-200 rounded-lg p-6 bg-purple-50">
            <div class="flex items-start justify-between mb-4">
              <div>
                <h4 class="font-bold text-xl text-purple-900 mb-2">1. ::behandeling-hero</h4>
                <p class="text-purple-700 font-medium">Pagina header met behandelingsinformatie</p>
              </div>
              <UBadge color="purple" variant="soft">Verplicht</UBadge>
            </div>

            <div class="bg-white rounded p-4 mb-4">
              <p class="text-gray-700 mb-3"><strong>Doel:</strong> Toont automatisch de titel, prijs, duur en intensiteit bovenaan de pagina door data uit de database te halen.</p>

              <p class="text-sm text-gray-600 mb-2"><strong>Vereist veld:</strong></p>
              <ul class="text-sm text-gray-600 ml-4">
                <li>• <code>id</code>: Het UUID van de behandeling uit de database</li>
              </ul>
            </div>

            <p class="text-sm font-semibold text-purple-900 mb-2">Voorbeeld:</p>
            <pre class="bg-gray-900 text-gray-100 p-4 rounded text-sm overflow-x-auto"><code>::behandeling-hero
---
id: 75be22cd-31df-48bd-bd9f-337360edb2c4
---
::</code></pre>

            <div class="bg-amber-50 border border-amber-300 rounded p-3 mt-4">
              <p class="text-amber-900 text-sm">
                <strong>⚠️ Belangrijk:</strong> Het <code>id</code> moet exact overeenkomen met het UUID in de database!
              </p>
            </div>
          </div>

          <!-- 2. behandeling-sectie -->
          <div class="border-2 border-blue-200 rounded-lg p-6 bg-blue-50">
            <div class="flex items-start justify-between mb-4">
              <div>
                <h4 class="font-bold text-xl text-blue-900 mb-2">2. ::behandeling-sectie</h4>
                <p class="text-blue-700 font-medium">Sectie met afbeelding en bullet points</p>
              </div>
            </div>

            <div class="bg-white rounded p-4 mb-4">
              <p class="text-gray-700 mb-3"><strong>Doel:</strong> Sectie met titel, afbeelding en lijst van verwachtingen of stappen.</p>

              <p class="text-sm text-gray-600 mb-2"><strong>Velden:</strong></p>
              <ul class="text-sm text-gray-600 ml-4 space-y-1">
                <li>• <code>title</code>: Titel van de sectie</li>
                <li>• <code>image</code>: Pad naar afbeelding (bijv. <code>/images/chakra-healing.webp</code>)</li>
                <li>• <code>imageAlt</code>: Alt-tekst voor toegankelijkheid (verplicht!)</li>
                <li>• <code>items</code>: Lijst met bullet points</li>
              </ul>
            </div>

            <p class="text-sm font-semibold text-blue-900 mb-2">Voorbeeld:</p>
            <pre class="bg-gray-900 text-gray-100 p-4 rounded text-sm overflow-x-auto"><code>::behandeling-sectie
---
title: Wat kun je verwachten?
image: /images/chakra-healing.webp
imageAlt: Sfeerbeeld van een chakra balancering sessie
items:
  - "Handoplegging: Zachte aanraking"
  - "Visualisatie: Geleide meditaties"
  - "Ademhalingstechnieken"
---
Beschrijvende tekst over de behandeling die onder de items komt.
::</code></pre>
          </div>

          <!-- 3. twee-kolommen -->
          <div class="border-2 border-green-200 rounded-lg p-6 bg-green-50">
            <div class="flex items-start justify-between mb-4">
              <div>
                <h4 class="font-bold text-xl text-green-900 mb-2">3. ::twee-kolommen</h4>
                <p class="text-green-700 font-medium">Wrapper voor voordelen en doelgroep naast elkaar</p>
              </div>
            </div>

            <div class="bg-white rounded p-4 mb-4">
              <p class="text-gray-700 mb-3"><strong>Doel:</strong> Wrapper component die twee kolommen naast elkaar toont (op desktop) met voordelen en doelgroep informatie.</p>

              <p class="text-sm text-gray-600 mb-2"><strong>Gebruik:</strong></p>
              <p class="text-sm text-gray-600 ml-4">Bevat altijd geneste componenten <code>:::voordelen-lijst</code> en <code>:::voor-wie</code></p>
            </div>

            <p class="text-sm font-semibold text-green-900 mb-2">Voorbeeld:</p>
            <pre class="bg-gray-900 text-gray-100 p-4 rounded text-sm overflow-x-auto"><code>::twee-kolommen
  :::voordelen-lijst
  ---
  title: Belangrijkste Voordelen
  items:
    - Eerste voordeel
    - Tweede voordeel
    - Derde voordeel
  ---
  :::

  :::voor-wie
  ---
  title: Voor Wie?
  items:
    - Voor mensen die X
    - Op zoek bent naar Y
  ---
  :::
::</code></pre>

            <div class="bg-green-100 border border-green-300 rounded p-3 mt-4">
              <p class="text-green-900 text-sm">
                <strong>💡 Let op:</strong> Gebruik <code>:::</code> (drie dubbele punten) voor geneste componenten!
              </p>
            </div>
          </div>

          <!-- 4. voordelen-lijst -->
          <div class="border-2 border-teal-200 rounded-lg p-6 bg-teal-50">
            <div class="flex items-start justify-between mb-4">
              <div>
                <h4 class="font-bold text-xl text-teal-900 mb-2">4. :::voordelen-lijst</h4>
                <p class="text-teal-700 font-medium">Lijst met groene vinkjes</p>
              </div>
              <UBadge color="teal" variant="soft">Genest</UBadge>
            </div>

            <div class="bg-white rounded p-4 mb-4">
              <p class="text-gray-700 mb-3"><strong>Doel:</strong> Toont een lijst met voordelen met groene vinkjes.</p>

              <p class="text-sm text-gray-600 mb-2"><strong>Velden:</strong></p>
              <ul class="text-sm text-gray-600 ml-4">
                <li>• <code>title</code>: Titel van de sectie</li>
                <li>• <code>items</code>: Lijst met voordelen</li>
              </ul>
            </div>

            <p class="text-sm font-semibold text-teal-900 mb-2">Gebruik (binnen ::twee-kolommen):</p>
            <pre class="bg-gray-900 text-gray-100 p-4 rounded text-sm overflow-x-auto"><code>:::voordelen-lijst
---
title: Belangrijkste Voordelen
items:
  - Verlicht spierpijn
  - Bevordert ontspanning
  - Verbetert circulatie
---
:::</code></pre>
          </div>

          <!-- 5. voor-wie -->
          <div class="border-2 border-indigo-200 rounded-lg p-6 bg-indigo-50">
            <div class="flex items-start justify-between mb-4">
              <div>
                <h4 class="font-bold text-xl text-indigo-900 mb-2">5. :::voor-wie</h4>
                <p class="text-indigo-700 font-medium">Doelgroep informatie</p>
              </div>
              <UBadge color="indigo" variant="soft">Genest</UBadge>
            </div>

            <div class="bg-white rounded p-4 mb-4">
              <p class="text-gray-700 mb-3"><strong>Doel:</strong> Toont voor wie de behandeling geschikt is.</p>

              <p class="text-sm text-gray-600 mb-2"><strong>Velden:</strong></p>
              <ul class="text-sm text-gray-600 ml-4">
                <li>• <code>title</code>: Titel van de sectie</li>
                <li>• <code>items</code>: Lijst met doelgroep kenmerken</li>
              </ul>
            </div>

            <p class="text-sm font-semibold text-indigo-900 mb-2">Gebruik (binnen ::twee-kolommen):</p>
            <pre class="bg-gray-900 text-gray-100 p-4 rounded text-sm overflow-x-auto"><code>:::voor-wie
---
title: Geschikt voor jou als je
items:
  - Last hebt van stress
  - Ontspanning zoekt
  - Balans wilt herstellen
---
:::</code></pre>
          </div>

          <!-- 6. uitklap-info -->
          <div class="border-2 border-yellow-200 rounded-lg p-6 bg-yellow-50">
            <div class="flex items-start justify-between mb-4">
              <div>
                <h4 class="font-bold text-xl text-yellow-900 mb-2">6. ::uitklap-info</h4>
                <p class="text-yellow-700 font-medium">Inklapbare extra informatie</p>
              </div>
            </div>

            <div class="bg-white rounded p-4 mb-4">
              <p class="text-gray-700 mb-3"><strong>Doel:</strong> Inklapbare sectie voor uitgebreide informatie die niet direct zichtbaar hoeft te zijn.</p>

              <p class="text-sm text-gray-600 mb-2"><strong>Velden:</strong></p>
              <ul class="text-sm text-gray-600 ml-4">
                <li>• <code>title</code>: Titel die altijd zichtbaar blijft</li>
              </ul>
            </div>

            <p class="text-sm font-semibold text-yellow-900 mb-2">Voorbeeld:</p>
            <pre class="bg-gray-900 text-gray-100 p-4 rounded text-sm overflow-x-auto"><code>::uitklap-info
---
title: Meer over chakra balancering
---
### Subtitle

Je kunt hier markdown gebruiken:
- Bullet points
- **Vet gedrukte** tekst
- Links, tabellen, etc.
::</code></pre>
          </div>

          <!-- 7. info-blok -->
          <div class="border-2 border-red-200 rounded-lg p-6 bg-red-50">
            <div class="flex items-start justify-between mb-4">
              <div>
                <h4 class="font-bold text-xl text-red-900 mb-2">7. ::info-blok</h4>
                <p class="text-red-700 font-medium">Gekleurde waarschuwings- of info box</p>
              </div>
            </div>

            <div class="bg-white rounded p-4 mb-4">
              <p class="text-gray-700 mb-3"><strong>Doel:</strong> Gekleurde box voor belangrijke informatie, waarschuwingen of disclaimers.</p>

              <p class="text-sm text-gray-600 mb-2"><strong>Velden:</strong></p>
              <ul class="text-sm text-gray-600 ml-4 space-y-1">
                <li>• <code>icon</code>: Icon naam (bijv. <code>i-mdi-alert</code>)</li>
                <li>• <code>title</code>: Titel van het blok</li>
                <li>• <code>type</code>: <code>info</code>, <code>warning</code>, <code>success</code>, of <code>error</code></li>
              </ul>
            </div>

            <p class="text-sm font-semibold text-red-900 mb-2">Voorbeeld:</p>
            <pre class="bg-gray-900 text-gray-100 p-4 rounded text-sm overflow-x-auto"><code>::info-blok{icon="i-mdi-alert" title="Belangrijke informatie" type="warning"}
Deze behandeling is niet geschikt tijdens de eerste drie maanden van de zwangerschap.
::</code></pre>
          </div>

          <!-- 8. afbeelding -->
          <div class="border-2 border-pink-200 rounded-lg p-6 bg-pink-50">
            <div class="flex items-start justify-between mb-4">
              <div>
                <h4 class="font-bold text-xl text-pink-900 mb-2">8. ::afbeelding</h4>
                <p class="text-pink-700 font-medium">Geoptimaliseerde afbeelding</p>
              </div>
            </div>

            <div class="bg-white rounded p-4 mb-4">
              <p class="text-gray-700 mb-3"><strong>Doel:</strong> Grote, geoptimaliseerde afbeelding met optioneel bijschrift.</p>

              <p class="text-sm text-gray-600 mb-2"><strong>Velden:</strong></p>
              <ul class="text-sm text-gray-600 ml-4">
                <li>• <code>src</code>: Pad naar afbeelding</li>
                <li>• <code>alt</code>: Alt-tekst (verplicht!)</li>
                <li>• <code>caption</code>: Optioneel bijschrift</li>
              </ul>
            </div>

            <p class="text-sm font-semibold text-pink-900 mb-2">Voorbeeld:</p>
            <pre class="bg-gray-900 text-gray-100 p-4 rounded text-sm overflow-x-auto"><code>::afbeelding
---
src: /images/treatment.webp
alt: Beschrijving van de afbeelding
caption: Optioneel bijschrift onder de afbeelding
---
::</code></pre>
          </div>

          <!-- 9. kop -->
          <div class="border-2 border-gray-300 rounded-lg p-6 bg-gray-100">
            <div class="flex items-start justify-between mb-4">
              <div>
                <h4 class="font-bold text-xl text-gray-900 mb-2">9. ::kop</h4>
                <p class="text-gray-700 font-medium">Custom heading met styling</p>
              </div>
            </div>

            <div class="bg-white rounded p-4 mb-4">
              <p class="text-gray-700 mb-3"><strong>Doel:</strong> Custom heading met extra styling opties.</p>

              <p class="text-sm text-gray-600 mb-2"><strong>Velden:</strong></p>
              <ul class="text-sm text-gray-600 ml-4">
                <li>• <code>level</code>: Heading level (1-6)</li>
                <li>• <code>centered</code>: Boolean voor centrering (optioneel)</li>
              </ul>
            </div>

            <p class="text-sm font-semibold text-gray-900 mb-2">Voorbeeld:</p>
            <pre class="bg-gray-900 text-gray-100 p-4 rounded text-sm overflow-x-auto"><code>::kop
---
level: 2
centered: true
---
Gecentreerde heading tekst
::</code></pre>
          </div>
        </div>

        <!-- QUICK REFERENCE TABLE -->
        <h3 class="text-xl font-bold text-gray-900 mt-12 mb-6">
          📋 Snelle Referentie Tabel
        </h3>

        <div class="overflow-x-auto">
          <table class="min-w-full border border-gray-300">
            <thead class="bg-gray-100">
              <tr>
                <th class="border border-gray-300 px-4 py-2 text-left">Component</th>
                <th class="border border-gray-300 px-4 py-2 text-left">Gebruik</th>
                <th class="border border-gray-300 px-4 py-2 text-center">Genest?</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-gray-300 px-4 py-2"><code>::behandeling-hero</code></td>
                <td class="border border-gray-300 px-4 py-2">Pagina header</td>
                <td class="border border-gray-300 px-4 py-2 text-center">Nee</td>
              </tr>
              <tr class="bg-gray-50">
                <td class="border border-gray-300 px-4 py-2"><code>::behandeling-sectie</code></td>
                <td class="border border-gray-300 px-4 py-2">Sectie met afbeelding</td>
                <td class="border border-gray-300 px-4 py-2 text-center">Nee</td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2"><code>::twee-kolommen</code></td>
                <td class="border border-gray-300 px-4 py-2">Wrapper voor 2 kolommen</td>
                <td class="border border-gray-300 px-4 py-2 text-center">Nee</td>
              </tr>
              <tr class="bg-gray-50">
                <td class="border border-gray-300 px-4 py-2"><code>:::voordelen-lijst</code></td>
                <td class="border border-gray-300 px-4 py-2">Voordelen lijst</td>
                <td class="border border-gray-300 px-4 py-2 text-center">Ja (met <code>:::</code>)</td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2"><code>:::voor-wie</code></td>
                <td class="border border-gray-300 px-4 py-2">Doelgroep info</td>
                <td class="border border-gray-300 px-4 py-2 text-center">Ja (met <code>:::</code>)</td>
              </tr>
              <tr class="bg-gray-50">
                <td class="border border-gray-300 px-4 py-2"><code>::uitklap-info</code></td>
                <td class="border border-gray-300 px-4 py-2">Inklapbare sectie</td>
                <td class="border border-gray-300 px-4 py-2 text-center">Nee</td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2"><code>::info-blok</code></td>
                <td class="border border-gray-300 px-4 py-2">Waarschuwing/info box</td>
                <td class="border border-gray-300 px-4 py-2 text-center">Nee</td>
              </tr>
              <tr class="bg-gray-50">
                <td class="border border-gray-300 px-4 py-2"><code>::afbeelding</code></td>
                <td class="border border-gray-300 px-4 py-2">Grote afbeelding</td>
                <td class="border border-gray-300 px-4 py-2 text-center">Nee</td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2"><code>::kop</code></td>
                <td class="border border-gray-300 px-4 py-2">Custom heading</td>
                <td class="border border-gray-300 px-4 py-2 text-center">Nee</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- AFBEELDINGEN -->
        <h3 class="text-xl font-bold text-gray-900 mt-12 mb-6">
          🖼️ Afbeeldingen Beheren
        </h3>

        <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h4 class="font-semibold text-blue-900 mb-3">Afbeelding Guidelines</h4>
          <ul class="space-y-3 leading-relaxed text-blue-800">
            <li class="flex items-start gap-2">
              <span class="text-blue-600 mt-1">📁</span>
              <div>
                <strong>Locatie:</strong> Plaats afbeeldingen in <code>/public/images/</code>
              </div>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-blue-600 mt-1">🖼️</span>
              <div>
                <strong>Formaat:</strong> WebP wordt automatisch gegenereerd (gebruik .webp extensie)
              </div>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-blue-600 mt-1">📝</span>
              <div>
                <strong>Bestandsnamen:</strong> Gebruik beschrijvende namen (bijv. <code>chakra-healing.webp</code>)
              </div>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-blue-600 mt-1">♿</span>
              <div>
                <strong>Alt tekst:</strong> Altijd verplicht toevoegen voor toegankelijkheid
              </div>
            </li>
          </ul>
        </div>

        <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p class="font-semibold mb-2">Aanbevolen afmetingen:</p>
          <ul class="text-sm text-gray-700 space-y-1">
            <li>• <strong>Hero afbeeldingen:</strong> 1200x800px</li>
            <li>• <strong>Sectie afbeeldingen:</strong> 600x400px</li>
          </ul>
        </div>

        <!-- COMPLETE TEMPLATE -->
        <section id="content-template" class="scroll-mt-8">
          <h3 class="text-xl font-bold text-gray-900 mt-12 mb-6">
            📄 Complete Template
          </h3>

          <p class="leading-relaxed mb-6">
            Kopieer deze complete template naar Nuxt Studio en pas de inhoud aan voor je nieuwe behandeling:
          </p>

          <div class="bg-gray-50 border-2 border-gray-300 rounded-lg p-1 mb-6">
            <pre class="bg-gray-900 text-gray-100 rounded-lg p-4 text-sm overflow-x-auto m-0"><code>::behandeling-hero
---
id: [VERVANG-MET-DATABASE-UUID]
---
::

::behandeling-sectie
---
title: Wat kun je verwachten?
image: /images/[jouw-afbeelding].webp
imageAlt: Beschrijvende alt tekst voor de afbeelding
items:
  - Eerste verwachting of stap
  - Tweede verwachting of stap
  - Derde verwachting of stap
---
Beschrijvende tekst over wat de cliënt kan verwachten tijdens de behandeling.
::

::twee-kolommen
  :::voordelen-lijst
  ---
  title: Belangrijkste Voordelen
  items:
    - Voordeel 1
    - Voordeel 2
    - Voordeel 3
  ---
  :::

  :::voor-wie
  ---
  title: Geschikt voor jou als je
  items:
    - Kenmerk of situatie 1
    - Kenmerk of situatie 2
    - Kenmerk of situatie 3
  ---
  :::
::

::uitklap-info
---
title: Meer informatie
---
### Extra Achtergrond

Hier kun je uitgebreide informatie plaatsen:
- Die niet direct zichtbaar hoeft te zijn
- Maar wel beschikbaar voor geïnteresseerde bezoekers
- Gebruik markdown voor opmaak

### Nog Meer Details

Je kunt meerdere secties toevoegen binnen uitklap-info.
::

::info-blok{icon="i-mdi-alert" title="Belangrijke informatie" type="warning"}
Voeg hier belangrijke waarschuwingen, disclaimers of contra-indicaties toe.
::</code></pre>
          </div>

          <div class="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <h4 class="text-lg font-semibold text-green-900 mb-3 flex items-center gap-2">
              <UIcon name="i-mdi-lightbulb" class="w-5 h-5" />
              Tips voor Gebruik
            </h4>
            <ul class="text-green-800 space-y-2">
              <li class="flex items-start gap-2">
                <span class="text-green-600 mt-0.5">✓</span>
                <span>Kopieer deze template naar Nuxt Studio en pas aan</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-green-600 mt-0.5">✓</span>
                <span>Vervang [VERVANG-MET-DATABASE-UUID] met het echte ID uit de database</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-green-600 mt-0.5">✓</span>
                <span>Upload afbeeldingen eerst via Nuxt Studio media manager</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-green-600 mt-0.5">✓</span>
                <span>Test de pagina na publicatie: <code>/behandelingen/[slug]</code></span>
              </li>
            </ul>
          </div>
        </section>

        <!-- TROUBLESHOOTING -->
        <h3 class="text-xl font-bold text-gray-900 mt-12 mb-6">
          🔧 Veelvoorkomende Problemen
        </h3>

        <div class="space-y-6">
          <div class="border border-red-200 rounded-lg p-4 bg-red-50">
            <h4 class="font-semibold text-red-900 mb-2">❌ Behandeling verschijnt niet op de website</h4>
            <p class="text-red-800 text-sm mb-2"><strong>Oplossingen:</strong></p>
            <ul class="text-red-800 text-sm space-y-1 ml-4">
              <li>• Check of <code>is_active</code> op <code>true</code> staat in de database</li>
              <li>• Verifieer dat de slug overeenkomt tussen database en bestandsnaam</li>
              <li>• Controleer of het content bestand geen syntax errors heeft</li>
              <li>• Kijk of het bestand gepubliceerd is in Nuxt Studio</li>
            </ul>
          </div>

          <div class="border border-orange-200 rounded-lg p-4 bg-orange-50">
            <h4 class="font-semibold text-orange-900 mb-2">❌ Prijs of duur klopt niet</h4>
            <p class="text-orange-800 text-sm mb-2"><strong>Oplossing:</strong></p>
            <ul class="text-orange-800 text-sm space-y-1 ml-4">
              <li>• Update de database via de admin panel</li>
              <li>• Database waarden hebben voorrang boven content waarden</li>
              <li>• Refresh de pagina na het opslaan</li>
            </ul>
          </div>

          <div class="border border-yellow-200 rounded-lg p-4 bg-yellow-50">
            <h4 class="font-semibold text-yellow-900 mb-2">❌ Afbeelding wordt niet getoond</h4>
            <p class="text-yellow-800 text-sm mb-2"><strong>Oplossingen:</strong></p>
            <ul class="text-yellow-800 text-sm space-y-1 ml-4">
              <li>• Check of het pad klopt: <code>/images/bestandsnaam.webp</code></li>
              <li>• Verifieer dat het bestand bestaat in <code>/public/images/</code></li>
              <li>• Let op hoofdletters/kleine letters in bestandsnamen (case-sensitive!)</li>
              <li>• Controleer of de afbeelding correct geüpload is</li>
            </ul>
          </div>

          <div class="border border-purple-200 rounded-lg p-4 bg-purple-50">
            <h4 class="font-semibold text-purple-900 mb-2">❌ Component werkt niet of geeft error</h4>
            <p class="text-purple-800 text-sm mb-2"><strong>Oplossingen:</strong></p>
            <ul class="text-purple-800 text-sm space-y-1 ml-4">
              <li>• Gebruik <strong>kebab-case</strong> voor component namen (bijv. <code>::behandeling-sectie</code>)</li>
              <li>• Check of de <code>---</code> lijnen correct zijn geplaatst (voor EN na de velden)</li>
              <li>• Gebruik <code>:::</code> (3 dubbele punten) voor geneste componenten binnen <code>::twee-kolommen</code></li>
              <li>• Controleer of alle verplichte velden zijn ingevuld</li>
              <li>• Let op correcte inspringing (indentation) bij geneste componenten</li>
            </ul>
          </div>

          <div class="border border-blue-200 rounded-lg p-4 bg-blue-50">
            <h4 class="font-semibold text-blue-900 mb-2">❌ Database ID niet gevonden</h4>
            <p class="text-blue-800 text-sm mb-2"><strong>Oplossing:</strong></p>
            <ul class="text-blue-800 text-sm space-y-1 ml-4">
              <li>• Ga naar <NuxtLink to="/admin/treatments" class="underline">Admin → Behandelingen</NuxtLink></li>
              <li>• Klik op de behandeling die je wilt bewerken</li>
              <li>• Kopieer het UUID (lange string van letters en cijfers)</li>
              <li>• Plak dit exact in het <code>id</code> veld van <code>::behandeling-hero</code></li>
            </ul>
          </div>
        </div>

        <!-- SYNCHRONISATIE CHECKLIST -->
        <h3 class="text-xl font-bold text-gray-900 mt-12 mb-6">
          ✅ Synchronisatie Checklist
        </h3>

        <div class="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-300 rounded-lg p-6">
          <p class="font-semibold text-gray-900 mb-4">Bij het aanmaken of bewerken van een behandeling:</p>
          <div class="space-y-2">
            <label class="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" class="mt-1" disabled />
              <span class="text-gray-800">Database record heeft juiste informatie (naam, prijs, duur, etc.)</span>
            </label>
            <label class="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" class="mt-1" disabled />
              <span class="text-gray-800">Slug in database komt overeen met bestandsnaam in <code>/content/treatments/</code></span>
            </label>
            <label class="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" class="mt-1" disabled />
              <span class="text-gray-800"><code>id</code> in <code>::behandeling-hero</code> komt overeen met database UUID</span>
            </label>
            <label class="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" class="mt-1" disabled />
              <span class="text-gray-800">Alle vereiste velden zijn ingevuld</span>
            </label>
            <label class="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" class="mt-1" disabled />
              <span class="text-gray-800">Afbeeldingen bestaan in <code>/public/images/</code></span>
            </label>
            <label class="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" class="mt-1" disabled />
              <span class="text-gray-800">Alt-teksten zijn beschrijvend en compleet</span>
            </label>
            <label class="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" class="mt-1" disabled />
              <span class="text-gray-800">Preview de pagina op <code>/behandelingen/[slug]</code></span>
            </label>
            <label class="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" class="mt-1" disabled />
              <span class="text-gray-800">Prijs is identiek in database én Setmore</span>
            </label>
          </div>
        </div>

        <!-- MARKDOWN BASICS -->
        <h3 class="text-xl font-bold text-gray-900 mt-12 mb-6">
          📝 Markdown Basics
        </h3>

        <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <p class="text-gray-700 mb-4">Voor niet-developers: Deze basis markdown syntax kun je gebruiken in content:</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p class="font-semibold text-sm mb-2">Code:</p>
              <pre class="bg-white p-2 rounded text-xs border"><code>**vet gedrukt**
*cursief*
- Bullet point
1. Genummerde lijst</code></pre>
            </div>
            <div>
              <p class="font-semibold text-sm mb-2">Resultaat:</p>
              <div class="bg-white p-2 rounded text-sm border">
                <strong>vet gedrukt</strong><br />
                <em>cursief</em>
                <ul class="list-disc ml-4">
                  <li>Bullet point</li>
                </ul>
                <ol class="list-decimal ml-4">
                  <li>Genummerde lijst</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-6">
          <h4 class="text-lg font-semibold text-amber-900 mb-2">💡 Pro Tip</h4>
          <p class="text-amber-800">
            <strong>Kopieer een bestaand bestand:</strong> De makkelijkste manier om te beginnen is
            <code>chakra-balancering.md</code> te kopiëren als template en de inhoud aan te passen naar je nieuwe behandeling.
          </p>
        </div>
      </div>
    </UCard>
  </section>
</template>
