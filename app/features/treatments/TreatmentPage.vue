<script setup lang="ts">
import type { TreatmentsCollectionItem } from '@nuxt/content';
import type { TreatmentData } from '~/composables/useTreatments';

interface Props {
  treatment: TreatmentsCollectionItem | null;
  treatmentData?: TreatmentData | null;
}

const props = defineProps<Props>();

// Provide treatment data to child content components
provide('treatmentData', props.treatmentData);

const { generateBreadcrumbSchema, generateServiceSchema, setPageSEO } =
  useGlobalSEO();

const getContentMeta = (key: string) => {
  const meta = props.treatment?.meta;
  if (!meta || typeof meta !== 'object') return undefined;

  const value = (meta as Record<string, unknown>)[key];
  return typeof value === 'string' ? value : undefined;
};

const treatmentSlug =
  props.treatmentData?.slug ||
  props.treatment?.path?.split('/').filter(Boolean).at(-1) ||
  '';
const treatmentPath = `/behandelingen/${treatmentSlug}`;

if (props.treatment || props.treatmentData) {
  const title =
    props.treatmentData?.title || props.treatment?.title || 'Behandeling';
  const description =
    getContentMeta('seoDescription') ||
    props.treatment?.description ||
    props.treatmentData?.description ||
    '';
  const seoTitle = getContentMeta('seoTitle');
  const price = props.treatmentData?.price
    ? `€ ${(props.treatmentData.price / 100).toFixed(0)}`
    : undefined;
  const duration = props.treatmentData?.duration
    ? `PT${props.treatmentData.duration}M`
    : undefined;

  const serviceSchema = generateServiceSchema(
    title,
    description,
    price,
    duration,
    treatmentPath
  );
  const breadcrumbSchema = generateBreadcrumbSchema([
    { label: 'Home', path: '/' },
    { label: 'Behandelingen', path: '/behandelingen' },
    { label: title, path: treatmentPath },
  ]);

  setPageSEO({
    title: seoTitle || `${title} - Enisa Healing & Massage`,
    description,
    path: treatmentPath,
    structuredData: [serviceSchema, breadcrumbSchema],
  });
} else {
  useSeoMeta({
    title: 'Behandeling - Enisa Healing & Massage',
    description:
      'Ontdek professionele healing- en massagebehandelingen in Amsterdam Noord voor ontspanning en welzijn.',
  });
}

const breadcrumbs = computed(() => [
  { path: '/', label: 'Home', icon: 'i-mdi-home' },
  { path: '/behandelingen', label: 'Behandelingen', icon: 'i-mdi-heart-pulse' },
  {
    path: treatmentPath,
    label:
      props.treatmentData?.title || props.treatment?.title || 'Behandeling',
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
    <TreatmentCTA :treatment="treatment || { title: treatmentData?.title }" />

    <!-- Related Treatments -->
    <RelatedTreatments />
  </article>

  <!-- Error State -->
  <TreatmentNotFound v-else />
</template>
