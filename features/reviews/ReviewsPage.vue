<script setup lang="ts">
import { useReviews } from './composables/useReviews';
import type { Review, ReviewStats as ReviewStatsType } from './types/reviews';

// SEO Meta
useSeoMeta({
  title: 'Reviews & Ervaringen - Enisa Healing & Massage',
  description:
    'Lees de ervaringen van onze cliënten en deel je eigen ervaring. Ontdek waarom mensen kiezen voor Enisa Healing & Massage.',
});

const { getApprovedReviews, getReviewStats, submitReview } = useReviews();

// Reviews data
const allReviews = ref<Review[]>([]);
const reviewStats = ref<ReviewStatsType>({
  total: 0,
  approved: 0,
  pending: 0,
  rejected: 0,
  averageRating: 0,
});

const isLoading = ref(true);
const currentPage = ref(1);
const reviewsPerPage = 6;

// Load initial data
const loadReviews = async () => {
  isLoading.value = true;
  try {
    const [reviewsResponse, statsResponse] = await Promise.all([
      getApprovedReviews(currentPage.value, reviewsPerPage),
      getReviewStats(),
    ]);

    allReviews.value = reviewsResponse.reviews;
    reviewStats.value = statsResponse;
  } catch (error) {
    console.error('Error loading reviews:', error);
  } finally {
    isLoading.value = false;
  }
};

// Handle review submission
const handleReviewSubmission = async (reviewData: any) => {
  const result = await submitReview(reviewData);
  if (result.success) {
    // Optionally reload reviews or show success message
    await loadReviews();
  }
};

// Load reviews on mount
onMounted(() => {
  loadReviews();
});
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section
      class="bg-gradient-to-br from-primary-50 to-secondary-50 py-16 sm:py-24"
    >
      <UContainer>
        <div class="max-w-4xl mx-auto text-center">
          <h1
            class="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6"
          >
            Reviews & Ervaringen
          </h1>
          <p class="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
            Lees wat anderen zeggen over hun ervaring en deel je eigen verhaal.
          </p>
          <ReviewStats :stats="reviewStats" />
        </div>
      </UContainer>
    </section>

    <!-- Reviews List -->
    <UContainer class="py-16 sm:py-24">
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <!-- Reviews Display -->
          <div class="lg:col-span-2">
            <ReviewsList
              :reviews="allReviews"
              :loading="isLoading"
              @load-more="loadReviews"
            />
          </div>

          <!-- Review Form -->
          <div class="lg:col-span-1">
            <ReviewForm @submit="handleReviewSubmission" />
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>
