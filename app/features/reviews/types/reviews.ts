export interface Review {
  id: string;
  name: string;
  email: string;
  treatment?: string;
  rating: number;
  review: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
  reviewed_at?: string;
  reviewed_by?: string;
}

export interface ReviewSubmission {
  name: string;
  email: string;
  treatment?: string;
  rating: number;
  review: string;
}

export interface ReviewStats {
  total: number;
  approved: number;
  pending: number;
  rejected: number;
  averageRating: number;
}

export interface PaginatedReviews {
  reviews: Review[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
