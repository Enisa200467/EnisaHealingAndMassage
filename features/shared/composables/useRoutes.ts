// Types for better TypeScript support
interface BreadcrumbItem {
  path: string;
  label: string;
  icon?: string;
}

interface TreatmentData {
  id: string;
  name: string;
  slug: string;
  description?: string;
  duration_minutes: number;
  price_cents: number;
  price_formatted: string;
  duration_formatted: string;
  intensity?: number;
  intensity_label?: string;
  icon?: string;
  category?: string;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

/**
 * Composable for managing all application routes
 * Now uses database-driven treatment data with static page routes
 */
export const useRoutes = () => {
  const { fetchAllTreatments } = useTreatmentData();

  // Static page routes
  const pages = {
    home: '/',
    about: '/over-mij',
    treatments: '/behandelingen',
    contact: '/contact',
    booking: '/boeken',
    faq: '/faq',
    blog: '/blog',
    tarieven: '/tarieven',
    reviews: '/reviews',
  } as const;

  // Dynamic treatment data from database
  const treatmentData = ref<TreatmentData[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Fetch treatments from database
  const fetchTreatments = async () => {
    if (loading.value) return;

    try {
      loading.value = true;
      error.value = null;
      treatmentData.value = await fetchAllTreatments();
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : 'Failed to fetch treatments';
      console.error('Error fetching treatments for routes:', err);
    } finally {
      loading.value = false;
    }
  };

  // Auto-fetch treatments on initialization
  if (import.meta.client) {
    fetchTreatments();
  }

  // Computed treatments organized by category
  const treatments = computed(() => {
    const healingItems = treatmentData.value
      .filter((t: TreatmentData) => t.category === 'healing')
      .map((t: TreatmentData) => ({
        slug: t.slug,
        path: `/behandelingen/${t.slug}`,
        title: t.name,
        description: t.description || '',
        icon: t.icon || 'i-mdi-sparkles',
        price: t.price_formatted,
        duration: t.duration_formatted,
      }));

    const massageItems = treatmentData.value
      .filter((t: TreatmentData) => t.category === 'massage')
      .map((t: TreatmentData) => ({
        slug: t.slug,
        path: `/behandelingen/${t.slug}`,
        title: t.name,
        description: t.description || '',
        icon: t.icon || 'i-mdi-spa',
        price: t.price_formatted,
        duration: t.duration_formatted,
      }));

    return {
      healing: {
        title: 'Healing',
        items: healingItems,
      },
      massage: {
        title: 'Massage',
        items: massageItems,
      },
    };
  });

  /**
   * Converts a slug string to a properly formatted title
   * (e.g. 'chakra-balancering' → 'Chakra Balancering')
   */
  const slugToTitle = (slug: string): string => {
    return slug
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return {
    pages,
    treatments,
    slugToTitle,
    // Expose treatment state for components that need it
    loading: readonly(loading),
    error: readonly(error),
    refresh: fetchTreatments,
  };
};

// Export types for better TypeScript support
export type PageRoutes = ReturnType<typeof useRoutes>['pages'];
export type TreatmentRoutes = ReturnType<typeof useRoutes>['treatments'];
export type { BreadcrumbItem };
