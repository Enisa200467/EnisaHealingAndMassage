# Migration: Content to Markdown Frontmatter

**Date**: 2025-01-27
**Status**: Complete ✅

## Summary

Moved content fields from database to markdown frontmatter for single source of truth. Database now only stores essential metadata needed for functional logic.

## Changes Made

### 1. Database Migration

**File**: `supabase/migrations/20250127000000_remove_content_fields_from_treatments.sql`

Removed columns:
- `description` → Moved to markdown frontmatter
- `intensity` → Moved to markdown frontmatter
- `intensity_label` → Moved to markdown frontmatter
- `category` → Moved to markdown frontmatter

### 2. TypeScript Types

**File**: `app/features/admin/types/treatment.types.ts`

- Removed `description` from `Treatment`, `CreateTreatmentInput`, and `TreatmentFormData` interfaces
- Added new `TreatmentContent` interface for markdown frontmatter structure
- Added `TreatmentWithContent` interface for combined data

### 3. Admin Interface

**Files Updated:**
- `app/features/admin/AdminTreatmentsPage.vue`
  - Removed `description` from `defaultFormData`
  - Added comment clarifying metadata-only approach

- `app/features/admin/components/TreatmentForm.vue`
  - Removed description textarea field
  - Added info alert linking to Nuxt Studio for content management

### 4. Composables

**File**: `app/features/admin/composables/useAdminTreatments.ts`

- Removed `description` handling from:
  - `formatForDatabase()`
  - `formatForDatabaseUpdate()`
  - `formatForForm()`

### 5. Markdown Structure

**Example**: `content/behandelingen/chakra-healing.md`

Added frontmatter:
```markdown
---
title: Chakra Healing
description: Herstel de harmonie en energiestroom...
category: healing
intensity:
  level: 1
  label: Zeer Zacht (Energetisch werk)
---
```

### 6. Documentation

**File**: `docs/BEHANDELINGEN_BEHEREN.md`

- Updated overview to clarify metadata vs content split
- Added "Markdown Structuur" section with frontmatter examples
- Updated database fields table to remove content fields
- Added note directing users to manage content via Nuxt Studio

## Database Schema (After Migration)

```sql
CREATE TABLE treatments (
  id UUID PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  slug VARCHAR(200) UNIQUE NOT NULL,
  duration_minutes INTEGER NOT NULL,
  price_cents INTEGER NOT NULL,
  icon VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
);
```

## Markdown Frontmatter Structure

```yaml
---
title: string (required)
description: string (required)
category: 'healing' | 'massage' (optional)
intensity:
  level: 1 | 2 | 3 | 4 | 5 (optional)
  label: string (optional)
---
```

## Benefits

1. **Single Source of Truth**: Content lives in one place (markdown)
2. **Git Versioning**: All content changes tracked in Git
3. **Easier Content Management**: All text content managed via Nuxt Studio
4. **No Sync Issues**: Can't have mismatched descriptions between DB and content
5. **SSR-Friendly**: No performance penalty for parsing markdown at render time
6. **Cleaner Database**: Only essential metadata for functional logic

## Migration Steps for Existing Treatments

For each treatment file in `/content/behandelingen/`:

1. Add frontmatter with `description`, `category`, and `intensity`
2. Get values from current database record (before migration)
3. Run the database migration to remove columns
4. Verify frontend still renders correctly

## Next Steps

- [ ] Update all remaining markdown files with complete frontmatter
- [ ] Update listing/overview pages to read description from markdown
- [ ] Create composable for fetching treatment with content
- [ ] Update SEO meta to use markdown frontmatter data

## Files Changed

```
/supabase/migrations/20250127000000_remove_content_fields_from_treatments.sql
/app/features/admin/types/treatment.types.ts
/app/features/admin/AdminTreatmentsPage.vue
/app/features/admin/components/TreatmentForm.vue
/app/features/admin/composables/useAdminTreatments.ts
/content/behandelingen/chakra-healing.md (example)
/docs/BEHANDELINGEN_BEHEREN.md
```
