<template>
  <div>
    <!-- Hero Section -->
    <section
      class="relative bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-950 dark:to-secondary-950 py-16 sm:py-24"
    >
      <UContainer>
        <div class="text-center max-w-3xl mx-auto">
          <UIcon
            name="i-mdi-shield-account"
            class="w-16 h-16 text-primary-600 mx-auto mb-6"
          />
          <h1
            class="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white mb-6"
          >
            Admin Dashboard
          </h1>
          <p class="text-xl text-neutral-600 dark:text-neutral-300 mb-8">
            Beheer reviews en bekijk statistieken
          </p>
        </div>
      </UContainer>
    </section>

    <!-- Login Form (if not authenticated) -->
    <section v-if="!isAuthenticated" class="py-16 sm:py-24">
      <UContainer>
        <div class="max-w-md mx-auto">
          <UCard>
            <template #header>
              <div class="flex items-center gap-3">
                <UIcon name="i-mdi-login" class="w-6 h-6 text-primary-600" />
                <h2 class="text-2xl font-bold text-neutral-900 dark:text-white">
                  Admin Login
                </h2>
              </div>
            </template>

            <UForm
              :schema="loginSchema"
              :state="loginForm"
              class="space-y-6"
              @submit="onLogin"
            >
              <UFormGroup label="E-mailadres" name="email" required>
                <UInput
                  v-model="loginForm.email"
                  type="email"
                  placeholder="admin@enisahealing.nl"
                  icon="i-mdi-email"
                />
              </UFormGroup>

              <UFormGroup label="Wachtwoord" name="password" required>
                <UInput
                  v-model="loginForm.password"
                  type="password"
                  placeholder="••••••••"
                  icon="i-mdi-lock"
                />
              </UFormGroup>

              <UButton
                type="submit"
                block
                :loading="isLoggingIn"
                :disabled="!isLoginFormValid"
              >
                Inloggen
              </UButton>
            </UForm>
          </UCard>
        </div>
      </UContainer>
    </section>

    <!-- Admin Dashboard (if authenticated) -->
    <section v-else class="py-16 sm:py-24">
      <UContainer>
        <!-- Statistics Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <UCard>
            <div class="flex items-center gap-4">
              <div class="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <UIcon name="i-mdi-star" class="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p class="text-sm text-neutral-500 dark:text-neutral-400">
                  Totaal Reviews
                </p>
                <p class="text-2xl font-bold text-neutral-900 dark:text-white">
                  {{ stats.total }}
                </p>
              </div>
            </div>
          </UCard>

          <UCard>
            <div class="flex items-center gap-4">
              <div class="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <UIcon
                  name="i-mdi-check-circle"
                  class="w-6 h-6 text-green-600"
                />
              </div>
              <div>
                <p class="text-sm text-neutral-500 dark:text-neutral-400">
                  Goedgekeurd
                </p>
                <p class="text-2xl font-bold text-neutral-900 dark:text-white">
                  {{ stats.approved }}
                </p>
              </div>
            </div>
          </UCard>

          <UCard>
            <div class="flex items-center gap-4">
              <div class="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                <UIcon name="i-mdi-clock" class="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p class="text-sm text-neutral-500 dark:text-neutral-400">
                  In Afwachting
                </p>
                <p class="text-2xl font-bold text-neutral-900 dark:text-white">
                  {{ stats.pending }}
                </p>
              </div>
            </div>
          </UCard>

          <UCard>
            <div class="flex items-center gap-4">
              <div class="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <UIcon
                  name="i-mdi-chart-line"
                  class="w-6 h-6 text-purple-600"
                />
              </div>
              <div>
                <p class="text-sm text-neutral-500 dark:text-neutral-400">
                  Gemiddelde Score
                </p>
                <p class="text-2xl font-bold text-neutral-900 dark:text-white">
                  {{ stats.averageRating.toFixed(1) }}
                </p>
              </div>
            </div>
          </UCard>
        </div>

        <!-- Action Bar -->
        <div
          class="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6"
        >
          <div>
            <h2
              class="text-2xl font-bold text-neutral-900 dark:text-white mb-2"
            >
              Review Beheer
            </h2>
            <p class="text-neutral-600 dark:text-neutral-300">
              Beheer en modereer customer reviews
            </p>
          </div>

          <div class="flex gap-2">
            <UButton variant="ghost" color="red" @click="logout">
              <UIcon name="i-mdi-logout" class="w-4 h-4 mr-2" />
              Uitloggen
            </UButton>
            <UButton :loading="isLoading" @click="refreshData">
              <UIcon name="i-mdi-refresh" class="w-4 h-4 mr-2" />
              Vernieuwen
            </UButton>
          </div>
        </div>

        <!-- Status Filter -->
        <div class="mb-6">
          <UTabs v-model="activeTab" :items="tabs" @change="onTabChange">
            <template #item="{ item }">
              <div class="flex items-center gap-2">
                <UIcon :name="item.icon" class="w-4 h-4" />
                {{ item.label }}
                <UBadge
                  v-if="getTabCount(item.value)"
                  :color="getTabColor(item.value)"
                  variant="soft"
                  size="xs"
                >
                  {{ getTabCount(item.value) }}
                </UBadge>
              </div>
            </template>
          </UTabs>
        </div>

        <!-- Reviews Table -->
        <UCard>
          <template #header>
            <h3 class="text-lg font-semibold text-neutral-900 dark:text-white">
              Reviews
            </h3>
          </template>

          <div v-if="isLoading" class="flex justify-center py-8">
            <UIcon
              name="i-mdi-loading"
              class="w-8 h-8 animate-spin text-primary-600"
            />
          </div>

          <div v-else-if="reviews.length === 0" class="text-center py-8">
            <UIcon
              name="i-mdi-comment-outline"
              class="w-16 h-16 text-neutral-400 mx-auto mb-4"
            />
            <h3
              class="text-xl font-semibold text-neutral-600 dark:text-neutral-300 mb-2"
            >
              Geen reviews gevonden
            </h3>
            <p class="text-neutral-500 dark:text-neutral-400">
              {{ getEmptyStateMessage() }}
            </p>
          </div>

          <div v-else class="space-y-4">
            <UCard
              v-for="review in reviews"
              :key="review.id"
              :ui="{ body: { padding: 'p-4 sm:p-6' } }"
            >
              <div class="space-y-4">
                <!-- Review Header -->
                <div class="flex flex-col sm:flex-row gap-4 justify-between">
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-1">
                      <h4
                        class="font-semibold text-neutral-900 dark:text-white"
                      >
                        {{ review.name }}
                      </h4>
                      <UBadge
                        :color="getStatusColor(review.status)"
                        variant="soft"
                        size="xs"
                      >
                        {{ getStatusLabel(review.status) }}
                      </UBadge>
                    </div>
                    <p class="text-sm text-neutral-500 dark:text-neutral-400">
                      {{ review.email }}
                      {{ review.treatment ? ` • ${review.treatment}` : '' }}
                    </p>
                  </div>

                  <div class="flex items-center gap-2">
                    <StarRating
                      :model-value="review.rating"
                      :interactive="false"
                    />
                    <span
                      class="text-sm text-neutral-500 dark:text-neutral-400"
                    >
                      {{ formatDate(review.created_at) }}
                    </span>
                  </div>
                </div>

                <!-- Review Content -->
                <div class="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4">
                  <p
                    class="text-neutral-700 dark:text-neutral-300 leading-relaxed"
                  >
                    "{{ review.review }}"
                  </p>
                </div>

                <!-- Review Actions -->
                <div class="flex flex-wrap gap-2">
                  <UButton
                    v-if="review.status === 'pending'"
                    color="green"
                    variant="soft"
                    size="sm"
                    :loading="loadingActions[review.id]"
                    @click="approveReview(review.id)"
                  >
                    <UIcon name="i-mdi-check" class="w-4 h-4 mr-1" />
                    Goedkeuren
                  </UButton>

                  <UButton
                    v-if="review.status === 'pending'"
                    color="red"
                    variant="soft"
                    size="sm"
                    :loading="loadingActions[review.id]"
                    @click="rejectReview(review.id)"
                  >
                    <UIcon name="i-mdi-close" class="w-4 h-4 mr-1" />
                    Afwijzen
                  </UButton>

                  <UButton
                    v-if="review.status === 'approved'"
                    color="orange"
                    variant="soft"
                    size="sm"
                    :loading="loadingActions[review.id]"
                    @click="rejectReview(review.id)"
                  >
                    <UIcon name="i-mdi-undo" class="w-4 h-4 mr-1" />
                    Intrekken
                  </UButton>

                  <UButton
                    v-if="review.status === 'rejected'"
                    color="green"
                    variant="soft"
                    size="sm"
                    :loading="loadingActions[review.id]"
                    @click="approveReview(review.id)"
                  >
                    <UIcon name="i-mdi-check" class="w-4 h-4 mr-1" />
                    Goedkeuren
                  </UButton>

                  <UButton
                    color="red"
                    variant="ghost"
                    size="sm"
                    :loading="loadingActions[review.id]"
                    @click="deleteReview(review.id)"
                  >
                    <UIcon name="i-mdi-delete" class="w-4 h-4 mr-1" />
                    Verwijderen
                  </UButton>
                </div>

                <!-- Review Meta -->
                <div
                  v-if="review.reviewed_at"
                  class="text-xs text-neutral-400 dark:text-neutral-500 border-t pt-2"
                >
                  Beoordeeld op {{ formatDate(review.reviewed_at) }}
                  {{ review.reviewed_by ? ` door ${review.reviewed_by}` : '' }}
                </div>
              </div>
            </UCard>
          </div>

          <template v-if="hasMoreReviews" #footer>
            <div class="text-center">
              <UButton
                variant="ghost"
                :loading="loadingMore"
                @click="loadMoreReviews"
              >
                Meer reviews laden
              </UButton>
            </div>
          </template>
        </UCard>
      </UContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
import { z } from 'zod';
import type { Review, ReviewStats } from '~/types/reviews';

// SEO Meta
useSeoMeta({
  title: 'Admin Dashboard - Enisa Healing & Massage',
  description: 'Admin dashboard voor het beheren van reviews en statistieken.',
  robots: 'noindex, nofollow',
});

// Composables
const toast = useToast();
const router = useRouter();
const supabase = useSupabaseClient();
const supabaseUser = useSupabaseUser();
const {
  getAllReviews,
  updateReviewStatus,
  deleteReview: deleteReviewApi,
  getDetailedStats,
} = useAdminReviews();

// Authentication
const isAuthenticated = ref(false);
const adminToken = ref('');

// Check for authentication on mount
onMounted(async () => {
  // Check for custom JWT authentication
  const savedToken = localStorage.getItem('admin_token');

  // Check for Supabase authentication
  const { data: session } = await supabase.auth.getSession();

  if (savedToken) {
    adminToken.value = savedToken;
    isAuthenticated.value = true;
    refreshData();
  } else if (session?.session) {
    isAuthenticated.value = true;
    refreshData();
  } else {
    // Not authenticated, redirect to login
    toast.add({
      title: 'Toegang geweigerd',
      description: 'Je moet ingelogd zijn om deze pagina te bekijken',
      color: 'red',
      icon: 'i-mdi-shield',
    });
    router.push('/login');
  }
});

// Login form
const loginSchema = z.object({
  email: z.string().email('Voer een geldig e-mailadres in'),
  password: z.string().min(6, 'Wachtwoord moet minimaal 6 karakters lang zijn'),
});

const loginForm = reactive({
  email: '',
  password: '',
});

const isLoggingIn = ref(false);

const isLoginFormValid = computed(() => {
  try {
    loginSchema.parse(loginForm);
    return true;
  } catch {
    return false;
  }
});

// Dashboard data
const stats = ref<ReviewStats>({
  total: 0,
  approved: 0,
  pending: 0,
  rejected: 0,
  averageRating: 0,
});

const reviews = ref<Review[]>([]);
const isLoading = ref(false);
const loadingMore = ref(false);
const loadingActions = ref<Record<string, boolean>>({});

// Pagination and filtering
const currentPage = ref(1);
const hasMoreReviews = ref(false);
const activeTab = ref(0);

const tabs = [
  { value: 'all', label: 'Alle', icon: 'i-mdi-view-list' },
  { value: 'pending', label: 'In Afwachting', icon: 'i-mdi-clock' },
  { value: 'approved', label: 'Goedgekeurd', icon: 'i-mdi-check-circle' },
  { value: 'rejected', label: 'Afgewezen', icon: 'i-mdi-close-circle' },
];

// Methods
const onLogin = async () => {
  isLoggingIn.value = true;

  try {
    // Try custom JWT authentication first
    const response = await $fetch('/api/admin/login', {
      method: 'POST',
      body: {
        email: loginForm.email,
        password: loginForm.password,
      },
    });

    if (response.success) {
      // Store token in localStorage for persistence
      adminToken.value = response.token;
      localStorage.setItem('admin_token', response.token);
      isAuthenticated.value = true;

      toast.add({
        title: 'Succesvol ingelogd',
        description: 'Welkom in het admin dashboard',
        icon: 'i-mdi-check-circle',
        color: 'green',
      });

      await refreshData();
    }
  } catch (error) {
    // If custom auth fails, try Supabase
    try {
      const { error: supabaseError } = await supabase.auth.signInWithPassword({
        email: loginForm.email,
        password: loginForm.password,
      });

      if (supabaseError) throw supabaseError;

      isAuthenticated.value = true;

      toast.add({
        title: 'Succesvol ingelogd',
        description: 'Welkom in het admin dashboard',
        icon: 'i-mdi-check-circle',
        color: 'green',
      });

      await refreshData();
    } catch (authError: any) {
      toast.add({
        title: 'Inloggen mislukt',
        description:
          authError.message || 'Controleer je e-mailadres en wachtwoord',
        icon: 'i-mdi-alert-circle',
        color: 'red',
      });
    }
  } finally {
    isLoggingIn.value = false;
  }
};

const logout = async () => {
  // Clear custom JWT token
  isAuthenticated.value = false;
  adminToken.value = '';

  if (import.meta.client) {
    localStorage.removeItem('admin_token');
  }

  // Sign out from Supabase if logged in
  await supabase.auth.signOut();

  toast.add({
    title: 'Uitgelogd',
    description: 'Je bent succesvol uitgelogd',
    icon: 'i-mdi-logout',
    color: 'primary',
  });

  // Redirect to login page
  router.push('/login');
};

// Rest of your code for refreshData, loadStats, etc remains unchanged
</script>
