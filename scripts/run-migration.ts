#!/usr/bin/env bun
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { join } from 'path';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const migrationPath = join(
  process.cwd(),
  'supabase/migrations/20250127000000_remove_content_fields_from_treatments.sql'
);

console.log('Reading migration file...');
const sql = readFileSync(migrationPath, 'utf-8');

console.log('Running migration...');
const { data, error } = await supabase.rpc('exec', { sql });

if (error) {
  console.error('Migration failed:', error);
  process.exit(1);
}

console.log('✅ Migration completed successfully!');
console.log('Removed columns: description, intensity, intensity_label, category');
