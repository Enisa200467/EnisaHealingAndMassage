-- Add SoulKey Therapy treatment metadata so the content page appears in dynamic menus.
INSERT INTO treatments (
  id,
  name,
  slug,
  description,
  duration_minutes,
  price_cents,
  icon,
  is_active,
  display_order
) VALUES (
  '0ff30744-63e2-4996-a90a-2e35a15f631f',
  'SoulKey Therapy',
  'soulkey-therapy',
  'SoulKey Therapy in Amsterdam Noord helpt je om dieper contact te maken met jezelf, oude patronen te herkennen en meer rust, helderheid en vertrouwen te ervaren.',
  90,
  15500,
  'i-mdi-key-variant',
  true,
  8
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  duration_minutes = EXCLUDED.duration_minutes,
  price_cents = EXCLUDED.price_cents,
  icon = EXCLUDED.icon,
  is_active = EXCLUDED.is_active,
  display_order = EXCLUDED.display_order,
  updated_at = NOW();
