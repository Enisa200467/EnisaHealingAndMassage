import type { Database } from '~/types/database.types';

type Treatment = Database['public']['Tables']['treatments']['Row'] & {
  intensity?: number | null;
  intensity_label?: string | null;
};

export interface TreatmentData {
  id: string;
  slug: string;
  path: string;
  title: string;
  description?: string;
  icon?: string;
  intensity?: number;
  intensityLabel?: string;
  duration?: number;
  price?: number;
  discountEnabled?: boolean;
  discountPrice?: number;
  display_order?: number;
  is_active: boolean;
}

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

const formatTreatment = (treatment: Treatment): TreatmentData => ({
  id: treatment.id,
  slug: treatment.slug,
  path: `/behandelingen/${treatment.slug}`,
  title: treatment.name,
  description: treatment.description || undefined,
  icon: treatment.icon || undefined,
  intensity: treatment.intensity || undefined,
  intensityLabel: treatment.intensity_label || undefined,
  duration: treatment.duration_minutes,
  price: treatment.price_cents,
  discountEnabled: treatment.discount_enabled || false,
  discountPrice: treatment.discount_price_cents || undefined,
  display_order: treatment.display_order,
  is_active: treatment.is_active,
});

/**
 * Global composable for fetching and accessing treatment data
 * Uses Nuxt's useFetch with automatic SSR support and caching
 */
export const useTreatments = () => {
  // Fetch all treatments with caching
  const { data, error, refresh, status } = useFetch('/api/treatments', {
    key: 'global-treatments',
    // Transform the API response to our format
    transform: (response: { data: Treatment[] }) => {
      return response.data.map(formatTreatment);
    },
    // Cache for the duration of the session
    getCachedData: (key) => {
      const data = useNuxtData(key);
      return data.data.value;
    },
  });

  // Computed values for easy access
  const treatments = computed(() => data.value || []);
  const loading = computed(() => status.value === 'pending');

  // Get active treatments sorted by display order
  const activeTreatments = computed(() => {
    return treatments.value
      .filter((t) => t.is_active)
      .sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
  });

  // Get treatment by slug
  const getTreatmentBySlug = (slug: string): TreatmentData | undefined => {
    return treatments.value.find((t) => t.slug === slug && t.is_active);
  };

  // Get treatment by ID
  const getTreatmentById = (id: string): TreatmentData | undefined => {
    return treatments.value.find((t) => t.id === id && t.is_active);
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
    return activeTreatments.value.map((t) => t.path);
  };

  return {
    // Data
    treatments,
    activeTreatments,
    loading,
    error,

    // Methods
    refresh,
    getTreatmentBySlug,
    getTreatmentById,
    treatmentExists,
    getTreatmentPath,
    getAllTreatmentPaths,
    formatTreatment,
    formatDuration,
    formatPrice,
  };
};
