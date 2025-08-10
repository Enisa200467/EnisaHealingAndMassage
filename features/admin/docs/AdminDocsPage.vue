<script setup lang="ts">
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

// Get dynamic routes
const _routes = useRoutes();

// Navigation sections
const sections = [
  { id: 'overview', label: 'Overzicht Systeem' },
  { id: 'dynamic-routes', label: 'Dynamic Routes & CMS' },
  { id: 'create-treatment', label: 'Nieuwe Behandeling' },
  { id: 'edit-treatment', label: 'Behandeling Bewerken' },
  { id: 'content-management', label: 'Content Beheer' },
  { id: 'seo-tips', label: 'SEO Tips' },
  { id: 'troubleshooting', label: 'Probleemoplossing' },
];

// Add scroll function
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};
</script>

<template>
  <div class="min-h-screen bg-neutral-50">
    <UContainer class="py-8">
      <!-- Header -->
      <DocsHeader />

      <!-- Navigation within docs -->
      <div class="grid grid-cols-1 xl:grid-cols-4 gap-8">
        <!-- Table of Contents -->
        <DocsTableOfContents
          :sections="sections"
          @scroll-to="scrollToSection"
        />

        <!-- Main Content -->
        <div class="xl:col-span-3 space-y-12">
          <!-- Overview Section -->
          <DocsOverviewSection />

          <!-- Dynamic Routes & CMS Section -->
          <DynamicRoutesSection />

          <!-- Treatment Management Sections -->
          <DocsCreateTreatmentSection />
          <DocsEditTreatmentSection />
          <DocsContentManagementSection />
          <DocsSeoTipsSection />
          <DocsTroubleshootingSection />
        </div>
      </div>
    </UContainer>
  </div>
</template>
