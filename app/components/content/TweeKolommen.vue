<script setup lang="ts">
// This component creates a two-column layout for benefits and "for whom" sections
</script>

<template>
  <PageSection not-prose>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
      <slot />
    </div>
  </PageSection>
</template>
