const SUPABASE_URL = process.env.SUPABASE_URL || 'https://vfzreuhvkifqkcbpdmio.supabase.co'
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SECRET_KEY

if (!SUPABASE_SERVICE_KEY) {
  console.error('Error: SUPABASE_SECRET_KEY environment variable is required')
  process.exit(1)
}

const sql = `
-- Drop the existing check constraint on the review column
ALTER TABLE reviews DROP CONSTRAINT IF EXISTS reviews_review_check;

-- Add a new check constraint with increased max length (5000 characters)
ALTER TABLE reviews ADD CONSTRAINT reviews_review_check
  CHECK (char_length(review) >= 10 AND char_length(review) <= 5000);
`

async function updateConstraint() {
  console.log('Updating database constraint...')
  console.log('SQL:', sql)

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_SERVICE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
      },
      body: JSON.stringify({ query: sql })
    })

    if (response.ok) {
      console.log('✓ Database constraint updated successfully')
    } else {
      const error = await response.text()
      console.error('✗ Failed to update constraint:', error)
      console.log('\nPlease run this SQL manually in the Supabase SQL Editor:')
      console.log(sql)
    }
  } catch (error) {
    console.error('✗ Error:', error)
    console.log('\nPlease run this SQL manually in the Supabase SQL Editor:')
    console.log(sql)
  }
}

updateConstraint().catch(console.error)
