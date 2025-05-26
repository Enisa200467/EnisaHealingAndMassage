<template>
  <div class="not-prose">
    <UCard>
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon
            name="i-mdi-star-circle"
            class="w-6 h-6 text-primary-500"
          />
          <h3 class="text-xl font-semibold">
            {{ title }}
          </h3>
        </div>
      </template>

      <ul v-if="items && items.length" class="space-y-3">
        <li v-for="(item, index) in items" :key="index" class="flex items-start gap-3">
          <UIcon
            name="i-mdi-check-circle"
            class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
          />
          <span class="text-neutral-600">{{ item }}</span>
        </li>
      </ul>
    </UCard>
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
