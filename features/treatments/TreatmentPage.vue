<script setup lang="ts">
import type { TreatmentsCollectionItem } from '@nuxt/content';

interface Props {
  treatment: TreatmentsCollectionItem | null;
}

const props = defineProps<Props>();

const { generateHealthServiceSchema, setPageSEO } = useGlobalSEO();

// Define the interface locally since it's not exported
interface StructuredDataItem {
  '@context': string;
  '@type': string;
  [key: string]: unknown;
}

// Enhanced SEO with structured data for health services
if (props.treatment) {
  // Generate structured data for this specific treatment
  const healthServiceSchema = generateHealthServiceSchema(
    props.treatment.title,
    props.treatment.description,
    (props.treatment.meta?.price as string) || undefined
  );

  // Additional treatment-specific schema
  const treatmentSchema: StructuredDataItem = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: props.treatment.title,
    description: props.treatment.description,
    provider: {
      '@type': 'Organization',
      name: 'Enisa Healing & Massage',
      url: 'https://enisahealingmassage.nl',
    },
    bodyLocation: {
      '@type': 'AnatomicalStructure',
      name: 'Body',
    },
  };

  // Add optional fields if they exist
  if (props.treatment.meta?.duration) {
    treatmentSchema.duration = `PT${props.treatment.meta.duration}`;
  }

  if (
    props.treatment.meta?.price &&
    typeof props.treatment.meta.price === 'string'
  ) {
    treatmentSchema.cost = {
      '@type': 'MonetaryAmount',
      currency: 'EUR',
      value: props.treatment.meta.price.replace('€ ', '').replace(',', '.'),
    };
  }

  // Set comprehensive page SEO
  setPageSEO({
    title: `${props.treatment.title} - Enisa Healing & Massage`,
    description: props.treatment.description,
    path: `/behandelingen/${props.treatment.path}`,
    type: 'article',
    structuredData: [healthServiceSchema, treatmentSchema],
  });
} else {
  // Fallback SEO for treatment not found
  useSeoMeta({
    title: 'Behandeling - Enisa Healing & Massage',
    description:
      'Ontdek onze professionele healing en massage behandelingen voor ontspanning en welzijn.',
  });
}

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
      <nav
        aria-label="Breadcrumb navigatie"
        class="flex items-center gap-2 text-sm"
      >
        <ol class="flex items-center gap-2" role="list">
          <li
            v-for="(crumb, index) in breadcrumbs"
            :key="crumb.path"
            class="flex items-center gap-2"
          >
            <ULink
              :to="crumb.path"
              :class="[
                'flex items-center gap-1',
                index === breadcrumbs.length - 1
                  ? 'text-neutral-900 font-medium'
                  : 'text-neutral-500 hover:text-neutral-700',
              ]"
              :aria-current="
                index === breadcrumbs.length - 1 ? 'page' : undefined
              "
            >
              <UIcon :name="crumb.icon" class="w-4 h-4" aria-hidden="true" />
              {{ crumb.label }}
            </ULink>
            <UIcon
              v-if="index < breadcrumbs.length - 1"
              name="i-mdi-chevron-right"
              class="w-4 h-4 text-neutral-400"
              aria-hidden="true"
            />
          </li>
        </ol>
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
