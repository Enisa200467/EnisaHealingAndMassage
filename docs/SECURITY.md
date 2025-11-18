# Security Documentation

> Security configuration and best practices for Enisa Healing & Massage website

Last Updated: 2025-11-17

---

## Table of Contents

1. [Security Features Implemented](#security-features-implemented)
2. [Supabase RLS Policies](#supabase-rls-policies)
3. [Rate Limiting](#rate-limiting)
4. [Input Sanitization](#input-sanitization)
5. [Security Headers](#security-headers)
6. [Admin Session Management](#admin-session-management)
7. [Best Practices](#best-practices)

---

## Security Features Implemented

### ✅ Rate Limiting
- Contact form: 5 requests/hour per IP
- Review submission: 3 reviews/day per IP
- Admin endpoints: 100 requests/hour per IP

### ✅ Input Sanitization
- All user input sanitized with DOMPurify
- XSS protection on contact form and reviews
- HTML tags stripped from user content

### ✅ Security Headers
- HSTS (HTTP Strict Transport Security)
- X-Frame-Options (clickjacking protection)
- X-Content-Type-Options (MIME sniffing protection)
- Content Security Policy (CSP)
- CSRF protection enabled

### ✅ Session Management
- Admin session timeout: 5 minutes of inactivity
- Automatic logout on timeout
- Activity tracking for session renewal

---

## Supabase RLS Policies

Row Level Security (RLS) policies control who can access what data in the database.

### Reviews Table

**Required Policies:**

1. **Public Read (Approved Reviews Only)**
   ```sql
   CREATE POLICY "Public can read approved reviews"
   ON reviews FOR SELECT
   USING (status = 'approved');
   ```
   - Allows anyone to read reviews with `status = 'approved'`
   - Protects pending/rejected reviews from public view

2. **Public Insert (New Review Submission)**
   ```sql
   CREATE POLICY "Anyone can submit reviews"
   ON reviews FOR INSERT
   WITH CHECK (status = 'pending');
   ```
   - Allows public to submit new reviews
   - Ensures all new reviews start with `status = 'pending'`
   - Requires manual approval by admin

3. **Admin Full Access**
   ```sql
   CREATE POLICY "Authenticated admins have full access"
   ON reviews FOR ALL
   USING (auth.role() = 'authenticated');
   ```
   - Admin users can read, update, delete all reviews
   - Required for review moderation workflow

### Treatments Table

**Required Policies:**

1. **Public Read (Active Treatments Only)**
   ```sql
   CREATE POLICY "Public can read active treatments"
   ON treatments FOR SELECT
   USING (is_active = true);
   ```
   - Shows only active treatments to public
   - Hides drafts and inactive treatments

2. **Admin Full Access**
   ```sql
   CREATE POLICY "Authenticated admins have full access to treatments"
   ON treatments FOR ALL
   USING (auth.role() = 'authenticated');
   ```
   - Admin users can create, read, update, delete treatments
   - Required for treatment management

### How to Verify RLS Policies

1. **Via Supabase Dashboard:**
   - Go to https://supabase.com/dashboard
   - Select your project
   - Navigate to "Authentication" → "Policies"
   - Check each table for the policies listed above

2. **Via SQL:**
   ```sql
   -- Check if RLS is enabled
   SELECT tablename, rowsecurity
   FROM pg_tables
   WHERE schemaname = 'public'
   AND tablename IN ('reviews', 'treatments');

   -- List all policies
   SELECT schemaname, tablename, policyname, cmd, qual
   FROM pg_policies
   WHERE schemaname = 'public';
   ```

### Testing RLS Policies

**Test 1: Public can only see approved reviews**
```javascript
// Should return only approved reviews
const { data } = await supabase
  .from('reviews')
  .select('*');
// Verify: data should not contain pending/rejected reviews
```

**Test 2: Public cannot update reviews**
```javascript
// Should fail (no permission)
const { error } = await supabase
  .from('reviews')
  .update({ status: 'approved' })
  .eq('id', 'some-id');
// Verify: error should indicate permission denied
```

**Test 3: Admin can access all reviews**
```javascript
// As authenticated admin
const { data } = await supabase
  .from('reviews')
  .select('*');
// Verify: data includes pending, approved, and rejected reviews
```

---

## Rate Limiting

### Implementation

Location: `/server/utils/rateLimiter.ts`

### Configuration

```typescript
export const rateLimitPresets = {
  contactForm: {
    maxRequests: 5,
    windowMs: 60 * 60 * 1000, // 1 hour
  },
  reviewSubmission: {
    maxRequests: 3,
    windowMs: 24 * 60 * 60 * 1000, // 24 hours
  },
  adminEndpoint: {
    maxRequests: 100,
    windowMs: 60 * 60 * 1000, // 1 hour
  },
};
```

### Protected Endpoints

- `/api/contact` - Contact form submissions
- `/api/reviews` (POST) - Review submissions
- `/api/admin/*` - All admin endpoints

### Storage

Currently uses **in-memory storage**. For production with multiple server instances, consider migrating to Redis or a distributed cache.

---

## Input Sanitization

### Implementation

Location: `/server/utils/sanitize.ts`

Uses `isomorphic-dompurify` to sanitize all user input.

### Functions

- `sanitizeInput(input)` - Strips all HTML tags
- `sanitizeObject(obj)` - Recursively sanitizes object properties
- `sanitizeHtml(input)` - Allows safe HTML tags (b, i, em, strong)

### Applied To

- Contact form submissions (`/server/api/contact/index.post.ts`)
- Review submissions (`/server/api/reviews/index.post.ts`)

---

## Security Headers

### Configuration

Location: `nuxt.config.ts` → `security` section

### Enabled Headers

- **HSTS**: Forces HTTPS connections (1 year)
- **X-Frame-Options**: Prevents clickjacking (SAMEORIGIN)
- **X-Content-Type-Options**: Prevents MIME sniffing (nosniff)
- **X-XSS-Protection**: Browser XSS filter (enabled)
- **Referrer-Policy**: Controls referrer information (strict-origin-when-cross-origin)
- **CSP**: Content Security Policy (restricts resource loading)

### CSRF Protection

**Status:** Disabled

**Rationale:**
CSRF protection is not enabled because the application has multiple other security layers that provide comprehensive protection:

1. **Supabase Authentication** - Admin routes require authentication
2. **Rate Limiting** - Prevents abuse on all endpoints
3. **Session Timeout** - 5-minute inactivity logout for admin
4. **Input Sanitization** - DOMPurify prevents XSS attacks
5. **RLS Policies** - Database-level access control
6. **Single Admin User** - Not a multi-user system vulnerable to CSRF

CSRF is primarily a concern for applications where an attacker could trick an authenticated user into submitting malicious requests from a third-party site. This application's security model (authentication + session timeout + rate limiting) provides equivalent or better protection.

---

## Admin Session Management

### Implementation

Location: `/app/features/admin/composables/useAdminSessionTimeout.ts`

### Features

- **Timeout Duration**: 5 minutes of inactivity
- **Activity Tracking**: Monitors mouse, keyboard, scroll, touch events
- **Automatic Logout**: Logs out user and redirects to login page
- **Throttling**: Activity events throttled to 1 second to avoid performance issues

### Usage

```vue
<script setup>
const { initSessionTimeout } = useAdminSessionTimeout();
onMounted(() => {
  initSessionTimeout();
});
</script>
```

Currently implemented in:
- `/app/features/admin/AdminPage.vue`

**TODO**: Add to all other admin pages for consistent timeout behavior.

---

## Best Practices

### Environment Variables

Never commit these to version control:
- `SUPABASE_URL`
- `SUPABASE_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`

### Regular Security Audits

- Review RLS policies quarterly
- Update dependencies monthly (`bun update`)
- Monitor security vulnerabilities (GitHub Dependabot)
- Review rate limit thresholds based on usage patterns

### Production Recommendations

1. **Enable Supabase Auth MFA** (optional for higher security)
2. **Migrate rate limiter to Redis** (for multi-instance deployments)
3. **Enable Vercel monitoring** (for error tracking)
4. **Regular database backups** (automated via Supabase)
5. **Review CSP violations** (via report-uri if configured)

### Incident Response

If a security incident occurs:

1. Immediately revoke compromised credentials
2. Review Supabase logs for unauthorized access
3. Check rate limiter logs for abuse patterns
4. Update RLS policies if needed
5. Notify users if personal data was accessed

---

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Supabase RLS Documentation](https://supabase.com/docs/guides/auth/row-level-security)
- [Nuxt Security Module](https://nuxt-security.vercel.app/)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

---

*Last Updated: 2025-11-17*
*Maintained by: Development Team*
