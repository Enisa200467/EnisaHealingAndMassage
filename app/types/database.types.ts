export interface Database {
  public: {
    Tables: {
      treatments: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          duration_minutes: number;
          price_cents: number;
          intensity: number | null;
          intensity_label: string | null;
          icon: string | null;
          category: string | null;
          is_active: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          duration_minutes: number;
          price_cents: number;
          intensity?: number | null;
          intensity_label?: string | null;
          icon?: string | null;
          category?: string | null;
          is_active?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          duration_minutes?: number;
          price_cents?: number;
          intensity?: number | null;
          intensity_label?: string | null;
          icon?: string | null;
          category?: string | null;
          is_active?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      reviews: {
        Row: {
          id: string;
          name: string;
          email: string;
          treatment: string | null;
          rating: number;
          review: string;
          status: string;
          created_at: string;
          updated_at: string;
          reviewed_at: string | null;
          reviewed_by: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          treatment?: string | null;
          rating: number;
          review: string;
          status?: string;
          created_at?: string;
          updated_at?: string;
          reviewed_at?: string | null;
          reviewed_by?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          treatment?: string | null;
          rating?: number;
          review?: string;
          status?: string;
          created_at?: string;
          updated_at?: string;
          reviewed_at?: string | null;
          reviewed_by?: string | null;
        };
      };
    };
  };
}
