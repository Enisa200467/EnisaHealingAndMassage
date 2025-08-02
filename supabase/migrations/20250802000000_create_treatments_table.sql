-- Treatments table for storing treatment information
CREATE TABLE IF NOT EXISTS treatments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  slug VARCHAR(200) UNIQUE NOT NULL,
  description TEXT,
  duration_minutes INTEGER NOT NULL,
  price_cents INTEGER NOT NULL, -- Store price in cents to avoid floating point issues
  intensity INTEGER CHECK (intensity >= 1 AND intensity <= 5),
  intensity_label VARCHAR(100),
  icon VARCHAR(100),
  category VARCHAR(50),
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_treatments_slug ON treatments(slug);
CREATE INDEX IF NOT EXISTS idx_treatments_category ON treatments(category);
CREATE INDEX IF NOT EXISTS idx_treatments_active ON treatments(is_active);
CREATE INDEX IF NOT EXISTS idx_treatments_display_order ON treatments(display_order);

-- Row Level Security (RLS) policies
ALTER TABLE treatments ENABLE ROW LEVEL SECURITY;

-- Policy for public read access to active treatments only
CREATE POLICY "Public can view active treatments" ON treatments
  FOR SELECT USING (is_active = true);

-- Policy for admin full access (requires service role authentication)
-- This will be managed through service role key for admin operations

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_treatments_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to update updated_at on row updates
DROP TRIGGER IF EXISTS update_treatments_updated_at ON treatments;
CREATE TRIGGER update_treatments_updated_at
  BEFORE UPDATE ON treatments
  FOR EACH ROW
  EXECUTE FUNCTION update_treatments_updated_at_column();

-- Function to generate slug from name
CREATE OR REPLACE FUNCTION generate_treatment_slug(treatment_name TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN lower(
    regexp_replace(
      regexp_replace(
        regexp_replace(treatment_name, '[äáàâ]', 'a', 'g'),
        '[ëéèê]', 'e', 'g'
      ),
      '[^a-z0-9]+', '-', 'g'
    )
  );
END;
$$ language 'plpgsql';

-- Insert initial treatment data based on existing content
INSERT INTO treatments (name, slug, description, duration_minutes, price_cents, intensity, intensity_label, icon, category, display_order) VALUES
  (
    'Chakra Balancering',
    'chakra-balancering',
    'Herstel de harmonie en energiestroom in je lichaam met een zachte Chakra Balancering. Gericht op het vrijmaken van blokkades en het bevorderen van emotioneel en fysiek welzijn.',
    60,
    7000, -- €70.00 in cents
    1,
    'Zeer Zacht (Energetisch werk)',
    'i-mdi-sparkles',
    'healing',
    1
  ),
  (
    'Intuïtieve Lichaamsmassage',
    'intuitieve-lichaamsmassage',
    'Een zachte, intuïtieve massage waarbij volledig wordt ingespeeld op wat jouw lichaam op dat moment nodig heeft. Een unieke ervaring van diepe verbinding en ontspanning.',
    90,
    9500, -- €95.00 in cents
    2,
    'Zacht (Intuïtief en volgend)',
    'i-mdi-heart',
    'healing',
    2
  ),
  (
    'Klassieke Ontspanningsmassage',
    'klassieke-ontspanningsmassage',
    'Ervaar diepe ontspanning en verlichting van spierspanning met onze traditionele klassieke massage. Ideaal om stress te verminderen en tot rust te komen.',
    60,
    6500, -- €65.00 in cents
    2,
    'Zacht tot Medium (naar wens aanpasbaar)',
    'i-mdi-account-group',
    'massage',
    3
  );

-- Add more treatments from the existing content files (these would be added manually or through the admin interface)
-- Energetische Healing Sessie, Sportmassage, Zweedse Massage would be added here or through the admin interface

-- Create a view for formatted treatment data
CREATE OR REPLACE VIEW treatments_formatted AS
SELECT 
  id,
  name,
  slug,
  description,
  duration_minutes,
  CONCAT('€ ', (price_cents::float / 100)::text) as price_formatted,
  price_cents,
  intensity,
  intensity_label,
  icon,
  category,
  is_active,
  display_order,
  created_at,
  updated_at
FROM treatments
WHERE is_active = true
ORDER BY display_order, name;
