<script setup lang="ts">
// SEO meta tags
useSeoMeta({
  title: 'SEO Overzicht - Admin - Enisa Healing & Massage',
  description:
    'SEO analyse en optimalisatie tools voor Enisa Healing & Massage',
  robots: 'noindex, nofollow',
});

// Authentication check - let Supabase handle redirects
const user = useSupabaseUser();

// Only render if user is authenticated
const isAuthenticated = computed(() => !!user.value);
</script>

<template>
  <div v-if="isAuthenticated">
    <UContainer class="py-8">
      <!-- Admin Navigation -->
      <AdminNavigation />

      <!-- SEO Audit Tool -->
      <SEOAuditTool />
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
