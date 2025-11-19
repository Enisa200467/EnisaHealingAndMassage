# Error Handling & Monitoring

> Comprehensive guide to error handling, monitoring, and user feedback for Enisa Healing & Massage website

Last Updated: 2025-11-17

---

## Table of Contents

1. [Overview](#overview)
2. [Vercel Monitoring](#vercel-monitoring)
3. [Client-Side Error Handling](#client-side-error-handling)
4. [Server-Side Error Handling](#server-side-error-handling)
5. [Toast Notifications](#toast-notifications)
6. [API Error Standards](#api-error-standards)
7. [Best Practices](#best-practices)

---

## Overview

The error handling system provides:
- ✅ Standardized API error responses
- ✅ Global Vue error boundaries
- ✅ User-friendly toast notifications
- ✅ Vercel monitoring (Analytics + Speed Insights)
- ✅ Consistent error messaging in Dutch

---

## Vercel Monitoring

### Enabled Services (Free Tier)

#### 1. Speed Insights
**Purpose:** Monitor Core Web Vitals and page performance

**Location:** Automatically injected via `app.vue`

**Metrics Tracked:**
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- First Input Delay (FID)
- Time to First Byte (TTFB)

**Access:** View in [Vercel Dashboard](https://vercel.com/dashboard) → Your Project → Speed Insights

#### 2. Web Analytics
**Purpose:** Track page views and user behavior

**Location:** Injected in `app.vue` (production only)

**Features:**
- Page views
- User sessions
- Referrer tracking
- Device/browser analytics
- Privacy-friendly (no cookies)

**Access:** View in [Vercel Dashboard](https://vercel.com/dashboard) → Your Project → Analytics

### How to View Monitoring Data

1. Deploy to Vercel (production)
2. Navigate to Vercel Dashboard
3. Select your project
4. Check "Analytics" and "Speed Insights" tabs

**Note:** Analytics only track production traffic, not development.

---

## Client-Side Error Handling

### Global Error Handler

**Location:** `/app/plugins/errorHandler.client.ts`

Automatically catches:
- Vue component errors
- Unhandled promise rejections
- Runtime JavaScript errors

**Features:**
- Shows user-friendly toast notifications
- Logs errors to console
- Prevents default browser error handling
- Ready for integration with error tracking services (Sentry, etc.)

### Using the Error Handler

The `$handleError` utility is globally available:

```vue
<script setup>
const { $handleError } = useNuxtApp();

const doSomething = async () => {
  try {
    // Your code here
  } catch (error) {
    $handleError(error, 'het laden van gegevens');
  }
};
</script>
```

### Vue Error Boundaries

Error boundaries are automatically configured. Errors in Vue components will:
1. Log to console
2. Show toast notification
3. Prevent app crash
4. Allow graceful degradation

---

## Server-Side Error Handling

### Standardized Error Responses

**Location:** `/server/utils/errorResponse.ts`

All API errors follow this format:

```typescript
{
  success: false,
  error: {
    message: "User-friendly message in Dutch",
    statusCode: 400,
    code: "VALIDATION_ERROR",
    details: { /* Optional additional info */ },
    timestamp: "2025-11-17T10:30:00.000Z"
  }
}
```

### Available Error Helpers

```typescript
import { ApiErrors } from '~/server/utils/errorResponse';

// 400 Bad Request
throw ApiErrors.badRequest('Custom message');
throw ApiErrors.validationError(validationDetails);

// 401 Unauthorized
throw ApiErrors.unauthorized();
throw ApiErrors.invalidCredentials();
throw ApiErrors.sessionExpired();

// 403 Forbidden
throw ApiErrors.forbidden();

// 404 Not Found
throw ApiErrors.notFound('Behandeling');

// 405 Method Not Allowed
throw ApiErrors.methodNotAllowed();

// 429 Too Many Requests
throw ApiErrors.rateLimitExceeded(retryAfter);

// 500 Internal Server Error
throw ApiErrors.internalError();
throw ApiErrors.databaseError();

// 503 Service Unavailable
throw ApiErrors.serviceUnavailable();
```

### Standardized Success Responses

All successful API responses follow this format:

```typescript
{
  success: true,
  data: { /* Your response data */ },
  message: "Optional success message",
  timestamp: "2025-11-17T10:30:00.000Z"
}
```

**Usage:**

```typescript
import { createApiSuccess } from '~/server/utils/errorResponse';

return createApiSuccess(
  { emailId: '123' },
  'Bericht succesvol verzonden!'
);
```

### Error Handling Middleware

**Location:** `/server/middleware/error-handler.ts`

Automatically catches and formats all server errors, including:
- Zod validation errors → `VALIDATION_ERROR`
- Rate limit errors → `RATE_LIMIT_EXCEEDED`
- Unknown errors → `INTERNAL_ERROR`

---

## Toast Notifications

### Using the `useApiCall` Composable

**Location:** `/app/composables/useApiCall.ts`

This composable provides automatic error handling and toast notifications:

```vue
<script setup>
const { execute, loading, error, data } = useApiCall();

const submitForm = async () => {
  await execute('/api/contact', {
    method: 'POST',
    body: formData,
    successMessage: 'Formulier succesvol verzonden!',
    errorMessage: 'Kon formulier niet verzenden',
    showSuccessToast: true,  // default
    showErrorToast: true,    // default
    onSuccess: (data) => {
      // Custom success handler
    },
    onError: (error) => {
      // Custom error handler
    },
  });
};
</script>

<template>
  <UButton @click="submitForm" :loading="loading">
    Verzenden
  </UButton>
</template>
```

### Manual Toast Notifications

```vue
<script setup>
const toast = useToast();

toast.add({
  title: 'Gelukt!',
  description: 'Je bericht is verzonden',
  color: 'green',
  icon: 'i-heroicons-check-circle',
  timeout: 5000,
});

toast.add({
  title: 'Fout',
  description: 'Er ging iets mis',
  color: 'red',
  icon: 'i-heroicons-exclamation-triangle',
  timeout: 7000,
});
</script>
```

### Toast Colors

- **green**: Success messages
- **red**: Error messages
- **yellow**: Warning messages
- **blue**: Info messages

---

## API Error Standards

### Example: Contact Form Endpoint

**Before:**
```typescript
throw createError({
  statusCode: 500,
  statusMessage: 'Failed to send email',
});
```

**After:**
```typescript
throw ApiErrors.serviceUnavailable(
  'Kon e-mail niet verzenden. Probeer het later opnieuw.'
);
```

### Handling Validation Errors

Zod validation errors are automatically formatted:

```typescript
import { handleZodError } from '~/server/utils/errorResponse';

try {
  const validatedData = contactFormSchema.parse(body);
} catch (error) {
  if (error instanceof z.ZodError) {
    throw handleZodError(error);
  }
}
```

---

## Best Practices

### 1. Always Use Dutch Error Messages

✅ **Good:**
```typescript
throw ApiErrors.badRequest('Ongeldige gegevens ingevoerd');
```

❌ **Bad:**
```typescript
throw ApiErrors.badRequest('Invalid data provided');
```

### 2. Provide Context in Error Messages

✅ **Good:**
```typescript
throw ApiErrors.serviceUnavailable(
  'E-mailservice is tijdelijk niet beschikbaar. Probeer het over 5 minuten opnieuw.'
);
```

❌ **Bad:**
```typescript
throw ApiErrors.serviceUnavailable();
```

### 3. Use Error Codes for Client-Side Handling

```typescript
// Server
throw createApiError(400, 'Te veel pogingen', 'TOO_MANY_ATTEMPTS');

// Client
if (error.data?.error?.code === 'TOO_MANY_ATTEMPTS') {
  // Show specific UI
}
```

### 4. Log Errors Appropriately

```typescript
// Development: Verbose logging
console.error('Full error details:', error);

// Production: Minimal logging + send to monitoring service
if (process.env.NODE_ENV === 'production') {
  // Send to Sentry/LogRocket
}
```

### 5. Test Error Scenarios

Always test:
- ✅ Validation errors (400)
- ✅ Authentication errors (401)
- ✅ Rate limiting (429)
- ✅ Server errors (500)
- ✅ Network failures

---

## Error Response Examples

### Validation Error (400)

```json
{
  "success": false,
  "error": {
    "message": "Validatiefout: controleer de ingevoerde gegevens",
    "statusCode": 400,
    "code": "VALIDATION_ERROR",
    "details": [
      {
        "field": "email",
        "message": "Voer een geldig e-mailadres in"
      }
    ],
    "timestamp": "2025-11-17T10:30:00.000Z"
  }
}
```

### Rate Limit Error (429)

```json
{
  "success": false,
  "error": {
    "message": "Te veel verzoeken. Probeer het over 45 minuten opnieuw.",
    "statusCode": 429,
    "code": "RATE_LIMIT_EXCEEDED",
    "details": {
      "retryAfter": 2700
    },
    "timestamp": "2025-11-17T10:30:00.000Z"
  }
}
```

### Success Response

```json
{
  "success": true,
  "data": {
    "emailId": "re_abc123"
  },
  "message": "Bedankt voor je bericht! We nemen zo snel mogelijk contact met je op.",
  "timestamp": "2025-11-17T10:30:00.000Z"
}
```

---

## Migration Guide

### Updating Existing Endpoints

**Step 1:** Import error utilities
```typescript
import { ApiErrors, createApiSuccess, handleZodError } from '~/server/utils/errorResponse';
```

**Step 2:** Replace error throwing
```typescript
// Before
throw createError({ statusCode: 400, statusMessage: 'Bad request' });

// After
throw ApiErrors.badRequest('Ongeldige aanvraag');
```

**Step 3:** Standardize success responses
```typescript
// Before
return { success: true, message: 'Done!' };

// After
return createApiSuccess({ id: '123' }, 'Succesvol opgeslagen!');
```

**Step 4:** Handle Zod errors
```typescript
// Before
if (error instanceof z.ZodError) {
  throw createError({ statusCode: 400, data: error.issues });
}

// After
if (error instanceof z.ZodError) {
  throw handleZodError(error);
}
```

---

## Future Enhancements

Consider adding when needed:
- [ ] Sentry integration for production error tracking
- [ ] Custom error pages for specific error codes
- [ ] Error analytics dashboard
- [ ] Retry logic for transient failures
- [ ] Offline error queueing

---

*Last Updated: 2025-11-17*
*Maintained by: Development Team*
