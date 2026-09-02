/**
 * Lightweight server-side sanitization utilities
 * Replaces isomorphic-dompurify to avoid jsdom/parse5 ESM issues on Vercel
 */

/**
 * Strip all HTML tags from a string
 */
function stripHtmlTags(input: string): string {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "") // Remove script tags first
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "") // Remove style tags
    .replace(/<[^>]+>/g, "") // Remove all remaining tags
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function removeControlCharacters(input: string): string {
  return [...input]
    .filter((character) => {
      const code = character.charCodeAt(0);
      return (
        code === 9 || code === 10 || code === 13 || (code >= 32 && code !== 127)
      );
    })
    .join("");
}

/**
 * Sanitize user input to prevent XSS attacks
 *
 * @param input - The string to sanitize
 * @param options - Sanitization options
 * @returns Sanitized string
 */
export function sanitizeInput(
  input: string,
  _options?: { allowHtml?: boolean },
): string {
  if (!input || typeof input !== "string") {
    return "";
  }

  // Strip all HTML tags by default
  let sanitized = stripHtmlTags(input);

  // Remove null bytes and other dangerous characters
  sanitized = removeControlCharacters(sanitized);

  return sanitized.trim();
}

/**
 * Sanitize an object's string values recursively
 *
 * @param obj - Object with values to sanitize
 * @returns Object with sanitized values
 */
export function sanitizeObject<T extends object>(obj: T): T {
  const sanitized = { ...obj };
  const record = sanitized as Record<string, unknown>;

  for (const key in record) {
    const value = record[key];

    if (typeof value === "string") {
      record[key] = sanitizeInput(value);
    } else if (
      typeof value === "object" &&
      value !== null &&
      !Array.isArray(value)
    ) {
      record[key] = sanitizeObject(value);
    } else if (Array.isArray(value)) {
      record[key] = value.map((item: unknown) =>
        typeof item === "string" ? sanitizeInput(item) : item,
      );
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
  if (!input || typeof input !== "string") {
    return "";
  }

  const allowedTags = ["b", "i", "em", "strong", "p", "br"];
  const tagPattern = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;

  // First, remove script and style tags completely
  let sanitized = input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "");

  // Remove event handlers and javascript: protocols
  sanitized = sanitized
    .replace(/\son\w+\s*=\s*["'][^"']*["']/gi, "")
    .replace(/\shref\s*=\s*["']javascript:[^"']*["']/gi, "");

  // Remove all tags except allowed ones, and strip all attributes
  sanitized = sanitized.replace(tagPattern, (match, tagName) => {
    const tag = tagName.toLowerCase();
    if (allowedTags.includes(tag)) {
      return match.includes("/") ? `</${tag}>` : `<${tag}>`;
    }
    return ""; // Remove non-allowed tags
  });

  // Remove null bytes and dangerous characters
  sanitized = removeControlCharacters(sanitized);

  return sanitized.trim();
}
