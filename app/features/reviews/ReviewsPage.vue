<script setup lang="ts">
import { useReviews } from './composables/useReviews';
import type { Review, ReviewStats as ReviewStatsType } from './types/reviews';

const { setPageSEO, businessInfo } = useGlobalSEO();

const { submitReview } = useReviews();

const currentPage = ref(1);
const reviewsPerPage = 6;
const allReviews = ref<Review[]>([]);
const hasMore = ref(false);

// SSR-compatible data fetching
const { data: reviewsData, pending: isLoading, refresh } = await useAsyncData(
  'reviews-page-data',
  async () => {
    const [reviewsResponse, statsResponse] = await Promise.all([
      $fetch<{ data: { reviews: Review[]; total: number; hasMore: boolean } }>(`/api/reviews?page=${currentPage.value}&limit=${reviewsPerPage}`),
      $fetch<{ data: ReviewStatsType }>('/api/reviews/stats'),
    ]);

    return {
      reviews: reviewsResponse.data.reviews,
      total: reviewsResponse.data.total,
      hasMore: reviewsResponse.data.hasMore,
      stats: statsResponse.data,
    };
  }
);

// Initialize reviews and hasMore on mount
watchEffect(() => {
  if (reviewsData.value) {
    // On initial load, replace reviews
    if (currentPage.value === 1) {
      allReviews.value = reviewsData.value.reviews;
    }
    hasMore.value = reviewsData.value.hasMore;
  }
});

const reviewStatsForSeo = computed(() => reviewsData.value?.stats || {
  total: 0,
  approved: 0,
  pending: 0,
  rejected: 0,
  averageRating: 0,
});

// Load more reviews (pagination)
const loadMoreReviews = async () => {
  currentPage.value += 1;
  await refresh();

  // Append new reviews to existing ones
  if (reviewsData.value?.reviews) {
    allReviews.value = [...allReviews.value, ...reviewsData.value.reviews];
    hasMore.value = reviewsData.value.hasMore;
  }
};

// Reload reviews after submission (reset to page 1)
const loadReviews = async () => {
  currentPage.value = 1;
  await refresh();
  if (reviewsData.value?.reviews) {
    allReviews.value = reviewsData.value.reviews;
    hasMore.value = reviewsData.value.hasMore;
  }
};

// Generate review schema once data is loaded
const generateReviewSchemas = () => {
  if (!allReviews.value.length) return [];

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': businessInfo.url,
    name: businessInfo.name,
    url: businessInfo.url,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: reviewStatsForSeo.value.averageRating.toFixed(1),
      reviewCount: reviewStatsForSeo.value.approved,
      bestRating: 5,
      worstRating: 1,
    },
    review: allReviews.value.map((review) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.name,
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody: review.review,
      datePublished: review.created_at,
    })),
  };

  return [organizationSchema];
};

// Set enhanced SEO with review schema after data loads
watchEffect(() => {
  if (!isLoading.value && allReviews.value.length) {
    const reviewSchemas = generateReviewSchemas();
    setPageSEO({
      title: 'Reviews & Ervaringen - Enisa Healing & Massage',
      description: `Lees de ervaringen van onze ${
        reviewStatsForSeo.value.approved
      } cliënten met een gemiddelde score van ${reviewStatsForSeo.value.averageRating.toFixed(
        1
      )}/5. Ontdek waarom mensen kiezen voor Enisa Healing & Massage.`,
      path: '/reviews',
      structuredData: reviewSchemas,
    });
  } else {
    // Fallback SEO without structured data
    useSeoMeta({
      title: 'Reviews & Ervaringen - Enisa Healing & Massage',
      description:
        'Lees de ervaringen van onze cliënten en deel je eigen ervaring. Ontdek waarom mensen kiezen voor Enisa Healing & Massage.',
    });
  }
});

// Track form submission state
const isSuccess = ref(false);
const isError = ref(false);
const errorMessage = ref('');

// Handle review submission
const handleReviewSubmission = async (reviewData: Partial<Review>) => {
  // Reset states
  isSuccess.value = false;
  isError.value = false;
  errorMessage.value = '';

  const result = await submitReview(reviewData);

  if (result.success) {
    isSuccess.value = true;
    // Reload reviews after successful submission
    await loadReviews();
  } else {
    isError.value = true;
    errorMessage.value = result.error?.message || 'Er is iets misgegaan. Probeer het later opnieuw.';
  }
};

// Fetch rating breakdown from stats API
const { data: ratingBreakdown } = await useAsyncData(
  'review-rating-breakdown',
  async () => {
    try {
      const response = await $fetch<{ data: { reviews: Review[] } }>('/api/reviews?limit=1000');
      const allApprovedReviews = response.data.reviews;

      return {
        '1': allApprovedReviews.filter((r) => r.rating === 1).length,
        '2': allApprovedReviews.filter((r) => r.rating === 2).length,
        '3': allApprovedReviews.filter((r) => r.rating === 3).length,
        '4': allApprovedReviews.filter((r) => r.rating === 4).length,
        '5': allApprovedReviews.filter((r) => r.rating === 5).length,
      };
    } catch (error) {
      console.error('Error fetching rating breakdown:', error);
      return {
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 0,
      };
    }
  }
);

const reviewStatsForOverview = computed(() => {
  return ratingBreakdown.value || {
    '1': 0,
    '2': 0,
    '3': 0,
    '4': 0,
    '5': 0,
  };
});
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section
      class="bg-gradient-to-b from-secondary-200 to-primary-50 py-12 sm:py-16"
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
          <ReviewStats :stats="reviewStatsForOverview" />
        </div>
      </UContainer>
    </section>

    <!-- Reviews List -->
    <PageSection primary aria-label="Klantervaringen en review formulier">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-12">
        <!-- Reviews Display -->
        <div class="lg:col-span-2">
          <ReviewsList
            :reviews="allReviews"
            :loading="isLoading"
            :has-more="hasMore"
            @load-more="loadMoreReviews"
          />
        </div>

        <!-- Review Form -->
        <div class="lg:col-span-2">
          <ReviewForm
            :is-success="isSuccess"
            :is-error="isError"
            :error-message="errorMessage"
            @submit="handleReviewSubmission"
          />
        </div>
      </div>
    </PageSection>
  </div>
</template>
