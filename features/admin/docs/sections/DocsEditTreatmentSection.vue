<template>
  <section id="edit-treatment" class="scroll-mt-8">
    <UCard>
      <template #header>
        <h2 class="text-2xl font-bold flex items-center gap-3">
          <UIcon name="i-mdi-pencil" class="w-6 h-6 text-blue-600" />
          Behandeling Bewerken
        </h2>
      </template>

      <div class="prose prose-neutral max-w-none">
        <h3 class="text-xl font-bold text-gray-900 mt-8 mb-4">
          Database Gegevens Wijzigen
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
              Je ziet een overzicht van alle behandelingen
            </p>
          </li>
          <li>
            <strong>Klik op "Bewerken" bij de gewenste behandeling</strong>
            <p class="text-neutral-600">Dit opent het bewerkingsformulier</p>
          </li>
          <li>
            <strong>Wijzig de gewenste velden</strong>
            <ul class="mt-2">
              <li>
                <strong>Prijs aanpassen:</strong> Directe impact op alle
                pagina's
              </li>
              <li><strong>Duur wijzigen:</strong> Automatisch geformatteerd</li>
              <li>
                <strong>Intensiteit:</strong> Update zowel nummer als label
                indien gewenst
              </li>
              <li><strong>Status:</strong> Schakel tussen actief/inactief</li>
            </ul>
          </li>
          <li>
            <strong>Opslaan</strong>
            <p class="text-neutral-600">
              Wijzigingen zijn direct zichtbaar op de website
            </p>
          </li>
        </ol>

        <div class="bg-orange-50 border border-orange-200 rounded-lg p-4 my-6">
          <h4
            class="text-lg font-semibold text-orange-900 mb-2 flex items-center gap-2"
          >
            <UIcon name="i-mdi-alert" class="w-5 h-5" />
            Let op bij Slug wijzigen
          </h4>
          <p class="text-orange-800">
            Als je de slug wijzigt, moet je ook het content bestand hernoemen
            van
            <code>/content/treatments/oude-slug.md</code> naar
            <code>/content/treatments/nieuwe-slug.md</code>
          </p>
        </div>

        <h3 class="text-xl font-bold text-gray-900 mt-8 mb-4">
          Content Wijzigen
        </h3>
        <p>
          Voor het wijzigen van de rijke content (beschrijvingen, voordelen,
          etc.):
        </p>
        <ol class="space-y-2">
          <li>
            Open het bijbehorende <code>.md</code> bestand in
            <code>/content/treatments/</code>
          </li>
          <li>
            Bewerk de content components zoals
            <code>::treatmentSection</code>, <code>::benefitList</code>, etc.
          </li>
          <li>Sla het bestand op - wijzigingen zijn direct zichtbaar</li>
        </ol>

        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
          <h4
            class="text-lg font-semibold text-blue-900 mb-2 flex items-center gap-2"
          >
            <UIcon name="i-mdi-lightbulb" class="w-5 h-5" />
            Pro Tip: Nuxt Studio
          </h4>
          <p class="text-blue-800">
            Gebruik Nuxt Studio voor een visuele editor ervaring bij het
            bewerken van content bestanden. Ga naar
            <a href="https://nuxt.studio" target="_blank" class="underline"
              >nuxt.studio</a
            >
            en log in met Enisa's GitHub account.
          </p>
        </div>
      </div>
    </UCard>
  </section>
</template>
