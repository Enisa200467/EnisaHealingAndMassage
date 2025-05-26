<template>
  <div class="not-prose">
    <h3
      v-if="title"
      class="text-2xl sm:text-3xl font-bold text-neutral-900 mb-6"
    >
      {{ title }}
    </h3>
    <ul class="space-y-4">
      <li v-for="(item, index) in items" :key="index" class="flex items-start gap-3">
        <UIcon
          name="i-mdi-check-circle"
          class="w-5 h-5 text-green-500 mt-1 flex-shrink-0"
        />
        <span class="text-neutral-700 text-lg">{{ item }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
// For Nuxt Content components, we can access attributes passed from the component call
// These will come from the frontmatter data in the component usage
interface Props {
  title?: string;
  items?: string[];
}

withDefaults(defineProps<Props>(), {
  title: 'Voordelen van deze behandeling:',
  items: () => [],
});
</script>

<style scoped>
/* Add component-specific styles if Tailwind classes aren't enough */
/* 'not-prose' prevents Tailwind Typography from styling inside this component */
</style>
