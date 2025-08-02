// Types for better TypeScript support
interface BreadcrumbItem {
  label: string;
  path: string;
  icon: string;
}

/**
 * Composable for managing all application routes
 * Provides centralized access to static page routes and dynamic treatment routes.
 * Now integrates with Supabase treatment data for dynamic content.
 */
export const useRoutes = () => {
  const { compatibleTreatments, fetchTreatments, loading, error } =
    useTreatments();

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

  // Static treatment routes - used as fallback when dynamic data is not available
  const staticTreatments = {
    healing: {
      title: 'Healing',
      items: [
        {
          slug: 'chakra-balancering',
          path: '/behandelingen/chakra-balancering',
          title: 'Chakra Balancering',
          description: 'Balancing your chakras for holistic well-being.',
          icon: 'i-mdi-meditation',
        },
        {
          slug: 'energetische-healing-sessie',
          path: '/behandelingen/energetische-healing-sessie',
          title: 'Energetische Healing Sessie',
          description: 'Energy healing session to restore balance.',
          icon: 'i-mdi-sparkles',
        },
      ],
    },
    massage: {
      title: 'Massage',
      items: [
        {
          slug: 'intuitieve-lichaamsmassage',
          path: '/behandelingen/intuitieve-lichaamsmassage',
          title: 'Intuitieve Lichaamsmassage',
          description: 'Intuitive body massage for relaxation and healing.',
          icon: 'i-mdi-heart-pulse',
        },
        {
          slug: 'klassieke-ontspanningsmassage',
          path: '/behandelingen/klassieke-ontspanningsmassage',
          title: 'Klassieke Ontspanningsmassage',
          description: 'Classic relaxation massage to relieve tension.',
          icon: 'i-mdi-spa',
        },
        {
          slug: 'sportmassage',
          path: '/behandelingen/sportmassage',
          title: 'Sportmassage',
          description: 'Sports massage for athletes and active individuals.',
          icon: 'i-mdi-run',
        },
        {
          slug: 'zweedse-massage',
          path: '/behandelingen/zweedse-massage',
          title: 'Zweedse Massage',
          description: 'Swedish massage for deep relaxation.',
          icon: 'i-mdi-leaf',
        },
      ],
    },
  } as const;

  // Use dynamic treatments with proper fallback handling
  const treatments = computed(() => {
    // Always provide a safe fallback structure
    const safeHealingItems = compatibleTreatments.value?.healing?.items || [];
    const safeMassageItems = compatibleTreatments.value?.massage?.items || [];

    return {
      healing: {
        title: 'Healing',
        items:
          safeHealingItems.length > 0
            ? safeHealingItems
            : staticTreatments.healing.items,
      },
      massage: {
        title: 'Massage',
        items:
          safeMassageItems.length > 0
            ? safeMassageItems
            : staticTreatments.massage.items,
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

  // Initialize treatment data if not already loaded
  // Make sure to fetch treatments on both client and server side
  if (!loading.value && !error.value) {
    fetchTreatments();
  }

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
