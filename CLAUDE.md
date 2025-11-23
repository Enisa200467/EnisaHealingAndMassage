# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **mobile-first Nuxt 3 website** for Enisa Healing & Massage, a healing and massage therapy practice. The site is built with a feature-based architecture, emphasizing SEO optimization, content management, and accessibility.

**Language:** Dutch (nl)
**Package Manager:** Bun

## Development Commands

```bash
# Install dependencies
bun install

# Development server (http://localhost:3000)
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview

# Generate static site
bun run generate

# Generate Supabase types from remote database
bun run supabase:types
```

## Architecture

### Feature-Based Structure

The codebase uses a **feature-based architecture** where each feature is a self-contained module with its own components, composables, types, and utilities:

```
features/
├── admin/          # Admin panel with authentication
├── booking/        # Appointment booking functionality
├── contact/        # Contact form and logic
├── home/           # Homepage components
├── navigation/     # Site navigation
├── pricing/        # Pricing display
├── reviews/        # Customer reviews system
├── treatments/     # Treatment catalog and details
└── shared/         # Shared utilities and components
```

**Auto-imports:** Composables and utils from `features/*/composables` and `features/*/utils` are automatically imported.

### Server API Routes

Server routes are organized by feature in `/server/api/`:

- `/api/admin/*` - Admin operations (reviews, treatments management)
- `/api/contact` - Contact form submission
- `/api/reviews` - Public review operations
- `/api/treatments` - Treatment data retrieval
- `/api/sitemap.xml` - Dynamic sitemap generation

### Content Management

- Content source: `/content/treatments/*.md`
- Content components: `/app/components/content/` (custom components for use in markdown, named in Dutch)
- Configuration: `content.config.ts` defines the treatments collection
- **Documentation**: See `/docs/BEHANDELINGEN_BEHEREN.md` for detailed guide (in Dutch)

### Database & Auth

- **Supabase** for database and authentication
- Admin routes (`/admin/*`) are protected by Supabase auth
- Dev login credentials: `matthijs@test.nl` / `test1234` at `/admin/login`
- Database types: Generated in `types/database.types.ts`

### Global Composables

Located in `/composables/`:
- `useStudioContent` - Nuxt Studio content integration
- `useSEOImage` - SEO-optimized image handling
- `useA11yValidator` - Accessibility validation
- `useTreatmentData` - Treatment data fetching
- `useGlobalSEO` - Global SEO meta management

## Key Development Principles

### 1. Mobile-First Design
- **Always start with mobile designs first**, then enhance for larger screens
- Use Tailwind breakpoints: `sm:640px`, `md:768px`, `lg:1024px`, `xl:1280px`
- Touch-friendly interactions and spacing

### 2. SEO Optimization (Critical)
- **Every page must use `useSeoMeta()`** with proper title and description
- Implement structured data for health services
- Use `NuxtImg` with `format="webp"`, `quality="80"`, and appropriate `loading` attributes
- Semantic HTML with proper heading hierarchy (h1 → h2 → h3)
- All images require descriptive `alt` attributes
- Use `preload` for critical images, `lazy` for below-the-fold

### 3. Content Component Patterns

Content components use a special frontmatter syntax in markdown with **Dutch kebab-case names**:

```markdown
## ::component-naam

key: value
arrayKey:
- item1
- item2

---

Content body here
::
```

Available content components:
- `::behandeling-hero` - Page header with title, price, duration (fetches data from database)
- `::behandeling-sectie` - Section with image and bullet points
- `::info-blok` - Highlighted information box
- `::voordelen-lijst` - List of treatment benefits (nested in `::twee-kolommen`)
- `::voor-wie` - Target audience section (nested in `::twee-kolommen`)
- `::afbeelding` - Optimized full-width image with caption
- `::uitklap-info` - Collapsible content section
- `::twee-kolommen` - Two-column layout wrapper
- `::kop` - Custom heading with styling

**Important**:
- Component names in markdown use **kebab-case** (lowercase with hyphens)
- Vue component files use **PascalCase** (e.g., `BehandelingHero.vue`)
- Nested components inside `::twee-kolommen` use `:::` (three colons)
- All content components use `not-prose` class to prevent Tailwind Typography conflicts

### 4. Image Optimization

Always use the `NuxtImg` component:

```vue
<NuxtImg
  :src="src"
  :alt="descriptive alt text"
  format="webp"
  quality="80"
  loading="lazy"
  sizes="sm:100vw md:80vw lg:600px"
/>
```

### 5. Accessibility Requirements

- Maintain proper heading hierarchy
- Include ARIA labels for interactive elements
- Ensure sufficient color contrast
- Support keyboard navigation
- Use semantic HTML elements

## Design System

- **Color palette:** Primary (purple #8b5cf6), Secondary (teal), Neutral (gray)
- **Components:** Based on Nuxt UI, customized through `app.config.ts`
- **Container:** Use `UContainer` for consistent page width
- **Typography:** Tailwind Typography with custom prose styles
- **Spacing:** Follow Tailwind spacing scale (py-16 sm:py-24 for sections)

## Important Files

- `nuxt.config.ts` - Main configuration with modules and feature-based imports
- `app.config.ts` - Nuxt UI customization
- `content.config.ts` - Content collections definition
- `types/database.types.ts` - Supabase database types (auto-generated)
- `.env.development` - Local environment variables

## Environment Variables

Runtime config in `nuxt.config.ts`:
- `RESEND_API_KEY` - Email service API key (server-side)
- `CONTACT_EMAIL` - Contact form recipient (server-side, defaults to info@enisahealing.nl)
- Supabase credentials - Managed by `@nuxtjs/supabase` module

## Common Patterns

### Page Structure
```vue
<script setup lang="ts">
// Always include SEO meta
useSeoMeta({
  title: 'Page Title',
  description: 'Detailed description for search engines'
});
</script>

<template>
  <article>
    <!-- Semantic HTML with mobile-first layout -->
  </article>
</template>
```

### Treatment Page Structure

Treatment pages combine database data with markdown content. The `::behandeling-hero` component fetches data from the database using the treatment ID:

```markdown
::behandeling-hero
---
id: database-uuid-here
---
::

::behandeling-sectie
---
title: Wat kun je verwachten?
image: /images/treatment.webp
imageAlt: Beschrijving
items:
  - Punt 1
  - Punt 2
---
::

::twee-kolommen
  :::voordelen-lijst
  ---
  title: Belangrijkste Voordelen
  items:
    - Voordeel 1
    - Voordeel 2
  ---
  :::

  :::voor-wie
  ---
  title: Voor Wie?
  items:
    - Kenmerk 1
    - Kenmerk 2
  ---
  :::
::
```

**Sync Requirements**: The treatment slug in the database must match the markdown filename (e.g., `chakra-balancering` in DB → `chakra-balancering.md` in content).

### Component Auto-Registration
Components from both `/components/` and `/features/` are auto-registered without path prefix.

## Testing

Testing utilities are configured via `@nuxt/test-utils` module (see `package.json`).

## Documentation for Non-Developers

- **Treatment Management**: `/docs/BEHANDELINGEN_BEHEREN.md` - Complete guide in Dutch for managing treatments
- Covers database management, content creation, available components, troubleshooting

## Notes

- The site language is Dutch - maintain all user-facing content in Dutch
- Content component names use **kebab-case** in markdown (e.g., `::behandeling-hero`)
- Vue component files use **PascalCase** (e.g., `BehandelingHero.vue`)
- This is a health and wellness website - prioritize trust signals and professional presentation
- Performance and SEO are critical priorities
- All new features should follow the feature-based architecture pattern
