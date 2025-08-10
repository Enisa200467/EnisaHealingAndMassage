<script setup lang="ts">
// SEO meta tags
useSeoMeta({
  title: 'Review Beheer - Admin - Enisa Healing & Massage',
  description: 'Beheer en modereer alle reviews van Enisa Healing & Massage',
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
      router.push('/admin/login');
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

      <!-- Page Header -->
      <header class="mb-8">
        <h1 class="text-3xl font-bold text-neutral-900 mb-2">Review Beheer</h1>
        <p class="text-neutral-600">
          Beheer en modereer alle reviews van klanten
        </p>
      </header>

      <!-- Reviews Manager -->
      <AdminReviewsManager />
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
