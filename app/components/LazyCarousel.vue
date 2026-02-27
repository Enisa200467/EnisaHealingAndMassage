<template>
  <UCarousel v-bind="$attrs">
    <slot />
  </UCarousel>
</template>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});
</script>
