<template>
  <div class="not-prose my-6 p-5 rounded-lg border" :class="boxClasses">
    <div v-if="title || icon" class="flex items-center mb-3">
      <UIcon
        v-if="icon"
        :name="icon"
        class="w-5 h-5 mr-2 flex-shrink-0"
        :class="iconClasses"
      />
      <h4 v-if="title" class="font-semibold" :class="titleClasses">
        {{ title }}
      </h4>
    </div>
    <div
      class="text-sm prose-p:my-1 prose-ul:my-1 prose-li:my-0.5"
      :class="textClasses"
    >
      <!-- This slot will render the Markdown content placed inside the component tags -->
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

// Define props with types
const props = defineProps({
  // Optional title for the box
  title: {
    type: String,
    default: '',
  },
  // Optional icon name (e.g., 'i-heroicons-clock')
  icon: {
    type: String,
    default: '',
  },
  // Optional type for different styling (could add 'warning', 'success' later)
  type: {
    type: String,
    default: 'info', // Default style
  },
});

// Computed classes based on the 'type' prop for easy styling variations
// Using Palette 2 colors (adjust as needed)
const boxClasses = computed(() => {
  switch (props.type) {
    case 'warning':
      return 'bg-orange-50 border-orange-200 dark:bg-orange-900/30 dark:border-orange-700/50 max-w-3xl';
    // Add 'success', etc. if needed
    default: // 'info'
      return 'bg-purple-50 border-purple-200 dark:bg-purple-900/30 dark:border-purple-700/50 max-w-3xl';
  }
});

const iconClasses = computed(() => {
  switch (props.type) {
    case 'warning':
      return 'text-orange-500';
    default:
      return 'text-purple-500';
  }
});

const titleClasses = computed(() => {
  switch (props.type) {
    case 'warning':
      return 'text-orange-800 dark:text-orange-200';
    default:
      return 'text-purple-800 dark:text-purple-200';
  }
});

const textClasses = computed(() => {
  switch (props.type) {
    case 'warning':
      return 'text-orange-700 dark:text-orange-300';
    default:
      return 'text-purple-700 dark:text-purple-300';
  }
});
</script>

<style scoped>
/* Using 'not-prose' to isolate styling from Tailwind Typography */
/* Adjust prose classes inside the slot div if needed */
.prose-p\:my-1 p {
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}
.prose-ul\:my-1 ul {
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}
.prose-li\:my-0\.5 li {
  margin-top: 0.125rem;
  margin-bottom: 0.125rem;
}
</style>
