import reviews from '../reviews-migration.json'

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://vfzreuhvkifqkcbpdmio.supabase.co'
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SECRET_KEY

if (!SUPABASE_SERVICE_KEY) {
  console.error('Error: SUPABASE_SECRET_KEY environment variable is required')
  process.exit(1)
}

interface Review {
  name: string
  email: string
  rating: number
  review: string
  treatment: string | null
  status: string
  created_at: string
}

async function cleanUploadReviews() {
  console.log(`Starting clean upload of ${reviews.length} reviews...\n`)

  // Step 1: Check existing reviews in database
  console.log('Step 1: Checking existing reviews in database...')
  const existingResponse = await fetch(`${SUPABASE_URL}/rest/v1/reviews?select=name,email,created_at`, {
    method: 'GET',
    headers: {
      'apikey': SUPABASE_SERVICE_KEY,
      'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
    },
  })

  const existingReviews = await existingResponse.json()
  console.log(`Found ${existingReviews.length} existing reviews in database\n`)

  // Create a Set of existing review identifiers (name + created_at)
  const existingSet = new Set(
    existingReviews.map((r: any) => `${r.name}|${r.created_at}`)
  )

  // Step 2: Filter out reviews that already exist
  const reviewsToUpload = (reviews as Review[]).filter(review => {
    const identifier = `${review.name}|${review.created_at}`
    return !existingSet.has(identifier)
  })

  console.log(`Step 2: Filtering reviews...`)
  console.log(`Reviews to upload: ${reviewsToUpload.length}`)
  console.log(`Reviews already in database: ${reviews.length - reviewsToUpload.length}\n`)

  if (reviewsToUpload.length === 0) {
    console.log('✅ All reviews are already in the database. No upload needed.')
    return
  }

  // Step 3: Upload new reviews
  console.log(`Step 3: Uploading ${reviewsToUpload.length} new reviews...\n`)

  let successCount = 0
  let errorCount = 0
  const errors: Array<{ review: Review; error: string }> = []

  for (const review of reviewsToUpload) {
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_SERVICE_KEY,
          'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          name: review.name,
          email: review.email,
          rating: review.rating,
          review: review.review,
          treatment: review.treatment,
          status: review.status,
          created_at: review.created_at,
          updated_at: review.created_at
        })
      })

      if (response.ok) {
        successCount++
        console.log(`✓ Uploaded review from ${review.name} (${successCount}/${reviewsToUpload.length})`)
      } else {
        const errorText = await response.text()
        errorCount++
        errors.push({ review, error: errorText })
        console.error(`✗ Failed to upload review from ${review.name}: ${errorText}`)
      }
    } catch (error) {
      errorCount++
      errors.push({ review, error: String(error) })
      console.error(`✗ Error uploading review from ${review.name}:`, error)
    }

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100))
  }

  console.log('\n--- Upload Summary ---')
  console.log(`Total reviews in JSON: ${reviews.length}`)
  console.log(`Already in database: ${reviews.length - reviewsToUpload.length}`)
  console.log(`New reviews uploaded: ${successCount}`)
  console.log(`Failed uploads: ${errorCount}`)

  if (errors.length > 0) {
    console.log('\n--- Errors ---')
    errors.forEach(({ review, error }) => {
      console.log(`${review.name}: ${error}`)
    })
  }

  // Step 4: Verify final count
  console.log('\n--- Verification ---')
  const finalResponse = await fetch(`${SUPABASE_URL}/rest/v1/reviews?select=id`, {
    method: 'GET',
    headers: {
      'apikey': SUPABASE_SERVICE_KEY,
      'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
    },
  })

  const finalReviews = await finalResponse.json()
  console.log(`Total reviews now in database: ${finalReviews.length}`)
  console.log(`Expected: ${reviews.length}`)

  if (finalReviews.length === reviews.length) {
    console.log('\n✅ Upload complete! All reviews are in the database.')
  } else {
    console.log(`\n⚠️  Review count mismatch! Expected ${reviews.length}, got ${finalReviews.length}`)
  }
}

cleanUploadReviews().catch(console.error)
