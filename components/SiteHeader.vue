<template>
  <div class="bg-primary-50 sticky top-0 z-50 shadow-md">
    <USlideover>
      <UContainer class="flex items-center justify-between py-2">
        <!-- Logo/Brand Link -->
        <ULink to="/" class="flex items-center" aria-label="Home">
          <UAvatar src="https://github.com/benjamincanac.png" class="mr-2" />
          EnisaHealingAndMassage
        </ULink>

        <!-- Desktop Navigation & Boek Nu Button -->
        <div class="hidden lg:flex items-center">
          <USeparator orientation="vertical" class="h-10 mx-2" />

          <template v-if="$device.isDesktop">
            <UNavigationMenu
              class="ml-4"
              :orientation="'horizontal'"
              :items="navigationItems"
              highlight-color="primary"
            />
            <UButton
              class="ml-4"
              size="md"
              :to="routes.pages.booking"
              icon="i-heroicons-calendar-days"
              :label="'Boek Nu'"
              :icon-position="'left'"
              :icon-color="'white'"
            />
          </template>
        </div>

        <!-- Mobile Hamburger Button & Boek Nu Button -->
        <div class="lg:hidden flex items-center">
          <UButton
            color="primary"
            variant="ghost"
            icon="i-heroicons-bars-3"
            aria-label="Open Menu"
            @click="isMobileMenuOpen = true"
          />
        </div>
      </UContainer>

      <!-- Mobile Menu Slideover -->
      <template #header>
        <h1>Enisa Healing & Massage</h1>
      </template>
      <template #close>
        <UButton icon="i-lucide-search" color="primary" variant="solid" />
      </template>
      <template #body>
        <UNavigationMenu :orientation="'vertical'" :items="navigationItems" />
      </template>
    </USlideover>
  </div>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

const routes = useRoutes();

// Load dynamic treatment navigation items
const { data: treatmentNavigationItems } = await useAsyncData(
  'treatment-navigation',
  async () => {
    return await routes.getTreatmentNavigationItems();
  }
);

// Create navigation items with dynamic treatment data
const navigationItems = computed<NavigationMenuItem[][]>(() => [
  [
    {
      label: 'Home',
      icon: 'i-heroicons-home',
      to: routes.pages.home,
    },
    {
      label: 'Over Mij',
      icon: 'i-heroicons-user',
      to: routes.pages.about,
    },
    {
      label: 'Behandelingen',
      icon: 'i-heroicons-sparkles',
      children: treatmentNavigationItems.value || [],
    },
    {
      label: 'Contact',
      icon: 'i-heroicons-envelope',
      to: routes.pages.contact,
    },
  ],
]);

// State for mobile menu visibility
const isMobileMenuOpen = ref(false);
</script>
