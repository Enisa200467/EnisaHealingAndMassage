const SUPABASE_URL = process.env.SUPABASE_URL || 'https://vfzreuhvkifqkcbpdmio.supabase.co'
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SECRET_KEY

if (!SUPABASE_SERVICE_KEY) {
  console.error('Error: SUPABASE_SECRET_KEY environment variable is required')
  process.exit(1)
}

async function countReviews() {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/reviews?select=*`, {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_SERVICE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch reviews: ${await response.text()}`)
    }

    const reviews = await response.json()

    console.log(`\n📊 Database Review Count:`)
    console.log(`Total reviews: ${reviews.length}`)
    console.log(`Expected: 108 reviews from migration`)

    if (reviews.length === 0) {
      console.log(`\n⚠️  No reviews found in database!`)
      console.log(`This means the reviews need to be migrated again.`)
    } else if (reviews.length !== 108) {
      console.log(`\n⚠️  Review count mismatch!`)
      console.log(`Expected: 108`)
      console.log(`Found: ${reviews.length}`)
      console.log(`Difference: ${reviews.length - 108}`)
    } else {
      console.log(`\n✅ Review count matches expected (108)`)
    }

  } catch (error) {
    console.error('Error counting reviews:', error)
  }
}

countReviews().catch(console.error)
