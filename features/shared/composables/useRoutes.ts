// Types for better TypeScript support
interface BreadcrumbItem {
  label: string;
  path: string;
  icon: string;
}

interface TreatmentData {
  slug?: string;
  path: string;
  title: string;
  _file?: string;
  description?: string;
  category?: string;
  icon?: string;
}

/**
 * Composable for managing all application routes
 * Provides centralized access to static page routes and treatment routes.
 */
export const useRoutes = () => {
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

  // Static treatment routes
  const treatments = {
    healing: {
      title: 'Healing',
      items: [
        {
          slug: 'chakra-healing',
          path: '/behandelingen/chakra-healing',
          title: 'Chakra Healing',
          description: 'Healing your chakras for holistic well-being.',
          icon: 'i-mdi-meditation',
        },
        {
          slug: 'energetische-healing-sessie',
          path: '/behandelingen/energetische-healing-sessie',
          title: 'Energetische Healing Sessie',
          description: 'Energy healing session to restore balance.',
          icon: 'i-mdi-sparkles',
        },
        {
          slug: 'healing-op-afstand',
          path: '/behandelingen/healing-op-afstand',
          title: 'Healing op Afstand',
          description: 'Powerful distance healing from your own home.',
          icon: 'i-mdi-earth',
        },
      ],
    },
    massage: {
      title: 'Massage',
      items: [
        {
          slug: 'ontspanningsmassage',
          path: '/behandelingen/ontspanningsmassage',
          title: 'Ontspanningsmassage',
          description: 'Classic relaxation massage to relieve tension.',
          icon: 'i-mdi-spa',
        },
      ],
    },
  } as const;

  /**
   * Converts a slug string to a properly formatted title
   * (e.g. 'chakra-healing' → 'Chakra Healing')
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
  };
};

// Export types for better TypeScript support
export type PageRoutes = ReturnType<typeof useRoutes>['pages'];
export type TreatmentRoutes = ReturnType<typeof useRoutes>['treatments'];
export type { BreadcrumbItem, TreatmentData };
