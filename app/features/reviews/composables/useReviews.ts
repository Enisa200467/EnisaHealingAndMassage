import type {
  Review,
  ReviewSubmission,
  ReviewStats,
  PaginatedReviews,
} from '~/types/reviews';

export const useReviews = () => {
  /**
   * Submit a new review (public endpoint)
   */
  const submitReview = async (
    reviewData: ReviewSubmission
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      await $fetch('/api/reviews', {
        method: 'POST',
        body: reviewData,
      });

      return { success: true };
    } catch (error: any) {
      console.error('Error submitting review:', error);
      return {
        success: false,
        error: error.data?.message || 'Er is een onverwachte fout opgetreden',
      };
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
      const response = await $fetch<{ data: PaginatedReviews }>(
        '/api/reviews',
        {
          query: { page, limit },
        }
      );

      return response.data;
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
      const response = await $fetch<{ data: ReviewStats }>(
        '/api/reviews/stats'
      );
      return response.data;
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
