// Types for better TypeScript support
interface BreadcrumbItem {
  path: string;
  label: string;
  icon?: string;
}

/**
 * Composable for managing all application routes
 * Now uses database-driven treatment data with static page routes
 */
export const useRoutes = () => {
  // Static page routes
  const pages = {
    home: '/',
    about: '/over-mij',
    treatments: '/behandelingen',
    contact: '/contact',
    faq: '/faq',
    blog: '/blog',
    tarieven: '/tarieven',
    reviews: '/reviews',
  } as const;

  // Admin routes
  const admin = {
    dashboard: '/admin',
    login: '/admin/login',
    treatments: '/admin/treatments',
    reviews: '/admin/reviews',
    seoOverview: '/admin/seo-overview',
    docs: '/admin/docs',
  } as const;

  // Dynamic treatment data from database
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
    admin,
    slugToTitle,
  };
};

// Export types for better TypeScript support
export type PageRoutes = ReturnType<typeof useRoutes>['pages'];
export type AdminRoutes = ReturnType<typeof useRoutes>['admin'];
export type { BreadcrumbItem };
