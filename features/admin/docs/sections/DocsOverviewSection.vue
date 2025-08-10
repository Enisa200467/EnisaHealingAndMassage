<template>
  <section id="overview" class="scroll-mt-8">
    <UCard>
      <template #header>
        <h2 class="text-2xl font-bold flex items-center gap-3">
          <UIcon name="i-mdi-information" class="w-6 h-6 text-primary-600" />
          Overzicht van het Behandelingen Systeem
        </h2>
      </template>

      <div class="prose prose-neutral max-w-none">
        <p class="text-lg text-neutral-700 mb-6">
          Het behandelingen systeem gebruikt een hybride architectuur waarbij
          gegevens worden opgeslagen in de database en rijke content in markdown
          bestanden.
        </p>

        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3
            class="text-lg font-semibold text-blue-900 mb-2 flex items-center gap-2"
          >
            <UIcon name="i-mdi-lightbulb" class="w-5 h-5" />
            Belangrijke Concepten
          </h3>
          <ul class="text-blue-800 space-y-1">
            <li>
              <strong>Database:</strong> Bevat metadata (naam, prijs, duur,
              intensiteit)
            </li>
            <li>
              <strong>Content bestanden:</strong> Bevatten rijke beschrijvingen
              en componenten
            </li>
            <li>
              <strong>Slug:</strong> URL-vriendelijke identifier (automatisch
              gegenereerd)
            </li>
            <li>
              <strong>Status:</strong> Actief/inactief voor publicatie controle
            </li>
          </ul>
        </div>

        <h3 class="text-xl font-bold text-gray-900 mt-8 mb-4">
          Bestandslocaties:
        </h3>
        <ul>
          <li>
            <code>/features/admin/</code> - Admin interface (Vertical Slice
            Architecture)
          </li>
          <li><code>/content/treatments/</code> - Content bestanden (.md)</li>
          <li>
            <code>/pages/behandelingen/[...slug].vue</code> - Publieke
            behandeling pagina's
          </li>
          <li><code>/features/treatments/</code> - Treatment feature slice</li>
        </ul>

        <div class="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
          <h3
            class="text-lg font-semibold text-green-900 mb-2 flex items-center gap-2"
          >
            <UIcon name="i-mdi-architecture" class="w-5 h-5" />
            Vertical Slice Architecture
          </h3>
          <p class="text-green-800">
            Deze documentatie volgt nu de vertical slice architecture, waarbij
            elke feature (admin, docs, treatments) zijn eigen map heeft met alle
            benodigde componenten, composables en types georganiseerd per
            functionaliteit.
          </p>
        </div>
      </div>
    </UCard>
  </section>
</template>
