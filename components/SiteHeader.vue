<template>
  <div class="bg-primary-50 sticky top-0 z-50 shadow-md">
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
            arrow
            :orientation="'horizontal'"
            :items="navigationItems"
          />
          <UButton
            class="ml-4"
            size="md"
            :to="routes.pages.booking"
            icon="i-heroicons-calendar-days"
            :label="'Boek Nu'"
          />
        </template>
      </div>

      <div class="lg:hidden flex items-center">
        <UButton
          color="primary"
          variant="ghost"
          icon="i-heroicons-bars-3"
          aria-label="Open Menu"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        />
      </div>
    </UContainer>

    <UCard v-if="isMobileMenuOpen" class="lg:hidden flex flex-col flex-1">
      <UNavigationMenu :orientation="'vertical'" :items="navigationItems" />

      <template #footer>
        <UButton
          block
          size="md"
          :to="routes.pages.booking"
          icon="i-heroicons-calendar-days"
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
    label: item.slug
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' '), // Simple title from slug
    to: item.path,
  }));

const massageNavEntries: NavigationMenuItem[] =
  routes.treatments.massage.items.map((item) => ({
    label: item.slug
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' '), // Simple title from slug
    to: item.path,
  }));

// Create navigation items with static treatment data
const navigationItems = ref<NavigationMenuItem[]>([
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
    children: [
      {
        label: 'Healing',
        icon: 'i-heroicons-sparkles',
        children: healingNavEntries,
      },
      {
        label: 'Massage',
        icon: 'i-heroicons-hand-raised',
        children: massageNavEntries,
      },
    ],
  },
  {
    label: 'Contact',
    icon: 'i-heroicons-envelope',
    to: routes.pages.contact,
  },
]);

// State for mobile menu visibility
const isMobileMenuOpen = ref(false);
</script>
