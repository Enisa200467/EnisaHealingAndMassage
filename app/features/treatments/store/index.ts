import type { Database } from '~/types/database.types';

type Treatment = Database['public']['Tables']['treatments']['Row'];

export interface TreatmentData {
  slug: string;
  path: string;
  title: string;
  description?: string;
  category?: string;
  icon?: string;
  intensity?: number;
  intensityLabel?: string;
  duration?: string;
  price?: string;
  display_order?: number;
}

interface TreatmentCategory {
  title: string;
  type: TreatmentType;
  items: TreatmentData[];
}

type TreatmentType = 'healing' | 'massage';

export const useTreatmentStore = defineStore('treatments', () => {
  const supabase = useSupabaseClient<Database>();

  // Reactive state
  const treatments = ref<Treatment[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Computed treatment categories
  const treatmentCategories = computed<TreatmentCategory[]>(() => {
    const categories: TreatmentCategory[] = [];

    // Group active treatments by category
    const activeTreatments = treatments.value.filter((t) => t.is_active);

    activeTreatments.forEach((treatment) => {
      const category = treatment.category || 'other';

      const existingCategory = categories.find(
        (cat) => cat.type === category.toLocaleLowerCase()
      );

      if (!existingCategory) {
        categories.push({
          title: getCategoryTitle(category),
          items: [formatTreatment(treatment)],
          type: category as TreatmentType,
        });
      } else {
        existingCategory.items.push(formatTreatment(treatment));
      }
    });

    // Sort items within each category by display_order
    Object.values(categories).forEach((category) => {
      category.items.sort(
        (a, b) => (a.display_order || 0) - (b.display_order || 0)
      );
    });

    return categories;
  });

  const healingTreatments = computed(() => {
    return (
      treatmentCategories.value.filter((cat) => cat.type === 'healing')[0]
        ?.items || []
    );
  });

  const massageTreatments = computed(() => {
    return (
      treatmentCategories.value.filter((cat) => cat.type === 'massage')[0]
        ?.items || []
    );
  });
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
    category: treatment.category || undefined,
    icon: treatment.icon || undefined,
    intensity: treatment.intensity || undefined,
    intensityLabel: treatment.intensity_label || undefined,
    duration: formatDuration(treatment.duration_minutes),
    price: formatPrice(treatment.price_cents),
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

  const getTreatmentById = (id: string): TreatmentData | undefined => {
    const treatment = treatments.value.find((t) => t.id === id && t.is_active);
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
    healingTreatments: healingTreatments,
    massageTreatments: massageTreatments,

    // Computed
    treatmentCategories: treatmentCategories,

    // Methods
    fetchTreatments,
    getTreatmentBySlug,
    getTreatmentById,
    treatmentExists,
    getTreatmentPath,
    getAllTreatmentPaths,
    formatTreatment,
  };
});
