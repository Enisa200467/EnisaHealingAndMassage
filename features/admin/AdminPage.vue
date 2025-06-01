<script setup lang="ts">
import { useAdminReviews } from './composables/useAdminReviews';

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

const { getAllReviews, getDetailedStats } = useAdminReviews();

// Only render if user is authenticated
const isAuthenticated = computed(() => !!user.value);
</script>

<template>
  <div v-if="isAuthenticated">
    <AdminDashboard />
    <AdminReviewsManager />
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
