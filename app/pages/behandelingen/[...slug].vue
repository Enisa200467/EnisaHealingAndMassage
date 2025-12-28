<script setup lang="ts">
const route = useRoute();
const slug = Array.isArray(route.params.slug)
  ? route.params.slug.join('/')
  : route.params.slug;

// Fetch content from markdown files
const { data: treatment } = await useAsyncData(`treatment-${slug}`, () => {
  return queryCollection('behandelingen').path(`/behandelingen/${slug}`).first();
});

// Fetch database treatment data using global composable
const { getTreatmentBySlug } = useTreatments();
const treatmentData = computed(() => getTreatmentBySlug(slug));
</script>

<template>
  <TreatmentPage :treatment="treatment" :treatment-data="treatmentData" />
</template>
