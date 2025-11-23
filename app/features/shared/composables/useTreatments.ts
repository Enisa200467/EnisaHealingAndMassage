import type { Database } from '~/types/database.types';

type Treatment = Database['public']['Tables']['treatments']['Row'];

interface TreatmentData {
  slug: string;
  path: string;
  title: string;
  description?: string;
  icon?: string;
  intensity?: number;
  intensityLabel?: string;
  duration?: string;
  price?: string;
  display_order?: number;
}

/**
 * Composable for managing treatment data from Supabase
 * Provides dynamic treatment routes and categories
 */
export const useTreatments = () => {
  const supabase = useSupabaseClient<Database>();

  // Reactive state
  const treatments = ref<Treatment[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const formatDuration = (minutes: number): string => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      if (remainingMinutes === 0) {
        return `${hours} ${hours === 1 ? 'uur' : 'uur'}`;
      }
      return `${hours}u ${remainingMinutes}min`;
    }
    return `${minutes} minuten`;
  };

  const formatPrice = (priceCents: number): string => {
    return `€ ${(priceCents / 100).toFixed(0)}`;
  };
  // Format treatment for consistent interface
  const formatTreatment = (treatment: Treatment): TreatmentData => ({
    slug: treatment.slug,
    path: `/behandelingen/${treatment.slug}`,
    title: treatment.name,
    description: treatment.description || undefined,
    icon: treatment.icon || undefined,
    intensity: treatment.intensity || undefined,
    intensityLabel: treatment.intensity_label || undefined,
    duration: formatDuration(treatment.duration_minutes),
    price: formatPrice(treatment.price_cents),
    display_order: treatment.display_order,
  });

  // Fetch treatments from Supabase
  const fetchTreatments = async (): Promise<void> => {
    try {
      loading.value = true;
      error.value = null;

      const { data, error: fetchError } = await supabase
        .from('treatments')
        .select('*')
        .order('display_order', { ascending: true });

      if (fetchError) throw fetchError;
      treatments.value = data;
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : 'Failed to fetch treatments';
      console.error('Error fetching treatments:', err);
    } finally {
      loading.value = false;
    }
  };

  // Get treatment by slug
  const getTreatmentBySlug = (slug: string): TreatmentData | undefined => {
    const treatment = treatments.value.find(
      (t) => t.slug === slug && t.is_active
    );
    return treatment ? formatTreatment(treatment) : undefined;
  };

  // Check if treatment exists
  const treatmentExists = (slug: string): boolean => {
    return treatments.value.some((t) => t.slug === slug && t.is_active);
  };

  // Generate treatment path
  const getTreatmentPath = (slug: string): string => {
    return `/behandelingen/${slug}`;
  };

  // Get all treatment paths for navigation
  const getAllTreatmentPaths = (): string[] => {
    return treatments.value
      .filter((t) => t.is_active)
      .map((t) => `/behandelingen/${t.slug}`);
  };

  return {
    // State
    treatments: treatments,
    loading: loading,
    error: error,

    // Methods
    fetchTreatments,
    getTreatmentBySlug,
    treatmentExists,
    getTreatmentPath,
    getAllTreatmentPaths,
    formatTreatment,
  };
};

// Export types
export type { TreatmentData };
