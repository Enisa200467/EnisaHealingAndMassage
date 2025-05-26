import type { Review, ReviewStats, PaginatedReviews } from '~/types/reviews';

export const useAdminReviews = () => {
  /**
   * Get all reviews with optional filtering (admin only)
   */
  const getAllReviews = async (
    page = 1,
    limit = 10,
    status?: 'pending' | 'approved' | 'rejected'
  ): Promise<PaginatedReviews> => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(status && { status }),
      });

      const { data } = await $fetch<{ data: PaginatedReviews }>(
        `/api/admin/reviews?${params}`
      );
      return data;
    } catch (error) {
      console.error('Error fetching all reviews:', error);
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
   * Update review status (admin only)
   */
  const updateReviewStatus = async (
    reviewId: string,
    status: 'approved' | 'rejected',
    adminEmail: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      await $fetch(`/api/admin/reviews/${reviewId}`, {
        method: 'PATCH',
        body: {
          status,
          reviewed_by: adminEmail,
          reviewed_at: new Date().toISOString(),
        },
      });

      return { success: true };
    } catch (error: any) {
      console.error('Error updating review status:', error);
      return {
        success: false,
        error: error.data?.message || 'Er is een fout opgetreden',
      };
    }
  };

  /**
   * Delete review (admin only)
   */
  const deleteReview = async (
    reviewId: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      await $fetch(`/api/admin/reviews/${reviewId}`, {
        method: 'DELETE',
      });

      return { success: true };
    } catch (error: any) {
      console.error('Error deleting review:', error);
      return {
        success: false,
        error: error.data?.message || 'Er is een fout opgetreden',
      };
    }
  };

  /**
   * Get detailed review statistics (admin only)
   */
  const getDetailedStats = async (): Promise<ReviewStats> => {
    try {
      const { data } = await $fetch<{ data: ReviewStats }>(
        '/api/admin/reviews/stats'
      );
      return data;
    } catch (error) {
      console.error('Error fetching detailed stats:', error);
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
    getAllReviews,
    updateReviewStatus,
    deleteReview,
    getDetailedStats,
  };
};
