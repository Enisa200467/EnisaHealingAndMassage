<template>
  <UContainer class="py-8">
    <div class="space-y-8">
      <header>
        <h1 class="text-3xl font-bold mb-4">SEO & Accessibility Audit</h1>
        <p class="text-gray-600">
          Comprehensive analysis of SEO performance and accessibility compliance
        </p>
      </header>

      <!-- Audit Actions -->
      <div class="flex gap-4">
        <UButton :loading="loading.seo" color="primary" @click="runSEOAudit">
          Run SEO Audit
        </UButton>
        <UButton
          :loading="loading.a11y"
          color="secondary"
          @click="runA11yAudit"
        >
          Run Accessibility Audit
        </UButton>
        <UButton :loading="loading.full" color="success" @click="runFullAudit">
          Run Full Audit
        </UButton>
      </div>

      <!-- SEO Results -->
      <UCard v-if="seoResults" class="space-y-4">
        <template #header>
          <h2 class="text-xl font-semibold">SEO Audit Results</h2>
        </template>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="text-center p-4 bg-green-50 rounded-lg">
            <div class="text-2xl font-bold text-green-600">
              {{ seoResults.score }}%
            </div>
            <div class="text-sm text-green-800">SEO Score</div>
          </div>
          <div class="text-center p-4 bg-blue-50 rounded-lg">
            <div class="text-2xl font-bold text-blue-600">
              {{ seoResults.passed }}
            </div>
            <div class="text-sm text-blue-800">Tests Passed</div>
          </div>
          <div class="text-center p-4 bg-red-50 rounded-lg">
            <div class="text-2xl font-bold text-red-600">
              {{ seoResults.failed }}
            </div>
            <div class="text-sm text-red-800">Issues Found</div>
          </div>
        </div>

        <div v-if="seoResults.issues.length > 0" class="space-y-2">
          <h3 class="font-semibold text-red-600">SEO Issues:</h3>
          <ul class="space-y-1">
            <li
              v-for="issue in seoResults.issues"
              :key="issue.test"
              class="text-sm"
            >
              <span class="font-medium">{{ issue.test }}:</span>
              {{ issue.message }}
            </li>
          </ul>
        </div>
      </UCard>

      <!-- A11y Results -->
      <UCard v-if="a11yResults" class="space-y-4">
        <template #header>
          <h2 class="text-xl font-semibold">Accessibility Audit Results</h2>
        </template>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="text-center p-4 bg-green-50 rounded-lg">
            <div class="text-2xl font-bold text-green-600">
              {{ a11yResults.summary.score }}%
            </div>
            <div class="text-sm text-green-800">A11y Score</div>
          </div>
          <div class="text-center p-4 bg-blue-50 rounded-lg">
            <div class="text-2xl font-bold text-blue-600">
              {{ a11yResults.summary.passed }}
            </div>
            <div class="text-sm text-blue-800">Tests Passed</div>
          </div>
          <div class="text-center p-4 bg-red-50 rounded-lg">
            <div class="text-2xl font-bold text-red-600">
              {{ a11yResults.summary.failed }}
            </div>
            <div class="text-sm text-red-800">Issues Found</div>
          </div>
        </div>

        <div v-if="a11yResults.issues.length > 0" class="space-y-4">
          <h3 class="font-semibold text-red-600">Accessibility Issues:</h3>

          <div class="space-y-3">
            <details
              v-for="(issues, category) in groupedA11yIssues"
              :key="category"
              class="border rounded-lg p-3"
            >
              <summary class="font-medium cursor-pointer">
                {{ category }} ({{ issues.length }} issues)
              </summary>
              <ul class="mt-2 space-y-1 ml-4">
                <li
                  v-for="issue in issues"
                  :key="issue.message"
                  class="text-sm"
                >
                  <span class="font-medium">{{ issue.message }}</span>
                  <div v-if="issue.element" class="text-xs text-gray-500 mt-1">
                    Element: {{ issue.element }}
                  </div>
                </li>
              </ul>
            </details>
          </div>
        </div>
      </UCard>

      <!-- Performance Metrics -->
      <UCard v-if="performanceMetrics" class="space-y-4">
        <template #header>
          <h2 class="text-xl font-semibold">Performance Metrics</h2>
        </template>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="text-center p-3 bg-gray-50 rounded-lg">
            <div class="text-lg font-bold">
              {{ performanceMetrics.domElements }}
            </div>
            <div class="text-xs text-gray-600">DOM Elements</div>
          </div>
          <div class="text-center p-3 bg-gray-50 rounded-lg">
            <div class="text-lg font-bold">{{ performanceMetrics.images }}</div>
            <div class="text-xs text-gray-600">Images</div>
          </div>
          <div class="text-center p-3 bg-gray-50 rounded-lg">
            <div class="text-lg font-bold">
              {{ performanceMetrics.headings }}
            </div>
            <div class="text-xs text-gray-600">Headings</div>
          </div>
          <div class="text-center p-3 bg-gray-50 rounded-lg">
            <div class="text-lg font-bold">{{ performanceMetrics.links }}</div>
            <div class="text-xs text-gray-600">Links</div>
          </div>
        </div>
      </UCard>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
interface SEOIssue {
  test: string;
  message: string;
  severity: 'error' | 'warning' | 'info';
}

interface SEOResults {
  score: number;
  passed: number;
  failed: number;
  issues: SEOIssue[];
}

const { generateA11yReport } = useA11yValidator();

const loading = ref({
  seo: false,
  a11y: false,
  full: false,
});

const seoResults = ref<SEOResults | null>(null);
const a11yResults = ref<any | null>(null);
const performanceMetrics = ref<any | null>(null);

const groupedA11yIssues = computed(() => {
  if (!a11yResults.value?.issues) return {};

  const grouped: { [key: string]: any[] } = {};

  a11yResults.value.issues.forEach((issue: any) => {
    // Determine category based on message content
    let category = 'General';
    if (
      issue.message.toLowerCase().includes('image') ||
      issue.message.toLowerCase().includes('alt')
    ) {
      category = 'Images';
    } else if (issue.message.toLowerCase().includes('heading')) {
      category = 'Headings';
    } else if (
      issue.message.toLowerCase().includes('form') ||
      issue.message.toLowerCase().includes('label')
    ) {
      category = 'Forms';
    } else if (
      issue.message.toLowerCase().includes('keyboard') ||
      issue.message.toLowerCase().includes('tabindex')
    ) {
      category = 'Keyboard Navigation';
    } else if (
      issue.message.toLowerCase().includes('contrast') ||
      issue.message.toLowerCase().includes('color')
    ) {
      category = 'Color & Contrast';
    }

    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(issue);
  });

  return grouped;
});

const runSEOAudit = async () => {
  loading.value.seo = true;

  try {
    const issues: SEOIssue[] = [];
    let passed = 0;

    // Check meta title
    const title = document.querySelector('title')?.textContent;
    if (!title) {
      issues.push({
        test: 'Title Tag',
        message: 'Missing title tag',
        severity: 'error',
      });
    } else if (title.length < 30) {
      issues.push({
        test: 'Title Tag',
        message: 'Title too short (< 30 characters)',
        severity: 'warning',
      });
    } else if (title.length > 60) {
      issues.push({
        test: 'Title Tag',
        message: 'Title too long (> 60 characters)',
        severity: 'warning',
      });
    } else {
      passed++;
    }

    // Check meta description
    const description = document
      .querySelector('meta[name="description"]')
      ?.getAttribute('content');
    if (!description) {
      issues.push({
        test: 'Meta Description',
        message: 'Missing meta description',
        severity: 'error',
      });
    } else if (description.length < 120) {
      issues.push({
        test: 'Meta Description',
        message: 'Description too short (< 120 characters)',
        severity: 'warning',
      });
    } else if (description.length > 160) {
      issues.push({
        test: 'Meta Description',
        message: 'Description too long (> 160 characters)',
        severity: 'warning',
      });
    } else {
      passed++;
    }

    // Check H1 tags
    const h1Tags = document.querySelectorAll('h1');
    if (h1Tags.length === 0) {
      issues.push({
        test: 'H1 Tag',
        message: 'No H1 tag found',
        severity: 'error',
      });
    } else if (h1Tags.length > 1) {
      issues.push({
        test: 'H1 Tag',
        message: 'Multiple H1 tags found',
        severity: 'warning',
      });
    } else {
      passed++;
    }

    // Check images without alt text
    const imagesWithoutAlt = document.querySelectorAll('img:not([alt])');
    if (imagesWithoutAlt.length > 0) {
      issues.push({
        test: 'Image Alt Text',
        message: `${imagesWithoutAlt.length} images missing alt text`,
        severity: 'error',
      });
    } else {
      passed++;
    }

    // Check canonical URL
    const canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      issues.push({
        test: 'Canonical URL',
        message: 'Missing canonical URL',
        severity: 'warning',
      });
    } else {
      passed++;
    }

    // Check Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector(
      'meta[property="og:description"]'
    );
    const ogImage = document.querySelector('meta[property="og:image"]');

    if (!ogTitle || !ogDescription || !ogImage) {
      issues.push({
        test: 'Open Graph',
        message: 'Missing essential Open Graph tags',
        severity: 'warning',
      });
    } else {
      passed++;
    }

    const total = passed + issues.length;
    const score = Math.round((passed / total) * 100);

    seoResults.value = {
      score,
      passed,
      failed: issues.length,
      issues,
    };
  } finally {
    loading.value.seo = false;
  }
};

const runA11yAudit = async () => {
  loading.value.a11y = true;

  try {
    a11yResults.value = generateA11yReport();
  } finally {
    loading.value.a11y = false;
  }
};

const runFullAudit = async () => {
  loading.value.full = true;

  try {
    await Promise.all([runSEOAudit(), runA11yAudit()]);

    // Collect performance metrics
    performanceMetrics.value = {
      domElements: document.querySelectorAll('*').length,
      images: document.querySelectorAll('img').length,
      headings: document.querySelectorAll('h1, h2, h3, h4, h5, h6').length,
      links: document.querySelectorAll('a').length,
    };
  } finally {
    loading.value.full = false;
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
