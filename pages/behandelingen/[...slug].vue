<script setup lang="ts">
const slug = useRoute().params.slug;
const { data: treatment } = await useAsyncData(`treatment-${slug}`, () => {
  return queryCollection('treatments').path(`/treatments/${slug}`).first();
});
useSeoMeta({
  title: treatment.value?.title,
  description: treatment.value?.description,
});
</script>

<template>
  <div v-if="treatment">
    <ContentRenderer :value="treatment" />
  </div>
  <div v-else class="min-h-screen flex items-center justify-center">
    <UContainer>
      <div class="text-center">
        <h1 class="text-4xl font-bold text-neutral-900 mb-4">
          Behandeling niet gevonden
        </h1>
        <p class="text-neutral-600 mb-8">
          De opgevraagde behandeling bestaat niet of is niet beschikbaar.
        </p>
        <UButton to="/behandelingen" icon="i-mdi-arrow-left">
          Terug naar Behandelingen
        </UButton>
      </div>
    </UContainer>
  </div>
</template>
