import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SECRET_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function diagnose() {
  console.log('🔍 Diagnosing treatments table...\n');

  // Test 1: Try to count rows
  console.log('Test 1: Counting rows...');
  try {
    const { count, error } = await supabase
      .from('treatments')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error('❌ Error counting rows:', error.message);
      console.error('Details:', error);
    } else {
      console.log('✅ Row count:', count);
    }
  } catch (e) {
    console.error('❌ Exception:', e);
  }

  // Test 2: Try to select just IDs
  console.log('\nTest 2: Selecting just IDs...');
  try {
    const { data, error } = await supabase
      .from('treatments')
      .select('id')
      .limit(5);

    if (error) {
      console.error('❌ Error selecting IDs:', error.message);
      console.error('Details:', error);
    } else {
      console.log('✅ IDs found:', data?.length);
      console.log(data);
    }
  } catch (e) {
    console.error('❌ Exception:', e);
  }

  // Test 3: Try to select all columns
  console.log('\nTest 3: Selecting all columns...');
  try {
    const { data, error } = await supabase
      .from('treatments')
      .select('*')
      .limit(3);

    if (error) {
      console.error('❌ Error selecting all:', error.message);
      console.error('Details:', error);
    } else {
      console.log('✅ Rows found:', data?.length);
      if (data && data.length > 0) {
        console.log('First row keys:', Object.keys(data[0]));
        console.log('Sample row:', data[0]);
      }
    }
  } catch (e) {
    console.error('❌ Exception:', e);
  }

  // Test 4: Check for NULL values in critical fields
  console.log('\nTest 4: Checking for NULL in price_cents...');
  try {
    const { data, error } = await supabase
      .from('treatments')
      .select('id, name, price_cents')
      .is('price_cents', null);

    if (error) {
      console.error('❌ Error:', error.message);
    } else {
      console.log('✅ Rows with NULL price_cents:', data?.length);
      if (data && data.length > 0) {
        console.log('Rows with NULL price:', data);
      }
    }
  } catch (e) {
    console.error('❌ Exception:', e);
  }

  // Test 5: Try with is_active filter
  console.log('\nTest 5: Selecting with is_active = true...');
  try {
    const { data, error } = await supabase
      .from('treatments')
      .select('id, name, slug, is_active')
      .eq('is_active', true)
      .limit(5);

    if (error) {
      console.error('❌ Error:', error.message);
      console.error('Details:', error);
    } else {
      console.log('✅ Active treatments found:', data?.length);
      console.log(data);
    }
  } catch (e) {
    console.error('❌ Exception:', e);
  }
}

diagnose().then(() => {
  console.log('\n✅ Diagnosis complete');
  process.exit(0);
}).catch((e) => {
  console.error('\n❌ Fatal error:', e);
  process.exit(1);
});
