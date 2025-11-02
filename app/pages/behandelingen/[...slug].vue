<script setup lang="ts">
import { useTreatmentStore } from '~/features/treatments/store';

const route = useRoute();
const slug = Array.isArray(route.params.slug)
  ? route.params.slug.join('/')
  : route.params.slug;

const { getTreatmentBySlug } = useTreatmentStore();

// Fetch both content and database data
const [{ data: treatment }, treatmentData] = await Promise.all([
  useAsyncData(`treatment-${slug}`, () => {
    return queryCollection('treatments').path(`/treatments/${slug}`).first();
  }),
  getTreatmentBySlug(slug),
]);
</script>

<template>
  <TreatmentPage :treatment="treatment" :treatment-data="treatmentData" />
</template>
