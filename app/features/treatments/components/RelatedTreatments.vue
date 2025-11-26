<script setup lang="ts">
// Get first 6 treatments for related section using global composable
const { activeTreatments } = useTreatments();

const allTreatments = computed(() => activeTreatments.value.slice(0, 6));
</script>

<template>
  <PageSection aria-labelledby="related-treatments-heading">
    <header class="text-center mb-12">
      <h2
        id="related-treatments-heading"
        class="text-3xl font-bold text-neutral-900 mb-4"
      >
        Andere Behandelingen
      </h2>
      <p class="text-neutral-600 max-w-2xl mx-auto">
        Ontdek onze andere behandelingen die perfect kunnen aanvullen op jouw welzijnsreis.
      </p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <TreatmentDetails
        v-for="treatment in allTreatments"
        :key="treatment.slug"
        size="sm"
        :title="treatment.title"
        :short-description="treatment.description"
        :icon="treatment.icon || 'i-mdi-sparkles'"
        :duration="treatment.duration"
        :price="treatment.price"
        :discount-enabled="treatment.discountEnabled"
        :discount-price="treatment.discountPrice"
        :package-enabled="treatment.packageEnabled"
        :package-sessions="treatment.packageSessions"
        :package-price="treatment.packagePrice"
        show-link-button
        :to="treatment.path"
        :show-book-button="false"
      />
    </div>

    <div class="mt-12 text-center">
      <UButton to="/behandelingen" size="lg">
        Alle Behandelingen Bekijken
      </UButton>
    </div>
  </PageSection>
</template>
