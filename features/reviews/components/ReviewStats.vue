<script setup lang="ts">
interface Props {
  stats: {
    '1': number;
    '2': number;
    '3': number;
    '4': number;
    '5': number;
  };
}

const props = defineProps<Props>();
const ratings = computed(() => props.stats);

const averageRating = computed(() => {
  const totalRatings =
    ratings.value['1'] +
    ratings.value['2'] +
    ratings.value['3'] +
    ratings.value['4'] +
    ratings.value['5'];
  if (totalRatings === 0) return 0;

  const weightedSum =
    ratings.value['1'] * 1 +
    ratings.value['2'] * 2 +
    ratings.value['3'] * 3 +
    ratings.value['4'] * 4 +
    ratings.value['5'] * 5;

  return weightedSum / totalRatings;
});

const total = computed(() => {
  return (
    ratings.value['1'] +
    ratings.value['2'] +
    ratings.value['3'] +
    ratings.value['4'] +
    ratings.value['5']
  );
});

const recommendationRate = computed(() => {
  const totalRatings =
    ratings.value['1'] +
    ratings.value['2'] +
    ratings.value['3'] +
    ratings.value['4'] +
    ratings.value['5'];
  if (totalRatings === 0) return 0;

  return (ratings.value['4'] + ratings.value['5']) / totalRatings;
});
</script>

<template>
  <div
    class="bg-white/60 backdrop-blur-sm rounded-xl p-8 border border-white/20"
  >
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Average Rating -->
      <div class="text-center">
        <div class="flex items-center justify-center mb-2">
          <StarRating v-model="averageRating" size="lg" />
        </div>
        <div class="text-3xl font-bold text-neutral-900 mb-1">
          {{ averageRating.toFixed(1) }}
        </div>
        <p class="text-sm text-neutral-600">Gemiddelde waardering</p>
      </div>

      <!-- Total Reviews -->
      <div class="text-center">
        <UIcon
          name="i-mdi-comment-multiple"
          class="w-8 h-8 text-primary-500 mx-auto mb-2"
        />
        <div class="text-3xl font-bold text-neutral-900 mb-1">
          {{ total }}
        </div>
        <p class="text-sm text-neutral-600">Gepubliceerde reviews</p>
      </div>

      <!-- Recommendation Rate -->
      <div class="text-center">
        <UIcon
          name="i-mdi-thumb-up"
          class="w-8 h-8 text-green-500 mx-auto mb-2"
        />
        <div class="text-3xl font-bold text-neutral-900 mb-1">
          {{ Math.round(recommendationRate * 100) }}%
        </div>
        <p class="text-sm text-neutral-600">Positieve ervaringen</p>
      </div>
    </div>

    <!-- Rating Distribution -->
    <div v-if="total > 0" class="mt-8 pt-6 border-t border-white/20">
      <div class="space-y-2">
        <div
          v-for="rating in [5, 4, 3, 2, 1]"
          :key="rating"
          class="flex items-center gap-3"
        >
          <span class="text-sm text-neutral-600 w-8">{{ rating }}★</span>
          <div class="flex-1 bg-neutral-200 rounded-full h-2">
            <div
              :class="[
                'h-2 rounded-full transition-all duration-500',
                rating >= 4
                  ? 'bg-green-500'
                  : rating >= 3
                  ? 'bg-yellow-500'
                  : 'bg-red-500',
              ]"
              :style="{
                width: `${((ratings[rating] / total) * 100).toFixed(1)}%`,
              }"
            />
          </div>
          <span class="text-sm text-neutral-500 w-8">{{
            ratings[rating]
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
