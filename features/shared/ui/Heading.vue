<template>
  <h1
    class="not-prose text-3xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-200 mb-4"
  >
    <slot />
  </h1>
  <div class="max-w-3xl">
    <slot name="subtitle" />
  </div>
</template>

<script setup lang="ts">
// No props needed for this component as it uses slots
</script>
