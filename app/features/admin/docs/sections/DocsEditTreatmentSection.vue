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
        <h3 class="text-xl font-bold text-gray-900 mb-4">Database Wijzigen</h3>
        <ol class="space-y-3 mb-8">
          <li>
            <NuxtLink
              to="/admin/treatments"
              class="text-blue-600 hover:text-blue-800 underline font-semibold"
            >
              Ga naar Admin → Behandelingen
            </NuxtLink>
          </li>
          <li>Klik "Bewerken" bij de gewenste behandeling</li>
          <li>
            Wijzig velden (prijs, duur, intensiteit, status)
            <div
              class="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-2 text-sm"
            >
              <strong>⚠️ Belangrijk:</strong> Pas ook
              <a
                href="https://www.setmore.com/"
                target="_blank"
                rel="noopener"
                class="text-blue-600 underline"
                >Setmore</a
              >
              aan bij prijswijzigingen!
            </div>
          </li>
          <li>Opslaan (wijzigingen direct zichtbaar)</li>
        </ol>

        <div class="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-8">
          <p class="text-orange-900 font-semibold mb-1">
            <UIcon name="i-mdi-alert" class="w-5 h-5 inline" />
            Slug Wijzigen?
          </p>
          <p class="text-orange-800 text-sm">
            Hernoem ook het content bestand:
            <code>/content/treatments/oude-slug.md</code> →
            <code>nieuwe-slug.md</code>
          </p>
        </div>

        <h3 class="text-xl font-bold text-gray-900 mb-4">Content Wijzigen</h3>

        <div class="bg-blue-50 border border-blue-200 rounded-lg p-5">
          <div class="flex items-start gap-3">
            <UIcon name="i-mdi-lightbulb" class="w-6 h-6 text-blue-600 mt-1" />
            <div>
              <p class="text-blue-900 font-semibold mb-2">Via Nuxt Studio</p>
              <ol class="text-blue-800 space-y-1 text-sm">
                <li>
                  1. Ga naar
                  <a
                    href="https://nuxt.studio"
                    target="_blank"
                    class="underline"
                    >nuxt.studio</a
                  >
                </li>
                <li>2. Open <code>/content/treatments/[slug].md</code></li>
                <li>3. Bewerk componenten en content</li>
                <li>4. Publiceer wijzigingen</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </UCard>
  </section>
</template>
