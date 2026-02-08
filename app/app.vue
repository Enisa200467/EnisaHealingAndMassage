<script setup lang="ts">
// Fetch treatments data during SSR to ensure it's available for header/footer
// The useTreatments composable handles caching automatically
const { treatments } = useTreatments();
</script>

<template>
  <UApp>
    <SkipNavigation />
    <div class="flex flex-col min-h-screen">
      <SiteHeader />
      <main
        id="main-content"
        class="flex-1"
        role="main"
        aria-label="Main content"
      >
        <NuxtPage />
      </main>
      <SiteFooter />
    </div>
  </UApp>
</template>
