const SUPABASE_URL = process.env.SUPABASE_URL || 'https://vfzreuhvkifqkcbpdmio.supabase.co'
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SECRET_KEY

if (!SUPABASE_SERVICE_KEY) {
  console.error('Error: SUPABASE_SECRET_KEY environment variable is required')
  process.exit(1)
}

async function checkDuplicates() {
  console.log('Checking for duplicate reviews...\n')

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/reviews?select=id,name,email,created_at,review&limit=1000`, {
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

    console.log(`Total reviews in database: ${reviews.length}\n`)

    // Check for duplicates by name
    const nameCount = new Map<string, any[]>()

    for (const review of reviews) {
      if (!nameCount.has(review.name)) {
        nameCount.set(review.name, [])
      }
      nameCount.get(review.name)!.push(review)
    }

    // Find duplicates
    const duplicates = Array.from(nameCount.entries())
      .filter(([_, reviews]) => reviews.length > 1)
      .sort((a, b) => b[1].length - a[1].length)

    if (duplicates.length === 0) {
      console.log('✅ No duplicates found!')
      return
    }

    console.log(`⚠️  Found ${duplicates.length} names with multiple reviews:\n`)

    for (const [name, reviewsList] of duplicates) {
      console.log(`\n📝 ${name} (${reviewsList.length} reviews):`)
      reviewsList.forEach((review, idx) => {
        console.log(`   ${idx + 1}. ID: ${review.id.substring(0, 8)}... | Date: ${new Date(review.created_at).toLocaleDateString('nl-NL')} | Preview: ${review.review.substring(0, 50)}...`)
      })
    }

    console.log(`\n\n📊 Summary:`)
    console.log(`Total unique names: ${nameCount.size}`)
    console.log(`Names with duplicates: ${duplicates.length}`)
    console.log(`Total duplicate entries: ${reviews.length - nameCount.size}`)
    console.log(`\nExpected from original data: 108 reviews`)
    console.log(`Actual in database: ${reviews.length} reviews`)

  } catch (error) {
    console.error('Error checking duplicates:', error)
  }
}

checkDuplicates().catch(console.error)
