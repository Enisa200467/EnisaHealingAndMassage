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
            <ul class="space-y-2">
              <li>
                <NuxtLink
                  to="/behandelingen/energetische-healing-sessie"
                  class="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400"
                  >Energetische Healing</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/behandelingen/chakra-balancering"
                  class="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400"
                  >Chakra Balancering</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/behandelingen/klassieke-ontspanningsmassage"
                  class="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400"
                  >Ontspanningsmassage</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/behandelingen/zweedse-massage"
                  class="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400"
                  >Zweedse Massage</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/behandelingen/sportmassage"
                  class="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400"
                  >Sportmassage</NuxtLink
                >
              </li>
              <!-- Add more links -->
            </ul>
          </div>

          <!-- Column 2: Praktijk Info -->
          <div>
            <h4 class="font-semibold text-neutral-900 dark:text-white mb-3">
              Praktijk
            </h4>
            <ul class="space-y-2">
              <li>
                <NuxtLink
                  to="/over-mij"
                  class="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400"
                  >Over Mij</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/werkwijze"
                  class="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400"
                  >Werkwijze</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/tarieven"
                  class="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400"
                  >Tarieven</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/contact"
                  class="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400"
                  >Contact</NuxtLink
                >
              </li>
            </ul>
          </div>

          <!-- Column 3: Informatie -->
          <div>
            <h4 class="font-semibold text-neutral-900 dark:text-white mb-3">
              Informatie
            </h4>
            <ul class="space-y-2">
              <li>
                <NuxtLink
                  to="/faq"
                  class="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400"
                  >Veelgestelde Vragen</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/blog"
                  class="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400"
                  >Blog</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/privacybeleid"
                  class="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400"
                  >Privacybeleid</NuxtLink
                >
              </li>
            </ul>
          </div>

          <!-- Column 4: Boeken -->
          <div>
            <h4 class="font-semibold text-neutral-900 dark:text-white mb-3">
              Boeken
            </h4>
            <ul class="space-y-2">
              <li>
                <NuxtLink
                  to="/boeken"
                  class="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400"
                  >Direct Boeken</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/cadeaubon"
                  class="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400"
                  >Cadeaubon</NuxtLink
                >
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
          <div v-if="reviews.length > 0" class="text-center mb-4">
            <span class="font-medium text-neutral-700 dark:text-neutral-300"
              >Gemiddelde Score:</span
            >
            <span class="font-bold text-primary-600 dark:text-primary-400 ml-1"
              >{{ averageScore }}/5</span
            >
            <UIcon
              name="i-heroicons-star-solid"
              class="w-4 h-4 ml-1 text-yellow-400"
            />
          </div>
          <UCarousel
            v-if="reviews.length > 0"
            v-slot="{ item }"
            :items="reviews"
            :ui="{ item: 'basis-full' }"
            indicators
            arrows
            loop
            autoplay
            autoplay-interval="5000"
            class="w-full max-w-xs mx-auto"
          >
            <UCard class="text-center h-48 flex flex-col justify-center">
              <!-- Fixed height card -->
              <q class="italic text-neutral-600 dark:text-neutral-400 text-sm">
                {{ item.text }}
              </q>
              <p
                class="mt-2 font-semibold text-neutral-800 dark:text-neutral-200 text-sm"
              >
                - {{ item.author }}
              </p>
              <div class="mt-1 flex justify-center">
                <UIcon
                  v-for="i in item.score"
                  :key="i"
                  name="i-heroicons-star-solid"
                  class="w-4 h-4 text-yellow-400"
                />
                <UIcon
                  v-for="i in 5 - item.score"
                  :key="i + 5"
                  name="i-heroicons-star"
                  class="w-4 h-4 text-neutral-300 dark:text-neutral-600"
                />
              </div>
            </UCard>
          </UCarousel>
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
        &copy; {{ new Date().getFullYear() }} Praktijk [Naam]. Alle rechten
        voorbehouden.
      </div>
    </UContainer>
  </footer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// Placeholder reviews - Replace with your actual data source
const reviews = ref([
  {
    id: 1,
    author: 'Anna V.',
    score: 5,
    text: 'Heerlijk ontspannen, voelde me als herboren!',
  },
  {
    id: 2,
    author: 'Bart L.',
    score: 4,
    text: 'Professionele aanpak, veel minder last van mijn rug.',
  },
  {
    id: 3,
    author: 'Chantal S.',
    score: 5,
    text: 'De energetische healing was een bijzondere ervaring.',
  },
  {
    id: 4,
    author: 'Dirk M.',
    score: 5,
    text: 'Echt een aanrader, kom zeker terug.',
  },
]);

// Calculate average score
const averageScore = computed(() => {
  if (reviews.value.length === 0) return 0;
  const totalScore = reviews.value.reduce(
    (sum, review) => sum + review.score,
    0
  );
  return (totalScore / reviews.value.length).toFixed(1); // Rounded to one decimal place
});
</script>

<style scoped>
/* Add any additional footer-specific styles here */
</style>
