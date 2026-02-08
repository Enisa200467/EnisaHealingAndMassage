# Dynamic Routes & Nuxt Studio CMS Integration

## Overview

This document outlines the implementation of dynamic routing and Nuxt Studio CMS integration in the Enisa Healing & Massage website.

## Dynamic Routes Implementation

### 1. Central Routes Composable (`useRoutes`)

**Location:** `/features/shared/composables/useRoutes.ts`

The `useRoutes` composable provides centralized route management:

```typescript
// Static page routes
const pages = {
  home: '/',
  about: '/over-mij',
  treatments: '/behandelingen',
  contact: '/contact',
  // ... more routes
} as const;

// Admin routes
const admin = {
  dashboard: '/admin',
  treatments: '/admin/treatments',
  reviews: '/admin/reviews',
  // ... more admin routes
} as const;
```

### 2. Database-Driven Treatment Routes

Treatment routes are dynamically generated from database data:

- **Source:** Supabase database with treatment metadata
- **Pattern:** `/behandelingen/{slug}`
- **Dynamic Data:** Name, price, duration, intensity, etc.

### 3. Benefits of Dynamic Routes

✅ **Type Safety:** Full TypeScript support with route constants
✅ **Maintainability:** Single source of truth for all routes
✅ **Flexibility:** Easy to update URLs without breaking links
✅ **SEO-Friendly:** Consistent URL structure

## Nuxt Studio CMS Integration

### 1. Setup & Configuration

**Installed Package:** `@nuxthq/studio`

**Configuration Files:**

- `nuxt.config.ts` - Module registration and content preview
- `studio.config.ts` - Studio-specific settings and collections

### 2. Hybrid Content Architecture

The system uses a sophisticated hybrid approach:

#### Database Layer (Admin Interface)

- **Purpose:** Business data and metadata
- **Contains:** Prices, duration, intensity, status
- **Managed via:** Custom admin interface at `/admin/treatments`

#### Content Layer (Nuxt Studio)

- **Purpose:** Rich content and components
- **Contains:** Descriptions, images, component structure
- **Managed via:** Nuxt Studio visual editor

### 3. Studio Configuration

```typescript
// studio.config.ts
export default {
  content: {
    collections: {
      treatments: {
        name: 'Behandelingen',
        pattern: 'content/treatments/**/*.md',
        icon: 'spa',
      },
    },
  },
  github: {
    owner: 'Enisa200467',
    repo: 'EnisaHealingAndMassage',
    branch: 'main',
  },
};
```

## Integration Benefits

### 1. Content Management Workflow

1. **Database Management** (Admin Interface):

   - Update prices and metadata instantly
   - Control visibility and status
   - Manage treatment settings

2. **Content Editing** (Nuxt Studio):
   - Visual content editing
   - Rich component library
   - Image optimization
   - Live preview

### 2. Developer Experience

- **Dynamic Routes:** No hardcoded URLs in components
- **Type Safety:** Full TypeScript support throughout
- **Composable Architecture:** Reusable logic across components
- **Git Integration:** Version control for content changes

### 3. Content Editor Experience

- **No Technical Knowledge Required:** Visual editing with Studio
- **Immediate Feedback:** Live preview of changes
- **Professional Workflow:** Git-based collaboration
- **Media Management:** Automatic image optimization

## Implementation Details

### 1. Components Updated for Dynamic Routes

```vue
<!-- Before: Hardcoded routes -->
<UButton to="/admin/treatments">Treatments</UButton>

<!-- After: Dynamic routes -->
<UButton :to="routes.admin.treatments">Treatments</UButton>
```

### 2. Studio Content Composable

**Location:** `/composables/useStudioContent.ts`

Provides utilities for Studio integration:

```typescript
const { getDynamicNavigation, getStudioEditUrl } = useStudioContent();
```

### 3. Enhanced Content Files

Content files now include Studio-friendly metadata:

```markdown
---
title: 'Chakra Balancering'
description: 'SEO description...'
category: 'healing'
featured_image: '/images/chakra-balancing.webp'
draft: false
tags: ['chakra', 'energetisch']
---
```

## Usage Examples

### 1. Using Dynamic Routes in Components

```vue
<script setup>
const routes = useRoutes();
</script>

<template>
  <NuxtLink :to="routes.pages.contact">Contact</NuxtLink>
  <NuxtLink :to="routes.admin.treatments">Admin</NuxtLink>
</template>
```

### 2. Accessing Studio Integration

```vue
<script setup>
const studioContent = useStudioContent();

// Get navigation with Studio edit links
const navigation = await studioContent.getDynamicNavigation();

// Generate Studio edit URL
const editUrl = studioContent.getStudioEditUrl('treatments/massage.md');
</script>
```

### 3. Admin Documentation

The system includes comprehensive Dutch documentation at `/admin/docs` covering:

- Creating new treatments (database + content)
- Editing existing treatments
- Content component usage
- Nuxt Studio workflow
- Troubleshooting

## Migration Summary

### What Changed

1. **Route References:** All hardcoded route strings replaced with dynamic references
2. **Content Architecture:** Enhanced with Studio metadata and configuration
3. **Admin Interface:** Added Studio integration guidance
4. **Documentation:** Comprehensive Dutch admin guide created

### What Stayed the Same

- **Database Schema:** No changes to existing treatment data structure
- **Public URLs:** All existing URLs remain functional
- **Component API:** Existing components maintain compatibility
- **Performance:** No impact on page load times

## Benefits Achieved

### For Developers

- ✅ Type-safe routing throughout the application
- ✅ Central route management reduces maintenance overhead
- ✅ Easy to add new routes or modify existing ones
- ✅ Clear separation between data and content concerns

### For Content Managers

- ✅ Visual content editing with Nuxt Studio
- ✅ No need to understand technical implementation
- ✅ Live preview of content changes
- ✅ Professional Git-based workflow

### For the Business

- ✅ Faster content updates and iterations
- ✅ Reduced technical debt and maintenance costs
- ✅ Improved SEO with consistent URL structure
- ✅ Scalable architecture for future growth

## Next Steps

1. **Studio Setup:** Connect the repository to Nuxt Studio
2. **Content Migration:** Optionally migrate more content to Studio management
3. **Training:** Provide Studio training for content editors
4. **Monitoring:** Set up analytics for content performance tracking

## Technical Notes

- **Backward Compatibility:** All existing URLs continue to work
- **SEO Impact:** Positive impact from consistent URL structure
- **Performance:** No degradation in page load times
- **Maintenance:** Reduced long-term maintenance overhead
