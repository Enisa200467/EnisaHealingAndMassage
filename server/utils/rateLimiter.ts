import type { H3Event } from 'h3';

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
  message?: string;
}

interface RateLimitStore {
  count: number;
  resetTime: number;
}

// In-memory store for rate limiting
// For production with multiple instances, consider Redis
const rateLimitStore = new Map<string, RateLimitStore>();

/**
 * Simple in-memory rate limiter for API endpoints
 *
 * @param event - H3Event from Nuxt
 * @param config - Rate limit configuration
 * @returns true if request is allowed, throws error if rate limit exceeded
 */
export function checkRateLimit(event: H3Event, config: RateLimitConfig): boolean {
  // Get client IP address
  const ip = getRequestIP(event, { xForwardedFor: true }) || 'unknown';

  const now = Date.now();
  const key = `${ip}`;

  // Get or create rate limit entry
  let limitEntry = rateLimitStore.get(key);

  // Clean up expired entries periodically (every 100 requests)
  if (Math.random() < 0.01) {
    cleanupExpiredEntries();
  }

  // If no entry or window expired, create new entry
  if (!limitEntry || now > limitEntry.resetTime) {
    limitEntry = {
      count: 1,
      resetTime: now + config.windowMs,
    };
    rateLimitStore.set(key, limitEntry);
    return true;
  }

  // Increment request count
  limitEntry.count++;

  // Check if limit exceeded
  if (limitEntry.count > config.maxRequests) {
    const resetIn = Math.ceil((limitEntry.resetTime - now) / 1000 / 60); // minutes
    throw createError({
      statusCode: 429,
      statusMessage: 'Too Many Requests',
      data: {
        message: config.message || `Te veel verzoeken. Probeer het over ${resetIn} ${resetIn === 1 ? 'minuut' : 'minuten'} opnieuw.`,
        retryAfter: Math.ceil((limitEntry.resetTime - now) / 1000),
      },
    });
  }

  return true;
}

/**
 * Clean up expired entries from the rate limit store
 */
function cleanupExpiredEntries(): void {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}

/**
 * Predefined rate limit configurations
 */
export const rateLimitPresets = {
  // Contact form: 5 requests per hour
  contactForm: {
    maxRequests: 5,
    windowMs: 60 * 60 * 1000, // 1 hour
    message: 'Je hebt te veel contactformulieren verzonden. Probeer het over een uur opnieuw.',
  },

  // Review submission: 3 reviews per day
  reviewSubmission: {
    maxRequests: 3,
    windowMs: 24 * 60 * 60 * 1000, // 24 hours
    message: 'Je hebt het maximum aantal reviews voor vandaag bereikt. Probeer het morgen opnieuw.',
  },

  // Admin endpoints: 100 requests per hour
  adminEndpoint: {
    maxRequests: 100,
    windowMs: 60 * 60 * 1000, // 1 hour
    message: 'Te veel verzoeken naar het admin paneel. Probeer het later opnieuw.',
  },
};
