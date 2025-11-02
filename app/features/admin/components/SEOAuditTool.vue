<template>
  <div class="space-y-8">
    <header>
      <h1 class="text-3xl font-bold mb-4">SEO & Toegankelijkheidscontrole</h1>
      <p class="text-gray-600">
        Uitgebreide analyse van SEO prestaties en toegankelijkheidsnaleving voor
        alle pagina's
      </p>
    </header>

    <!-- Audit Actions -->
    <div class="flex gap-4 flex-wrap">
      <UButton
        :loading="loading.current"
        color="primary"
        @click="runCurrentPageAudit"
      >
        Controleer Huidige Pagina
      </UButton>
      <UButton :loading="loading.all" color="success" @click="runAllPagesAudit">
        Controleer Alle Pagina's
      </UButton>
      <UButton
        v-if="auditResults.length > 0"
        :loading="loading.export"
        color="neutral"
        variant="outline"
        @click="exportResults"
      >
        Exporteer Resultaten
      </UButton>
    </div>

    <!-- Overall Summary -->
    <UCard v-if="auditResults.length > 0" class="space-y-4">
      <template #header>
        <h2 class="text-xl font-semibold">Controle Overzicht</h2>
      </template>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="text-center p-4 bg-blue-50 rounded-lg">
          <div class="text-2xl font-bold text-blue-600">
            {{ auditResults.length }}
          </div>
          <div class="text-sm text-blue-800">Pagina's Gecontroleerd</div>
        </div>
        <div class="text-center p-4 bg-green-50 rounded-lg">
          <div class="text-2xl font-bold text-green-600">
            {{ overallStats.averageSEOScore }}%
          </div>
          <div class="text-sm text-green-800">Gem. SEO Score</div>
        </div>
        <div class="text-center p-4 bg-yellow-50 rounded-lg">
          <div class="text-2xl font-bold text-yellow-600">
            {{ overallStats.averageA11yScore }}%
          </div>
          <div class="text-sm text-yellow-800">Gem. Toegankelijkheid</div>
        </div>
        <div class="text-center p-4 bg-red-50 rounded-lg">
          <div class="text-2xl font-bold text-red-600">
            {{ overallStats.totalIssues }}
          </div>
          <div class="text-sm text-red-800">Totaal Problemen</div>
        </div>
      </div>
    </UCard>

    <!-- Individual Page Results - Manual Accordion Style -->
    <div v-if="auditResults.length > 0" class="space-y-4">
      <h2 class="text-2xl font-semibold mb-4">Resultaten per Pagina</h2>

      <div class="space-y-3">
        <div
          v-for="(result, index) in auditResults"
          :key="result.url"
          class="border border-gray-200 rounded-lg overflow-hidden"
        >
          <!-- Accordion Header -->
          <button
            class="w-full p-4 bg-white hover:bg-gray-50 flex items-center justify-between text-left"
            @click="toggleAccordion(index)"
          >
            <div class="flex items-center gap-3">
              <UIcon
                :name="getPageIcon(result)"
                class="w-5 h-5"
                :class="{
                  'text-green-600': getPageStatusColor(result) === 'success',
                  'text-yellow-600': getPageStatusColor(result) === 'warning',
                  'text-red-600': getPageStatusColor(result) === 'error',
                  'text-blue-600': getPageStatusColor(result) === 'primary',
                }"
              />
              <div>
                <h3 class="font-medium text-gray-900">{{ result.title }}</h3>
                <p class="text-sm text-gray-600">{{ result.url }}</p>
              </div>
              <UBadge
                :color="getPageBadgeColor(result)"
                variant="subtle"
                size="sm"
              >
                {{ getPageStatus(result) }}
              </UBadge>
            </div>
            <div class="flex items-center gap-3">
              <div class="text-sm text-gray-600">
                SEO: {{ result.seo?.score || 0 }}% | A11y:
                {{ result.a11y?.summary.score || 0 }}%
              </div>
              <UIcon
                :name="
                  expandedAccordions.includes(index)
                    ? 'i-mdi-chevron-up'
                    : 'i-mdi-chevron-down'
                "
                class="w-4 h-4 text-gray-400"
              />
            </div>
          </button>

          <!-- Accordion Content -->
          <div
            v-if="expandedAccordions.includes(index)"
            class="border-t border-gray-200 bg-gray-50 p-4"
          >
            <PageAuditDetail :result="result" />
          </div>
        </div>
      </div>
    </div>

    <!-- Loading States -->
    <UCard v-if="loading.all || loading.current" class="text-center py-8">
      <div class="space-y-4">
        <div
          class="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"
        />
        <p class="text-gray-600">
          {{
            loading.all
              ? "Alle pagina's controleren..."
              : 'Huidige pagina controleren...'
          }}
        </p>
        <div
          v-if="loading.all && auditProgress.current > 0"
          class="max-w-xs mx-auto"
        >
          <div class="flex justify-between text-sm text-gray-600 mb-1">
            <span>Voortgang</span>
            <span>{{ auditProgress.current }}/{{ auditProgress.total }}</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div
              class="bg-blue-500 h-2 rounded-full transition-all duration-300"
              :style="{
                width: `${
                  (auditProgress.current / auditProgress.total) * 100
                }%`,
              }"
            />
          </div>
        </div>
      </div>
    </UCard>

    <!-- Empty State -->
    <UCard
      v-if="!loading.all && !loading.current && auditResults.length === 0"
      class="text-center py-8"
    >
      <div class="space-y-4">
        <UIcon
          name="i-mdi-chart-line"
          class="w-16 h-16 text-gray-400 mx-auto"
        />
        <h3 class="text-lg font-semibold text-gray-900">
          Geen Controleresultaten
        </h3>
        <p class="text-gray-600">
          Voer een controle uit om SEO en toegankelijkheidsanalyse voor je
          pagina's te bekijken.
        </p>
        <div class="flex gap-3 justify-center">
          <UButton @click="runCurrentPageAudit">
            Controleer Huidige Pagina
          </UButton>
          <UButton variant="outline" @click="runAllPagesAudit">
            Controleer Alle Pagina's
          </UButton>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import type {
  PageAuditResults,
  AuditableRoute,
} from '../composables/useMultiPageSEOAudit';
import { useMultiPageSEOAudit } from '../composables/useMultiPageSEOAudit';

const { auditSinglePage, getAuditableRoutes } = useMultiPageSEOAudit();

const loading = ref({
  current: false,
  all: false,
  export: false,
});

const auditResults = ref<PageAuditResults[]>([]);
const auditProgress = ref({
  current: 0,
  total: 0,
});

// Accordion state management
const expandedAccordions = ref<number[]>([]);

// Toggle accordion function
const toggleAccordion = (index: number) => {
  const expandedIndex = expandedAccordions.value.indexOf(index);
  if (expandedIndex >= 0) {
    expandedAccordions.value.splice(expandedIndex, 1);
  } else {
    expandedAccordions.value.push(index);
  }
};

// Computed properties for overall statistics
const overallStats = computed(() => {
  if (auditResults.value.length === 0) {
    return {
      averageSEOScore: 0,
      averageA11yScore: 0,
      totalIssues: 0,
    };
  }

  const validSEOResults = auditResults.value.filter((r) => r.seo !== null);
  const validA11yResults = auditResults.value.filter((r) => r.a11y !== null);

  const averageSEOScore =
    validSEOResults.length > 0
      ? Math.round(
          validSEOResults.reduce((sum, r) => sum + (r.seo?.score || 0), 0) /
            validSEOResults.length
        )
      : 0;

  const averageA11yScore =
    validA11yResults.length > 0
      ? Math.round(
          validA11yResults.reduce(
            (sum, r) => sum + (r.a11y?.summary.score || 0),
            0
          ) / validA11yResults.length
        )
      : 0;

  const totalIssues = auditResults.value.reduce((sum, r) => {
    return sum + (r.seo?.failed || 0) + (r.a11y?.summary.failed || 0);
  }, 0);

  return {
    averageSEOScore,
    averageA11yScore,
    totalIssues,
  };
});

// Helper functions for page status indicators
const getPageStatusColor = (
  result: PageAuditResults
): 'primary' | 'success' | 'warning' | 'error' => {
  if (result.error) return 'error';

  const seoScore = result.seo?.score || 0;
  const a11yScore = result.a11y?.summary.score || 0;
  const avgScore = (seoScore + a11yScore) / 2;

  if (avgScore >= 80) return 'success';
  if (avgScore >= 60) return 'warning';
  return 'error';
};

const getPageBadgeColor = (
  result: PageAuditResults
): 'primary' | 'success' | 'warning' | 'error' => {
  if (result.error) return 'error';

  const seoScore = result.seo?.score || 0;
  const a11yScore = result.a11y?.summary.score || 0;
  const avgScore = (seoScore + a11yScore) / 2;

  if (avgScore >= 80) return 'success';
  if (avgScore >= 60) return 'warning';
  return 'error';
};

const getPageStatus = (result: PageAuditResults) => {
  if (result.error) return 'Error';

  const seoScore = result.seo?.score || 0;
  const a11yScore = result.a11y?.summary.score || 0;
  const avgScore = (seoScore + a11yScore) / 2;

  if (avgScore >= 80) return 'Excellent';
  if (avgScore >= 60) return 'Good';
  return 'Needs Work';
};

const getPageIcon = (result: PageAuditResults) => {
  if (result.error) return 'i-mdi-alert-circle';
  if (result.isLoading) return 'i-mdi-loading';

  const seoScore = result.seo?.score || 0;
  const a11yScore = result.a11y?.summary.score || 0;
  const avgScore = (seoScore + a11yScore) / 2;

  if (avgScore >= 80) return 'i-mdi-check-circle';
  if (avgScore >= 60) return 'i-mdi-alert';
  return 'i-mdi-close-circle';
};

// Audit functions
const runCurrentPageAudit = async () => {
  loading.value.current = true;

  try {
    const currentPath = window.location.pathname;
    const routes = getAuditableRoutes();
    const currentRoute = routes.find(
      (r: AuditableRoute) => r.path === currentPath
    ) || {
      path: currentPath,
      title: document.title || 'Current Page',
      category: 'page' as const,
    };

    const result = await auditSinglePage(currentRoute);

    // Replace existing result for this page or add new one
    const existingIndex = auditResults.value.findIndex(
      (r: PageAuditResults) => r.url === result.url
    );
    if (existingIndex >= 0) {
      auditResults.value[existingIndex] = result;
    } else {
      auditResults.value.unshift(result);
    }
  } finally {
    loading.value.current = false;
  }
};

const runAllPagesAudit = async () => {
  loading.value.all = true;

  try {
    const routes = getAuditableRoutes();
    auditProgress.value = {
      current: 0,
      total: routes.length,
    };

    auditResults.value = [];

    // Process pages with progress tracking
    for (let i = 0; i < routes.length; i++) {
      const route = routes[i];
      auditProgress.value.current = i;

      try {
        const result = await auditSinglePage(route);
        auditResults.value.push(result);
      } catch (error) {
        // Add error result for failed audits
        auditResults.value.push({
          url: route.path,
          title: route.title,
          seo: null,
          a11y: null,
          performance: null,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }

      // Small delay to prevent overwhelming the browser
      if (i < routes.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    }

    auditProgress.value.current = routes.length;
  } finally {
    loading.value.all = false;
  }
};

const exportResults = async () => {
  loading.value.export = true;

  try {
    const exportData = {
      timestamp: new Date().toISOString(),
      summary: overallStats.value,
      results: auditResults.value.map((result) => ({
        url: result.url,
        title: result.title,
        seo: result.seo,
        a11y: result.a11y
          ? {
              score: result.a11y.summary.score,
              passed: result.a11y.summary.passed,
              failed: result.a11y.summary.failed,
              issues: result.a11y.issues.map((issue) => issue.message),
            }
          : null,
        performance: result.performance,
        error: result.error,
      })),
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json',
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `seo-audit-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } finally {
    loading.value.export = false;
  }
};

// Set page SEO
useSeoMeta({
  title: 'SEO & Accessibility Audit - Enisa Healing & Massage',
  description:
    'Comprehensive SEO and accessibility audit tool for website optimization',
  robots: 'noindex, nofollow', // Don't index this admin tool
});
</script>
