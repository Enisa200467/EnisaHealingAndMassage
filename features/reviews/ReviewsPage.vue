<script setup lang="ts">
import { useReviews } from './composables/useReviews';
import type { Review, ReviewStats as ReviewStatsType } from './types/reviews';

const { setPageSEO, businessInfo } = useGlobalSEO();

const { getApprovedReviews, getReviewStats, submitReview } = useReviews();

// Reviews data
const allReviews = ref<Review[]>([]);
const reviewStatsForSeo = ref<ReviewStatsType>({
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
    reviewStatsForSeo.value = statsResponse;
  } catch (error) {
    console.error('Error loading reviews:', error);
  } finally {
    isLoading.value = false;
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

const hasSubmitted = ref(false);
// Handle review submission
const handleReviewSubmission = async (reviewData: Partial<Review>) => {
  const result = await submitReview(reviewData);
  if (result.success) {
    hasSubmitted.value = true;
    // Optionally reload reviews or show success message
    await loadReviews();
  }
};

// Load reviews on mount
onMounted(() => {
  loadReviews();
});

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
          <ReviewStats :stats="reviewStatsForOverview" />
        </div>
      </UContainer>
    </section>

    <!-- Reviews List -->
    <PageSection purple>
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
