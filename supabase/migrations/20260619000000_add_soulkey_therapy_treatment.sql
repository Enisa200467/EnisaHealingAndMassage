-- Add SoulKey Therapy / Regressietherapie treatment metadata.
INSERT INTO treatments (
  id,
  name,
  slug,
  duration_minutes,
  price_cents,
  discount_enabled,
  discount_price_cents,
  icon,
  display_order,
  is_active
)
VALUES (
  '7b7d2dd0-4b6b-4f22-8bd8-99fe8094685d',
  'SoulKey Therapy / Regressietherapie',
  'regressietherapie-soulkey-therapy',
  180,
  19500,
  false,
  NULL,
  'i-mdi-key-variant',
  8,
  true
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  duration_minutes = EXCLUDED.duration_minutes,
  price_cents = EXCLUDED.price_cents,
  discount_enabled = EXCLUDED.discount_enabled,
  discount_price_cents = EXCLUDED.discount_price_cents,
  icon = EXCLUDED.icon,
  display_order = EXCLUDED.display_order,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();
