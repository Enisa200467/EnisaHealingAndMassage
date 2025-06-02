<script setup lang="ts">
// Navigation items for admin section
const navigationItems = [
  {
    label: 'Dashboard',
    to: '/admin',
    icon: 'i-mdi-view-dashboard',
    description: 'Hoofdoverzicht en admin dashboard',
  },
  {
    label: 'Reviews',
    to: '/admin/reviews',
    icon: 'i-mdi-star',
    description: 'Beheer en modereer reviews',
  },
  {
    label: 'SEO Overzicht',
    to: '/admin/seo-overview',
    icon: 'i-mdi-search-web',
    description: 'SEO analyse en optimalisatie tools',
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
