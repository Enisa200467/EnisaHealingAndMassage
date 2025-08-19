<script setup lang="ts">
// Import nextTick for DOM updates
import { nextTick } from 'vue';

// Admin documentation page - Dutch guide for treatment management
useSeoMeta({
  title: 'Admin Documentatie - Behandelingen Beheren',
  description:
    'Handleiding voor het aanmaken en bewerken van behandelingen in het admin systeem',
  robots: 'noindex, nofollow',
});

// Protect admin page with authentication
definePageMeta({
  layout: false,
});

// Tab configuration
const tabs = ref([
  {
    key: 'treatments',
    label: 'Behandelingen Beheren',
    icon: 'i-mdi-spa',
    description: 'Aanmaken, bewerken en beheren van behandelingen',
  },
  {
    key: 'content',
    label: 'Content Beheer',
    icon: 'i-mdi-file-document-edit',
    description: 'Content management en SEO optimalisatie',
  },
  {
    key: 'technical',
    label: 'Technische Info',
    icon: 'i-mdi-cog',
    description: 'System overzicht en troubleshooting',
  },
]);

// Active tab state
const activeTab = ref('treatments');

// Treatment management sections (for the first tab)
const treatmentSections = [
  { id: 'create-treatment', label: 'Nieuwe Behandeling' },
  { id: 'edit-treatment', label: 'Behandeling Bewerken' },
];

// Content management sections (for the second tab)
const contentSections = [
  { id: 'content-management', label: 'Content Beheer' },
  { id: 'content-template', label: 'Content Template' },
  { id: 'seo-tips', label: 'SEO Tips' },
];

// Technical sections (for the third tab)
const technicalSections = [
  { id: 'overview', label: 'Overzicht Systeem' },
  { id: 'dynamic-routes', label: 'Dynamic Routes & CMS' },
  { id: 'troubleshooting', label: 'Probleemoplossing' },
];

// Get current sections based on active tab
const currentSections = computed(() => {
  switch (activeTab.value) {
    case 'treatments':
      return treatmentSections;
    case 'content':
      return contentSections;
    case 'technical':
      return technicalSections;
    default:
      return treatmentSections;
  }
});

// Add scroll function
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

// Handle navigation to content tab
const handleNavToContent = () => {
  activeTab.value = 'content';
  // Scroll to content template section after a short delay to allow tab switch
  nextTick(() => {
    setTimeout(() => {
      scrollToSection('content-template');
    }, 100);
  });
};
</script>

<template>
  <div class="min-h-screen bg-neutral-50">
    <UContainer class="py-8">
      <!-- Header -->
      <DocsHeader />

      <!-- Tab Navigation -->
      <div class="mb-8">
        <UCard>
          <template #header>
            <h2 class="text-xl font-semibold text-neutral-900">
              Documentatie Secties
            </h2>
          </template>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              v-for="tab in tabs"
              :key="tab.key"
              class="p-4 rounded-lg border-2 transition-all duration-200 text-left"
              :class="[
                activeTab === tab.key
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50',
              ]"
              @click="activeTab = tab.key"
            >
              <div class="flex items-start gap-3">
                <UIcon
                  :name="tab.icon"
                  :class="[
                    'w-6 h-6 mt-0.5',
                    activeTab === tab.key
                      ? 'text-primary-600'
                      : 'text-neutral-500',
                  ]"
                />
                <div>
                  <h3
                    :class="[
                      'font-semibold mb-1',
                      activeTab === tab.key
                        ? 'text-primary-900'
                        : 'text-neutral-900',
                    ]"
                  >
                    {{ tab.label }}
                  </h3>
                  <p
                    :class="[
                      'text-sm',
                      activeTab === tab.key
                        ? 'text-primary-700'
                        : 'text-neutral-600',
                    ]"
                  >
                    {{ tab.description }}
                  </p>
                </div>
              </div>
            </button>
          </div>
        </UCard>
      </div>

      <!-- Content based on active tab -->
      <div class="grid grid-cols-1 xl:grid-cols-4 gap-8">
        <!-- Table of Contents -->
        <DocsTableOfContents
          :sections="currentSections"
          :active-tab="activeTab"
          @scroll-to="scrollToSection"
        />

        <!-- Main Content -->
        <div class="xl:col-span-3 space-y-12">
          <!-- Treatment Management Tab -->
          <div v-if="activeTab === 'treatments'" class="space-y-12">
            <div
              class="text-center p-8 bg-gradient-to-r from-primary-50 to-teal-50 rounded-xl border border-primary-200"
            >
              <UIcon
                name="i-mdi-spa"
                class="w-16 h-16 text-primary-600 mx-auto mb-4"
              />
              <h2 class="text-3xl font-bold text-neutral-900 mb-2">
                Behandelingen Beheren
              </h2>
              <p class="text-lg text-neutral-600 max-w-2xl mx-auto">
                Leer hoe je eenvoudig nieuwe behandelingen kunt aanmaken en
                bestaande behandelingen kunt bewerken
              </p>
            </div>

            <TreatmentQuickStart />
            <DocsCreateTreatmentSection @nav-to-content="handleNavToContent" />
            <DocsEditTreatmentSection />
          </div>

          <!-- Content Management Tab -->
          <div v-else-if="activeTab === 'content'" class="space-y-12">
            <div
              class="text-center p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200"
            >
              <UIcon
                name="i-mdi-file-document-edit"
                class="w-16 h-16 text-blue-600 mx-auto mb-4"
              />
              <h2 class="text-3xl font-bold text-neutral-900 mb-2">
                Content Beheer
              </h2>
              <p class="text-lg text-neutral-600 max-w-2xl mx-auto">
                Tips voor content management en SEO optimalisatie
              </p>
            </div>

            <DocsContentManagementSection />
            <DocsSeoTipsSection />
          </div>

          <!-- Technical Tab -->
          <div v-else-if="activeTab === 'technical'" class="space-y-12">
            <div
              class="text-center p-8 bg-gradient-to-r from-gray-50 to-neutral-50 rounded-xl border border-gray-200"
            >
              <UIcon
                name="i-mdi-cog"
                class="w-16 h-16 text-gray-600 mx-auto mb-4"
              />
              <h2 class="text-3xl font-bold text-neutral-900 mb-2">
                Technische Informatie
              </h2>
              <p class="text-lg text-neutral-600 max-w-2xl mx-auto">
                Systeemoverzicht, dynamic routes en troubleshooting
              </p>
            </div>

            <DocsOverviewSection />
            <DynamicRoutesSection />
            <DocsTroubleshootingSection />
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>
