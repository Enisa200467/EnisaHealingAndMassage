/**
 * Accessibility Testing and Validation Utilities
 */

interface A11yTestResult {
  passed: boolean;
  message: string;
  element?: string;
}

export const useA11yValidator = () => {
  /**
   * Check if an image has proper alt text
   */
  const validateImageAlt = (
    images: NodeListOf<HTMLImageElement>
  ): A11yTestResult[] => {
    const results: A11yTestResult[] = [];

    images.forEach((img, index) => {
      if (!img.alt || img.alt.trim() === '') {
        results.push({
          passed: false,
          message: `Image ${index + 1} is missing alt text`,
          element: img.src || img.outerHTML.substring(0, 100),
        });
      } else if (img.alt.length > 125) {
        results.push({
          passed: false,
          message: `Image ${index + 1} has alt text that may be too long (${
            img.alt.length
          } chars)`,
          element: img.src || img.outerHTML.substring(0, 100),
        });
      } else {
        results.push({
          passed: true,
          message: `Image ${index + 1} has proper alt text`,
        });
      }
    });

    return results;
  };

  /**
   * Check heading hierarchy
   */
  const validateHeadingHierarchy = (): A11yTestResult[] => {
    const results: A11yTestResult[] = [];
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let previousLevel = 0;

    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1));

      if (index === 0 && level !== 1) {
        results.push({
          passed: false,
          message: `First heading should be h1, but found ${heading.tagName}`,
          element: heading.textContent?.substring(0, 50) || '',
        });
      } else if (level > previousLevel + 1) {
        results.push({
          passed: false,
          message: `Heading level skipped: ${heading.tagName} follows h${previousLevel}`,
          element: heading.textContent?.substring(0, 50) || '',
        });
      } else {
        results.push({
          passed: true,
          message: `Heading ${index + 1} (${
            heading.tagName
          }) is properly structured`,
        });
      }

      previousLevel = level;
    });

    return results;
  };

  /**
   * Check for proper form labels
   */
  const validateFormLabels = (): A11yTestResult[] => {
    const results: A11yTestResult[] = [];
    const inputs = document.querySelectorAll('input, select, textarea');

    inputs.forEach((input, index) => {
      const id = input.getAttribute('id');
      const ariaLabel = input.getAttribute('aria-label');
      const ariaLabelledBy = input.getAttribute('aria-labelledby');
      const label = id ? document.querySelector(`label[for="${id}"]`) : null;

      if (!label && !ariaLabel && !ariaLabelledBy) {
        results.push({
          passed: false,
          message: `Form input ${index + 1} has no associated label`,
          element: input.outerHTML.substring(0, 100),
        });
      } else {
        results.push({
          passed: true,
          message: `Form input ${index + 1} has proper labeling`,
        });
      }
    });

    return results;
  };

  /**
   * Check for keyboard accessibility
   */
  const validateKeyboardAccess = (): A11yTestResult[] => {
    const results: A11yTestResult[] = [];
    const interactiveElements = document.querySelectorAll(
      'button, a, input, select, textarea, [tabindex]'
    );

    interactiveElements.forEach((element, index) => {
      const tabIndex = element.getAttribute('tabindex');

      if (tabIndex && parseInt(tabIndex) > 0) {
        results.push({
          passed: false,
          message: `Element ${
            index + 1
          } has positive tabindex (${tabIndex}), which can disrupt natural tab order`,
          element: element.tagName,
        });
      } else if (
        element.tagName === 'A' &&
        !element.getAttribute('href') &&
        !element.getAttribute('role')
      ) {
        results.push({
          passed: false,
          message: `Link ${index + 1} has no href and no role attribute`,
          element: element.textContent?.substring(0, 50) || '',
        });
      } else {
        results.push({
          passed: true,
          message: `Interactive element ${index + 1} is keyboard accessible`,
        });
      }
    });

    return results;
  };

  /**
   * Check color contrast (basic check - would need color analysis library for full implementation)
   */
  const validateColorContrast = (): A11yTestResult[] => {
    const results: A11yTestResult[] = [];

    // This is a simplified check - in a real implementation, you'd use a color contrast library
    const textElements = document.querySelectorAll(
      'p, span, div, h1, h2, h3, h4, h5, h6, a, button'
    );

    textElements.forEach((element, index) => {
      const styles = window.getComputedStyle(element);
      const fontSize = parseFloat(styles.fontSize);
      const fontWeight = styles.fontWeight;

      // Basic check for text size
      if (fontSize < 16 && (fontWeight === 'normal' || fontWeight === '400')) {
        results.push({
          passed: false,
          message: `Text element ${
            index + 1
          } may be too small (${fontSize}px) - consider 16px minimum`,
          element: element.textContent?.substring(0, 50) || '',
        });
      } else {
        results.push({
          passed: true,
          message: `Text element ${index + 1} has adequate size`,
        });
      }
    });

    return results;
  };

  /**
   * Run comprehensive accessibility audit
   */
  const runA11yAudit = () => {
    const images = document.querySelectorAll('img');

    return {
      images: validateImageAlt(images),
      headings: validateHeadingHierarchy(),
      forms: validateFormLabels(),
      keyboard: validateKeyboardAccess(),
      contrast: validateColorContrast(),
    };
  };

  /**
   * Generate accessibility report
   */
  const generateA11yReport = () => {
    const audit = runA11yAudit();
    const allResults = [
      ...audit.images,
      ...audit.headings,
      ...audit.forms,
      ...audit.keyboard,
      ...audit.contrast,
    ];

    const passed = allResults.filter((r) => r.passed).length;
    const failed = allResults.filter((r) => !r.passed).length;

    return {
      summary: {
        total: allResults.length,
        passed,
        failed,
        score: Math.round((passed / allResults.length) * 100),
      },
      details: audit,
      issues: allResults.filter((r) => !r.passed),
    };
  };

  return {
    validateImageAlt,
    validateHeadingHierarchy,
    validateFormLabels,
    validateKeyboardAccess,
    validateColorContrast,
    runA11yAudit,
    generateA11yReport,
  };
};
