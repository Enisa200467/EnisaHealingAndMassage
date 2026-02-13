<script setup lang="ts">
import type { TreatmentsCollectionItem } from '@nuxt/content';

interface TreatmentData {
  id: string;
  name: string;
  slug: string;
  description?: string;
  duration_minutes: number;
  price_cents: number;
  price_formatted: string;
  duration_formatted: string;
  intensity?: number;
  intensity_label?: string;
  icon?: string;
  category?: string;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

interface Props {
  treatment: TreatmentsCollectionItem | null;
  treatmentData?: TreatmentData | null;
}

const props = defineProps<Props>();

// Provide treatment data to child content components
provide('treatmentData', props.treatmentData);

const { generateHealthServiceSchema, setPageSEO } = useGlobalSEO();

// Define the interface locally since it's not exported
interface StructuredDataItem {
  '@context': string;
  '@type': string;
  [key: string]: unknown;
}

// Enhanced SEO with structured data for health services
if (props.treatment || props.treatmentData) {
  // Use database data when available, fall back to content data
  const title =
    props.treatmentData?.name || props.treatment?.title || 'Treatment';
  const description = props.treatment?.description || '';
  const price =
    props.treatmentData?.price_formatted ||
    (props.treatment?.meta?.price as string);

  // Generate structured data for this specific treatment
  const healthServiceSchema = generateHealthServiceSchema(
    title,
    description,
    price
  );

  // Additional treatment-specific schema
  const treatmentSchema: StructuredDataItem = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: title,
    description: description,
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

  // Add optional fields - prioritize database data
  if (props.treatmentData?.duration_minutes) {
    treatmentSchema.duration = `PT${props.treatmentData.duration_minutes}M`;
  } else if (props.treatment?.meta?.duration) {
    treatmentSchema.duration = `PT${props.treatment.meta.duration}`;
  }

  if (props.treatmentData?.price_formatted) {
    treatmentSchema.cost = {
      '@type': 'MonetaryAmount',
      currency: 'EUR',
      value: (props.treatmentData.price_cents / 100).toString(),
    };
  } else if (
    props.treatment?.meta?.price &&
    typeof props.treatment.meta.price === 'string'
  ) {
    treatmentSchema.cost = {
      '@type': 'MonetaryAmount',
      currency: 'EUR',
      value: props.treatment.meta.price.replace('€ ', '').replace(',', '.'),
    };
  }

  // Generate breadcrumb schema for SEO
  const { generateBreadcrumbSchema } = useGlobalSEO();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { label: 'Home', path: '/' },
    { label: 'Behandelingen', path: '/behandelingen' },
    {
      label: title,
      path: `/behandelingen/${
        props.treatmentData?.slug || props.treatment?.path || ''
      }`,
    },
  ]);

  // Set comprehensive page SEO with breadcrumb schema
  setPageSEO({
    title: `${title} - Enisa Healing & Massage`,
    description: description,
    path: `/behandelingen/${
      props.treatmentData?.slug || props.treatment?.path || ''
    }`,
    type: 'article',
    structuredData: [healthServiceSchema, treatmentSchema, breadcrumbSchema],
  });
} else {
  // Fallback SEO for treatment not found
  useSeoMeta({
    title: 'Behandeling - Enisa Healing & Massage',
    description:
      'Ontdek onze professionele healing en massage behandelingen in Amsterdam Noord voor ontspanning en welzijn.',
  });
}

const breadcrumbs = computed(() => [
  { path: '/', label: 'Home', icon: 'i-mdi-home' },
  { path: '/behandelingen', label: 'Behandelingen', icon: 'i-mdi-heart-pulse' },
  {
    path: `/behandelingen/${
      props.treatmentData?.slug || props.treatment?.path || ''
    }`,
    label: props.treatmentData?.name || props.treatment?.title || 'Behandeling',
    icon: 'i-mdi-sparkles',
  },
]);
</script>

<template>
  <article v-if="treatment || treatmentData">
    <!-- Breadcrumbs -->
    <div class="py-4 bg-secondary-200">
      <UContainer>
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
    </div>

    <!-- Content Renderer -->
    <ContentRenderer v-if="treatment" :value="treatment" />

    <!-- If only database data exists, show basic treatment info -->
    <div v-else-if="treatmentData" class="py-16">
      <UContainer>
        <div class="max-w-4xl mx-auto prose prose-lg">
          <h2>{{ treatmentData.name }}</h2>
          <p>Meer details over deze behandeling zijn binnenkort beschikbaar.</p>
        </div>
      </UContainer>
    </div>

    <!-- Call-to-Action Section -->
    <TreatmentCTA :treatment="treatment || { title: treatmentData?.name }" />

    <!-- Related Treatments -->
    <RelatedTreatments />
  </article>

  <!-- Error State -->
  <TreatmentNotFound v-else />
</template>
