<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h3 class="text-lg font-semibold text-gray-900">{{ result.title }}</h3>
        <p class="text-sm text-gray-600">{{ result.url }}</p>
      </div>
      <div class="flex items-center gap-2">
        <UBadge v-if="result.error" color="error" variant="soft"> Fout </UBadge>
        <UBadge v-else-if="result.isLoading" color="primary" variant="soft">
          Laden
        </UBadge>
        <ULink
          :to="result.url"
          external
          target="_blank"
          class="text-blue-600 hover:text-blue-700"
        >
          <UIcon name="i-mdi-open-in-new" class="w-4 h-4" />
        </ULink>
      </div>
    </div>

    <!-- Error State -->
    <UAlert
      v-if="result.error"
      color="error"
      variant="soft"
      :title="'Controle Fout'"
      :description="result.error"
      icon="i-mdi-alert-circle"
    />

    <!-- Loading State -->
    <div v-else-if="result.isLoading" class="text-center py-8">
      <div
        class="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"
      />
      <p class="text-sm text-gray-600">Pagina controleren...</p>
    </div>

    <!-- Results -->
    <div v-else class="space-y-6">
      <!-- Score Overview -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="text-center p-4 bg-blue-50 rounded-lg">
          <div class="text-2xl font-bold text-blue-600">
            {{ result.seo?.score || 0 }}%
          </div>
          <div class="text-sm text-blue-800">SEO Score</div>
        </div>
        <div class="text-center p-4 bg-green-50 rounded-lg">
          <div class="text-2xl font-bold text-green-600">
            {{ result.a11y?.summary.score || 0 }}%
          </div>
          <div class="text-sm text-green-800">Toegankelijkheid</div>
        </div>
        <div class="text-center p-4 bg-purple-50 rounded-lg">
          <div class="text-2xl font-bold text-purple-600">
            {{ result.performance?.domElements || 0 }}
          </div>
          <div class="text-sm text-purple-800">DOM Elementen</div>
        </div>
      </div>

      <!-- SEO Results -->
      <UCard v-if="result.seo" class="space-y-4">
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-mdi-search-web" class="w-5 h-5" />
            <h4 class="text-lg font-semibold">SEO Analyse</h4>
          </div>
        </template>

        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          <div class="text-center p-3 bg-green-50 rounded-lg">
            <div class="text-lg font-bold text-green-600">
              {{ result.seo.passed }}
            </div>
            <div class="text-xs text-green-800">Tests Geslaagd</div>
          </div>
          <div class="text-center p-3 bg-red-50 rounded-lg">
            <div class="text-lg font-bold text-red-600">
              {{ result.seo.failed }}
            </div>
            <div class="text-xs text-red-800">Problemen Gevonden</div>
          </div>
          <div class="text-center p-3 bg-blue-50 rounded-lg">
            <div class="text-lg font-bold text-blue-600">
              {{ result.seo.score }}%
            </div>
            <div class="text-xs text-blue-800">Totaalscore</div>
          </div>
        </div>

        <div v-if="result.seo.issues.length > 0" class="space-y-3">
          <h5 class="font-medium text-red-600">Problemen om op te lossen:</h5>
          <div class="space-y-2">
            <div
              v-for="issue in result.seo.issues"
              :key="issue.test"
              class="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg"
            >
              <UIcon
                :name="getSeverityIcon(issue.severity)"
                :class="getSeverityColor(issue.severity)"
                class="w-4 h-4 mt-0.5 flex-shrink-0"
              />
              <div>
                <p class="font-medium text-sm">{{ issue.test }}</p>
                <p class="text-sm text-gray-700">{{ issue.message }}</p>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-4 text-green-600">
          <UIcon name="i-mdi-check-circle" class="w-8 h-8 mx-auto mb-2" />
          <p class="font-medium">Geen SEO problemen gevonden!</p>
        </div>
      </UCard>

      <!-- Accessibility Results -->
      <UCard v-if="result.a11y" class="space-y-4">
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-mdi-wheelchair-accessibility" class="w-5 h-5" />
            <h4 class="text-lg font-semibold">Toegankelijkheidsanalyse</h4>
          </div>
        </template>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div class="text-center p-3 bg-blue-50 rounded-lg">
            <div class="text-lg font-bold text-blue-600">
              {{ result.a11y.summary.total }}
            </div>
            <div class="text-xs text-blue-800">Totaal Tests</div>
          </div>
          <div class="text-center p-3 bg-green-50 rounded-lg">
            <div class="text-lg font-bold text-green-600">
              {{ result.a11y.summary.passed }}
            </div>
            <div class="text-xs text-green-800">Geslaagd</div>
          </div>
          <div class="text-center p-3 bg-red-50 rounded-lg">
            <div class="text-lg font-bold text-red-600">
              {{ result.a11y.summary.failed }}
            </div>
            <div class="text-xs text-red-800">Gefaald</div>
          </div>
          <div class="text-center p-3 bg-yellow-50 rounded-lg">
            <div class="text-lg font-bold text-yellow-600">
              {{ result.a11y.summary.score }}%
            </div>
            <div class="text-xs text-yellow-800">Score</div>
          </div>
        </div>

        <div v-if="result.a11y.issues.length > 0" class="space-y-3">
          <h5 class="font-medium text-red-600">Toegankelijkheidsproblemen:</h5>
          <div class="space-y-2">
            <div
              v-for="issue in result.a11y.issues"
              :key="issue.message"
              class="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
            >
              <UIcon
                name="i-mdi-alert"
                class="w-4 h-4 mt-0.5 flex-shrink-0 text-yellow-600"
              />
              <div>
                <p class="text-sm text-gray-700">{{ issue.message }}</p>
                <p v-if="issue.element" class="text-xs text-gray-500 mt-1">
                  Element: {{ issue.element }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-4 text-green-600">
          <UIcon name="i-mdi-check-circle" class="w-8 h-8 mx-auto mb-2" />
          <p class="font-medium">Geen toegankelijkheidsproblemen gevonden!</p>
        </div>
      </UCard>

      <!-- Performance Metrics -->
      <UCard v-if="result.performance" class="space-y-4">
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-mdi-speedometer" class="w-5 h-5" />
            <h4 class="text-lg font-semibold">Prestatiemetrics</h4>
          </div>
        </template>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="text-center p-3 bg-gray-50 rounded-lg">
            <div class="text-lg font-bold text-gray-700">
              {{ result.performance.domElements }}
            </div>
            <div class="text-xs text-gray-600">DOM Elementen</div>
          </div>
          <div class="text-center p-3 bg-gray-50 rounded-lg">
            <div class="text-lg font-bold text-gray-700">
              {{ result.performance.images }}
            </div>
            <div class="text-xs text-gray-600">Afbeeldingen</div>
          </div>
          <div class="text-center p-3 bg-gray-50 rounded-lg">
            <div class="text-lg font-bold text-gray-700">
              {{ result.performance.headings }}
            </div>
            <div class="text-xs text-gray-600">Koppen</div>
          </div>
          <div class="text-center p-3 bg-gray-50 rounded-lg">
            <div class="text-lg font-bold text-gray-700">
              {{ result.performance.links }}
            </div>
            <div class="text-xs text-gray-600">Links</div>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PageAuditResults } from '../composables/useMultiPageSEOAudit';

interface Props {
  result: PageAuditResults;
}

defineProps<Props>();

// Helper functions
const getSeverityIcon = (severity: 'error' | 'warning' | 'info') => {
  switch (severity) {
    case 'error':
      return 'i-mdi-alert-circle';
    case 'warning':
      return 'i-mdi-alert';
    case 'info':
      return 'i-mdi-information';
    default:
      return 'i-mdi-information';
  }
};

const getSeverityColor = (severity: 'error' | 'warning' | 'info') => {
  switch (severity) {
    case 'error':
      return 'text-red-600';
    case 'warning':
      return 'text-yellow-600';
    case 'info':
      return 'text-blue-600';
    default:
      return 'text-blue-600';
  }
};
</script>
