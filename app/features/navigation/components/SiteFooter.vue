<template>
  <footer
    id="footer"
    class="bg-neutral-100 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 mt-auto py-10"
    role="contentinfo"
    aria-label="Site footer"
  >
    <UContainer>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Links Section (2/3 width) -->
        <div class="md:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-8">
          <!-- Column 1: Behandelingen -->
          <div>
            <h4 class="font-semibold text-neutral-900 dark:text-white mb-3">
              Behandelingen
            </h4>
            <ul class="space-y-2">
              <li v-for="treatment in allTreatments" :key="treatment.title">
                <ULink
                  :to="treatment.path"
                  class="text-neutral-600 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 text-sm"
                >
                  {{ treatment.title }}
                </ULink>
              </li>
            </ul>
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
                  as="a"
                  href="https://enisa-healing-massage.setmore.com"
                  target="_blank"
                  rel="noopener noreferrer"
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
          <ClientOnly>
            <template v-if="!isLoading && displayReviews.length > 0">
              <div class="text-center mb-4">
                <span class="font-medium text-neutral-700 dark:text-neutral-300"
                  >Gemiddelde Score:</span
                >
                <span
                  class="font-bold text-primary-600 dark:text-primary-400 ml-1"
                  >{{ averageScore }}/5</span
                >
                <UIcon name="i-mdi-star" class="w-4 h-4 ml-1 text-yellow-400" />
              </div>

              <!-- Live region for review carousel announcements -->
              <div
                role="status"
                aria-live="polite"
                aria-atomic="true"
                class="sr-only"
              >
                {{ currentReviewAnnouncement }}
              </div>

              <UCarousel
                v-slot="{ item }"
                :items="displayReviews"
                :ui="{ item: 'basis-full' }"
                arrows
                indicators
                class="w-full max-w-xs mx-auto"
                aria-label="Klantervaringen carousel"
                aria-roledescription="carousel"
                @update:modelValue="onReviewChange"
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
            </template>

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

            <template #fallback>
              <div
                class="text-center text-sm text-neutral-500 dark:text-neutral-400"
              >
                <UIcon
                  name="i-mdi-loading"
                  class="w-4 h-4 animate-spin mx-auto mb-2"
                />
                <p>Reviews laden...</p>
              </div>
            </template>
          </ClientOnly>
        </div>
      </div>

      <!-- Copyright -->
      <div
        class="mt-10 pt-6 border-t border-neutral-200 dark:border-neutral-800 text-center text-sm text-neutral-500 dark:text-neutral-400"
      >
        <p>
          Mijn behandelingen bieden energetische ondersteuning en zijn geen
          vervanging van medische of psychologische zorg.
        </p>
        <p>
          &copy; {{ currentYear }} Enisa Healing & Massage. Alle rechten
          voorbehouden.
        </p>
      </div>
    </UContainer>
  </footer>
</template>

<script setup lang="ts">
import type { Review, ReviewStats } from "~/types/reviews";

// Use routes composable for centralized route management
const routes = useRoutes();

// Get all active treatments using global composable
const { activeTreatments: allTreatments } = useTreatments();

// Reactively define footer links based on routes
const footerLinks = computed(() => ({
  info: [
    { label: "Veelgestelde Vragen", path: routes.pages.faq },
    { label: "Reviews & Ervaringen", path: routes.pages.reviews },
  ],
}));

// SSR-compatible reviews data fetching
const { data: footerReviewsData, pending: isLoading } = await useAsyncData(
  "footer-reviews",
  async () => {
    try {
      const [reviewsResponse, statsResponse] = await Promise.all([
        $fetch<{ data: { reviews: Review[] } }>("/api/reviews?limit=4"),
        $fetch<{ data: ReviewStats }>("/api/reviews/stats"),
      ]);

      return {
        reviews: reviewsResponse.data.reviews,
        stats: statsResponse.data,
      };
    } catch (error) {
      console.error("Error loading reviews data for footer:", error);
      return {
        reviews: [],
        stats: {
          total: 0,
          approved: 0,
          pending: 0,
          rejected: 0,
          averageRating: 0,
        },
      };
    }
  },
);

// Helper function to truncate review text
const truncateReviewText = (text: string, maxLength = 150) => {
  if (text.length <= maxLength) return text;
  // Find the last space before maxLength to avoid cutting words
  const truncateAt = text.lastIndexOf(" ", maxLength);
  return text.substring(0, truncateAt > 0 ? truncateAt : maxLength) + "...";
};

// Transform reviews for display
const displayReviews = computed(() => {
  return (footerReviewsData.value?.reviews || []).map((review) => ({
    id: review.id,
    author: review.name,
    score: review.rating,
    text: truncateReviewText(review.review),
  }));
});

// Calculate average score from stats
const averageScore = computed(() => {
  return (footerReviewsData.value?.stats.averageRating || 0).toFixed(1);
});

// SSR-safe current year
const currentYear = computed(() => new Date().getFullYear());

// Review carousel accessibility
const currentReviewIndex = ref(0);
const currentReviewAnnouncement = computed(() => {
  const total = displayReviews.value.length;
  if (total > 0) {
    return `Review ${currentReviewIndex.value + 1} van ${total}`;
  }
  return "";
});

const onReviewChange = (index: number) => {
  currentReviewIndex.value = index;
};
</script>

<style scoped>
/* Add any additional footer-specific styles here */
</style>
