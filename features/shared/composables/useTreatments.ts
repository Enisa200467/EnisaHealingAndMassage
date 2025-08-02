import type { Database } from '~/types/database.types';

type Treatment = Database['public']['Tables']['treatments']['Row'];

interface TreatmentData {
  slug: string;
  path: string;
  title: string;
  description?: string;
  category?: string;
  icon?: string;
  intensity?: number;
  intensityLabel?: string;
  duration?: number;
  price?: number;
  display_order?: number;
}

interface TreatmentCategory {
  title: string;
  items: TreatmentData[];
}

interface TreatmentCategories {
  [key: string]: TreatmentCategory;
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

  // Computed treatment categories
  const treatmentCategories = computed<TreatmentCategories>(() => {
    const categories: TreatmentCategories = {};

    // Group active treatments by category
    const activeTreatments = treatments.value.filter((t) => t.is_active);

    activeTreatments.forEach((treatment) => {
      const category = treatment.category || 'other';

      if (!categories[category]) {
        categories[category] = {
          title: getCategoryTitle(category),
          items: [],
        };
      }

      categories[category].items.push(formatTreatment(treatment));
    });

    // Sort items within each category by display_order
    Object.values(categories).forEach((category) => {
      category.items.sort(
        (a, b) => (a.display_order || 0) - (b.display_order || 0)
      );
    });

    return categories;
  });

  // Format treatment for consistent interface
  const formatTreatment = (treatment: Treatment): TreatmentData => ({
    slug: treatment.slug,
    path: `/behandelingen/${treatment.slug}`,
    title: treatment.name,
    description: treatment.description || undefined,
    category: treatment.category || undefined,
    icon: treatment.icon || undefined,
    intensity: treatment.intensity || undefined,
    intensityLabel: treatment.intensity_label || undefined,
    duration: treatment.duration_minutes,
    price: treatment.price_cents ? treatment.price_cents / 100 : undefined,
    display_order: treatment.display_order,
  });

  // Get category title with proper formatting
  const getCategoryTitle = (category: string): string => {
    const titleMap: Record<string, string> = {
      healing: 'Healing',
      massage: 'Massage',
      therapy: 'Therapie',
      other: 'Overig',
    };

    return (
      titleMap[category] || category.charAt(0).toUpperCase() + category.slice(1)
    );
  };

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

      treatments.value = data || [];
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

  // Backwards compatibility - provide treatments in old format
  const compatibleTreatments = computed(() => {
    const healing = treatmentCategories.value.healing || {
      title: 'Healing',
      items: [],
    };
    const massage = treatmentCategories.value.massage || {
      title: 'Massage',
      items: [],
    };

    return {
      healing,
      massage,
    };
  });

  return {
    // State
    treatments: readonly(treatments),
    loading: readonly(loading),
    error: readonly(error),

    // Computed
    treatmentCategories: readonly(treatmentCategories),
    compatibleTreatments: readonly(compatibleTreatments),

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
export type { TreatmentData, TreatmentCategory, TreatmentCategories };
