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
        <!-- Two Systems Overview -->
        <div class="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
          <h3 class="text-lg font-semibold text-purple-900 mb-2">
            Twee Systemen
          </h3>
          <div class="text-purple-800 space-y-2 text-sm">
            <p>
              <strong>
                <NuxtLink
                  to="/admin/treatments"
                  class="text-blue-600 hover:text-blue-800 underline"
                >
                  Admin Interface </NuxtLink
                >:
              </strong>
              Prijzen, duur, intensiteit, metadata
            </p>
            <p>
              <strong>
                <a
                  href="https://nuxt.studio"
                  target="_blank"
                  class="text-blue-600 underline"
                  >Nuxt Studio</a
                >:
              </strong>
              Content, teksten, afbeeldingen, componenten
            </p>
          </div>
        </div>

        <!-- Quick Workflow -->
        <h3 class="text-xl font-bold text-gray-900 mt-8 mb-4">
          Snelle Workflow
        </h3>

        <div class="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <h4 class="font-semibold text-green-900 mb-3">
            Beste Methode: Dupliceer Bestaand Bestand
          </h4>
          <ol class="space-y-3 text-green-800">
            <li class="leading-relaxed">
              Open
              <a
                href="https://nuxt.studio"
                target="_blank"
                class="text-blue-600 underline"
                >Nuxt Studio</a
              >
              → <code>/content/treatments/</code>
            </li>
            <li class="leading-relaxed">
              Dupliceer <code>chakra-balancering.md</code> (of een andere
              vergelijkbare behandeling)
            </li>
            <li class="leading-relaxed">
              Hernoem naar je nieuwe slug (moet exact matchen met database)
            </li>
            <li class="leading-relaxed">
              Vervang het <code>id</code> in <code>::behandeling-hero</code>
              met het UUID uit de database
            </li>
            <li class="leading-relaxed">
              Pas alle teksten, afbeeldingen en content aan
            </li>
            <li class="leading-relaxed">
              Publiceer vanuit Nuxt Studio
            </li>
          </ol>
        </div>

        <!-- Component Reference -->
        <h3 class="text-xl font-bold text-gray-900 mt-12 mb-6">
          Componenten Referentie
        </h3>

        <p class="text-gray-600 mb-4">
          Componenten gebruiken <strong>kebab-case</strong>. Geneste
          componenten (binnen <code>::twee-kolommen</code>) gebruiken
          <code>:::</code> (drie dubbele punten).
        </p>

        <div class="overflow-x-auto mb-8">
          <table class="min-w-full border border-gray-300 text-sm">
            <thead class="bg-gray-100">
              <tr>
                <th class="border border-gray-300 px-3 py-2 text-left">
                  Component
                </th>
                <th class="border border-gray-300 px-3 py-2 text-left">
                  Gebruik
                </th>
                <th class="border border-gray-300 px-3 py-2 text-left">
                  Belangrijkste Velden
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-gray-300 px-3 py-2">
                  <code>::behandeling-hero</code>
                </td>
                <td class="border border-gray-300 px-3 py-2">
                  Pagina header (verplicht)
                </td>
                <td class="border border-gray-300 px-3 py-2">
                  <code>id</code> (UUID)
                </td>
              </tr>
              <tr class="bg-gray-50">
                <td class="border border-gray-300 px-3 py-2">
                  <code>::behandeling-sectie</code>
                </td>
                <td class="border border-gray-300 px-3 py-2">
                  Sectie met afbeelding + lijst
                </td>
                <td class="border border-gray-300 px-3 py-2">
                  <code>title, image, imageAlt, items</code>
                </td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-3 py-2">
                  <code>::twee-kolommen</code>
                </td>
                <td class="border border-gray-300 px-3 py-2">
                  Wrapper voor voordelen + doelgroep
                </td>
                <td class="border border-gray-300 px-3 py-2">
                  Bevat geneste componenten
                </td>
              </tr>
              <tr class="bg-gray-50">
                <td class="border border-gray-300 px-3 py-2">
                  <code>:::voordelen-lijst</code>
                </td>
                <td class="border border-gray-300 px-3 py-2">
                  Voordelen met vinkjes (genest)
                </td>
                <td class="border border-gray-300 px-3 py-2">
                  <code>title, items</code>
                </td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-3 py-2">
                  <code>:::voor-wie</code>
                </td>
                <td class="border border-gray-300 px-3 py-2">
                  Doelgroep info (genest)
                </td>
                <td class="border border-gray-300 px-3 py-2">
                  <code>title, items</code>
                </td>
              </tr>
              <tr class="bg-gray-50">
                <td class="border border-gray-300 px-3 py-2">
                  <code>::uitklap-info</code>
                </td>
                <td class="border border-gray-300 px-3 py-2">
                  Inklapbare sectie
                </td>
                <td class="border border-gray-300 px-3 py-2">
                  <code>title</code> + markdown content
                </td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-3 py-2">
                  <code>::info-blok</code>
                </td>
                <td class="border border-gray-300 px-3 py-2">
                  Waarschuwing/info box
                </td>
                <td class="border border-gray-300 px-3 py-2">
                  <code>icon, title, type</code>
                </td>
              </tr>
              <tr class="bg-gray-50">
                <td class="border border-gray-300 px-3 py-2">
                  <code>::afbeelding</code>
                </td>
                <td class="border border-gray-300 px-3 py-2">
                  Geoptimaliseerde afbeelding
                </td>
                <td class="border border-gray-300 px-3 py-2">
                  <code>src, alt, caption</code>
                </td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-3 py-2">
                  <code>::kop</code>
                </td>
                <td class="border border-gray-300 px-3 py-2">
                  Custom heading
                </td>
                <td class="border border-gray-300 px-3 py-2">
                  <code>level, centered</code>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Image Guidelines -->
        <h3 class="text-xl font-bold text-gray-900 mt-12 mb-4">
          Afbeeldingen
        </h3>

        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
          <ul class="space-y-2 text-blue-800">
            <li>
              <strong>Locatie:</strong> <code>/public/images/</code>
            </li>
            <li><strong>Formaat:</strong> WebP (best performance)</li>
            <li>
              <strong>Afmetingen:</strong> Hero 1200x800px, Sectie 600x400px
            </li>
            <li><strong>Alt-tekst:</strong> Altijd verplicht</li>
          </ul>
        </div>

        <!-- Quick Reference -->
        <section id="content-template" class="scroll-mt-8">
          <h3 class="text-xl font-bold text-gray-900 mt-12 mb-4">
            Belangrijkste Tips
          </h3>

          <div class="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <ul class="text-amber-900 space-y-2 text-sm">
              <li>
                ✓ <strong>Dupliceer altijd</strong> een bestaand bestand zoals
                <code>chakra-balancering.md</code>
              </li>
              <li>
                ✓ <strong>Slug moet exact matchen</strong> tussen database en
                bestandsnaam
              </li>
              <li>
                ✓ <strong>Vervang het UUID</strong> in
                <code>::behandeling-hero</code> met database ID
              </li>
              <li>
                ✓ <strong>Update ook Setmore</strong> bij prijswijzigingen
              </li>
              <li>
                ✓ <strong>Test de pagina</strong> op
                <code>/behandelingen/[slug]</code> na publicatie
              </li>
            </ul>
          </div>
        </section>
      </div>
    </UCard>
  </section>
</template>
