/**
 * Rate limiting middleware for admin endpoints
 * Applies to all /api/admin/* routes
 */
export default defineEventHandler((event) => {
  const path = getRequestURL(event).pathname;

  // Only apply to admin API routes
  if (path.startsWith('/api/admin/')) {
    // Apply rate limiting: 100 requests per hour per IP
    checkRateLimit(event, rateLimitPresets.adminEndpoint);
  }
});
