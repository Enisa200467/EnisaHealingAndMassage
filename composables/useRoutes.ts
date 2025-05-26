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
  } as const;

  // Static treatment routes
  const treatments = {
    healing: {
      title: 'Healing',
      items: [
        {
          slug: 'chakra-balancering',
          path: '/behandelingen/chakra-balancering',
          title: 'Chakra Balancering',
          description: 'Balancing your chakras for holistic well-being.',
          icon: 'healing-chakra',
        },
        {
          slug: 'energetische-healing-sessie',
          path: '/behandelingen/energetische-healing-sessie',
          title: 'Energetische Healing Sessie',
          description: 'Energy healing session to restore balance.',
          icon: 'healing-energy',
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
          icon: 'massage-intuitive',
        },
        {
          slug: 'klassieke-ontspanningsmassage',
          path: '/behandelingen/klassieke-ontspanningsmassage',
          title: 'Klassieke Ontspanningsmassage',
          description: 'Classic relaxation massage to relieve tension.',
          icon: 'massage-classic',
        },
        {
          slug: 'sportmassage',
          path: '/behandelingen/sportmassage',
          title: 'Sportmassage',
          description: 'Sports massage for athletes and active individuals.',
          icon: 'massage-sport',
        },
        {
          slug: 'zweedse-massage',
          path: '/behandelingen/zweedse-massage',
          title: 'Zweedse Massage',
          description: 'Swedish massage for deep relaxation.',
          icon: 'massage-swedish',
        },
      ],
    },
  } as const;

  return {
    pages,
    treatments,
  };
};

// Export types for better TypeScript support
export type PageRoutes = ReturnType<typeof useRoutes>['pages'];
export type TreatmentRoutes = ReturnType<typeof useRoutes>['treatments'];
export type { BreadcrumbItem, TreatmentData };
