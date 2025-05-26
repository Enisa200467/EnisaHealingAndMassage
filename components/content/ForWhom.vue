<script setup lang="ts">
defineProps<{
  title?: string;
  items?: string[];
}>();
</script>

<template>
  <div class="not-prose">
    <h3 v-if="title" class="text-xl font-semibold text-gray-900 mb-6">
      {{ title }}
    </h3>
    

    <ul v-if="items && items.length" class="space-y-3">
      <li 
        v-for="(item, index) in items" 
        :key="index"
        class="flex items-start gap-3"
      >
        <UIcon
name="i-mdi-account-circle" 
          class="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0"
        />
        <span class="text-gray-700">{{ item }}</span>
      </li>
    </ul>
  </div>
</template>
