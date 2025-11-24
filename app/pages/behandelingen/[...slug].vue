<script setup lang="ts">
import { useTreatmentStore } from '~/features/treatments/store';

const route = useRoute();
const slug = Array.isArray(route.params.slug)
  ? route.params.slug.join('/')
  : route.params.slug;

const treatmentStore = useTreatmentStore();

// Fetch content from markdown files
const { data: treatment } = await useAsyncData(`treatment-${slug}`, () => {
  return queryCollection('behandelingen').path(`/behandelingen/${slug}`).first();
});

// Fetch database treatment data
// On server: fetch fresh data
// On client: use store (populated by plugin) or fetch if empty
const treatmentData = ref(treatmentStore.getTreatmentBySlug(slug));

// If store is empty (SSR), fetch the treatment from database
if (!treatmentData.value && treatmentStore.treatments.length === 0) {
  await treatmentStore.fetchTreatments();
  treatmentData.value = treatmentStore.getTreatmentBySlug(slug);
}
</script>

<template>
  <TreatmentPage :treatment="treatment" :treatment-data="treatmentData" />
</template>
