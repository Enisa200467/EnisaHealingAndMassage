<script setup lang="ts">
import type { Review, ReviewStats } from '~/types/reviews';

// SEO Meta
useSeoMeta({
  title: 'Admin Dashboard - Enisa Healing & Massage',
  description: 'Admin dashboard voor het beheren van reviews en content',
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

// Composables
const { getAllReviews, updateReviewStatus, deleteReview, getDetailedStats } =
  useAdminReviews();
const toast = useToast();

// State
const reviews = ref<Review[]>([]);
const stats = ref<ReviewStats>({
  total: 0,
  approved: 0,
  pending: 0,
  rejected: 0,
  averageRating: 0,
});
const currentFilter = ref<'all' | 'pending' | 'approved' | 'rejected'>(
  'pending'
);
const isLoading = ref(true);
const isUpdating = ref<string | null>(null);
const currentPage = ref(1);
const totalPages = ref(1);
const limit = 10;

// Filter options
const filterOptions: Array<{
  label: string;
  value: 'pending' | 'approved' | 'rejected' | 'all';
  icon: string;
  color: 'warning' | 'success' | 'error' | 'info';
}> = [
  {
    label: 'Wachtend',
    value: 'pending',
    icon: 'i-mdi-clock-outline',
    color: 'warning',
  },
  {
    label: 'Goedgekeurd',
    value: 'approved',
    icon: 'i-mdi-check-circle',
    color: 'success',
  },
  {
    label: 'Afgewezen',
    value: 'rejected',
    icon: 'i-mdi-close-circle',
    color: 'error',
  },
  {
    label: 'Alle',
    value: 'all',
    icon: 'i-mdi-format-list-bulleted',
    color: 'info',
  },
];

// Computed
const filteredStats = computed(() => {
  switch (currentFilter.value) {
    case 'pending':
      return { count: stats.value.pending, label: 'Wachtende reviews' };
    case 'approved':
      return { count: stats.value.approved, label: 'Goedgekeurde reviews' };
    case 'rejected':
      return { count: stats.value.rejected, label: 'Afgewezen reviews' };
    default:
      return { count: stats.value.total, label: 'Totaal reviews' };
  }
});

// Methods
const loadReviews = async () => {
  isLoading.value = true;
  try {
    const filterStatus =
      currentFilter.value === 'all'
        ? undefined
        : (currentFilter.value as 'pending' | 'approved' | 'rejected');
    const result = await getAllReviews(currentPage.value, limit, filterStatus);
    reviews.value = result.reviews;
    totalPages.value = Math.ceil(result.total / limit);
  } catch (error) {
    console.error('Error loading reviews:', error);
    toast.add({
      title: 'Fout',
      description: 'Kon reviews niet laden',
      icon: 'i-mdi-alert-circle',
      color: 'error',
    });
  } finally {
    isLoading.value = false;
  }
};

const loadStats = async () => {
  try {
    stats.value = await getDetailedStats();
  } catch (error) {
    console.error('Error loading stats:', error);
  }
};

const handleStatusUpdate = async (
  reviewId: string,
  status: 'approved' | 'rejected'
) => {
  if (!user.value?.email) return;

  isUpdating.value = reviewId;
  try {
    const result = await updateReviewStatus(reviewId, status, user.value.email);

    if (result.success) {
      toast.add({
        title: 'Success',
        description: `Review ${
          status === 'approved' ? 'goedgekeurd' : 'afgewezen'
        }`,
        icon:
          status === 'approved' ? 'i-mdi-check-circle' : 'i-mdi-close-circle',
        color: status === 'approved' ? 'success' : 'warning',
      });

      // Refresh data
      await Promise.all([loadReviews(), loadStats()]);
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    console.error('Error updating review:', error);
    toast.add({
      title: 'Fout',
      description: 'Kon review status niet bijwerken',
      icon: 'i-mdi-alert-circle',
      color: 'error',
    });
  } finally {
    isUpdating.value = null;
  }
};

const handleDelete = async (reviewId: string) => {
  if (!confirm('Weet je zeker dat je deze review wilt verwijderen?')) return;

  isUpdating.value = reviewId;
  try {
    const result = await deleteReview(reviewId);

    if (result.success) {
      toast.add({
        title: 'Verwijderd',
        description: 'Review is verwijderd',
        icon: 'i-mdi-delete',
        color: 'success',
      });

      // Refresh data
      await Promise.all([loadReviews(), loadStats()]);
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    console.error('Error deleting review:', error);
    toast.add({
      title: 'Fout',
      description: 'Kon review niet verwijderen',
      icon: 'i-mdi-alert-circle',
      color: 'error',
    });
  } finally {
    isUpdating.value = null;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'approved':
      return 'success';
    case 'rejected':
      return 'error';
    case 'pending':
      return 'warning';
    default:
      return 'neutral';
  }
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('nl-NL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => i < rating);
};

// Watch filter changes
watch([currentFilter, currentPage], () => {
  loadReviews();
});

// Initial load
onMounted(async () => {
  if (user.value) {
    await Promise.all([loadReviews(), loadStats()]);
  }
});
</script>

<template>
  <div v-if="user" class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <UContainer class="py-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
              Admin Dashboard
            </h1>
            <p class="text-gray-600 dark:text-gray-300 mt-2">
              Beheer reviews en bekijk statistieken
            </p>
          </div>

          <div class="flex items-center gap-4">
            <UButton to="/reviews" variant="outline" icon="i-mdi-eye">
              Bekijk Reviews Pagina
            </UButton>
          </div>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <UCard>
            <div class="flex items-center gap-4">
              <div class="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <UIcon
                  name="i-mdi-format-list-bulleted"
                  class="w-6 h-6 text-blue-600"
                />
              </div>
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Totaal Reviews
                </p>
                <p class="text-2xl font-bold text-gray-900 dark:text-white">
                  {{ stats.total }}
                </p>
              </div>
            </div>
          </UCard>

          <UCard>
            <div class="flex items-center gap-4">
              <div class="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <UIcon
                  name="i-mdi-clock-outline"
                  class="w-6 h-6 text-orange-600"
                />
              </div>
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-400">Wachtend</p>
                <p class="text-2xl font-bold text-gray-900 dark:text-white">
                  {{ stats.pending }}
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
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Goedgekeurd
                </p>
                <p class="text-2xl font-bold text-gray-900 dark:text-white">
                  {{ stats.approved }}
                </p>
              </div>
            </div>
          </UCard>

          <UCard>
            <div class="flex items-center gap-4">
              <div class="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                <UIcon name="i-mdi-star" class="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Gem. Rating
                </p>
                <p class="text-2xl font-bold text-gray-900 dark:text-white">
                  {{ stats.averageRating.toFixed(1) }}
                </p>
              </div>
            </div>
          </UCard>
        </div>
      </div>

      <!-- Filters -->
      <div class="flex flex-wrap items-center gap-4 mb-6">
        <div class="flex items-center gap-2">
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300"
            >Filter:</span
          >
          <div class="flex gap-2">
            <UButton
              v-for="filter in filterOptions"
              :key="filter.value"
              :variant="currentFilter === filter.value ? 'solid' : 'outline'"
              :color="currentFilter === filter.value ? filter.color : 'neutral'"
              :icon="filter.icon"
              size="sm"
              @click="
                currentFilter = filter.value;
                currentPage = 1;
              "
            >
              {{ filter.label }}
            </UButton>
          </div>
        </div>

        <div class="ml-auto">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            {{ filteredStats.count }} {{ filteredStats.label }}
          </p>
        </div>
      </div>

      <!-- Reviews List -->
      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
            Reviews Overzicht
          </h2>
        </template>

        <div v-if="isLoading" class="space-y-4">
          <div v-for="i in 3" :key="i" class="animate-pulse">
            <div class="flex gap-4 p-4 border rounded-lg">
              <div
                class="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full"
              />
              <div class="flex-1 space-y-2">
                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="reviews.length === 0" class="text-center py-12">
          <UIcon
            name="i-mdi-comment-outline"
            class="w-16 h-16 text-gray-400 mx-auto mb-4"
          />
          <h3
            class="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2"
          >
            Geen reviews gevonden
          </h3>
          <p class="text-gray-500 dark:text-gray-400">
            Er zijn geen reviews met de huidige filter.
          </p>
        </div>

        <div v-else class="space-y-4">
          <div
            v-for="review in reviews"
            :key="review.id"
            class="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-start gap-4">
                <div class="flex-shrink-0">
                  <div
                    class="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center"
                  >
                    <UIcon
                      name="i-mdi-account"
                      class="w-6 h-6 text-primary-600"
                    />
                  </div>
                </div>

                <div>
                  <h3 class="font-semibold text-gray-900 dark:text-white">
                    {{ review.name }}
                  </h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    {{ review.email }}
                  </p>
                  <p
                    v-if="review.treatment"
                    class="text-sm text-gray-500 dark:text-gray-400 mt-1"
                  >
                    {{ review.treatment }}
                  </p>

                  <!-- Star Rating -->
                  <div class="flex items-center gap-1 mt-2">
                    <UIcon
                      v-for="(filled, index) in renderStars(review.rating)"
                      :key="index"
                      :name="filled ? 'i-mdi-star' : 'i-mdi-star-outline'"
                      :class="filled ? 'text-yellow-500' : 'text-gray-300'"
                      class="w-4 h-4"
                    />
                    <span class="text-sm text-gray-600 dark:text-gray-400 ml-2">
                      {{ review.rating }}/5
                    </span>
                  </div>
                </div>
              </div>

              <div class="flex items-center gap-2">
                <UBadge :color="getStatusColor(review.status)" variant="subtle">
                  {{
                    review.status === 'pending'
                      ? 'Wachtend'
                      : review.status === 'approved'
                      ? 'Goedgekeurd'
                      : 'Afgewezen'
                  }}
                </UBadge>

                <UDropdownMenu
                  :items="[
                    [
                      {
                        label: 'Goedkeuren',
                        icon: 'i-mdi-check',
                        onSelect: () =>
                          handleStatusUpdate(review.id, 'approved'),
                        disabled:
                          review.status === 'approved' ||
                          isUpdating === review.id,
                      },
                      {
                        label: 'Afwijzen',
                        icon: 'i-mdi-close',
                        onSelect: () =>
                          handleStatusUpdate(review.id, 'rejected'),
                        disabled:
                          review.status === 'rejected' ||
                          isUpdating === review.id,
                      },
                    ],
                    [
                      {
                        label: 'Verwijderen',
                        icon: 'i-mdi-delete',
                        onSelect: () => handleDelete(review.id),
                        disabled: isUpdating === review.id,
                      },
                    ],
                  ]"
                >
                  <UButton
                    variant="ghost"
                    icon="i-mdi-dots-vertical"
                    :loading="isUpdating === review.id"
                  />
                </UDropdownMenu>
              </div>
            </div>

            <div class="mb-4">
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                "{{ review.review }}"
              </p>
            </div>

            <div
              class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400"
            >
              <span>Ingediend op {{ formatDate(review.created_at) }}</span>
              <div v-if="review.reviewed_at" class="text-right">
                <p>Beoordeeld op {{ formatDate(review.reviewed_at) }}</p>
                <p v-if="review.reviewed_by">door {{ review.reviewed_by }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <template v-if="totalPages > 1" #footer>
          <div class="flex items-center justify-between">
            <div class="text-sm text-gray-600 dark:text-gray-400">
              Pagina {{ currentPage }} van {{ totalPages }}
            </div>
            <div class="flex gap-2">
              <UButton
                variant="outline"
                icon="i-mdi-chevron-left"
                :disabled="currentPage === 1"
                @click="currentPage--"
              >
                Vorige
              </UButton>
              <UButton
                variant="outline"
                icon="i-mdi-chevron-right"
                :disabled="currentPage === totalPages"
                @click="currentPage++"
              >
                Volgende
              </UButton>
            </div>
          </div>
        </template>
      </UCard>
    </UContainer>
  </div>

  <!-- Loading state for unauthenticated users -->
  <div v-else class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <UIcon
        name="i-mdi-loading"
        class="w-8 h-8 animate-spin text-primary-600 mx-auto mb-4"
      />
      <p class="text-gray-600 dark:text-gray-400">
        Authenticatie controleren...
      </p>
    </div>
  </div>
</template>
