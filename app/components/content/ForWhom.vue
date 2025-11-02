<script setup lang="ts">
defineProps<{
  title?: string;
  items?: string[];
}>();
</script>

<template>
  <div class="not-prose">
    <UCard>
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon
            name="i-mdi-account-group"
            class="w-6 h-6 text-secondary-500"
          />
          <h3 class="text-xl font-semibold">
            {{ title || 'Voor wie is deze behandeling geschikt?' }}
          </h3>
        </div>
      </template>

      <ul v-if="items && items.length" class="space-y-3">
        <li 
          v-for="(item, index) in items" 
          :key="index"
          class="flex items-start gap-3"
        >
          <UIcon
            name="i-mdi-account-circle" 
            class="w-5 h-5 text-secondary-500 mt-0.5 flex-shrink-0"
          />
          <span class="text-neutral-600">{{ item }}</span>
        </li>
      </ul>
    </UCard>
  </div>
</template>
