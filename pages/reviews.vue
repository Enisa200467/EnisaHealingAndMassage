<template>
  <div>
    <!-- Hero Section -->
    <section
      class="relative bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-950 dark:to-secondary-950 py-16 sm:py-24"
    >
      <UContainer>
        <div class="text-center max-w-3xl mx-auto">
          <UIcon
            name="i-mdi-star-four-points"
            class="w-16 h-16 text-primary-600 mx-auto mb-6"
          />
          <h1
            class="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white mb-6"
          >
            Reviews & Ervaringen
          </h1>
          <p class="text-xl text-neutral-600 dark:text-neutral-300 mb-8">
            Deel je ervaring met anderen en lees wat andere cliënten te zeggen
            hebben over hun behandelingen.
          </p>
        </div>
      </UContainer>
    </section>

    <!-- Review Form Section -->
    <section class="py-16 sm:py-24">
      <UContainer>
        <div class="max-w-2xl mx-auto">
          <UCard>
            <template #header>
              <div class="flex items-center gap-3">
                <UIcon
                  name="i-mdi-comment-edit"
                  class="w-6 h-6 text-primary-600"
                />
                <h2 class="text-2xl font-bold text-neutral-900 dark:text-white">
                  Deel je ervaring
                </h2>
              </div>
            </template>

            <UForm
              :schema="reviewSchema"
              :state="reviewForm"
              class="space-y-6"
              @submit="onSubmit"
            >
              <UFormGroup label="Naam" name="name" required>
                <UInput
                  v-model="reviewForm.name"
                  placeholder="Je voornaam"
                  icon="i-mdi-account"
                />
              </UFormGroup>

              <UFormGroup label="E-mailadres" name="email" required>
                <UInput
                  v-model="reviewForm.email"
                  type="email"
                  placeholder="je.email@voorbeeld.nl"
                  icon="i-mdi-email"
                />
              </UFormGroup>

              <UFormGroup label="Behandeling" name="treatment">
                <USelect
                  v-model="reviewForm.treatment"
                  :options="treatmentOptions"
                  placeholder="Selecteer de behandeling (optioneel)"
                />
              </UFormGroup>

              <UFormGroup label="Beoordeling" name="rating" required>
                <div class="space-y-2">
                  <StarRating v-model="reviewForm.rating" :show-text="true" />
                  <p class="text-sm text-neutral-500 dark:text-neutral-400">
                    Klik op de sterren om je beoordeling te geven
                  </p>
                </div>
              </UFormGroup>

              <UFormGroup label="Je review" name="review" required>
                <UTextarea
                  v-model="reviewForm.review"
                  placeholder="Beschrijf je ervaring met de behandeling..."
                  :rows="6"
                  :maxlength="1000"
                />
                <template #help>
                  <div class="flex justify-between text-sm">
                    <span
                      >Deel je ervaring zodat anderen kunnen leren van jouw
                      behandeling</span
                    >
                    <span class="text-neutral-400"
                      >{{ reviewForm.review.length }}/1000</span
                    >
                  </div>
                </template>
              </UFormGroup>

              <div class="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <div class="flex gap-3">
                  <UIcon
                    name="i-mdi-information"
                    class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
                  />
                  <div class="text-sm text-blue-800 dark:text-blue-200">
                    <p class="font-medium mb-1">Privacy informatie</p>
                    <p>
                      Je e-mailadres wordt niet gepubliceerd en alleen gebruikt
                      voor verificatie. Reviews worden handmatig gecontroleerd
                      voordat ze zichtbaar worden.
                    </p>
                  </div>
                </div>
              </div>

              <template #footer>
                <div class="flex justify-end gap-3">
                  <UButton type="button" variant="ghost" @click="resetForm">
                    Reset
                  </UButton>
                  <UButton
                    type="submit"
                    :loading="isSubmitting"
                    :disabled="!isFormValid"
                  >
                    Review Versturen
                  </UButton>
                </div>
              </template>
            </UForm>
          </UCard>
        </div>
      </UContainer>
    </section>

    <!-- Existing Reviews Section -->
    <section class="py-16 sm:py-24">
      <UContainer>
        <div class="text-center mb-12">
          <h2
            class="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-4"
          >
            Wat anderen zeggen
          </h2>
          <p class="text-lg text-neutral-600 dark:text-neutral-300">
            Lees de ervaringen van andere cliënten
          </p>
        </div>

        <div v-if="displayedReviews.length > 0" class="space-y-8">
          <!-- Average Rating Display -->
          <div
            class="text-center bg-white dark:bg-neutral-800 rounded-xl p-8 shadow-sm"
          >
            <div class="flex items-center justify-center gap-4 mb-4">
              <StarRating :model-value="averageRating" :interactive="false" />
              <div class="text-left">
                <div
                  class="text-3xl font-bold text-neutral-900 dark:text-white"
                >
                  {{ averageRating.toFixed(1) }}
                </div>
                <div class="text-sm text-neutral-500 dark:text-neutral-400">
                  uit {{ displayedReviews.length }} reviews
                </div>
              </div>
            </div>
          </div>

          <!-- Reviews Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <UCard
              v-for="review in displayedReviews"
              :key="review.id"
              class="h-full"
            >
              <template #header>
                <div class="flex items-start justify-between">
                  <div>
                    <h3 class="font-semibold text-neutral-900 dark:text-white">
                      {{ review.name }}
                    </h3>
                    <p
                      v-if="review.treatment"
                      class="text-sm text-neutral-500 dark:text-neutral-400"
                    >
                      {{ review.treatment }}
                    </p>
                  </div>
                  <StarRating
                    :model-value="review.rating"
                    :interactive="false"
                  />
                </div>
              </template>

              <p class="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                "{{ review.review }}"
              </p>

              <template #footer>
                <p class="text-xs text-neutral-400 dark:text-neutral-500">
                  {{ formatDate(review.created_at) }}
                </p>
              </template>
            </UCard>
          </div>

          <!-- Load More Button -->
          <div v-if="hasMoreReviews" class="text-center">
            <UButton
              variant="outline"
              :loading="loadingMore"
              @click="loadMoreReviews"
            >
              Meer reviews laden
            </UButton>
          </div>
        </div>

        <div v-else class="text-center py-12">
          <UIcon
            name="i-mdi-comment-outline"
            class="w-16 h-16 text-neutral-400 mx-auto mb-4"
          />
          <h3
            class="text-xl font-semibold text-neutral-600 dark:text-neutral-300 mb-2"
          >
            Nog geen reviews
          </h3>
          <p class="text-neutral-500 dark:text-neutral-400">
            Wees de eerste om een review achter te laten!
          </p>
        </div>
      </UContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
import { z } from 'zod';
import type { Review, ReviewStats } from '~/types/reviews';

// SEO Meta
useSeoMeta({
  title: 'Reviews & Ervaringen - Enisa Healing & Massage',
  description:
    'Lees reviews en ervaringen van cliënten over healing en massage behandelingen. Deel je eigen ervaring en help anderen bij hun keuze.',
});

// Form validation schema
const reviewSchema = z.object({
  name: z.string().min(2, 'Naam moet minimaal 2 karakters lang zijn'),
  email: z.string().email('Voer een geldig e-mailadres in'),
  treatment: z.string().optional(),
  rating: z.number().min(1, 'Selecteer een beoordeling').max(5),
  review: z
    .string()
    .min(10, 'Review moet minimaal 10 karakters lang zijn')
    .max(1000, 'Review mag maximaal 1000 karakters lang zijn'),
});

// Form state
const reviewForm = reactive({
  name: '',
  email: '',
  treatment: '',
  rating: 0,
  review: '',
});

// Form submission state
const isSubmitting = ref(false);

// Treatment options for dropdown
const treatmentOptions = [
  { label: 'Chakra Balancering', value: 'Chakra Balancering' },
  {
    label: 'Energetische Healing Sessie',
    value: 'Energetische Healing Sessie',
  },
  { label: 'Reiki Behandeling', value: 'Reiki Behandeling' },
  { label: 'Ontspanningsmassage', value: 'Ontspanningsmassage' },
  { label: 'Therapeutische Massage', value: 'Therapeutische Massage' },
  { label: 'Hot Stone Massage', value: 'Hot Stone Massage' },
  { label: 'Zwangerschapsmassage', value: 'Zwangerschapsmassage' },
];

// Form validation
const isFormValid = computed(() => {
  try {
    reviewSchema.parse(reviewForm);
    return true;
  } catch {
    return false;
  }
});

// Composables
const { submitReview } = useReviews();
const toast = useToast();

// Reviews data
const allReviews = ref<Review[]>([]);
const reviewStats = ref<ReviewStats>({
  total: 0,
  approved: 0,
  pending: 0,
  rejected: 0,
  averageRating: 0,
});

// Reviews display state
const reviewsPerPage = 6;
const currentPage = ref(1);
const loadingMore = ref(false);
const isLoadingReviews = ref(true);

const displayedReviews = computed(() => {
  return allReviews.value.slice(0, currentPage.value * reviewsPerPage);
});

const hasMoreReviews = computed(() => {
  return displayedReviews.value.length < allReviews.value.length;
});

const averageRating = computed(() => {
  return reviewStats.value.averageRating;
});

// Load reviews data
const loadReviews = async () => {
  try {
    isLoadingReviews.value = true;
    const response = await $fetch<{ data: { reviews: Review[] } }>(
      '/api/reviews'
    );
    allReviews.value = response.data.reviews;
  } catch (error) {
    console.error('Error loading reviews:', error);
  } finally {
    isLoadingReviews.value = false;
  }
};

// Load review statistics
const loadStats = async () => {
  try {
    const { data } = await $fetch<{ data: ReviewStats }>('/api/reviews/stats');
    reviewStats.value = data;
  } catch (error) {
    console.error('Error loading stats:', error);
  }
};

// Refresh stats after successful submission
const refreshStats = async () => {
  await loadStats();
};

// Methods
const onSubmit = async () => {
  isSubmitting.value = true;

  try {
    const result = await submitReview(reviewForm);

    if (result.success) {
      toast.add({
        title: 'Review verzonden!',
        description:
          'Bedankt voor je review. Deze wordt binnenkort gepubliceerd na controle.',
        icon: 'i-mdi-check-circle',
        color: 'green',
      });
      resetForm();
      // Refresh stats after successful submission
      await refreshStats();
    } else {
      toast.add({
        title: 'Fout bij versturen',
        description:
          result.error || 'Er is iets misgegaan. Probeer het later opnieuw.',
        icon: 'i-mdi-alert-circle',
        color: 'red',
      });
    }
  } catch (error) {
    console.error('Error submitting review:', error);
    toast.add({
      title: 'Fout bij versturen',
      description: 'Er is iets misgegaan. Probeer het later opnieuw.',
      icon: 'i-mdi-alert-circle',
      color: 'red',
    });
  } finally {
    isSubmitting.value = false;
  }
};

const resetForm = () => {
  Object.assign(reviewForm, {
    name: '',
    email: '',
    treatment: '',
    rating: 0,
    review: '',
  });
};

const loadMoreReviews = async () => {
  loadingMore.value = true;

  // Simulate loading delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  currentPage.value++;
  loadingMore.value = false;
};

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat('nl-NL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
};

// Load data on mount
onMounted(async () => {
  await Promise.all([loadReviews(), loadStats()]);
});
</script>
