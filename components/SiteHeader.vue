<template>
  <div class="bg-primary-50 sticky top-0 z-50 shadow-md mb-4">
    <UContainer class="flex items-center py-2">
      <ULink to="/"
        ><UAvatar src="https://github.com/benjamincanac.png" class="mr-2" />
        EnisaHealingAndMassage
      </ULink>

      <USeparator orientation="vertical" class="h-10 mx-2" />
      <!-- Desktop Navigation using UNavigationMenu -->
      <UNavigationMenu
        class="ml-4"
        :items="navigationItems"
        highlight-color="primary"
      />
      <UButton
        class="ml-auto"
        size="md"
        :to="'/boeken'"
        icon="i-heroicons-calendar-days"
        :label="'Boek Nu'"
        :icon-position="'left'"
        :icon-color="'white'"
      />
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';
import { ref } from 'vue';

const treatmentLinksDesktop = [
  {
    label: 'Alle Behandelingen',
    description: 'Bekijk een overzicht van alle massages en healings.', // Optional description
    to: '/behandelingen',
    icon: 'i-heroicons-list-bullet', // Optional icon
  },
  {
    label: 'Energetische Healing',
    description: 'Herstel balans en vitaliteit.',
    to: '/behandelingen/energetische-healing-sessie',
    icon: 'i-heroicons-sparkles', // Example icon
  },
  {
    label: 'Chakra Balancering',
    description: 'Harmoniseer uw energiecentra.',
    to: '/behandelingen/chakra-balancering',
    icon: 'i-heroicons-adjustments-horizontal', // Example icon
  },
  {
    label: 'Klassieke Ontspanning',
    description: 'Pure ontspanning voor lichaam en geest.',
    to: '/behandelingen/klassieke-ontspanningsmassage',
    icon: 'i-heroicons-user-group', // Example icon (adjust as needed)
  },
  // Add other treatments...
];

const navigationItems = ref<NavigationMenuItem[][]>([
  [
    {
      label: 'Home',
      icon: 'i-heroicons-home', // Optional icon for desktop menu
      to: '/',
    },
    {
      label: 'Over Mij',
      icon: 'i-heroicons-user', // Optional icon
      to: '/over-mij',
    },
    {
      label: 'Behandelingen',
      icon: 'i-heroicons-sparkles', // Optional icon
      children: treatmentLinksDesktop, // Nested items for the dropdown
    },
    {
      label: 'Contact',
      icon: 'i-heroicons-envelope', // Optional icon
      to: '/contact',
    },
    // Boek Nu is handled by a separate button for emphasis, but could be added here:
    // { label: 'Boek Nu', to: '/boeken', icon: 'i-heroicons-calendar-days' }
  ],
  // You can add more groups of items in separate arrays if needed
  // Example: [[ item1, item2 ], [ item3 ]]
]);
</script>
