import DOMPurify from 'isomorphic-dompurify';

/**
 * Sanitize user input to prevent XSS attacks
 *
 * @param input - The string to sanitize
 * @param options - DOMPurify configuration options
 * @returns Sanitized string
 */
export function sanitizeInput(input: string, options?: DOMPurify.Config): string {
  if (!input || typeof input !== 'string') {
    return '';
  }

  // Default configuration: strip all HTML tags
  const defaultConfig: DOMPurify.Config = {
    ALLOWED_TAGS: [], // No HTML tags allowed by default
    ALLOWED_ATTR: [], // No attributes allowed
    KEEP_CONTENT: true, // Keep text content, strip tags
  };

  const config = { ...defaultConfig, ...options };

  return DOMPurify.sanitize(input, config).trim();
}

/**
 * Sanitize an object's string values recursively
 *
 * @param obj - Object with values to sanitize
 * @returns Object with sanitized values
 */
export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  const sanitized = { ...obj };

  for (const key in sanitized) {
    const value = sanitized[key];

    if (typeof value === 'string') {
      sanitized[key] = sanitizeInput(value) as any;
    } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      sanitized[key] = sanitizeObject(value);
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map((item) =>
        typeof item === 'string' ? sanitizeInput(item) : item
      ) as any;
    }
  }

  return sanitized;
}

/**
 * Sanitize HTML content but allow safe formatting tags
 * Useful for rich text content like reviews
 *
 * @param input - HTML string to sanitize
 * @returns Sanitized HTML string with safe tags preserved
 */
export function sanitizeHtml(input: string): string {
  if (!input || typeof input !== 'string') {
    return '';
  }

  const config: DOMPurify.Config = {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br'],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true,
  };

  return DOMPurify.sanitize(input, config).trim();
}
