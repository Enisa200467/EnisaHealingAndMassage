<template>
  <UCarousel v-bind="$attrs" v-slot="slotProps">
    <slot v-bind="slotProps" />
  </UCarousel>
</template>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});
</script>
