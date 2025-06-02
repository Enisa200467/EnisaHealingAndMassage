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

interface A11yResults {
  summary: {
    total: number;
    passed: number;
    failed: number;
    score: number;
  };
  details: {
    images: Array<{ passed: boolean; message: string; element?: string }>;
    headings: Array<{ passed: boolean; message: string; element?: string }>;
    forms: Array<{ passed: boolean; message: string; element?: string }>;
    keyboard: Array<{ passed: boolean; message: string; element?: string }>;
    contrast: Array<{ passed: boolean; message: string; element?: string }>;
  };
  issues: Array<{
    passed: boolean;
    message: string;
    element?: string;
  }>;
}

interface PerformanceMetrics {
  domElements: number;
  images: number;
  headings: number;
  links: number;
}

interface PageAuditResults {
  url: string;
  title: string;
  seo: SEOResults | null;
  a11y: A11yResults | null;
  performance: PerformanceMetrics | null;
  isLoading: boolean;
  error: string | null;
}

interface AuditableRoute {
  path: string;
  title: string;
  category: 'page' | 'treatment';
}

export const useMultiPageSEOAudit = () => {
  const routes = useRoutes();

  // Get all auditable routes (exclude admin pages)
  const getAuditableRoutes = (): AuditableRoute[] => {
    const auditableRoutes: AuditableRoute[] = [];

    // Add static pages
    Object.entries(routes.pages).forEach(([key, path]) => {
      auditableRoutes.push({
        path,
        title: getPageTitle(key, path),
        category: 'page',
      });
    });

    // Add treatment pages
    Object.values(routes.treatments).forEach((category) => {
      category.items.forEach((treatment) => {
        auditableRoutes.push({
          path: treatment.path,
          title: treatment.title,
          category: 'treatment',
        });
      });
    });

    return auditableRoutes;
  };

  // Helper function to get page title based on route key
  const getPageTitle = (key: string, path: string): string => {
    const titleMap: Record<string, string> = {
      home: 'Homepage',
      about: 'Over Mij',
      treatments: 'Behandelingen Overzicht',
      contact: 'Contact',
      booking: 'Boeken',
      faq: 'Veelgestelde Vragen',
      blog: 'Blog',
      tarieven: 'Tarieven',
      reviews: 'Reviews',
    };

    return titleMap[key] || path;
  };

  // Audit a single page by fetching its HTML
  const auditSinglePage = async (
    route: AuditableRoute
  ): Promise<PageAuditResults> => {
    const result: PageAuditResults = {
      url: route.path,
      title: route.title,
      seo: null,
      a11y: null,
      performance: null,
      isLoading: true,
      error: null,
    };

    try {
      // For client-side, we'll need to navigate to each page or use a different approach
      // Since we can't easily fetch and parse other pages client-side, we'll simulate the audit
      // In a real implementation, this would be done server-side or with a headless browser

      const baseUrl = window.location.origin;
      const fullUrl = `${baseUrl}${route.path}`;

      // Try to fetch the page HTML (this might be blocked by CORS)
      try {
        const response = await fetch(fullUrl);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // Run SEO audit on the parsed document
        result.seo = await runSEOAuditOnDocument(doc);
        result.performance = getPerformanceMetricsFromDocument(doc);

        // For A11y, we'll need a different approach since it requires the rendered DOM
        // For now, we'll provide basic checks
        result.a11y = getBasicA11yFromDocument(doc);
      } catch {
        // Fallback: provide basic analysis based on route information
        result.seo = generateBasicSEOAnalysis(route);
        result.performance = {
          domElements: 0,
          images: 0,
          headings: 0,
          links: 0,
        };
        result.a11y = generateBasicA11yAnalysis();
      }
    } catch (error) {
      result.error =
        error instanceof Error ? error.message : 'Unknown error occurred';
    } finally {
      result.isLoading = false;
    }

    return result;
  };

  // Run SEO audit on a document
  const runSEOAuditOnDocument = async (doc: Document): Promise<SEOResults> => {
    const issues: SEOIssue[] = [];
    let passed = 0;

    // Check meta title
    const title = doc.querySelector('title')?.textContent;
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
    const description = doc
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
    const h1Tags = doc.querySelectorAll('h1');
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
    const imagesWithoutAlt = doc.querySelectorAll('img:not([alt])');
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
    const canonical = doc.querySelector('link[rel="canonical"]');
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
    const ogTitle = doc.querySelector('meta[property="og:title"]');
    const ogDescription = doc.querySelector('meta[property="og:description"]');
    const ogImage = doc.querySelector('meta[property="og:image"]');

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
    const score = total > 0 ? Math.round((passed / total) * 100) : 0;

    return {
      score,
      passed,
      failed: issues.length,
      issues,
    };
  };

  // Get performance metrics from document
  const getPerformanceMetricsFromDocument = (
    doc: Document
  ): PerformanceMetrics => {
    return {
      domElements: doc.querySelectorAll('*').length,
      images: doc.querySelectorAll('img').length,
      headings: doc.querySelectorAll('h1, h2, h3, h4, h5, h6').length,
      links: doc.querySelectorAll('a').length,
    };
  };

  // Basic A11y analysis from document (limited without rendered DOM)
  const getBasicA11yFromDocument = (doc: Document): A11yResults => {
    const issues: A11yResults['issues'] = [];
    let passed = 0;
    let failed = 0;

    // Check images without alt text
    const imagesWithoutAlt = doc.querySelectorAll('img:not([alt])');
    if (imagesWithoutAlt.length > 0) {
      issues.push({
        passed: false,
        message: `${imagesWithoutAlt.length} images missing alt text`,
      });
      failed++;
    } else {
      passed++;
    }

    // Check form inputs without labels
    const inputs = doc.querySelectorAll('input, textarea, select');
    let inputsWithoutLabels = 0;
    inputs.forEach((input) => {
      const id = input.getAttribute('id');
      const ariaLabel = input.getAttribute('aria-label');
      const ariaLabelledby = input.getAttribute('aria-labelledby');
      const label = id ? doc.querySelector(`label[for="${id}"]`) : null;

      if (!label && !ariaLabel && !ariaLabelledby) {
        inputsWithoutLabels++;
      }
    });

    if (inputsWithoutLabels > 0) {
      issues.push({
        passed: false,
        message: `${inputsWithoutLabels} form inputs missing labels`,
      });
      failed++;
    } else if (inputs.length > 0) {
      passed++;
    }

    const total = passed + failed;
    const score = total > 0 ? Math.round((passed / total) * 100) : 100;

    return {
      summary: {
        total,
        passed,
        failed,
        score,
      },
      details: {
        images: [],
        headings: [],
        forms: [],
        keyboard: [],
        contrast: [],
      },
      issues,
    };
  };

  // Fallback basic SEO analysis when page can't be fetched
  const generateBasicSEOAnalysis = (route: AuditableRoute): SEOResults => {
    const issues: SEOIssue[] = [];
    let passed = 0;

    // We can't check actual content, but we can note what should be checked
    issues.push({
      test: 'Page Analysis',
      message: 'Unable to fetch page content for detailed analysis',
      severity: 'info',
    });

    // Basic validation based on route
    if (route.path && route.title) {
      passed += 2; // Assume basic structure is present
    }

    return {
      score: 50, // Neutral score when we can't analyze
      passed,
      failed: issues.length,
      issues,
    };
  };

  // Fallback basic A11y analysis
  const generateBasicA11yAnalysis = (): A11yResults => {
    return {
      summary: {
        total: 1,
        passed: 0,
        failed: 1,
        score: 0,
      },
      details: {
        images: [],
        headings: [],
        forms: [],
        keyboard: [],
        contrast: [],
      },
      issues: [
        {
          passed: false,
          message:
            'Unable to analyze accessibility - page content not accessible',
        },
      ],
    };
  };

  // Audit all pages
  const auditAllPages = async (): Promise<PageAuditResults[]> => {
    const routes = getAuditableRoutes();
    const results: PageAuditResults[] = [];

    // Process pages in batches to avoid overwhelming the browser
    const batchSize = 3;
    for (let i = 0; i < routes.length; i += batchSize) {
      const batch = routes.slice(i, i + batchSize);
      const batchResults = await Promise.all(
        batch.map((route) => auditSinglePage(route))
      );
      results.push(...batchResults);

      // Small delay between batches
      if (i + batchSize < routes.length) {
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }

    return results;
  };

  return {
    getAuditableRoutes,
    auditSinglePage,
    auditAllPages,
  };
};

// Export types
export type {
  PageAuditResults,
  AuditableRoute,
  SEOResults,
  A11yResults,
  PerformanceMetrics,
};
