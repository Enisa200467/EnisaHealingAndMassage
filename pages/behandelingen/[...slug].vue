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
  <ContentRenderer v-if="treatment" :value="treatment" />
  <div v-else>Home not found</div>
</template>
