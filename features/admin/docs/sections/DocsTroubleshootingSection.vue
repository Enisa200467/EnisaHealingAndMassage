<script setup lang="ts">
const routes = useRoutes();
</script>

<template>
  <section id="troubleshooting" class="scroll-mt-8">
    <UCard>
      <template #header>
        <h2 class="text-2xl font-bold flex items-center gap-3">
          <UIcon name="i-mdi-help-circle" class="w-6 h-6 text-red-600" />
          Probleemoplossing
        </h2>
      </template>

      <div class="prose prose-neutral max-w-none">
        <h3 class="text-xl font-bold text-gray-900 mt-8 mb-4">
          Veel Voorkomende Problemen
        </h3>

        <div class="space-y-6">
          <div class="border-l-4 border-red-500 pl-4">
            <h4 class="font-semibold text-red-700">
              Behandeling niet zichtbaar op website
            </h4>
            <ul class="text-gray-700">
              <li>
                Controleer of de status op "actief" staat in de
                <NuxtLink
                  to="/admin/treatments"
                  class="text-blue-600 hover:text-blue-800 underline"
                >
                  admin
                </NuxtLink>
              </li>
              <li>
                Zorg dat er een bijbehorend <code>.md</code> bestand bestaat
              </li>
              <li>Controleer of de slug correct is</li>
              <li>Herstart de development server (indien lokaal)</li>
            </ul>
          </div>

          <div class="border-l-4 border-yellow-500 pl-4">
            <h4 class="font-semibold text-yellow-700">
              Prijs of duur worden niet getoond
            </h4>
            <ul class="text-gray-700">
              <li>Database data heeft altijd voorrang over content data</li>
              <li>
                Controleer de waarden in de
                <NuxtLink
                  to="/admin/treatments"
                  class="text-blue-600 hover:text-blue-800 underline"
                >
                  admin interface
                </NuxtLink>
              </li>
              <li>Herlaad de pagina om cache te vernieuwen</li>
              <li>Check of de treatment ID correct gekoppeld is</li>
            </ul>
          </div>

          <div class="border-l-4 border-blue-500 pl-4">
            <h4 class="font-semibold text-blue-700">
              Content wordt niet correct weergegeven
            </h4>
            <ul class="text-gray-700">
              <li>
                Controleer de markdown syntax in het <code>.md</code> bestand
              </li>
              <li>
                Zorg dat component definities correct zijn (met <code>::</code>)
              </li>
              <li>Controleer of alle vereiste parameters zijn ingevuld</li>
              <li>Valideer YAML frontmatter syntax</li>
            </ul>
          </div>

          <div class="border-l-4 border-green-500 pl-4">
            <h4 class="font-semibold text-green-700">Slug wijzigen</h4>
            <ul class="text-gray-700">
              <li>
                Wijzig eerst de slug in de
                <NuxtLink
                  to="/admin/treatments"
                  class="text-blue-600 hover:text-blue-800 underline"
                >
                  admin interface
                </NuxtLink>
              </li>
              <li>Hernoem daarna het content bestand naar de nieuwe slug</li>
              <li>Test de nieuwe URL om te controleren of alles werkt</li>
              <li>Update eventuele interne links</li>
            </ul>
          </div>

          <div class="border-l-4 border-purple-500 pl-4">
            <h4 class="font-semibold text-purple-700">
              Vertical Slice Architecture Issues
            </h4>
            <ul class="text-gray-700">
              <li>
                Controleer of components correct geïmporteerd zijn in de feature
                slice
              </li>
              <li>Verificeer dat composables in de juiste feature map staan</li>
              <li>Check auto-imports configuratie in nuxt.config.ts</li>
              <li>Zorg dat component paths correct zijn geregistreerd</li>
            </ul>
          </div>
        </div>

        <h3 class="text-xl font-bold text-gray-900 mt-8 mb-4">Debug Tools</h3>
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h4 class="font-semibold text-gray-900 mb-2">
            Beschikbare Debug Opties:
          </h4>
          <ul class="text-gray-700 space-y-1">
            <li>
              <strong>SEO Audit Tool:</strong> Controleer SEO scores en issues
            </li>
            <li>
              <strong>Nuxt DevTools:</strong> Analyseer component structuur
            </li>
            <li>
              <strong>Browser DevTools:</strong> Check console errors en network
              requests
            </li>
            <li><strong>Nuxt Studio:</strong> Valideer content bestanden</li>
          </ul>
        </div>

        <h3 class="text-xl font-bold text-gray-900 mt-8 mb-4">Hulp Nodig?</h3>
        <p>
          Als je problemen ondervindt die niet in deze documentatie staan, neem
          dan contact op met de technische beheerder of raadpleeg de technische
          documentatie in de
          <code>/docs</code> map.
        </p>

        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 class="font-semibold text-blue-900 mb-2">Nuttige Admin Links:</h4>
          <ul class="text-blue-800 space-y-2">
            <li>
              <NuxtLink :to="routes.admin.treatments" class="underline">
                Behandelingen Beheren (Database)
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to="routes.admin.seoOverview" class="underline">
                SEO Overzicht
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to="routes.admin.dashboard" class="underline">
                Beheer Dashboard
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div class="bg-purple-50 border border-purple-200 rounded-lg p-4 mt-4">
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
</template>
