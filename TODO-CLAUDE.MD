# TODO-CLAUDE.MD

> **Comprehensive Improvement Plan for Enisa Healing & Massage Website**
>
> Generated: 2025-11-15
>
> This document outlines actionable improvements organized by priority and category.

---

## 📊 Codebase Analysis Summary

**Project Stats:**
- ~13,800 lines of code
- 9 feature modules
- 14 API endpoints
- 3 treatment content files
- 0 test files ⚠️
- 32 console.log statements (should be replaced with proper logging)
- 5 TODO comments in code

**Architecture Strengths:**
✅ Feature-based architecture
✅ TypeScript type safety with Supabase
✅ Mobile-first design approach
✅ Comprehensive SEO implementation with structured data
✅ Accessibility validation tools
✅ Auto-imports for composables and components

**Key Gaps:**
❌ No automated testing
❌ No error monitoring/logging service
❌ No CI/CD pipeline
❌ Limited error handling patterns
❌ Missing rate limiting and security hardening
❌ No caching strategy

---

## 🎯 Priority Matrix

### 🔴 P0 - Critical (Do First)

These items address security, reliability, and production-readiness.

#### 1. Testing Infrastructure
**Current State:** Zero test coverage
**Impact:** High risk of regressions, production bugs

**Tasks:**
- [ ] Set up Vitest for unit tests
- [ ] Add @vue/test-utils for component testing
- [ ] Create test utilities and fixtures
- [ ] Add tests for critical composables:
  - [ ] `useAdminTreatments.ts` (CRUD operations)
  - [ ] `useAdminReviews.ts` (review management)
  - [ ] `useContact.ts` (form validation)
  - [ ] `useBooking.ts` (booking logic)
- [ ] Add API endpoint tests:
  - [ ] Contact form submission
  - [ ] Treatment CRUD operations
  - [ ] Review approval workflow
- [ ] Set up E2E testing with Playwright
- [ ] Add CI test automation
- [ ] Target: 70%+ code coverage

**Files to prioritize:**
- `app/features/admin/composables/useAdminTreatments.ts`
- `server/api/contact/index.post.ts`
- `server/api/admin/treatments/*.ts`

---

#### 2. Security Hardening
**Current State:** Basic validation, no rate limiting
**Impact:** Vulnerable to abuse, spam, DDoS

**Tasks:**
- [ ] **Rate Limiting**
  - [ ] Add Nuxt rate limiter module or custom middleware
  - [ ] Protect contact form endpoint (max 5 requests/hour/IP)
  - [ ] Protect admin endpoints (max 100 requests/hour)
  - [ ] Protect review submission (max 3 reviews/day/IP)

- [ ] **Input Sanitization**
  - [ ] Add DOMPurify for HTML sanitization
  - [ ] Sanitize user input before database insertion
  - [ ] Add XSS protection headers

- [ ] **CSRF Protection**
  - [ ] Enable CSRF tokens for form submissions
  - [ ] Add SameSite cookie attributes

- [ ] **Admin Security**
  - [ ] Add MFA/2FA for admin login
  - [ ] Implement session timeout (30 minutes)
  - [ ] Add admin action audit logging
  - [ ] Review RLS policies in Supabase

- [ ] **Headers & CSP**
  - [ ] Configure security headers (nuxt-security module)
  - [ ] Add Content Security Policy
  - [ ] Enable HSTS, X-Frame-Options, X-Content-Type-Options

- [ ] **Environment Variables**
  - [ ] Create `.env.example` with placeholder values
  - [ ] Document all required environment variables
  - [ ] Add runtime validation for critical env vars
  - [ ] Rotate Supabase service role key (currently in codebase)

**Reference:** OWASP Top 10 2023

---

#### 3. Error Handling & Logging
**Current State:** 32 console.log statements, no centralized error tracking
**Impact:** Poor debugging, no production visibility

**Tasks:**
- [ ] **Logging Service**
  - [ ] Replace all `console.log` with structured logging
  - [ ] Add Pino or Winston logger
  - [ ] Implement log levels (error, warn, info, debug)
  - [ ] Add request ID tracking

- [ ] **Error Monitoring**
  - [ ] Integrate Sentry or similar service
  - [ ] Configure error boundaries in Vue components
  - [ ] Add source maps for production debugging
  - [ ] Set up error alerting (email/Slack)

- [ ] **API Error Handling**
  - [ ] Standardize error response format
  - [ ] Add proper HTTP status codes
  - [ ] Create error handling middleware
  - [ ] Add retry logic for transient failures

- [ ] **User-Facing Errors**
  - [ ] Create error page components (404, 500, etc.)
  - [ ] Add user-friendly error messages (Dutch)
  - [ ] Implement toast notifications for errors

**Files to update:**
- All files with `console.log/error/warn`
- `server/api/**/*.ts`
- `app/features/*/composables/*.ts`

---

#### 4. Environment & Configuration Management
**Current State:** No `.env.example`, unclear setup requirements
**Impact:** Difficult onboarding, configuration errors

**Tasks:**
- [ ] Create `.env.example` with all required variables
- [ ] Document environment-specific configurations
- [ ] Add runtime config validation (zod)
- [ ] Create environment setup guide
- [ ] Add config validation on startup
- [ ] Document Supabase setup steps
- [ ] Document Resend email setup
- [ ] Add local development seed data script

---

### 🟡 P1 - High Priority (Do Soon)

These items improve performance, code quality, and developer experience.

#### 5. Performance Optimization
**Current State:** Basic optimization, no caching, no monitoring
**Impact:** Slower page loads, higher server costs

**Tasks:**
- [ ] **Caching Strategy**
  - [ ] Add Redis or in-memory cache for API responses
  - [ ] Cache treatment list (invalidate on update)
  - [ ] Cache approved reviews (5-minute TTL)
  - [ ] Add HTTP cache headers
  - [ ] Implement stale-while-revalidate pattern

- [ ] **Image Optimization**
  - [ ] Audit all image sizes (use next-gen formats)
  - [ ] Add responsive image srcsets
  - [ ] Implement lazy loading for below-fold images
  - [ ] Add image CDN (Cloudinary/Cloudflare)
  - [ ] Compress all public images

- [ ] **Bundle Optimization**
  - [ ] Analyze bundle size (use nuxt analyze)
  - [ ] Enable tree-shaking for unused imports
  - [ ] Split vendor chunks appropriately
  - [ ] Add preloading for critical resources
  - [ ] Defer non-critical JavaScript

- [ ] **Database Optimization**
  - [ ] Add indexes for frequently queried fields
  - [ ] Review and optimize Supabase queries
  - [ ] Implement connection pooling
  - [ ] Add query performance monitoring

- [ ] **Performance Monitoring**
  - [ ] Add Web Vitals tracking
  - [ ] Integrate Google Lighthouse CI
  - [ ] Set performance budgets
  - [ ] Monitor API response times
  - [ ] Target: <2s initial load, >90 Lighthouse score

---

#### 6. Code Quality & Standards
**Current State:** Good TypeScript usage, some inconsistencies
**Impact:** Maintainability, onboarding speed

**Tasks:**
- [ ] **Code Standards**
  - [ ] Set up Prettier configuration
  - [ ] Configure ESLint rules (already partially set up)
  - [ ] Add commit hooks with Husky
  - [ ] Add lint-staged for pre-commit checks
  - [ ] Document coding conventions

- [ ] **TypeScript Improvements**
  - [ ] Enable strict mode in tsconfig.json
  - [ ] Add stricter type checking rules
  - [ ] Remove any `any` types
  - [ ] Create shared type definitions file
  - [ ] Add JSDoc comments for complex functions

- [ ] **Resolve TODOs**
  - [ ] `server/api/contact/index.post.ts:90` - Configure Resend domain
  - [ ] `app/composables/useTreatmentData.ts:28,57,81` - Remove or implement
  - [ ] `app/features/admin/AdminTreatmentsPage.vue:142` - Add auth guard
  - [ ] Review and resolve all remaining TODO comments

- [ ] **Code Organization**
  - [ ] Create shared constants file
  - [ ] Extract magic numbers to named constants
  - [ ] Consolidate duplicate logic
  - [ ] Create composable for common patterns

- [ ] **Component Improvements**
  - [ ] Add prop validation with runtime checks
  - [ ] Document component props with JSDoc
  - [ ] Create component usage examples
  - [ ] Extract repeated UI patterns into shared components

---

#### 7. API Enhancements
**Current State:** Basic CRUD, no pagination or filtering
**Impact:** Scalability issues, poor UX for large datasets

**Tasks:**
- [ ] **Pagination**
  - [ ] Add pagination to treatments list
  - [ ] Add pagination to reviews list
  - [ ] Implement cursor-based pagination for performance
  - [ ] Add page size limits (max 100 items)

- [ ] **Filtering & Search**
  - [ ] Add treatment search by name/description
  - [ ] Add review filtering by rating/status
  - [ ] Add treatment filtering by category/intensity
  - [ ] Implement full-text search

- [ ] **API Improvements**
  - [ ] Add batch operations for admin (bulk approve reviews)
  - [ ] Implement soft deletes for treatments
  - [ ] Add API versioning strategy
  - [ ] Create OpenAPI/Swagger documentation
  - [ ] Add request validation middleware

- [ ] **Response Optimization**
  - [ ] Implement field selection (GraphQL-style)
  - [ ] Add ETag support for caching
  - [ ] Compress API responses (gzip/brotli)
  - [ ] Add response time headers

---

#### 8. Documentation
**Current State:** Generic README, good CLAUDE.md
**Impact:** Poor developer onboarding

**Tasks:**
- [ ] **Update README.md**
  - [ ] Replace generic content with project-specific info
  - [ ] Add project overview and features
  - [ ] Document tech stack and architecture
  - [ ] Add setup instructions (Supabase, Resend, etc.)
  - [ ] Include troubleshooting section
  - [ ] Add screenshots/demo link

- [ ] **Developer Documentation**
  - [ ] Create CONTRIBUTING.md
  - [ ] Document feature-based architecture pattern
  - [ ] Create API documentation
  - [ ] Add database schema documentation
  - [ ] Document deployment process
  - [ ] Create runbook for common operations

- [ ] **Code Documentation**
  - [ ] Add JSDoc to all composables
  - [ ] Document complex algorithms
  - [ ] Add inline comments for non-obvious code
  - [ ] Create ADR (Architecture Decision Records)

- [ ] **User Documentation**
  - [ ] Create admin user guide
  - [ ] Document content management workflow
  - [ ] Add FAQ for common issues

---

### 🟢 P2 - Medium Priority (Nice to Have)

These items enhance features and user experience.

#### 9. Feature Enhancements

**Booking System:**
- [ ] Integrate with actual booking provider (Calendly, Acuity, etc.)
- [ ] Add calendar availability view
- [ ] Send booking confirmation emails
- [ ] Add reminder email automation (24h before)
- [ ] Implement waiting list for full slots
- [ ] Add cancellation/rescheduling flow

**Review System:**
- [ ] Add photo uploads to reviews
- [ ] Implement review reply functionality
- [ ] Add review helpful/not helpful voting
- [ ] Create review moderation dashboard improvements
- [ ] Add review request email automation
- [ ] Implement review widgets for embedding

**Treatment Management:**
- [ ] Add treatment packages/bundles
- [ ] Implement seasonal pricing
- [ ] Add treatment comparison feature
- [ ] Create treatment recommendation quiz
- [ ] Add gift certificate functionality
- [ ] Implement loyalty program

**Contact & Communication:**
- [ ] Add live chat widget (Tawk.to, Intercom)
- [ ] Implement newsletter signup
- [ ] Create automated email sequences
- [ ] Add SMS notifications option
- [ ] Implement WhatsApp integration
- [ ] Add contact form attachments support

**Content:**
- [ ] Create blog section for health tips
- [ ] Add before/after gallery (with consent)
- [ ] Create video testimonials section
- [ ] Add downloadable resources (PDFs)
- [ ] Implement multi-language support (EN)
- [ ] Add treatment category pages

---

#### 10. Analytics & Insights
**Current State:** No analytics implementation
**Impact:** No data-driven decisions

**Tasks:**
- [ ] **Web Analytics**
  - [ ] Integrate Google Analytics 4
  - [ ] Add privacy-focused alternative (Plausible/Fathom)
  - [ ] Track key user journeys
  - [ ] Set up conversion goals
  - [ ] Add event tracking for interactions

- [ ] **Business Metrics**
  - [ ] Track most popular treatments
  - [ ] Monitor booking conversion rate
  - [ ] Analyze review submission patterns
  - [ ] Track contact form completion rate
  - [ ] Create admin analytics dashboard

- [ ] **SEO Metrics**
  - [ ] Integrate Google Search Console
  - [ ] Track keyword rankings
  - [ ] Monitor backlinks
  - [ ] Set up automated SEO reporting

- [ ] **Performance Metrics**
  - [ ] Track Core Web Vitals
  - [ ] Monitor API response times
  - [ ] Set up uptime monitoring
  - [ ] Create performance dashboard

---

#### 11. Content Expansion
**Current State:** Only 3 treatment content files
**Impact:** Limited SEO value, incomplete content

**Tasks:**
- [ ] Add remaining treatment pages
- [ ] Create treatment category pages
- [ ] Write FAQ content (expand from current)
- [ ] Create about page content
- [ ] Add blog posts for SEO
- [ ] Create location/service area pages
- [ ] Add practitioner bio/credentials
- [ ] Create terms & conditions page
- [ ] Add privacy policy page
- [ ] Create cookie policy page

---

#### 12. UX/UI Enhancements
**Current State:** Good mobile-first design, can be improved
**Impact:** Better user engagement and conversions

**Tasks:**
- [ ] **Navigation**
  - [ ] Add sticky header on scroll
  - [ ] Implement breadcrumbs on all pages
  - [ ] Add search functionality
  - [ ] Improve mobile menu UX

- [ ] **Interactive Elements**
  - [ ] Add loading skeletons for async content
  - [ ] Implement optimistic UI updates
  - [ ] Add animations/transitions (tasteful)
  - [ ] Create interactive treatment selector

- [ ] **Conversion Optimization**
  - [ ] Add prominent CTAs on all pages
  - [ ] Implement exit-intent popup
  - [ ] Add trust badges/certifications
  - [ ] Create urgency indicators (limited slots)
  - [ ] Add social proof notifications

- [ ] **Accessibility**
  - [ ] Run automated accessibility tests
  - [ ] Add keyboard shortcuts guide
  - [ ] Implement skip-to-content links
  - [ ] Add focus indicators
  - [ ] Test with screen readers
  - [ ] Add high contrast mode option

---

### 🔵 P3 - Low Priority (Future Enhancements)

These items are advanced features for future consideration.

#### 13. Advanced Features

**PWA (Progressive Web App):**
- [ ] Add service worker for offline support
- [ ] Implement app install prompt
- [ ] Add push notifications
- [ ] Create app manifest
- [ ] Add offline fallback pages

**Admin Enhancements:**
- [ ] Create advanced analytics dashboard
- [ ] Add export functionality (CSV/PDF)
- [ ] Implement bulk operations UI
- [ ] Add activity/audit log viewer
- [ ] Create automated reports
- [ ] Add data backup/restore features

**Marketing Integrations:**
- [ ] Integrate with Meta Pixel
- [ ] Add Google Ads conversion tracking
- [ ] Implement affiliate tracking
- [ ] Add referral program
- [ ] Create loyalty/rewards program
- [ ] Integrate with email marketing (Mailchimp)

**Social Features:**
- [ ] Add social media sharing
- [ ] Integrate Instagram feed
- [ ] Add Facebook reviews widget
- [ ] Implement social login
- [ ] Create sharable booking links

---

## 🔧 Technical Debt

### Code Cleanup
- [ ] Remove unused composables in `useTreatmentData.ts`
- [ ] Consolidate duplicate treatment data fetching logic
- [ ] Remove unused imports across codebase
- [ ] Clean up commented code
- [ ] Remove debug console.log statements

### Refactoring Opportunities
- [ ] Extract common form validation patterns
- [ ] Create shared modal component
- [ ] Standardize loading states across features
- [ ] Consolidate error handling patterns
- [ ] Extract email templates to separate files
- [ ] Create shared table component for admin

### Database Migrations
- [ ] Add indexes for performance:
  - [ ] `treatments.slug` (unique index)
  - [ ] `treatments.is_active, display_order`
  - [ ] `reviews.status, created_at`
- [ ] Add full-text search indexes
- [ ] Consider adding `deleted_at` for soft deletes
- [ ] Add `updated_by` tracking for admin actions

---

## 🚀 CI/CD & DevOps

### Continuous Integration
- [ ] Set up GitHub Actions workflow
- [ ] Add automated testing on PR
- [ ] Add linting checks
- [ ] Add type checking
- [ ] Add build verification
- [ ] Add security scanning (Snyk/Dependabot)
- [ ] Add automated dependency updates

### Continuous Deployment
- [ ] Set up staging environment
- [ ] Configure automatic deployments (main → staging)
- [ ] Set up production deployment pipeline
- [ ] Add deployment approval gates
- [ ] Configure environment-specific builds
- [ ] Add rollback capability
- [ ] Create deployment documentation

### Monitoring & Observability
- [ ] Set up uptime monitoring (UptimeRobot/Pingdom)
- [ ] Add server monitoring (logs, CPU, memory)
- [ ] Configure alerting rules
- [ ] Create incident response runbook
- [ ] Set up database backup automation
- [ ] Add health check endpoint

---

## 📋 Quick Wins (Easy Improvements)

These can be done quickly for immediate impact:

1. **Add `.env.example` file** (5 min)
   ```bash
   # Copy and remove sensitive values
   cp .env.development .env.example
   ```

2. **Update README.md** (30 min)
   - Replace generic content with project info
   - Add setup instructions

3. **Add loading states** (1 hour)
   - Add spinners to async operations
   - Improve perceived performance

4. **Create 404 page** (30 min)
   - Better UX for broken links

5. **Add meta descriptions to all pages** (1 hour)
   - Audit all pages for SEO meta tags
   - Boost SEO rankings

6. **Compress images** (30 min)
   - Run all `/public/images` through TinyPNG
   - Faster page loads

7. **Add sitemap** (already done ✅)
   - `/api/sitemap.xml.ts` exists

8. **Add robots.txt** (already done ✅)
   - `/public/robots.txt` exists

---

## 📊 Metrics & Success Criteria

### Performance Targets
- Lighthouse Score: >90 (all categories)
- First Contentful Paint: <1.5s
- Time to Interactive: <3.0s
- Cumulative Layout Shift: <0.1
- API Response Time: <200ms (p95)

### Quality Targets
- Test Coverage: >70%
- TypeScript Strict Mode: Enabled
- Zero ESLint errors
- Zero security vulnerabilities (high/critical)
- Accessibility Score: 100

### Business Metrics
- Contact form conversion: >5%
- Booking conversion: >10%
- Review submission rate: >15%
- Average session duration: >2 minutes
- Bounce rate: <40%

---

## 🎓 Learning Resources

For implementing the improvements above, these resources may help:

- **Testing:** [Nuxt Testing Guide](https://nuxt.com/docs/getting-started/testing)
- **Security:** [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- **Performance:** [Web.dev Performance](https://web.dev/performance/)
- **Accessibility:** [A11y Project Checklist](https://www.a11yproject.com/checklist/)
- **SEO:** [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)

---

## 🏁 Next Steps

### Immediate (This Week)
1. Set up testing infrastructure (Vitest + Playwright)
2. Create `.env.example` file
3. Update README.md with project info
4. Add rate limiting to contact form
5. Replace console.log with proper logging

### Short-term (This Month)
1. Implement comprehensive test coverage (70%+)
2. Add error monitoring (Sentry)
3. Set up CI/CD pipeline
4. Add caching strategy
5. Complete security hardening

### Medium-term (This Quarter)
1. Performance optimization (bundle, images, caching)
2. Add pagination and filtering to APIs
3. Expand content (more treatments, blog)
4. Implement analytics tracking
5. Add advanced booking features

---

## 📝 Notes

**Priority System:**
- **P0 (Critical):** Security, testing, production-readiness
- **P1 (High):** Performance, quality, scalability
- **P2 (Medium):** Features, UX enhancements
- **P3 (Low):** Advanced features, nice-to-haves

**Estimation Philosophy:**
- Focus on P0 items first
- Balance quick wins with long-term improvements
- Prioritize user-facing impact
- Consider maintenance burden

**Review Frequency:**
- Review this document monthly
- Update priorities based on business needs
- Archive completed items
- Add new items as discovered

---

*Last Updated: 2025-11-15*
*Generated by: Claude Code Analysis*
