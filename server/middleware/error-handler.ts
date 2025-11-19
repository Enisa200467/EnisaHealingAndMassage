/**
 * Global error handling middleware
 * Catches and formats all server errors consistently
 */
export default defineEventHandler(async (event) => {
  try {
    // Continue processing the request
    await Promise.resolve();
  } catch (error: any) {
    console.error('[Error Handler] Caught error:', error);

    // Handle Zod validation errors
    if (error.name === 'ZodError') {
      throw handleZodError(error);
    }

    // Handle rate limit errors (already formatted)
    if (error.statusCode === 429) {
      throw error;
    }

    // Handle H3 errors (already formatted by createApiError)
    if (error.statusCode) {
      throw error;
    }

    // Handle unknown errors
    throw ApiErrors.internalError('Er is een onverwachte fout opgetreden');
  }
});
