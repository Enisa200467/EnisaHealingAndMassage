-- Drop the existing check constraint on the review column
ALTER TABLE reviews DROP CONSTRAINT IF EXISTS reviews_review_check;

-- Add a new check constraint with increased max length (5000 characters)
ALTER TABLE reviews ADD CONSTRAINT reviews_review_check
  CHECK (char_length(review) >= 10 AND char_length(review) <= 5000);

-- Verify the constraint was added
SELECT constraint_name, check_clause
FROM information_schema.check_constraints
WHERE constraint_name = 'reviews_review_check';
