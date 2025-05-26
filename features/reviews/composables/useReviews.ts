import type {
  Review,
  ReviewSubmission,
  ReviewStats,
  PaginatedReviews,
} from '~/types/reviews';

export const useReviews = () => {
  const supabase = useSupabaseClient();

  /**
   * Submit a new review (public endpoint)
   */
  const submitReview = async (
    reviewData: ReviewSubmission
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const { error } = await supabase.from('reviews').insert({
        ...reviewData,
        status: 'pending',
      });

      if (error) {
        console.error('Error submitting review:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('Error submitting review:', error);
      return { success: false, error: 'Er is een onverwachte fout opgetreden' };
    }
  };

  /**
   * Fetch approved reviews (public endpoint)
   */
  const getApprovedReviews = async (
    page = 1,
    limit = 6
  ): Promise<PaginatedReviews> => {
    try {
      const offset = (page - 1) * limit;

      // Get total count
      const { count } = await supabase
        .from('reviews')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'approved');

      // Get paginated reviews
      const { data: reviews, error } = await supabase
        .from('reviews')
        .select('id, name, treatment, rating, review, created_at')
        .eq('status', 'approved')
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) {
        throw error;
      }

      return {
        reviews: reviews || [],
        total: count || 0,
        page,
        limit,
        hasMore: (count || 0) > offset + limit,
      };
    } catch (error) {
      console.error('Error fetching approved reviews:', error);
      return {
        reviews: [],
        total: 0,
        page,
        limit,
        hasMore: false,
      };
    }
  };

  /**
   * Get review statistics (public endpoint)
   */
  const getReviewStats = async (): Promise<ReviewStats> => {
    try {
      const { data, error } = await supabase
        .from('review_stats')
        .select('*')
        .single();

      if (error) {
        throw error;
      }

      return {
        total: data.total || 0,
        approved: data.approved || 0,
        pending: data.pending || 0,
        rejected: data.rejected || 0,
        averageRating: parseFloat(data.average_rating) || 0,
      };
    } catch (error) {
      console.error('Error fetching review stats:', error);
      return {
        total: 0,
        approved: 0,
        pending: 0,
        rejected: 0,
        averageRating: 0,
      };
    }
  };

  return {
    submitReview,
    getApprovedReviews,
    getReviewStats,
  };
};
