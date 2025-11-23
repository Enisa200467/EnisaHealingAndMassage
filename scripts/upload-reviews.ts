import reviews from '../reviews-migration.json'

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://vfzreuhvkifqkcbpdmio.supabase.co'
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SECRET_KEY

if (!SUPABASE_SERVICE_KEY) {
  console.error('Error: SUPABASE_SECRET_KEY environment variable is required')
  console.error('Please set it in your .env file')
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

async function uploadReviews() {
  console.log(`Starting upload of ${reviews.length} reviews...`)

  let successCount = 0
  let errorCount = 0
  const errors: Array<{ review: Review; error: string }> = []

  for (const review of reviews as Review[]) {
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
        console.log(`✓ Uploaded review from ${review.name} (${successCount}/${reviews.length})`)
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
  console.log(`Total reviews: ${reviews.length}`)
  console.log(`✓ Successfully uploaded: ${successCount}`)
  console.log(`✗ Failed: ${errorCount}`)

  if (errors.length > 0) {
    console.log('\n--- Errors ---')
    errors.forEach(({ review, error }) => {
      console.log(`${review.name}: ${error}`)
    })
  }
}

uploadReviews().catch(console.error)
