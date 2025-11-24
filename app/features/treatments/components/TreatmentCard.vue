<script setup lang="ts">
// Simple card component with proper flex layout for footer positioning
</script>

<template>
  <div
    class="flex flex-col h-full rounded-lg shadow-lg border border-primary-200 bg-white overflow-hidden"
    role="region"
  >
    <!-- Header slot -->
    <div
      v-if="$slots.header"
      class="px-6 py-4 border-b border-neutral-200 bg-neutral-50"
    >
      <slot name="header" />
    </div>

    <!-- Body slot - flex-1 to take remaining space -->
    <div class="flex-1 px-6 py-6">
      <slot />
    </div>

    <!-- Footer slot -->
    <div
      v-if="$slots.footer"
      class="px-6 py-4 border-t border-neutral-200 bg-neutral-50"
    >
      <slot name="footer" />
    </div>
  </div>
</template>
