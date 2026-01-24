-- Treatment trajects table for storing traject options per treatment
CREATE TABLE IF NOT EXISTS treatment_trajects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  treatment_id UUID NOT NULL REFERENCES treatments(id) ON DELETE CASCADE,
  sessions INTEGER NOT NULL CHECK (sessions >= 1),
  price_cents INTEGER NOT NULL CHECK (price_cents >= 0),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_treatment_trajects_treatment_id ON treatment_trajects(treatment_id);
CREATE INDEX IF NOT EXISTS idx_treatment_trajects_active ON treatment_trajects(is_active);

ALTER TABLE treatment_trajects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active treatment trajects" ON treatment_trajects
  FOR SELECT USING (is_active = true);

CREATE OR REPLACE FUNCTION update_treatment_trajects_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_treatment_trajects_updated_at ON treatment_trajects;
CREATE TRIGGER update_treatment_trajects_updated_at
  BEFORE UPDATE ON treatment_trajects
  FOR EACH ROW
  EXECUTE FUNCTION update_treatment_trajects_updated_at_column();
