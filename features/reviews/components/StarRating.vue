<template>
  <div class="flex items-center gap-1">
    <button
      v-for="star in 5"
      :key="star"
      type="button"
      class="transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
      :class="[
        star <= modelValue
          ? 'text-yellow-400 hover:text-yellow-500'
          : 'text-neutral-300 hover:text-yellow-300',
        interactive ? 'cursor-pointer' : 'cursor-default',
      ]"
      :disabled="!interactive"
      @click="interactive && handleStarClick(star)"
      @mouseover="interactive && handleMouseOver(star)"
      @mouseleave="interactive && handleMouseLeave()"
    >
      <UIcon
        :name="
          star <= (hoveredRating || modelValue)
            ? 'i-mdi-star'
            : 'i-mdi-star-outline'
        "
        class="w-6 h-6"
      />
    </button>
    <span
      v-if="showText && modelValue > 0"
      class="ml-2 text-sm text-neutral-600 dark:text-neutral-400"
    >
      {{ ratingText }}
    </span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: number;
  interactive?: boolean;
  showText?: boolean;
}

interface Emits {
  (e: 'update:modelValue', value: number): void;
}

const props = withDefaults(defineProps<Props>(), {
  interactive: true,
  showText: false,
});

const emit = defineEmits<Emits>();

const hoveredRating = ref<number | null>(null);

const ratingTexts = {
  1: 'Slecht',
  2: 'Matig',
  3: 'Goed',
  4: 'Zeer goed',
  5: 'Uitstekend',
};

const ratingText = computed(() => {
  return ratingTexts[props.modelValue as keyof typeof ratingTexts] || '';
});

const handleStarClick = (rating: number) => {
  emit('update:modelValue', rating);
};

const handleMouseOver = (rating: number) => {
  hoveredRating.value = rating;
};

const handleMouseLeave = () => {
  hoveredRating.value = null;
};
</script>
