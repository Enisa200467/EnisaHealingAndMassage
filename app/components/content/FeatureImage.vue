<template>
  <figure class="not-prose my-8">
    <NuxtImg
      :src="src"
      :alt="alt"
      class="w-full h-auto object-cover rounded-lg shadow-md"
      format="webp"
      quality="80"
      loading="lazy"
      sizes="sm:100vw md:80vw lg:600px"
    />
    <figcaption
      v-if="caption"
      class="mt-3 text-center text-sm text-neutral-500 dark:text-neutral-400 italic"
    >
      {{ caption }}
    </figcaption>
  </figure>
</template>

<script setup lang="ts">
interface Props {
  src: string;
  alt: string;
  caption?: string;
}

defineProps<Props>();
</script>
