<script setup lang="ts">
// Show dynamic routes demonstration
const routes = useRoutes();
const studioContent = useStudioContent();

// Get dynamic navigation data
const dynamicNav = ref<{
  treatments: Array<{
    label: string;
    to: string;
    icon?: string;
    category?: string;
  }>;
  admin: Array<{
    label: string;
    to: string;
  }>;
} | null>(null);

onMounted(async () => {
  try {
    dynamicNav.value = await studioContent.getDynamicNavigation();
  } catch (error) {
    console.error('Error loading dynamic navigation:', error);
  }
});
</script>

<template>
  <section id="dynamic-routes">
    <UCard class="space-y-6">
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-mdi-routes" class="w-6 h-6 text-green-600" />
          <h2 class="text-2xl font-bold text-neutral-900">
            Dynamic Routes & Studio CMS
          </h2>
        </div>
      </template>

      <div class="space-y-6">
        <!-- Introduction -->
        <div class="prose max-w-none">
          <p class="text-neutral-600">
            Ons systeem gebruikt een hybride architectuur waarbij metadata wordt
            opgeslagen in de database en rijke content wordt beheerd via Nuxt
            Studio CMS. Dit geeft ons het beste van beide werelden:
            gestructureerde data en flexibele content editing.
          </p>
        </div>

        <!-- Route Types Demo -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4
              class="font-semibold text-blue-900 mb-2 flex items-center gap-2"
            >
              <UIcon name="i-mdi-web" class="w-4 h-4" />
              Statische Pagina's
            </h4>
            <div class="space-y-1 text-sm">
              <div>
                <code class="text-blue-700">{{ routes.pages.home }}</code>
              </div>
              <div>
                <code class="text-blue-700">{{ routes.pages.about }}</code>
              </div>
              <div>
                <code class="text-blue-700">{{ routes.pages.contact }}</code>
              </div>
            </div>
          </div>

          <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h4
              class="font-semibold text-purple-900 mb-2 flex items-center gap-2"
            >
              <UIcon name="i-mdi-database" class="w-4 h-4" />
              Database Routes
            </h4>
            <div class="space-y-1 text-sm">
              <template v-if="dynamicNav?.treatments?.length">
                <div
                  v-for="treatment in dynamicNav.treatments.slice(0, 3)"
                  :key="treatment.to"
                >
                  <code class="text-purple-700">{{ treatment.to }}</code>
                </div>
              </template>
              <div v-else class="text-purple-600">Aan het laden...</div>
            </div>
          </div>

          <div class="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4
              class="font-semibold text-green-900 mb-2 flex items-center gap-2"
            >
              <UIcon name="i-mdi-shield-lock" class="w-4 h-4" />
              Admin Routes
            </h4>
            <div class="space-y-1 text-sm">
              <div>
                <code class="text-green-700">{{ routes.admin.dashboard }}</code>
              </div>
              <div>
                <code class="text-green-700">{{
                  routes.admin.treatments
                }}</code>
              </div>
              <div>
                <code class="text-green-700">{{ routes.admin.docs }}</code>
              </div>
            </div>
          </div>
        </div>

        <!-- Studio Integration Demo -->
        <div
          class="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6"
        >
          <h4
            class="font-semibold text-purple-900 mb-4 flex items-center gap-2"
          >
            <UIcon name="i-mdi-pencil-box" class="w-5 h-5" />
            Nuxt Studio CMS Integratie
          </h4>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <h5 class="font-medium text-purple-800 mb-2">
                Database + Studio Architectuur:
              </h5>
              <ul class="text-sm text-purple-700 space-y-1">
                <li>
                  • <strong>Database:</strong> Bewaart metadata (prijs, duur,
                  intensiteit)
                </li>
                <li>
                  • <strong>Studio CMS:</strong> Beheert rijke content en
                  componenten
                </li>
                <li>
                  • <strong>Dynamic Routes:</strong> Gegenereerd uit database
                  data
                </li>
                <li>
                  • <strong>Content Files:</strong> Uitgebreid met Studio
                  editing
                </li>
              </ul>
            </div>

            <div>
              <h5 class="font-medium text-purple-800 mb-2">Studio Features:</h5>
              <ul class="text-sm text-purple-700 space-y-1">
                <li>• Visuele content editing</li>
                <li>• Live preview modus</li>
                <li>• Afbeelding optimalisatie</li>
                <li>• Git-gebaseerde versie controle</li>
              </ul>
            </div>
          </div>

          <div class="flex gap-3">
            <UButton
              to="https://nuxt.studio"
              target="_blank"
              rel="noopener"
              icon="i-mdi-open-in-new"
              color="primary"
              variant="outline"
              size="sm"
            >
              Open Nuxt Studio
            </UButton>

            <UButton
              :to="routes.admin.docs"
              icon="i-mdi-book-open"
              color="secondary"
              variant="outline"
              size="sm"
            >
              Bekijk Documentatie
            </UButton>
          </div>
        </div>

        <!-- Dynamic Navigation Preview -->
        <div
          v-if="dynamicNav"
          class="bg-gray-50 border border-gray-200 rounded-lg p-4"
        >
          <h4 class="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <UIcon name="i-mdi-navigation" class="w-4 h-4" />
            Dynamic Navigation Voorbeeld
          </h4>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 class="font-medium text-gray-800 mb-2">
                Behandeling Pagina's (Database-driven):
              </h5>
              <ul class="space-y-1">
                <li
                  v-for="treatment in dynamicNav.treatments"
                  :key="treatment.to"
                  class="flex items-center gap-2"
                >
                  <UIcon
                    :name="treatment.icon || 'i-mdi-spa'"
                    class="w-3 h-3 text-primary-600"
                  />
                  <NuxtLink
                    :to="treatment.to"
                    class="text-blue-600 hover:underline"
                  >
                    {{ treatment.label }}
                  </NuxtLink>
                  <UBadge
                    :label="treatment.category"
                    variant="subtle"
                    size="xs"
                  />
                </li>
              </ul>
            </div>

            <div>
              <h5 class="font-medium text-gray-800 mb-2">Admin Pagina's:</h5>
              <ul class="space-y-1">
                <li
                  v-for="admin in dynamicNav.admin"
                  :key="admin.to"
                  class="flex items-center gap-2"
                >
                  <UIcon name="i-mdi-shield" class="w-3 h-3 text-green-600" />
                  <NuxtLink
                    :to="admin.to"
                    class="text-green-600 hover:underline"
                  >
                    {{ admin.label }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </UCard>
  </section>
</template>
