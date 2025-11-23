# Review Migration Instructions

## Summary

Successfully uploaded **96 out of 108 reviews**. The remaining 12 reviews failed because they exceed the current database constraint of 1000 characters.

## Step 1: Update Database Constraint

You need to update the database constraint to allow longer reviews (up to 5000 characters).

### Option A: Via Supabase Dashboard

1. Go to your Supabase project: https://supabase.com/dashboard/project/vfzreuhvkifqkcbpdmio
2. Navigate to **SQL Editor**
3. Create a new query and paste the following SQL:

```sql
-- Drop the existing check constraint on the review column
ALTER TABLE reviews DROP CONSTRAINT IF EXISTS reviews_review_check;

-- Add a new check constraint with increased max length (5000 characters)
ALTER TABLE reviews ADD CONSTRAINT reviews_review_check
  CHECK (char_length(review) >= 10 AND char_length(review) <= 5000);
```

4. Click **Run** to execute the SQL

### Option B: Via Local SQL File

The SQL is also available in `scripts/update-review-constraint.sql`

## Step 2: Upload Remaining Reviews

Once the constraint is updated, run the migration script again to upload the remaining 12 reviews:

```bash
bun run migrate:reviews
```

## Failed Reviews (12 total)

These reviews are too long for the current 1000 character limit:

1. **Karina** - 1,713 characters
2. **Suzanne** - 1,763 characters
3. **Rob** (cat healing) - 1,241 characters
4. **P. V.** - 1,611 characters
5. **Margreet** (pregnancy) - 1,267 characters
6. **Sabina.B.E** (Serbia, remote healing) - 1,547 characters
7. **Rebecca** - 1,277 characters
8. **Corinne** - 1,024 characters
9. **Timka Malic** (brain tumor story) - 4,041 characters ⚠️
10. **E.Resad** (diabetes) - 1,438 characters
11. **B.Edisa** (gallbladder) - 1,138 characters
12. **Ema** (allergies) - 1,005 characters

## Already Uploaded

96 reviews have been successfully uploaded to the database with status "approved".

## Files Created

- `reviews-migration.json` - All 108 parsed reviews
- `scripts/upload-reviews.ts` - Upload script
- `scripts/check-review-lengths.ts` - Length validation script
- `scripts/update-review-constraint.sql` - SQL migration
- `package.json` - Added `migrate:reviews` script

## Code Changes

Updated `server/api/reviews/index.post.ts`:
- Changed max review length from 1000 to 5000 characters in validation schema
