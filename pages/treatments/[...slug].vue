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
  <article v-if="treatment">
    <UContainer>
      <ContentRenderer :value="treatment" />
    </UContainer>
  </article>
  <div v-else>Home not found</div>
</template>
