/**
 * Client-side sanitization composable
 *
 * IMPORTANT: This is NOT a security measure - it's just a convenience layer
 * to provide immediate feedback and catch accidental HTML/script injection.
 * All security validation MUST happen server-side.
 *
 * This adds defense-in-depth on top of server-side sanitization.
 */

/**
 * Strip HTML tags from input
 */
function stripHtmlTags(input: string): string {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '') // Remove style tags
    .replace(/<[^>]+>/g, '') // Remove all remaining tags
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

/**
 * Remove dangerous characters
 */
function removeDangerousChars(input: string): string {
  return input
    .replace(/\0/g, '') // Remove null bytes
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, ''); // Remove control characters
}

/**
 * Sanitize a single string value
 */
export function sanitizeString(input: string): string {
  if (!input || typeof input !== 'string') {
    return '';
  }

  let sanitized = stripHtmlTags(input);
  sanitized = removeDangerousChars(sanitized);

  return sanitized.trim();
}

/**
 * Sanitize an object's string values recursively
 */
export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  const sanitized = { ...obj };

  for (const key in sanitized) {
    const value = sanitized[key];

    if (typeof value === 'string') {
      sanitized[key] = sanitizeString(value) as any;
    } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      sanitized[key] = sanitizeObject(value);
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map((item: unknown) =>
        typeof item === 'string' ? sanitizeString(item) : item
      ) as any;
    }
  }

  return sanitized;
}

/**
 * Client-side sanitization composable
 */
export const useSanitize = () => {
  /**
   * Sanitize form data before submission
   *
   * @param data - Form data to sanitize
   * @returns Sanitized form data
   */
  const sanitizeFormData = <T extends Record<string, any>>(data: T): T => {
    return sanitizeObject(data);
  };

  /**
   * Check if input contains potentially dangerous content
   * Useful for showing warnings to users
   */
  const containsDangerousContent = (input: string): boolean => {
    const dangerousPatterns = [
      /<script/i,
      /<iframe/i,
      /javascript:/i,
      /on\w+\s*=/i, // Event handlers like onclick=
      /<embed/i,
      /<object/i,
    ];

    return dangerousPatterns.some((pattern) => pattern.test(input));
  };

  return {
    sanitizeString,
    sanitizeFormData,
    containsDangerousContent,
  };
};
