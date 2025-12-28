<script setup lang="ts">
import type { Review } from '../types/reviews';

interface Props {
  reviews: Review[];
  loading?: boolean;
  hasMore?: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  loadMore: [];
}>();

// Track expanded state for each review
const expandedReviews = ref<Set<string>>(new Set());

// Toggle review expansion
const toggleExpanded = (reviewId: string) => {
  if (expandedReviews.value.has(reviewId)) {
    expandedReviews.value.delete(reviewId);
  } else {
    expandedReviews.value.add(reviewId);
  }
};

// Check if review text should be truncated (more than ~3 lines at ~80 chars/line)
const shouldTruncate = (text: string) => text.length > 240;

// Get truncated text (approximately 3 lines)
const getTruncatedText = (text: string) => {
  if (text.length <= 240) return text;
  // Find the last space before 240 characters to avoid cutting words
  const truncateAt = text.lastIndexOf(' ', 240);
  return text.substring(0, truncateAt > 0 ? truncateAt : 240);
};

// Check if review is expanded
const isExpanded = (reviewId: string) => expandedReviews.value.has(reviewId);

// Generate announcement message for screen readers
const loadingMessage = computed(() => {
  if (props.loading) {
    return 'Reviews worden geladen...';
  } else if (props.reviews.length === 0) {
    return 'Geen reviews gevonden. Wees de eerste om een review achter te laten!';
  } else {
    return `${props.reviews.length} ${props.reviews.length === 1 ? 'review' : 'reviews'} geladen`;
  }
});
</script>

<template>
  <div class="space-y-6">
    <!-- Screen reader announcement for loading state -->
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      class="sr-only"
    >
      {{ loadingMessage }}
    </div>
    <div v-if="loading" class="space-y-4">
      <div v-for="i in 3" :key="i" class="animate-pulse">
        <UCard>
          <div class="space-y-3">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-neutral-200 rounded-full" />
              <div class="space-y-1">
                <div class="w-32 h-4 bg-neutral-200 rounded" />
                <div class="w-20 h-3 bg-neutral-200 rounded" />
              </div>
            </div>
            <div class="space-y-2">
              <div class="w-full h-4 bg-neutral-200 rounded" />
              <div class="w-3/4 h-4 bg-neutral-200 rounded" />
            </div>
          </div>
        </UCard>
      </div>
    </div>

    <div v-else-if="reviews.length === 0" class="text-center py-12">
      <UIcon
        name="i-mdi-comment-outline"
        class="w-16 h-16 text-neutral-300 mx-auto mb-4"
      />
      <h3 class="text-lg font-medium text-neutral-600 mb-2">
        Nog geen reviews
      </h3>
      <p class="text-neutral-500">
        Wees de eerste om een review achter te laten!
      </p>
    </div>

    <div v-else class="space-y-4">
      <UCard
        v-for="review in reviews"
        :key="review.id"
        class="hover:shadow-md transition-shadow"
      >
        <div class="space-y-4">
          <!-- Review Header -->
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-medium"
              >
                {{ review.name.charAt(0).toUpperCase() }}
              </div>
              <div>
                <h4 class="font-medium text-neutral-900">{{ review.name }}</h4>
                <div class="flex items-center gap-2">
                  <StarRating v-model="review.rating" size="sm" />
                  <span class="text-sm text-neutral-500">
                    {{
                      new Date(review.created_at).toLocaleDateString('nl-NL')
                    }}
                  </span>
                </div>
              </div>
            </div>

            <div v-if="review.treatment" class="text-right">
              <span
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
              >
                {{ review.treatment }}
              </span>
            </div>
          </div>

          <!-- Review Content -->
          <div class="prose prose-neutral max-w-none">
            <p class="text-neutral-700 leading-relaxed whitespace-pre-line">
              <template v-if="shouldTruncate(review.review) && !isExpanded(review.id)">
                {{ getTruncatedText(review.review) }}...
              </template>
              <template v-else>
                {{ review.review }}
              </template>
            </p>

            <!-- Read More / Read Less Button -->
            <button
              v-if="shouldTruncate(review.review)"
              @click="toggleExpanded(review.id)"
              class="text-primary-600 hover:text-primary-700 font-medium text-sm mt-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
              :aria-expanded="isExpanded(review.id)"
              :aria-label="isExpanded(review.id) ? 'Lees minder' : 'Lees meer'"
            >
              {{ isExpanded(review.id) ? 'Lees minder' : 'Lees meer' }}
            </button>
          </div>

          <!-- Review Status -->
          <div
            v-if="review.status === 'pending'"
            class="flex items-center gap-2 text-sm text-orange-600"
          >
            <UIcon name="i-mdi-clock-outline" class="w-4 h-4" />
            <span>Review wacht op goedkeuring</span>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Load More Button -->
    <div
      v-if="hasMore"
      class="text-center pt-6"
    >
      <UButton
        variant="outline"
        size="lg"
        :loading="loading"
        @click="emit('loadMore')"
      >
        <template v-if="loading">
          Reviews laden...
        </template>
        <template v-else>
          Meer reviews laden
        </template>
      </UButton>
    </div>
  </div>
</template>
