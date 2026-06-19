<script setup lang="ts">
const route = useRoute();
const slug = Array.isArray(route.params.slug)
  ? route.params.slug.join('/')
  : route.params.slug;

// Fetch content from markdown files
const { data: treatment } = await useAsyncData(`treatment-${slug}`, () => {
  return queryCollection('behandelingen').path(`/behandelingen/${slug}`).first();
});

// Keep treatment pages content-first so preview-only markdown routes can render
// before a matching database treatment record exists.
const treatmentData = computed(() => null);
</script>

<template>
  <TreatmentPage :treatment="treatment" :treatment-data="treatmentData" />
</template>
