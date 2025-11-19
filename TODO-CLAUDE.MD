# TODO-CLAUDE.MD

> **Focused Improvement Plan for Enisa Healing & Massage Website**
>
> Generated: 2025-11-15 | Updated: 2025-11-17
>
> This document outlines actionable improvements for a startup vibe programming project.

---

## 📊 Codebase Analysis Summary

**Project Stats:**
- ~13,800 lines of code
- 9 feature modules
- 14 API endpoints
- 3 treatment content files
- 32 console.log statements
- 5 TODO comments in code

**Architecture Strengths:**
✅ Feature-based architecture
✅ TypeScript type safety with Supabase
✅ Mobile-first design approach
✅ Comprehensive SEO implementation with structured data
✅ Accessibility validation tools
✅ Auto-imports for composables and components

**Key Gaps:**
❌ No error monitoring service
❌ Limited error handling patterns
❌ Missing rate limiting and security hardening

---

## 🎯 Priority Matrix

### 🔴 P0 - Critical (Do First)

These items address security, reliability, and production-readiness.

#### 1. Security Hardening
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

- [x] **CSRF Protection**
  - [x] Evaluated and disabled (not needed - see docs/SECURITY.md for rationale)
  - [x] SameSite cookies handled by nuxt-security

- [ ] **Admin Security**
  - [ ] Implement session timeout (5 minutes)
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

#### 2. Error Handling & Monitoring
**Current State:** 32 console.log statements, no centralized error tracking
**Impact:** Poor debugging, no production visibility

**Tasks:**
- [ ] **Error Monitoring (Vercel-compatible)**
  - [ ] Research Vercel-native monitoring options (free tier)
  - [ ] Configure error boundaries in Vue components
  - [ ] Add source maps for production debugging

- [ ] **API Error Handling**
  - [ ] Standardize error response format
  - [ ] Add proper HTTP status codes
  - [ ] Create error handling middleware

- [ ] **User-Facing Errors**
  - [ ] Create error page components (404, 500, etc.)
  - [ ] Add user-friendly error messages (Dutch)
  - [ ] Implement toast notifications for errors

**Files to update:**
- `server/api/**/*.ts`
- `app/features/*/composables/*.ts`

---

### 🟡 P1 - High Priority (Do Soon)

#### 1. Documentation
**Current State:** Generic README, good CLAUDE.md
**Impact:** Poor developer onboarding

**Tasks:**
- [ ] **Update README.md**
  - [ ] Replace generic content with project-specific info
  - [ ] Add project overview and features
  - [ ] Document tech stack and architecture
  - [ ] Add setup instructions (Supabase, Resend, etc.)
  - [ ] Add screenshots/demo link

---

### 🟢 P2 - Medium Priority (Nice to Have)

#### 1. UX/UI Enhancements
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

## 📋 Quick Wins (Easy Improvements)

These can be done quickly for immediate impact:

1. **Update README.md** (30 min)
   - Replace generic content with project info
   - Add setup instructions

2. **Add loading states** (1 hour)
   - Add spinners to async operations
   - Improve perceived performance

3. **Create 404 page** (30 min)
   - Better UX for broken links

4. **Add meta descriptions to all pages** (1 hour)
   - Audit all pages for SEO meta tags
   - Boost SEO rankings

5. **Compress images** (30 min)
   - Run all `/public/images` through TinyPNG
   - Faster page loads

6. **Add sitemap** (already done ✅)
   - `/api/sitemap.xml.ts` exists

7. **Add robots.txt** (already done ✅)
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

- **Security:** [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- **Performance:** [Web.dev Performance](https://web.dev/performance/)
- **Accessibility:** [A11y Project Checklist](https://www.a11yproject.com/checklist/)
- **SEO:** [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- **Vercel:** [Vercel Monitoring Docs](https://vercel.com/docs/analytics)

---

## 🏁 Next Steps

### Immediate (This Week)
1. Update README.md with project info
2. Add rate limiting to contact form
3. Research Vercel-native monitoring options
4. Create 404/500 error pages
5. Review and fix TODO comments in code

### Short-term (This Month)
1. Complete security hardening (rate limiting, input sanitization, CSRF)
2. Implement admin session timeout (5 minutes)
3. Add error boundaries and proper error handling
4. Standardize API error responses
5. Review and update RLS policies in Supabase

### Medium-term (Future)
1. UX/UI enhancements (loading states, animations, accessibility)
2. Address technical debt (code cleanup, refactoring)
3. Image optimization and compression
4. Database indexes for performance
5. Consider feature enhancements when needed

---

## 📝 Notes

**Priority System:**
- **P0 (Critical):** Security and error handling - essential for production
- **P1 (High):** Documentation - helps with onboarding and maintenance
- **P2 (Medium):** UX enhancements - improves user experience

**Project Philosophy:**
- This is a **startup vibe programming project** - keep it simple
- No automated testing or CI/CD needed at this stage
- Leverage Vercel's built-in capabilities for caching and monitoring
- Focus on security, user experience, and maintainability
- Add features when actually needed, not preemptively

**Estimation Philosophy:**
- Focus on P0 items first (security and error handling)
- Balance quick wins with long-term improvements
- Prioritize user-facing impact
- Keep maintenance burden low

**Review Frequency:**
- Review this document as needed
- Update priorities based on actual business needs
- Archive completed items
- Don't overthink it - this is a vibe project!

---

*Last Updated: 2025-11-17*
*Generated by: Claude Code Analysis*
