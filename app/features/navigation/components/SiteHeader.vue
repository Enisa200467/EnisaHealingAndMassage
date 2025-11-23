<template>
  <div class="bg-primary-50 sticky top-0 z-50 shadow-md">
    <UContainer class="flex items-center justify-between py-2">
      <!-- Logo/Brand Link -->
      <ULink
        to="/"
        class="flex items-center"
        aria-label="Naar homepage - Enisa Healing & Massage"
      >
        <UAvatar
          size="2xl"
          src="images/logo.webp"
          class="mr-6"
          alt="Enisa Healing & Massage logo"
        />
        <span class="font-semibold text-lg">Enisa Healing & Massage</span>
      </ULink>

      <!-- Desktop Navigation & Boek Nu Button -->
      <nav
        id="navigation"
        class="hidden lg:flex items-center"
        role="navigation"
        aria-label="Hoofdnavigatie"
      >
        <USeparator orientation="vertical" class="h-10 mx-2" />

        <template v-if="$device.isDesktop">
          <UNavigationMenu
            class="ml-4"
            arrow
            color="primary"
            highlight
            orientation="horizontal"
            :items="desktopNavItems"
            aria-label="Desktop navigatiemenu"
          />
          <!-- TODO: REMOVE and create new button immediately to setmore new url-->
          <UButton
            id="Setmore_button_iframe"
            class="ml-4"
            size="md"
            as="a"
            href="https://enisahealingmassage.setmore.com"
            icon="i-mdi-calendar"
            aria-label="Boek een afspraak met Enisa Healing & Massage - opent boekingssysteem"
            :label="'Boek Nu'"
          />
        </template>
      </nav>

      <div class="lg:hidden flex items-center">
        <UButton
          color="primary"
          variant="ghost"
          icon="i-mdi-menu"
          :aria-label="
            isMobileMenuOpen ? 'Sluit navigatiemenu' : 'Open navigatiemenu'
          "
          :aria-expanded="isMobileMenuOpen"
          aria-controls="mobile-menu"
          @click="toggleMobileMenu"
        />
      </div>
    </UContainer>

    <UCard
      v-if="isMobileMenuOpen"
      id="mobile-menu"
      class="lg:hidden flex flex-col flex-1"
      role="navigation"
      aria-label="Mobiele navigatie"
    >
      <UNavigationMenu
        :orientation="'vertical'"
        :items="mobileNavItems"
        aria-label="Mobiel navigatiemenu"
      />

      <template #footer>
        <UButton
          id="Setmore_button_iframe"
          block
          size="md"
          as="a"
          href="https://enisahealingmassage.setmore.com"
          icon="i-mdi-calendar"
          aria-label="Boek een afspraak met Enisa Healing & Massage - opent boekingssysteem"
          :label="'Boek Nu'"
          @click="closeMobileMenu"
        />
      </template>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
import { useTreatmentStore } from "~/features/treatments/store";

const routes = useRoutes();
const treatmentStore = useTreatmentStore();

// Get all active treatments
const allTreatments = computed(() => {
  return treatmentStore.treatments
    .filter((t) => t.is_active)
    .map((t) => treatmentStore.formatTreatment(t))
    .sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
});

// Reactively define treatment navigation items
const treatmentNavEntries = computed<NavigationMenuItem[]>(() =>
  allTreatments.value.map((item) => ({
    label: item.title || routes.slugToTitle(item.slug || ""),
    to: item.path,
    icon: item.icon || "i-mdi-sparkles",
  })),
);

const mobileNavItems = computed<NavigationMenuItem[]>(() => [
  {
    label: "Home",
    icon: "i-mdi-home",
    to: routes.pages.home,
  },
  {
    label: "Over Mij",
    icon: "i-mdi-account",
    to: routes.pages.about,
  },
  {
    label: "Behandelingen",
    icon: "i-mdi-sparkles",
    children: treatmentNavEntries.value,
  },
  {
    label: "Tarieven",
    icon: "i-mdi-currency-eur",
    to: routes.pages.tarieven,
  },
  {
    label: "Contact",
    icon: "i-mdi-email",
    to: routes.pages.contact,
  },
  {
    label: "Reviews",
    icon: "i-mdi-star",
    to: routes.pages.reviews,
  },
]);

// Create navigation items with dynamic treatment data
const desktopNavItems = computed<NavigationMenuItem[]>(() => [
  {
    label: "Home",
    icon: "i-mdi-home",
    to: routes.pages.home,
  },
  {
    label: "Over Mij",
    icon: "i-mdi-account",
    to: routes.pages.about,
  },
  {
    label: "Behandelingen",
    icon: "i-mdi-sparkles",
    children: treatmentNavEntries.value,
  },
  {
    label: "Tarieven",
    icon: "i-mdi-currency-eur",
    to: routes.pages.tarieven,
  },
  {
    label: "Contact",
    icon: "i-mdi-email",
    to: routes.pages.contact,
  },
  {
    label: "Reviews",
    icon: "i-mdi-star",
    to: routes.pages.reviews,
  },
]);

// State for mobile menu visibility with enhanced accessibility
const isMobileMenuOpen = ref(false);

// Enhanced mobile menu toggle with focus management
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;

  // Focus management for accessibility
  if (isMobileMenuOpen.value) {
    nextTick(() => {
      // Focus first menu item when opening
      const firstMenuItem = document.querySelector(
        "#mobile-menu button, #mobile-menu a",
      );
      if (firstMenuItem) {
        (firstMenuItem as HTMLElement).focus();
      }
    });
  }
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

// Close mobile menu when escape key is pressed
onMounted(() => {
  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === "Escape" && isMobileMenuOpen.value) {
      closeMobileMenu();
    }
  };

  document.addEventListener("keydown", handleEscape);

  onUnmounted(() => {
    document.removeEventListener("keydown", handleEscape);
  });
});
</script>
