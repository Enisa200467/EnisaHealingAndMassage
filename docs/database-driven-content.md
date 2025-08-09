# Database-Driven Content Architecture

## Overview

This project now uses a hybrid approach where treatment data (pricing, duration, intensity, etc.) comes from the database as the single source of truth, while rich content (descriptions, benefits, sections) remains in content files.

## Architecture

### Data Flow

1. **Database** → Stores all treatment metadata (price, duration, intensity, etc.)
2. **Content Files** → Store rich content and structure
3. **Page Components** → Merge both data sources
4. **Content Components** → Receive database data via injection/props

### Key Files

```
composables/
└── useTreatmentData.ts           # Fetches and formats treatment data
server/api/
└── treatments/
    └── index.get.ts              # Public API for treatment data
pages/behandelingen/
└── [...slug].vue                 # Loads both content and database data
features/treatments/
└── TreatmentPage.vue             # Merges data sources for SEO and display
components/content/
└── TreatmentHero.vue             # Uses database data with content fallback
```

## Content File Structure

### Before (Duplicated Data)

```markdown
---
title: 'Chakra Balancering'
description: '...'
duration: '60 minuten'
price: '€ 70'
intensity: 1
intensityLabel: 'Zeer Zacht'
icon: 'i-mdi-sparkles'
---

## ::treatmentHero

title: Chakra Balancering
duration: 60 minuten
price: € 70
intensity: 1
intensityLabel: Zeer Zacht
icon: i-mdi-sparkles

---

::
```

### After (Database-Driven)

```markdown
---
title: 'Chakra Balancering'
description: '...'
---

## ::treatmentHero

## subtitle: Treatment description for SEO and display

::
```

## Component Data Priority

Content components now follow this priority:

1. **Database Data** (highest priority)
2. **Content Props** (fallback)
3. **Default Values** (last resort)

### Example: TreatmentHero Component

```vue
<!-- Database data automatically used -->
::treatmentHero --- subtitle: "Custom subtitle for this treatment" --- ::

<!-- Component automatically gets:
- name: from database
- price_formatted: from database  
- duration_formatted: from database
- intensity: from database
- icon: from database
- subtitle: from content props
-->
```

## Data Synchronization

### Admin Updates

When treatments are updated via the admin interface:

1. Database is updated immediately
2. Content files remain unchanged (only rich content)
3. Website automatically reflects new pricing/details
4. No manual content file updates needed

### Content Updates

For rich content changes:

1. Update the content files as usual
2. Database data remains authoritative for metadata
3. Use content components that accept both data sources

## Implementation Details

### 1. Data Fetching

```typescript
const { fetchTreatmentBySlug } = useTreatmentData();
const treatmentData = await fetchTreatmentBySlug(slug);
```

### 2. Component Injection

```vue
<!-- In page component -->
provide('treatmentData', treatmentData);

<!-- In content component -->
const treatmentData = inject<TreatmentData>('treatmentData', null);
```

### 3. SEO Optimization

```typescript
// Uses database data when available, falls back to content
const title = treatmentData?.name || treatment?.title;
const price = treatmentData?.price_formatted || treatment?.meta?.price;
```

## Benefits

### 1. Single Source of Truth

- All pricing, duration, and metadata managed in database
- No duplication between content files and database
- Consistent data across admin and public site

### 2. Easy Maintenance

- Update prices in admin → instantly reflected on site
- Content editors focus on rich content only
- Reduced chance of data inconsistencies

### 3. Backward Compatibility

- Existing content files still work
- Gradual migration possible
- Fallback to content data when database unavailable

### 4. Performance

- Database data cached efficiently
- Content files remain optimized
- No additional complexity for end users

## Migration Guide

### Step 1: Update Content Files

Remove duplicated metadata from content files:

```diff
---
title: 'Treatment Name'
description: '...'
- duration: '60 minuten'
- price: '€ 70'
- intensity: 1
- intensityLabel: 'Zeer Zacht'
- icon: 'i-mdi-sparkles'
---

::treatmentHero
---
- title: Treatment Name
subtitle: Treatment description
- duration: 60 minuten
- price: € 70
- intensity: 1
- intensityLabel: Zeer Zacht
- icon: i-mdi-sparkles
---
::
```

### Step 2: Ensure Database Data

Verify treatments exist in database with correct slugs:

```sql
SELECT slug, name, price_cents, duration_minutes
FROM treatments
WHERE is_active = true;
```

### Step 3: Test Content Components

Check that components display database data correctly:

- Pricing information
- Duration formatting
- Intensity indicators
- Icons and categories

## Troubleshooting

### Missing Treatment Data

If a treatment page shows fallback content:

1. Check database entry exists with correct slug
2. Verify treatment is marked as active
3. Check API endpoint returns data
4. Verify slug matches between content file and database

### Content Not Updating

If changes don't appear:

1. Clear Nuxt cache: `rm -rf .nuxt`
2. Restart development server
3. Check browser cache (hard refresh)
4. Verify API endpoint works: `/api/treatments`

### SEO Issues

If SEO data is incorrect:

1. Check database data priority in TreatmentPage.vue
2. Verify structured data generation
3. Test with Google Rich Results Test
4. Check meta tags in browser developer tools
