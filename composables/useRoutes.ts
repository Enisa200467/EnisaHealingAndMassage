// Types for better TypeScript support
interface TreatmentData {
  slug?: string;
  _path: string;
  title: string;
  _file?: string;
  description?: string;
  category?: string;
  icon?: string;
}

interface FullTreatmentContent {
  title: string;
  description?: string;
  category?: string;
  icon?: string;
}

interface BreadcrumbItem {
  label: string;
  path: string;
  icon: string;
}

/**
 * Composable for managing all application routes
 * Provides centralized access to both static page routes and dynamic treatment routes
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

  // Treatment base path
  const treatmentBasePath = '/behandelingen';

  // Available treatments (manually maintained for now, but could be dynamic)
  const treatments = {
    'chakra-balancering': `${treatmentBasePath}/chakra-balancering`,
    'klassieke-ontspanningsmassage': `${treatmentBasePath}/klassieke-ontspanningsmassage`,
    'energetische-healing-sessie': `${treatmentBasePath}/energetische-healing-sessie`,
    'zweedse-massage': `${treatmentBasePath}/zweedse-massage`,
    sportmassage: `${treatmentBasePath}/sportmassage`,
    'intuitieve-lichaamsmassage': `${treatmentBasePath}/intuitieve-lichaamsmassage`,
  } as const;

  // Get all treatment paths as an array
  const getAllTreatmentPaths = () => {
    return Object.values(treatments);
  };

  // Get treatment path by slug
  const getTreatmentPath = (slug: string) => {
    return (
      treatments[slug as keyof typeof treatments] ||
      `${treatmentBasePath}/${slug}`
    );
  };

  // Check if a treatment exists
  const treatmentExists = (slug: string) => {
    return slug in treatments;
  };

  // Get all page paths as an array
  const getAllPagePaths = () => {
    return Object.values(pages);
  };

  // Validate if a route exists (simplified check)
  const routeExists = (path: string): boolean => {
    const allRoutes = [...getAllPagePaths(), ...getAllTreatmentPaths()];
    return allRoutes.some((route) => route === path);
  };

  // Generate breadcrumbs for a given path
  const generateBreadcrumbs = (currentPath: string): BreadcrumbItem[] => {
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Home', path: pages.home, icon: 'i-heroicons-home' },
    ];

    // Handle treatment pages
    if (currentPath.startsWith(treatmentBasePath)) {
      breadcrumbs.push({
        label: 'Behandelingen',
        path: pages.treatments,
        icon: 'i-heroicons-sparkles',
      });

      // If it's a specific treatment
      if (currentPath !== pages.treatments) {
        const slug = currentPath.replace(`${treatmentBasePath}/`, '');
        const treatmentKey = Object.keys(treatments).find(
          (key) => treatments[key as keyof typeof treatments] === currentPath
        );

        if (treatmentKey) {
          // Convert slug to readable title (basic conversion)
          const title = slug
            .split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

          breadcrumbs.push({
            label: title,
            path: currentPath,
            icon: 'i-heroicons-document-text',
          });
        }
      }
    }
    // Handle other static pages
    else if (currentPath !== pages.home) {
      const pageEntry = Object.entries(pages).find(
        ([, path]) => path === currentPath
      );
      if (pageEntry) {
        const [key] = pageEntry;
        const titles: Record<string, string> = {
          about: 'Over Mij',
          contact: 'Contact',
          booking: 'Boek Nu',
          faq: 'Veelgestelde Vragen',
          blog: 'Blog',
          tarieven: 'Tarieven',
        };

        breadcrumbs.push({
          label: titles[key] || key,
          path: currentPath,
          icon: 'i-heroicons-document',
        });
      }
    }

    return breadcrumbs;
  };

  // Get navigation items for header/footer components
  const getNavigationRoutes = () => {
    return {
      main: [
        { label: 'Home', path: pages.home, icon: 'i-heroicons-home' },
        { label: 'Over Mij', path: pages.about, icon: 'i-heroicons-user' },
        {
          label: 'Behandelingen',
          path: pages.treatments,
          icon: 'i-heroicons-sparkles',
        },
        { label: 'Contact', path: pages.contact, icon: 'i-heroicons-envelope' },
      ],
      treatments: [
        {
          label: 'Alle Behandelingen',
          description: 'Bekijk een overzicht van alle massages en healings.',
          path: pages.treatments,
          icon: 'i-heroicons-list-bullet',
        },
        {
          label: 'Energetische Healing',
          description: 'Herstel balans en vitaliteit.',
          path: treatments['energetische-healing-sessie'],
          icon: 'i-heroicons-sparkles',
        },
        {
          label: 'Chakra Balancering',
          description: 'Harmoniseer uw energiecentra.',
          path: treatments['chakra-balancering'],
          icon: 'i-heroicons-adjustments-horizontal',
        },
        {
          label: 'Klassieke Ontspanning',
          description: 'Pure ontspanning voor lichaam en geest.',
          path: treatments['klassieke-ontspanningsmassage'],
          icon: 'i-heroicons-user-group',
        },
      ],
      footer: {
        services: [
          {
            label: 'Chakra Balancering',
            path: treatments['chakra-balancering'],
          },
          {
            label: 'Ontspanningsmassage',
            path: treatments['klassieke-ontspanningsmassage'],
          },
          {
            label: 'Zweedse Massage',
            path: treatments['zweedse-massage'],
          },
          {
            label: 'Sportmassage',
            path: treatments['sportmassage'],
          },
        ],
        info: [
          { label: 'Veelgestelde Vragen', path: pages.faq },
          { label: 'Blog', path: pages.blog },
          { label: 'Tarieven', path: pages.tarieven },
          { label: 'Contact', path: pages.contact },
        ],
      },
    };
  };

  // Dynamic function to get treatment routes from content (async)
  const getTreatmentRoutesFromContent = async (): Promise<TreatmentData[]> => {
    try {
      // Use queryCollectionNavigation to get treatment navigation data with only the supported fields
      const treatmentNavigation = await queryCollectionNavigation(
        'treatments',
        ['title', 'description']
      );

      // If we need category and icon, we need to fetch the full content for each treatment
      const treatmentsWithMeta = await Promise.all(
        treatmentNavigation.map(async (item) => {
          try {
            const fullTreatment = (await queryCollection('treatments')
              .path(item.path)
              .first()) as FullTreatmentContent;
            return {
              slug: item.path?.split('/').pop() || '',
              _path: item.path,
              title: item.title,
              description: item.description as string,
              category: fullTreatment?.category || 'unknown',
              icon: fullTreatment?.icon || 'i-heroicons-sparkles',
            };
          } catch (err) {
            console.warn(
              `Could not fetch full treatment data for ${item.path}:`,
              err
            );
            return {
              slug: item.path?.split('/').pop() || '',
              _path: item.path,
              title: item.title,
              description: item.description as string,
              category: 'unknown',
              icon: 'i-heroicons-sparkles',
            };
          }
        })
      );

      return treatmentsWithMeta;
    } catch (error) {
      console.warn('Could not fetch treatment routes dynamically:', error);
      return [];
    }
  };

  // Sync treatment routes with content collection
  const syncTreatmentRoutes = async () => {
    try {
      const contentTreatments = await getTreatmentRoutesFromContent();
      const syncedTreatments: Record<string, string> = {};

      contentTreatments.forEach((treatment: TreatmentData) => {
        if (treatment.slug) {
          syncedTreatments[treatment.slug] = treatment._path;
        }
      });

      return {
        ...treatments,
        ...syncedTreatments,
      };
    } catch (error) {
      console.warn('Could not sync treatment routes:', error);
      return treatments;
    }
  };

  // Enhanced treatment navigation with dynamic sync
  const getTreatmentNavigationItems = async () => {
    try {
      // Get dynamic treatments from content
      const dynamicTreatments = await getTreatmentRoutesFromContent();

      // Create navigation items from dynamic content
      const dynamicItems = dynamicTreatments.map((treatment) => ({
        label: treatment.title,
        description: treatment.description || 'Behandeling informatie',
        to: treatment._path,
        icon: treatment.icon || 'i-heroicons-sparkles',
      }));

      // Always include the "All Treatments" overview item first
      return [
        {
          label: 'Alle Behandelingen',
          description: 'Bekijk een overzicht van alle massages en healings.',
          to: pages.treatments,
          icon: 'i-heroicons-list-bullet',
        },
        ...dynamicItems,
      ];
    } catch (error) {
      console.warn(
        'Could not load dynamic treatment navigation, falling back to static:',
        error
      );
      // Fallback to static items
      return [
        {
          label: 'Alle Behandelingen',
          description: 'Bekijk een overzicht van alle massages en healings.',
          to: pages.treatments,
          icon: 'i-heroicons-list-bullet',
        },
        {
          label: 'Energetische Healing',
          description: 'Herstel balans en vitaliteit.',
          to: treatments['energetische-healing-sessie'],
          icon: 'i-heroicons-sparkles',
        },
        {
          label: 'Chakra Balancering',
          description: 'Harmoniseer uw energiecentra.',
          to: treatments['chakra-balancering'],
          icon: 'i-heroicons-adjustments-horizontal',
        },
        {
          label: 'Klassieke Ontspanning',
          description: 'Pure ontspanning voor lichaam en geest.',
          to: treatments['klassieke-ontspanningsmassage'],
          icon: 'i-heroicons-user-group',
        },
      ];
    }
  };

  // Get related treatment suggestions
  const getRelatedTreatments = (currentSlug: string, limit = 3) => {
    const allTreatments = Object.entries(treatments);
    const related = allTreatments
      .filter(([slug]) => slug !== currentSlug)
      .slice(0, limit)
      .map(([slug, path]) => ({
        slug,
        path,
        title: slug
          .split('-')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' '),
      }));

    return related;
  };

  return {
    // Static routes
    pages,
    treatments,
    treatmentBasePath,

    // Utility functions
    getAllTreatmentPaths,
    getTreatmentPath,
    treatmentExists,
    getAllPagePaths,
    routeExists,

    // Navigation helpers
    getNavigationRoutes,
    getTreatmentNavigationItems,
    generateBreadcrumbs,
    getRelatedTreatments,

    // Dynamic content functions
    getTreatmentRoutesFromContent,
    syncTreatmentRoutes,
  };
};

// Export types for better TypeScript support
export type PageRoutes = ReturnType<typeof useRoutes>['pages'];
export type TreatmentRoutes = ReturnType<typeof useRoutes>['treatments'];
export type NavigationRoutes = ReturnType<
  typeof useRoutes
>['getNavigationRoutes'];
export type { BreadcrumbItem, TreatmentData };
