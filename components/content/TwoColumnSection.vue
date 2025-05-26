<script setup lang="ts">
// This component creates a two-column layout for benefits and "for whom" sections
</script>

<template>
  <section class="not-prose  py-16 sm:py-24">
    <UContainer>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <slot />
      </div>
    </UContainer>
  </section>
</template>
