# Review Stats Counter Fix

## Problem

The "Gepubliceerde reviews" counter on the reviews page was only showing **6 reviews** instead of the total **108 reviews**.

### Root Cause

The `reviewStatsForOverview` computed property was calculating stats from `allReviews.value`, which only contained the currently loaded reviews from pagination (initially 6 reviews), not all approved reviews.

```typescript
// BEFORE (Incorrect)
const reviewStatsForOverview = computed(() => {
  return {
    '1': allReviews.value.filter((r) => r.rating === 1).length,  // Only counts loaded reviews
    '2': allReviews.value.filter((r) => r.rating === 2).length,
    '3': allReviews.value.filter((r) => r.rating === 3).length,
    '4': allReviews.value.filter((r) => r.rating === 4).length,
    '5': allReviews.value.filter((r) => r.rating === 5).length,
  };
});
```

### Why It Happened

- `allReviews.value` is populated from paginated API calls (6 reviews per page)
- The stats component needs the total count of ALL approved reviews
- The pagination system only loads reviews as needed ("load more" button)

## Solution

Created a separate data fetch that loads ALL approved reviews (up to 1000) to calculate accurate rating breakdown stats.

```typescript
// AFTER (Correct)
// Fetch rating breakdown from stats API
const { data: ratingBreakdown } = await useAsyncData(
  'review-rating-breakdown',
  async () => {
    try {
      const response = await $fetch<{ data: { reviews: Review[] } }>('/api/reviews?limit=1000');
      const allApprovedReviews = response.data.reviews;

      return {
        '1': allApprovedReviews.filter((r) => r.rating === 1).length,
        '2': allApprovedReviews.filter((r) => r.rating === 2).length,
        '3': allApprovedReviews.filter((r) => r.rating === 3).length,
        '4': allApprovedReviews.filter((r) => r.rating === 4).length,
        '5': allApprovedReviews.filter((r) => r.rating === 5).length,
      };
    } catch (error) {
      console.error('Error fetching rating breakdown:', error);
      return {
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 0,
      };
    }
  }
);

const reviewStatsForOverview = computed(() => {
  return ratingBreakdown.value || {
    '1': 0,
    '2': 0,
    '3': 0,
    '4': 0,
    '5': 0,
  };
});
```

## Changes Made

**File Modified**: `app/features/reviews/ReviewsPage.vue`

### What Changed:
1. Added new `useAsyncData` call to fetch all approved reviews
2. Calculates rating breakdown from complete dataset
3. Uses computed property to safely access the data
4. Includes error handling for failed API calls

### Benefits:
- ✅ **Accurate total count**: Shows all 108 reviews
- ✅ **Correct distribution**: Shows accurate breakdown (76 × 5-star, 32 × 4-star)
- ✅ **Proper average**: Displays correct 4.7/5 average rating
- ✅ **Performance**: Cached by Nuxt's useAsyncData (only fetches once on page load)
- ✅ **Separate concerns**: Stats calculation independent from pagination

## Current Stats Display

After the fix, the ReviewStats component now correctly shows:

- **Average Rating**: 4.7 ⭐
- **Total Reviews**: 108
- **Recommendation Rate**: 100% (all reviews are 4-5 stars)

### Rating Breakdown:
- 5 stars: 76 reviews (70.4%)
- 4 stars: 32 reviews (29.6%)
- 3 stars: 0 reviews
- 2 stars: 0 reviews
- 1 star: 0 reviews

## Performance Considerations

### API Call Overhead
The solution adds one additional API call on page load:
```
GET /api/reviews?limit=1000
```

### Optimization Notes:
1. **Cached by Nuxt**: `useAsyncData` caches the result
2. **SSR-friendly**: Runs on server during SSR, no client-side delay
3. **Small dataset**: 108 reviews is a small payload (~50KB)
4. **One-time fetch**: Only fetches once per page visit
5. **Parallel loading**: Loads in parallel with paginated reviews

### Alternative Approaches Considered:

1. ❌ **Use stats API endpoint** - Doesn't provide rating breakdown by star count
2. ❌ **Accumulate during pagination** - Stats would be wrong until all pages loaded
3. ❌ **Client-side aggregation** - Wouldn't work for SSR/first paint
4. ✅ **Separate fetch for stats** - Clean, accurate, SSR-compatible

## Testing

After the fix:
- [x] Visit `/reviews` page
- [x] Check "Gepubliceerde reviews" counter shows 108
- [x] Verify rating distribution shows correct counts
- [x] Confirm average rating displays as 4.7
- [x] Test pagination still works (loads 6 at a time)
- [x] Verify stats don't change when loading more reviews

## Future Improvements

If the review count grows significantly (1000+), consider:

1. **Add dedicated stats endpoint**: Create `/api/reviews/breakdown`
2. **Database aggregation**: Calculate stats in database query
3. **Caching**: Add Redis/memory cache for stats calculation
4. **Incremental updates**: Update stats when reviews are added/approved

For now, fetching 108-1000 reviews for stats is perfectly acceptable.

---

**Status**: ✅ Fixed and deployed
**Impact**: High - Correct stats are crucial for trust and credibility
