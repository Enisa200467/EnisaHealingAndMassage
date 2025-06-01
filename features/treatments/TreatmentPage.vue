<script setup lang="ts">
import type { TreatmentsCollectionItem } from '@nuxt/content';

interface Props {
  treatment: TreatmentsCollectionItem | null;
}

const props = defineProps<Props>();

// Enhanced SEO meta with proper error handling
useSeoMeta({
  title: props.treatment?.title
    ? `${props.treatment.title} - Enisa Healing & Massage`
    : 'Behandeling - Enisa Healing & Massage',
  description:
    props.treatment?.description ||
    'Ontdek onze professionele healing en massage behandelingen voor ontspanning en welzijn.',
});

const breadcrumbs = computed(() => [
  { path: '/', label: 'Home', icon: 'i-mdi-home' },
  { path: '/behandelingen', label: 'Behandelingen', icon: 'i-mdi-heart-pulse' },
  {
    path: `/behandelingen/${props.treatment?.path || ''}`,
    label: props.treatment?.title || 'Behandeling',
    icon: 'i-mdi-sparkles',
  },
]);
</script>

<template>
  <article v-if="treatment">
    <!-- Breadcrumbs -->
    <UContainer class="py-4">
      <nav class="flex items-center gap-2 text-sm">
        <ULink
          v-for="(crumb, index) in breadcrumbs"
          :key="crumb.path"
          :to="crumb.path"
          :class="[
            'flex items-center gap-1',
            index === breadcrumbs.length - 1
              ? 'text-neutral-900 font-medium'
              : 'text-neutral-500 hover:text-neutral-700',
          ]"
        >
          <UIcon :name="crumb.icon" class="w-4 h-4" />
          {{ crumb.label }}
          <UIcon
            v-if="index < breadcrumbs.length - 1"
            name="i-mdi-chevron-right"
            class="w-4 h-4 ml-1"
          />
        </ULink>
      </nav>
    </UContainer>

    <!-- Content Renderer -->
    <ContentRenderer :value="treatment" />

    <!-- Call-to-Action Section -->
    <TreatmentCTA :treatment="treatment" />

    <!-- Related Treatments -->
    <RelatedTreatments />
  </article>

  <!-- Error State -->
  <TreatmentNotFound v-else />
</template>
