<template>
  <div class="bg-primary-50 sticky top-0 z-50 shadow-md">
    <UContainer class="flex items-center justify-between py-2">
      <!-- Logo/Brand Link -->
      <ULink to="/" class="flex items-center" aria-label="Home">
        <UAvatar src="https://github.com/benjamincanac.png" class="mr-6" />
        Enisa Healing & Massage
      </ULink>

      <!-- Desktop Navigation & Boek Nu Button -->
      <div class="hidden lg:flex items-center">
        <USeparator orientation="vertical" class="h-10 mx-2" />

        <template v-if="$device.isDesktop">
          <UNavigationMenu
            class="ml-4"
            arrow
            orientation="horizontal"
            :items="desktopNavItems"
          />
          <UButton
            class="ml-4"
            size="md"
            :to="routes.pages.booking"
            icon="i-mdi-calendar"
            :label="'Boek Nu'"
          />
        </template>
      </div>

      <div class="lg:hidden flex items-center">
        <UButton
          color="primary"
          variant="ghost"
          icon="i-mdi-menu"
          aria-label="Open Menu"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        />
      </div>
    </UContainer>

    <UCard v-if="isMobileMenuOpen" class="lg:hidden flex flex-col flex-1">
      <UNavigationMenu :orientation="'vertical'" :items="mobileNavItems" />

      <template #footer>
        <UButton
          block
          size="md"
          :to="routes.pages.booking"
          icon="i-mdi-calendar"
          :label="'Boek Nu'"
          @click="isMobileMenuOpen = false"
        />
      </template>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

const routes = useRoutes();

// Statically define treatment navigation items
const healingNavEntries: NavigationMenuItem[] =
  routes.treatments.healing.items.map((item) => ({
    label: routes.slugToTitle(item.slug),
    to: item.path,
    icon: item.icon || 'i-mdi-meditation', // Default icon if not specified
  }));

const massageNavEntries: NavigationMenuItem[] =
  routes.treatments.massage.items.map((item) => ({
    label: routes.slugToTitle(item.slug),
    to: item.path,
    icon: item.icon || 'i-mdi-hand-back-right', // Default icon if not specified
  }));

const mobileNavItems = ref<NavigationMenuItem[]>([
  {
    label: 'Home',
    icon: 'i-mdi-home',
    to: routes.pages.home,
  },
  {
    label: 'Over Mij',
    icon: 'i-mdi-account',
    to: routes.pages.about,
  },
  {
    label: 'Behandelingen',
    icon: 'i-mdi-sparkles',
    children: [
      {
        label: 'Healing',
        icon: 'i-mdi-meditation',
        children: healingNavEntries,
      },
      {
        label: 'Massage',
        icon: 'i-mdi-hand-back-right',
        children: massageNavEntries,
      },
    ],
  },
  {
    label: 'Contact',
    icon: 'i-mdi-email',
    to: routes.pages.contact,
  },
  {
    label: 'Reviews',
    icon: 'i-mdi-star',
    to: routes.pages.reviews,
  },
]);

// Create navigation items with static treatment data
const desktopNavItems = ref<NavigationMenuItem[]>([
  {
    label: 'Home',
    icon: 'i-mdi-home',
    to: routes.pages.home,
  },
  {
    label: 'Over Mij',
    icon: 'i-mdi-account',
    to: routes.pages.about,
  },
  {
    label: 'Behandelingen',
    icon: 'i-mdi-sparkles',
    children: [...healingNavEntries, ...massageNavEntries],
  },
  {
    label: 'Contact',
    icon: 'i-mdi-email',
    to: routes.pages.contact,
  },
  {
    label: 'Reviews',
    icon: 'i-mdi-star',
    to: routes.pages.reviews,
  },
]);

// State for mobile menu visibility
const isMobileMenuOpen = ref(false);
</script>
