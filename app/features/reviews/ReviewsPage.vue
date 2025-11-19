<script setup lang="ts">
import { useReviews } from './composables/useReviews';
import type { Review, ReviewStats as ReviewStatsType } from './types/reviews';

const { setPageSEO, businessInfo } = useGlobalSEO();

const { submitReview } = useReviews();

const currentPage = ref(1);
const reviewsPerPage = 6;

// SSR-compatible data fetching
const { data: reviewsData, pending: isLoading, refresh } = await useAsyncData(
  'reviews-page-data',
  async () => {
    const [reviewsResponse, statsResponse] = await Promise.all([
      $fetch<{ data: { reviews: Review[] } }>(`/api/reviews?page=${currentPage.value}&limit=${reviewsPerPage}`),
      $fetch<{ data: ReviewStatsType }>('/api/reviews/stats'),
    ]);

    return {
      reviews: reviewsResponse.data.reviews,
      stats: statsResponse.data,
    };
  }
);

// Computed refs from SSR data
const allReviews = computed(() => reviewsData.value?.reviews || []);
const reviewStatsForSeo = computed(() => reviewsData.value?.stats || {
  total: 0,
  approved: 0,
  pending: 0,
  rejected: 0,
  averageRating: 0,
});

// Reload reviews after submission
const loadReviews = async () => {
  await refresh();
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

const hasSubmitted = ref(false);
// Handle review submission
const handleReviewSubmission = async (reviewData: Partial<Review>) => {
  const result = await submitReview(reviewData);
  if (result.success) {
    hasSubmitted.value = true;
    // Reload reviews after successful submission
    await loadReviews();
  }
};

const reviewStatsForOverview = computed(() => {
  return {
    '1': allReviews.value.filter((r) => r.rating === 1).length,
    '2': allReviews.value.filter((r) => r.rating === 2).length,
    '3': allReviews.value.filter((r) => r.rating === 3).length,
    '4': allReviews.value.filter((r) => r.rating === 4).length,
    '5': allReviews.value.filter((r) => r.rating === 5).length,
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
    <PageSection primary>
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-12">
        <!-- Reviews Display -->
        <div class="lg:col-span-2">
          <ReviewsList
            :reviews="allReviews"
            :loading="isLoading"
            @load-more="loadReviews"
          />
        </div>

        <!-- Review Form -->
        <div class="lg:col-span-2">
          <ReviewForm v-if="!hasSubmitted" @submit="handleReviewSubmission" />

          <UAlert v-else title="Bedankt voor je review!" class="w-1/2" />
        </div>
      </div>
    </PageSection>
  </div>
</template>
