<script setup lang="ts">
// Get dynamic routes
const routes = useRoutes();

// Navigation items for admin section
const navigationItems = [
  {
    label: 'Dashboard',
    to: routes.admin.dashboard,
    icon: 'i-mdi-view-dashboard',
    description: 'Hoofdoverzicht en admin dashboard',
  },
  {
    label: 'Behandelingen',
    to: routes.admin.treatments,
    icon: 'i-mdi-spa',
    description: 'Beheer behandelingen en tarieven',
  },
  {
    label: 'Reviews',
    to: routes.admin.reviews,
    icon: 'i-mdi-star',
    description: 'Beheer en modereer reviews',
  },
  {
    label: 'SEO Overzicht',
    to: routes.admin.seoOverview,
    icon: 'i-mdi-search-web',
    description: 'SEO analyse en optimalisatie tools',
  },
  {
    label: 'Documentatie',
    to: routes.admin.docs,
    icon: 'i-mdi-book-open-variant',
    description: 'Handleiding voor behandelingen beheren',
  },
];

// Get current route to highlight active navigation
const route = useRoute();
const isActive = (path: string) => route.path === path;
</script>

<template>
  <nav
    class="mb-8 p-4 bg-white rounded-lg shadow-sm border border-neutral-200"
    role="navigation"
    aria-label="Admin navigatie"
  >
    <div class="flex flex-col sm:flex-row gap-4">
      <h2 class="text-lg font-semibold text-neutral-900 mb-2 sm:mb-0 sm:mr-4">
        Admin Sectie
      </h2>

      <div class="flex flex-col sm:flex-row gap-2">
        <UButton
          v-for="item in navigationItems"
          :key="item.to"
          :to="item.to"
          :variant="isActive(item.to) ? 'solid' : 'outline'"
          :color="isActive(item.to) ? 'primary' : 'neutral'"
          :icon="item.icon"
          size="sm"
          class="justify-start sm:justify-center"
          :aria-current="isActive(item.to) ? 'page' : undefined"
          :title="item.description"
        >
          {{ item.label }}
        </UButton>
      </div>
    </div>
  </nav>
</template>
