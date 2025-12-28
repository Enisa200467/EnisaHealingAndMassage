-- Remove content-related fields from treatments table
-- These fields are moving to markdown frontmatter for single source of truth

-- Drop the view first as it depends on columns we're removing
DROP VIEW IF EXISTS treatments_formatted;

-- Drop the category index
DROP INDEX IF EXISTS idx_treatments_category;

-- Remove columns that are moving to markdown
ALTER TABLE treatments
  DROP COLUMN IF EXISTS description,
  DROP COLUMN IF EXISTS intensity,
  DROP COLUMN IF EXISTS intensity_label,
  DROP COLUMN IF EXISTS category;

-- Recreate the view without the removed columns
CREATE OR REPLACE VIEW treatments_formatted AS
SELECT
  id,
  name,
  slug,
  duration_minutes,
  CONCAT('€ ', (price_cents::float / 100)::text) as price_formatted,
  price_cents,
  icon,
  is_active,
  display_order,
  created_at,
  updated_at
FROM treatments
WHERE is_active = true
ORDER BY display_order, name;

-- Add comment explaining the architecture
COMMENT ON TABLE treatments IS 'Core treatment metadata. Content (description, intensity, category) lives in markdown frontmatter for single source of truth.';
