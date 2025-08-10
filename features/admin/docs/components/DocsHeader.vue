<script setup lang="ts">
const routes = useRoutes();
</script>

<template>
  <div class="mb-8">
    <div class="flex items-center gap-4 mb-4">
      <UButton
        :to="routes.admin.dashboard"
        variant="ghost"
        icon="i-mdi-arrow-left"
        size="sm"
      >
        Terug naar Admin
      </UButton>
    </div>

    <div class="flex items-center gap-3 mb-4">
      <UIcon name="i-mdi-book-open-variant" class="w-8 h-8 text-primary-600" />
      <h1 class="text-4xl font-bold text-neutral-900">Admin Documentatie</h1>
    </div>

    <p class="text-xl text-neutral-600">
      Handleiding voor het beheren van behandelingen
    </p>
  </div>
</template>
