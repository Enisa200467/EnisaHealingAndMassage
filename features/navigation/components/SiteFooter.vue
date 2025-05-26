<template>
  <footer
    class="bg-neutral-100 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 mt-auto py-12"
  >
    <UContainer>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
        <!-- Links Section (2/3 width) -->
        <div class="md:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-8">
          <!-- Column 1: Behandelingen -->
          <div>
            <h4 class="font-semibold text-neutral-900 dark:text-white mb-3">
              Behandelingen
            </h4>
            <!-- Healing category -->
            <div class="mb-3">
              <h5
                class="text-xs font-bold text-neutral-700 dark:text-neutral-400 mb-1"
              >
                {{ routes.treatments.healing.title }}
              </h5>
              <ul class="space-y-1">
                <li
                  v-for="(item, index) in footerLinks.services.healing"
                  :key="index"
                >
                  <ULink
                    :to="item.path"
                    class="text-neutral-600 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 text-sm"
                  >
                    {{ item.title }}
                  </ULink>
                </li>
              </ul>
            </div>

            <!-- Massage category -->
            <div>
              <h5
                class="text-xs font-bold text-neutral-700 dark:text-neutral-400 mb-1"
              >
                {{ routes.treatments.massage.title }}
              </h5>
              <ul class="space-y-1">
                <li
                  v-for="(item, index) in footerLinks.services.massage"
                  :key="index"
                >
                  <ULink
                    :to="item.path"
                    class="text-neutral-600 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 text-sm"
                  >
                    {{ item.title }}
                  </ULink>
                </li>
              </ul>
            </div>
          </div>

          <!-- Column 2: Praktijk Info -->
          <div>
            <h4 class="font-semibold text-neutral-900 dark:text-white mb-3">
              Praktijk
            </h4>
            <ul class="space-y-2">
              <li>
                <ULink
                  :to="routes.pages.about"
                  class="text-neutral-600 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 text-sm"
                >
                  Over Mij
                </ULink>
              </li>
              <li>
                <ULink
                  :to="routes.pages.contact"
                  class="text-neutral-600 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 text-sm"
                >
                  Contact
                </ULink>
              </li>
              <li>
                <ULink
                  :to="routes.pages.tarieven"
                  class="text-neutral-600 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 text-sm"
                >
                  Tarieven
                </ULink>
              </li>
            </ul>
          </div>

          <!-- Column 3: Informatie -->
          <div>
            <h4 class="font-semibold text-neutral-900 dark:text-white mb-3">
              Informatie
            </h4>
            <ul class="space-y-2">
              <li v-for="(item, index) in footerLinks.info" :key="index">
                <ULink
                  :to="item.path"
                  class="text-neutral-600 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 text-sm"
                >
                  {{ item.label }}
                </ULink>
              </li>
            </ul>
          </div>

          <!-- Column 4: Boeken -->
          <div>
            <h4 class="font-semibold text-neutral-900 dark:text-white mb-3">
              Afspraak
            </h4>
            <ul class="space-y-2">
              <li>
                <UButton
                  :to="routes.pages.booking"
                  variant="link"
                  :padded="false"
                  class="text-neutral-600 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 text-sm"
                  icon="i-mdi-calendar"
                >
                  Boek Nu
                </UButton>
              </li>
            </ul>
          </div>
        </div>

        <!-- Reviews Section (1/3 width) -->
        <div class="md:col-span-1">
          <h4
            class="font-semibold text-neutral-900 dark:text-white mb-3 text-center"
          >
            Klantervaringen
          </h4>
          <div v-if="displayReviews.length > 0" class="text-center mb-4">
            <span class="font-medium text-neutral-700 dark:text-neutral-300"
              >Gemiddelde Score:</span
            >
            <span class="font-bold text-primary-600 dark:text-primary-400 ml-1"
              >{{ averageScore }}/5</span
            >
            <UIcon name="i-mdi-star" class="w-4 h-4 ml-1 text-yellow-400" />
          </div>
          <UCarousel
            v-if="displayReviews.length > 0"
            v-slot="{ item }"
            :items="displayReviews"
            :ui="{ item: 'basis-full' }"
            arrows
            indicators
            class="w-full max-w-xs mx-auto"
          >
            <UCard class="text-center">
              <p class="text-sm text-neutral-700 dark:text-neutral-300">
                "{{ item.text }}"
              </p>
              <p
                class="text-xs font-medium text-neutral-500 dark:text-neutral-400 mt-2"
              >
                - {{ item.author }}
              </p>
            </UCard>
          </UCarousel>
          <div
            v-else-if="isLoading"
            class="text-center text-sm text-neutral-500 dark:text-neutral-400"
          >
            <UIcon
              name="i-mdi-loading"
              class="w-4 h-4 animate-spin mx-auto mb-2"
            />
            <p>Reviews laden...</p>
          </div>
          <p
            v-else
            class="text-center text-sm text-neutral-500 dark:text-neutral-400"
          >
            Nog geen reviews beschikbaar.
          </p>
        </div>
      </div>

      <!-- Copyright -->
      <div
        class="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800 text-center text-sm text-neutral-500 dark:text-neutral-400"
      >
        &copy; {{ new Date().getFullYear() }} Enisa Healing & Massage. Alle
        rechten voorbehouden.
      </div>
    </UContainer>
  </footer>
</template>

<script setup lang="ts">
import type { Review, ReviewStats } from '~/types/reviews';

// Use routes composable for centralized route management
const routes = useRoutes();

// Statically define footer links based on routes
const footerLinks = {
  // Group services by category (healing and massage)
  services: {
    healing: routes.treatments.healing.items,
    massage: routes.treatments.massage.items,
  },
  info: [
    { label: 'Veelgestelde Vragen', path: routes.pages.faq },
    { label: 'Reviews & Ervaringen', path: routes.pages.reviews },
  ],
};

// Reviews data from API
const reviews = ref<Review[]>([]);
const reviewStats = ref<ReviewStats>({
  total: 0,
  approved: 0,
  pending: 0,
  rejected: 0,
  averageRating: 0,
});
const isLoading = ref(true);

// Transform reviews for display
const displayReviews = computed(() => {
  return reviews.value.map((review) => ({
    id: review.id,
    author: review.name,
    score: review.rating,
    text: review.review,
  }));
});

// Calculate average score from stats
const averageScore = computed(() => {
  return reviewStats.value.averageRating.toFixed(1);
});

// Load reviews data
const loadReviewsData = async () => {
  try {
    isLoading.value = true;

    // Fetch both reviews and stats concurrently
    const [reviewsResponse, statsResponse] = await Promise.all([
      $fetch<{ data: { reviews: Review[] } }>('/api/reviews?limit=4'), // Get only 4 reviews for footer
      $fetch<{ data: ReviewStats }>('/api/reviews/stats'),
    ]);

    reviews.value = reviewsResponse.data.reviews;
    reviewStats.value = statsResponse.data;
  } catch (error) {
    console.error('Error loading reviews data for footer:', error);
    // Keep empty arrays as fallback - don't show error in footer
    reviews.value = [];
    reviewStats.value = {
      total: 0,
      approved: 0,
      pending: 0,
      rejected: 0,
      averageRating: 0,
    };
  } finally {
    isLoading.value = false;
  }
};

// Load data on component mount
onMounted(() => {
  loadReviewsData();
});
</script>

<style scoped>
/* Add any additional footer-specific styles here */
</style>
