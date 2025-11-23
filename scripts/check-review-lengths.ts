import reviews from '../reviews-migration.json'

const failedNames = [
  'Karina',
  'Suzanne',
  'Rob',
  'P. V.',
  'Margreet',
  'Sabina.B.E',
  'Rebecca',
  'Corinne',
  'Timka Malic',
  'E.Resad',
  'B.Edisa',
  'Ema'
]

console.log('Reviews exceeding 1000 characters:\n')

for (const review of reviews as any[]) {
  if (failedNames.includes(review.name)) {
    const length = review.review.length
    console.log(`${review.name}: ${length} characters`)
    if (length > 1000) {
      console.log(`  Exceeds by: ${length - 1000} characters`)
    }
  }
}
