<script setup lang="ts">
// SEO Meta
useSeoMeta({
  title: 'Beheer Dashboard - Enisa Healing & Massage',
  description:
    'Admin dashboard voor het beheren van reviews en andere content.',
  robots: 'noindex, nofollow',
});

// Get dynamic routes
const routes = useRoutes();

// Authentication check - let Supabase handle redirects
const user = useSupabaseUser();

// Initialize session timeout (5 minutes of inactivity)
const { initSessionTimeout } = useAdminSessionTimeout();
onMounted(() => {
  initSessionTimeout();
});

// Only render if user is authenticated
const isAuthenticated = computed(() => user.value?.role === 'authenticated');
</script>

<template>
  <div v-if="isAuthenticated">
    <UContainer class="py-8">
      <!-- Admin Navigation -->
      <AdminNavigation />

      <!-- Dashboard Overview -->
      <div class="space-y-8">
        <!-- Page Header -->
        <header>
          <h1 class="text-3xl font-bold text-neutral-900 mb-2">
            Beheer Dashboard
          </h1>
          <p class="text-neutral-600">
            Welkom terug! Beheer je website content en reviews.
          </p>
        </header>

        <!-- Quick Actions -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <UCard class="p-6">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="font-semibold text-lg mb-2">Behandelingen</h3>
                <p class="text-neutral-600 text-sm mb-4">
                  Beheer behandelingen en tarieven
                </p>
                <UButton
                  :to="routes.admin.treatments"
                  icon="i-mdi-spa"
                  size="sm"
                >
                  Beheren
                </UButton>
              </div>
              <UIcon name="i-mdi-spa" class="w-12 h-12 text-primary-500" />
            </div>
          </UCard>

          <UCard class="p-6">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="font-semibold text-lg mb-2">Reviews Beheer</h3>
                <p class="text-neutral-600 text-sm mb-4">
                  Modereer en beheer klant reviews
                </p>
                <UButton :to="routes.admin.reviews" icon="i-mdi-star" size="sm">
                  Ga naar Reviews
                </UButton>
              </div>
              <UIcon name="i-mdi-star" class="w-12 h-12 text-secondary-500" />
            </div>
          </UCard>

          <UCard class="p-6">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="font-semibold text-lg mb-2">SEO Analyse</h3>
                <p class="text-neutral-600 text-sm mb-4">
                  Controleer en optimaliseer SEO prestaties
                </p>
                <UButton
                  :to="routes.admin.seoOverview"
                  icon="i-mdi-search-web"
                  size="sm"
                >
                  SEO Overzicht
                </UButton>
              </div>
              <UIcon
                name="i-mdi-search-web"
                class="w-12 h-12 text-primary-600"
              />
            </div>
          </UCard>

          <UCard class="p-6">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="font-semibold text-lg mb-2">Website Bezoeken</h3>
                <p class="text-neutral-600 text-sm mb-4">
                  Ga naar de publieke website
                </p>
                <UButton to="/" icon="i-mdi-home" variant="outline" size="sm">
                  Website Bekijken
                </UButton>
              </div>
              <UIcon name="i-mdi-home" class="w-12 h-12 text-neutral-400" />
            </div>
          </UCard>
        </div>
      </div>
    </UContainer>
  </div>

  <div v-else class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-neutral-900 mb-4">
        Bezig met authenticeren...
      </h1>
      <p class="text-neutral-600">
        Even geduld terwijl we je gegevens verifiëren.
      </p>
    </div>
  </div>
</template>
