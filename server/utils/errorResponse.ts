import type { H3Error } from 'h3';

/**
 * Standardized error response format
 */
export interface ApiErrorResponse {
  success: false;
  error: {
    message: string;
    statusCode: number;
    code?: string;
    details?: any;
    timestamp: string;
  };
}

/**
 * Standardized success response format
 */
export interface ApiSuccessResponse<T = any> {
  success: true;
  data: T;
  message?: string;
  timestamp: string;
}

/**
 * Create a standardized error response
 *
 * @param statusCode - HTTP status code
 * @param message - User-friendly error message in Dutch
 * @param code - Optional error code for client-side handling
 * @param details - Optional additional error details
 */
export function createApiError(
  statusCode: number,
  message: string,
  code?: string,
  details?: any
): H3Error {
  return createError({
    statusCode,
    statusMessage: message,
    data: {
      success: false,
      error: {
        message,
        statusCode,
        code,
        details,
        timestamp: new Date().toISOString(),
      },
    } as ApiErrorResponse,
  });
}

/**
 * Create a standardized success response
 *
 * @param data - Response data
 * @param message - Optional success message
 */
export function createApiSuccess<T>(
  data: T,
  message?: string
): ApiSuccessResponse<T> {
  return {
    success: true,
    data,
    message,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Common API error responses
 */
export const ApiErrors = {
  // 400 Bad Request
  badRequest: (message = 'Ongeldige aanvraag', details?: any) =>
    createApiError(400, message, 'BAD_REQUEST', details),

  validationError: (details: any) =>
    createApiError(
      400,
      'Validatiefout: controleer de ingevoerde gegevens',
      'VALIDATION_ERROR',
      details
    ),

  // 401 Unauthorized
  unauthorized: (message = 'Authenticatie vereist') =>
    createApiError(401, message, 'UNAUTHORIZED'),

  invalidCredentials: () =>
    createApiError(
      401,
      'Ongeldige inloggegevens',
      'INVALID_CREDENTIALS'
    ),

  sessionExpired: () =>
    createApiError(
      401,
      'Je sessie is verlopen. Log opnieuw in.',
      'SESSION_EXPIRED'
    ),

  // 403 Forbidden
  forbidden: (message = 'Geen toegang tot deze bron') =>
    createApiError(403, message, 'FORBIDDEN'),

  // 404 Not Found
  notFound: (resource = 'Bron') =>
    createApiError(404, `${resource} niet gevonden`, 'NOT_FOUND'),

  // 405 Method Not Allowed
  methodNotAllowed: () =>
    createApiError(405, 'HTTP methode niet toegestaan', 'METHOD_NOT_ALLOWED'),

  // 429 Too Many Requests
  rateLimitExceeded: (retryAfter?: number) =>
    createApiError(
      429,
      'Te veel verzoeken. Probeer het later opnieuw.',
      'RATE_LIMIT_EXCEEDED',
      { retryAfter }
    ),

  // 500 Internal Server Error
  internalError: (message = 'Er is een serverfout opgetreden') =>
    createApiError(500, message, 'INTERNAL_ERROR'),

  databaseError: () =>
    createApiError(
      500,
      'Databasefout. Probeer het later opnieuw.',
      'DATABASE_ERROR'
    ),

  // 503 Service Unavailable
  serviceUnavailable: (message = 'Service tijdelijk niet beschikbaar') =>
    createApiError(503, message, 'SERVICE_UNAVAILABLE'),
};

/**
 * Handle Zod validation errors
 */
export function handleZodError(error: any): H3Error {
  const validationErrors = error.issues.map((issue: any) => ({
    field: issue.path.join('.'),
    message: issue.message,
  }));

  return createApiError(
    400,
    'Validatiefout: controleer de ingevoerde gegevens',
    'VALIDATION_ERROR',
    validationErrors
  );
}
