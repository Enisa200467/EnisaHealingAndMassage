<script setup lang="ts">
// SEO Meta
useSeoMeta({
  title: 'Admin Dashboard - Enisa Healing & Massage',
  description:
    'Admin dashboard voor het beheren van reviews en andere content.',
  robots: 'noindex, nofollow',
});

// Authentication check
const user = useSupabaseUser();
const router = useRouter();

// Redirect if not authenticated
watch(
  user,
  (newUser) => {
    if (!newUser) {
      router.push('/login');
    }
  },
  { immediate: true }
);

// Only render if user is authenticated
const isAuthenticated = computed(() => !!user.value);
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
            Admin Dashboard
          </h1>
          <p class="text-neutral-600">
            Welkom terug! Beheer je website content en reviews.
          </p>
        </header>

        <!-- Quick Actions -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <UCard class="p-6">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="font-semibold text-lg mb-2">Reviews Beheer</h3>
                <p class="text-neutral-600 text-sm mb-4">
                  Modereer en beheer klant reviews
                </p>
                <UButton to="/admin/reviews" icon="i-mdi-star" size="sm">
                  Ga naar Reviews
                </UButton>
              </div>
              <UIcon name="i-mdi-star" class="w-12 h-12 text-primary-500" />
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
                  to="/admin/seo-overview"
                  icon="i-mdi-search-web"
                  size="sm"
                >
                  SEO Overzicht
                </UButton>
              </div>
              <UIcon
                name="i-mdi-search-web"
                class="w-12 h-12 text-secondary-500"
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
        Authenticating...
      </h1>
      <p class="text-neutral-600">
        Please wait while we verify your credentials.
      </p>
    </div>
  </div>
</template>
