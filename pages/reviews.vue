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
                  {{ formatDate(review.date) }}
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

// Mock reviews data (in a real app, this would come from an API)
const allReviews = ref([
  {
    id: 1,
    name: 'Sarah',
    treatment: 'Chakra Balancering',
    rating: 5,
    review:
      'Fantastische ervaring! Ik voelde me na de behandeling veel rustiger en meer in balans. Enisa heeft een zeer ontspannende manier van behandelen.',
    date: new Date('2024-01-15'),
  },
  {
    id: 2,
    name: 'Mark',
    treatment: 'Therapeutische Massage',
    rating: 5,
    review:
      'Professionele aanpak en zeer effectief voor mijn rugklachten. Enisa weet precies welke technieken te gebruiken om spanning weg te nemen.',
    date: new Date('2024-01-10'),
  },
  {
    id: 3,
    name: 'Linda',
    treatment: 'Reiki Behandeling',
    rating: 4,
    review:
      'Een bijzondere ervaring die me veel rust heeft gebracht. De behandeling was heel ontspannend en ik sliep die nacht veel beter.',
    date: new Date('2024-01-05'),
  },
  {
    id: 4,
    name: 'Johan',
    treatment: 'Hot Stone Massage',
    rating: 5,
    review:
      'Geweldige massage! De warme stenen waren heel ontspannend en mijn spieren voelden daarna veel losser. Zeker een aanrader.',
    date: new Date('2023-12-28'),
  },
  {
    id: 5,
    name: 'Emma',
    treatment: 'Ontspanningsmassage',
    rating: 5,
    review:
      'Perfect voor na een stressvolle periode. Enisa heeft gouden handen en creëert een zeer rustgevende sfeer. Kom zeker terug!',
    date: new Date('2023-12-20'),
  },
  {
    id: 6,
    name: 'Peter',
    treatment: 'Energetische Healing Sessie',
    rating: 4,
    review:
      'Interessante ervaring waarbij ik veel energie voelde stromen. Voelde me daarna vernieuwd en vol energie. Unieke behandeling.',
    date: new Date('2023-12-15'),
  },
]);

// Reviews display state
const reviewsPerPage = 6;
const currentPage = ref(1);
const loadingMore = ref(false);

const displayedReviews = computed(() => {
  return allReviews.value.slice(0, currentPage.value * reviewsPerPage);
});

const hasMoreReviews = computed(() => {
  return displayedReviews.value.length < allReviews.value.length;
});

const averageRating = computed(() => {
  if (allReviews.value.length === 0) return 0;
  const sum = allReviews.value.reduce((acc, review) => acc + review.rating, 0);
  return sum / allReviews.value.length;
});

// Methods
const onSubmit = async () => {
  isSubmitting.value = true;

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // In a real app, you would send the data to your backend
    console.log('Review submitted:', reviewForm);

    // Show success message
    const toast = useToast();
    toast.add({
      title: 'Review verzonden!',
      description:
        'Bedankt voor je review. Deze wordt binnenkort gepubliceerd na controle.',
      icon: 'i-mdi-check-circle',
      color: 'green',
    });

    // Reset form
    resetForm();
  } catch (error) {
    console.error('Error submitting review:', error);
    const toast = useToast();
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

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('nl-NL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};
</script>
