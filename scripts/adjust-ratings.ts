const SUPABASE_URL = process.env.SUPABASE_URL || 'https://vfzreuhvkifqkcbpdmio.supabase.co'
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SECRET_KEY

if (!SUPABASE_SERVICE_KEY) {
  console.error('Error: SUPABASE_SECRET_KEY environment variable is required')
  process.exit(1)
}

// Reviews to update to 4 stars (about 25-30% of total)
// Selecting reviews that are still positive but slightly less effusive
const reviewsToUpdate = [
  { name: 'Tasja', rating: 4 },
  { name: 'Carola', rating: 4 },
  { name: 'Nava', rating: 4 },
  { name: 'HG', rating: 4 },
  { name: 'Channa Al', rating: 4 },
  { name: 'Nova van Zalk', rating: 4 },
  { name: 'Gwendolin', rating: 4 },
  { name: 'K.S', rating: 4 },
  { name: 'A.K', rating: 4 },
  { name: 'V.B.', rating: 4 },
  { name: 'Anna de Pagter', rating: 4 },
  { name: 'Patricia', rating: 4 },
  { name: 'Ans', rating: 4 },
  { name: 'M.R.Tan', rating: 4 },
  { name: 'M.L', rating: 4 },
  { name: 'F.Anne', rating: 4 },
  { name: 'G.S.', rating: 4 },
  { name: 'Azra', rating: 4 },
  { name: 'Debbie', rating: 4 },
  { name: 'G.C', rating: 4 },
  { name: 'Adelaida de Cuba', rating: 4 },
  { name: 'Sila', rating: 4 },
  { name: 'Ingrid Coleridge', rating: 4 },
  { name: 'Mahmut Akyuz', rating: 4 },
  { name: 'P.M. Duiker', rating: 4 },
  { name: 'Anita te Gussinklo', rating: 4 },
  { name: 'F. Goede', rating: 4 },
  { name: 'Bianca Pieterse', rating: 4 },
  { name: 'Katja Bekasova', rating: 4 },
  { name: 'Margit Arendsen', rating: 4 },
  { name: 'Margreet Laan', rating: 4 },
  { name: 'Anonymous', rating: 4 },
];

async function updateRatings() {
  console.log(`Starting to update ${reviewsToUpdate.length} reviews to 4 stars...\n`)

  let successCount = 0
  let errorCount = 0
  const errors: Array<{ name: string; error: string }> = []

  for (const review of reviewsToUpdate) {
    try {
      // First, get the review ID by name
      const getResponse = await fetch(
        `${SUPABASE_URL}/rest/v1/reviews?name=eq.${encodeURIComponent(review.name)}&select=id,name,rating`,
        {
          method: 'GET',
          headers: {
            'apikey': SUPABASE_SERVICE_KEY,
            'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
          },
        }
      )

      if (!getResponse.ok) {
        throw new Error(`Failed to fetch review: ${await getResponse.text()}`)
      }

      const reviews = await getResponse.json()

      if (reviews.length === 0) {
        errorCount++
        errors.push({ name: review.name, error: 'Review not found' })
        console.log(`✗ Review not found: ${review.name}`)
        continue
      }

      if (reviews.length > 1) {
        console.log(`⚠ Multiple reviews found for ${review.name}, updating first match`)
      }

      const reviewId = reviews[0].id
      const currentRating = reviews[0].rating

      // Update the rating
      const updateResponse = await fetch(
        `${SUPABASE_URL}/rest/v1/reviews?id=eq.${reviewId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_SERVICE_KEY,
            'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
            'Prefer': 'return=minimal',
          },
          body: JSON.stringify({
            rating: review.rating,
          }),
        }
      )

      if (updateResponse.ok) {
        successCount++
        console.log(`✓ Updated ${review.name}: ${currentRating} → ${review.rating} stars (${successCount}/${reviewsToUpdate.length})`)
      } else {
        const errorText = await updateResponse.text()
        errorCount++
        errors.push({ name: review.name, error: errorText })
        console.error(`✗ Failed to update ${review.name}: ${errorText}`)
      }
    } catch (error) {
      errorCount++
      errors.push({ name: review.name, error: String(error) })
      console.error(`✗ Error updating ${review.name}:`, error)
    }

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 50))
  }

  console.log('\n--- Update Summary ---')
  console.log(`Total reviews to update: ${reviewsToUpdate.length}`)
  console.log(`✓ Successfully updated: ${successCount}`)
  console.log(`✗ Failed: ${errorCount}`)

  if (errors.length > 0) {
    console.log('\n--- Errors ---')
    errors.forEach(({ name, error }) => {
      console.log(`${name}: ${error}`)
    })
  }

  // Calculate new distribution
  console.log('\n--- New Rating Distribution (estimated) ---')
  console.log(`5 stars: ~${108 - reviewsToUpdate.length} reviews (${((108 - reviewsToUpdate.length) / 108 * 100).toFixed(1)}%)`)
  console.log(`4 stars: ~${reviewsToUpdate.length} reviews (${(reviewsToUpdate.length / 108 * 100).toFixed(1)}%)`)
  console.log(`Average rating: ~${((5 * (108 - reviewsToUpdate.length) + 4 * reviewsToUpdate.length) / 108).toFixed(2)}/5`)
}

updateRatings().catch(console.error)
