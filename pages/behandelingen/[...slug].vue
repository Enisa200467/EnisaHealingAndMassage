<script setup lang="ts">
const route = useRoute();
const slug = Array.isArray(route.params.slug)
  ? route.params.slug.join('/')
  : route.params.slug;

const { fetchTreatmentBySlug } = useTreatmentData();

// Fetch both content and database data
const [{ data: treatment }, treatmentData] = await Promise.all([
  useAsyncData(`treatment-${slug}`, () => {
    return queryCollection('treatments').path(`/treatments/${slug}`).first();
  }),
  fetchTreatmentBySlug(slug),
]);

// Provide treatment data to child components via injection
provide('treatmentData', treatmentData);
</script>

<template>
  <TreatmentPage :treatment="treatment" :treatment-data="treatmentData" />
</template>
