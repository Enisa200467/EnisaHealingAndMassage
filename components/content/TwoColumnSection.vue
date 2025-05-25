<script setup lang="ts">
// This component creates a two-column layout for benefits and "for whom" sections
</script>

<template>
  <section class="not-prose bg-primary-50 w-full">
    <UContainer class="py-6 sm:py-12">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <slot />
      </div>
    </UContainer>
  </section>
</template>
