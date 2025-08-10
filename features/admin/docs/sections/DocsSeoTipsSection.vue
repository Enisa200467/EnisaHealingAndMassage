<template>
  <section id="seo-tips" class="scroll-mt-8">
    <UCard>
      <template #header>
        <h2 class="text-2xl font-bold flex items-center gap-3">
          <UIcon name="i-mdi-search-web" class="w-6 h-6 text-indigo-600" />
          SEO Tips & Best Practices
        </h2>
      </template>

      <div class="prose prose-neutral max-w-none">
        <div class="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
          <h3
            class="text-lg font-semibold text-indigo-900 mb-2 flex items-center gap-2"
          >
            <UIcon name="i-mdi-lightbulb" class="w-5 h-5" />
            SEO Best Practices voor Behandelingen
          </h3>
          <p class="text-indigo-800">
            Volg deze richtlijnen om je behandeling pagina's optimaal vindbaar
            te maken in zoekmachines.
          </p>
        </div>

        <h3 class="text-xl font-bold text-gray-900 mt-8 mb-4">
          Titel Optimalisatie
        </h3>
        <ul>
          <li><strong>Lengte:</strong> Houd titels tussen 50-60 karakters</li>
          <li>
            <strong>Keywords:</strong> Gebruik relevante zoektermen aan het
            begin
          </li>
          <li>
            <strong>Locatie:</strong> Voeg geografische termen toe waar relevant
          </li>
          <li>
            <strong>Voorbeeld:</strong> "Klassieke Ontspanningsmassage Amsterdam
            | 60 min | €65"
          </li>
        </ul>

        <h3 class="text-xl font-bold text-gray-900 mt-8 mb-4">
          Meta Beschrijvingen
        </h3>
        <ul>
          <li>
            <strong>Lengte:</strong> 150-160 karakters voor optimale weergave
          </li>
          <li>
            <strong>Call-to-Action:</strong> Voeg een verleidelijke oproep toe
          </li>
          <li><strong>Voordelen:</strong> Benoem specifieke voordelen kort</li>
          <li>
            <strong>Uniek:</strong> Elke pagina moet een unieke beschrijving
            hebben
          </li>
        </ul>

        <h3 class="text-xl font-bold text-gray-900 mt-8 mb-4">
          Content Structuur
        </h3>
        <ul>
          <li>Gebruik hiërarchische heading structuur (H1 → H2 → H3)</li>
          <li>Schrijf lange, gedetailleerde content (min. 300 woorden)</li>
          <li>Gebruik semantische HTML componenten</li>
          <li>Voeg FAQ secties toe waar mogelijk</li>
        </ul>

        <h3 class="text-xl font-bold text-gray-900 mt-8 mb-4">
          Afbeelding SEO
        </h3>
        <ul>
          <li><strong>Alt tekst:</strong> Beschrijvend en keyword-rijk</li>
          <li><strong>Bestandsnamen:</strong> Gebruik descriptieve namen</li>
          <li><strong>Formaat:</strong> WebP voor beste prestaties</li>
          <li><strong>Grootte:</strong> Optimaliseer voor snelle laadtijden</li>
        </ul>

        <h3 class="text-xl font-bold text-gray-900 mt-8 mb-4">Schema Markup</h3>
        <p>Het systeem voegt automatisch structured data toe voor:</p>
        <ul>
          <li>MedicalTherapy schema voor behandelingen</li>
          <li>Organization schema voor bedrijfsgegevens</li>
          <li>LocalBusiness schema voor lokale SEO</li>
          <li>Review schema voor klantbeoordelingen</li>
        </ul>

        <div class="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
          <h4
            class="text-lg font-semibold text-green-900 mb-2 flex items-center gap-2"
          >
            <UIcon name="i-mdi-check-circle" class="w-5 h-5" />
            SEO Checklist
          </h4>
          <ul class="text-green-800 space-y-1">
            <li>✓ Unieke, keyword-rijke titel (50-60 karakters)</li>
            <li>✓ Beschrijvende meta description (150-160 karakters)</li>
            <li>✓ Optimale heading structuur (H1, H2, H3)</li>
            <li>✓ Gedetailleerde content (min. 300 woorden)</li>
            <li>✓ Alt tekst voor alle afbeeldingen</li>
            <li>✓ Interne links naar gerelateerde behandelingen</li>
            <li>✓ Mobile-first responsive design</li>
            <li>✓ Snelle laadtijd (&lt; 3 seconden)</li>
          </ul>
        </div>
      </div>
    </UCard>
  </section>
</template>
