<script setup lang="ts">
// This component creates a two-column layout for benefits and "for whom" sections
</script>

<template>
  <section class="not-prose">
    <UContainer class="py-12 sm:py-16">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <slot />
      </div>
    </UContainer>
  </section>
</template>
