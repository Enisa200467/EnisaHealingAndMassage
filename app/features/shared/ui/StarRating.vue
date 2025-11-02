<template>
  <div
    class="flex items-center gap-1"
    role="group"
    :aria-label="`Beoordeling: ${rating} van 5 sterren`"
  >
    <button
      v-for="star in 5"
      :key="star"
      type="button"
      class="transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
      :class="[
        star <= rating
          ? 'text-yellow-400 hover:text-yellow-500'
          : 'text-neutral-300 hover:text-yellow-300',
        interactive ? 'cursor-pointer' : 'cursor-default',
      ]"
      :disabled="!interactive"
      :aria-label="`${star} van 5 sterren`"
      :aria-pressed="interactive ? star <= rating : undefined"
      @click="interactive && handleStarClick(star)"
      @mouseover="interactive && handleMouseOver(star)"
      @mouseleave="interactive && handleMouseLeave()"
    >
      <UIcon
        :name="
          star <= (hoveredRating || rating)
            ? 'i-mdi-star'
            : 'i-mdi-star-outline'
        "
        class="w-6 h-6"
        aria-hidden="true"
      />
    </button>
    <span
      v-if="showText && rating > 0"
      class="ml-2 text-sm text-neutral-600 dark:text-neutral-400"
      aria-live="polite"
    >
      {{ ratingText }}
    </span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  interactive?: boolean;
  showText?: boolean;
}

withDefaults(defineProps<Props>(), {
  interactive: true,
  showText: false,
});

const rating = defineModel<number>({ required: false });

const hoveredRating = ref<number | null>(null);

const ratingTexts = {
  1: 'Slecht',
  2: 'Matig',
  3: 'Goed',
  4: 'Zeer goed',
  5: 'Uitstekend',
};

const ratingText = computed(() => {
  return ratingTexts[rating.value as keyof typeof ratingTexts] || '';
});

const handleStarClick = (newRating: number) => {
  rating.value = newRating;
};

const handleMouseOver = (rating: number) => {
  hoveredRating.value = rating;
};

const handleMouseLeave = () => {
  hoveredRating.value = null;
};
</script>
