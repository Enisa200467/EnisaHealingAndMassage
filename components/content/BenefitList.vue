<template>
  <div
    class="not-prose my-6 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50 p-6"
  >
    <h3
      v-if="title"
      class="text-lg font-semibold mb-4 text-purple-700 dark:text-purple-400"
    >
      {{ title }}
    </h3>
    <ul class="space-y-3">
      <li v-for="(item, index) in items" :key="index" class="flex items-start">
        <UIcon
          name="i-heroicons-check-circle"
          class="w-5 h-5 mr-3 mt-1 text-purple-500 flex-shrink-0"
        />
        <span class="text-neutral-700 dark:text-neutral-300">{{ item }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
// Using defineProps for type safety (optional but recommended)
defineProps({
  // Title for the list (optional)
  title: {
    type: String,
    default: 'Voordelen van deze behandeling:',
  },
  // Array of benefit strings passed from Markdown
  items: {
    type: Array as () => string[],
    default: () => [],
  },
});
</script>

<style scoped>
/* Add component-specific styles if Tailwind classes aren't enough */
/* 'not-prose' prevents Tailwind Typography from styling inside this component */
</style>
