/**
 * Composable for Studio-integrated content management
 * Combines database-driven data with Studio-managed content
 */
export const useStudioContent = () => {
  // Get dynamic routes from our routes composable
  const routes = useRoutes();

  /**
   * Get Studio preview mode status
   */
  const isPreview = computed(() => {
    if (import.meta.server) return false;
    return new URLSearchParams(window.location.search).has('preview');
  });

  /**
   * Generate Studio edit URLs for content
   */
  const getStudioEditUrl = (contentPath: string) => {
    const repoName = 'Enisa200467/EnisaHealingAndMassage';
    const studioUrl = `https://nuxt.studio/github/${repoName}`;
    return `${studioUrl}/content/${contentPath}`;
  };

  /**
   * Generate dynamic navigation from database + Studio content
   */
  const getDynamicNavigation = async () => {
    try {
      // Get database data through our existing composable
      const { activeTreatments } = useTreatments();

      return {
        treatments: activeTreatments.value.map((treatment) => ({
          label: treatment.title,
          to: treatment.path,
          icon: treatment.icon,
          studioEditUrl: getStudioEditUrl(`treatments/${treatment.slug}.md`),
        })),
        pages: [
          { label: 'Home', to: routes.pages.home },
          { label: 'Over Mij', to: routes.pages.about },
          { label: 'Behandelingen', to: routes.pages.treatments },
          { label: 'Contact', to: routes.pages.contact },
          { label: 'Boeken', to: routes.pages.booking },
          { label: 'Reviews', to: routes.pages.reviews },
        ],
        admin: [
          { label: 'Dashboard', to: routes.admin.dashboard },
          { label: 'Behandelingen', to: routes.admin.treatments },
          { label: 'Reviews', to: routes.admin.reviews },
          { label: 'SEO', to: routes.admin.seoOverview },
          { label: 'Documentatie', to: routes.admin.docs },
        ],
      };
    } catch (error) {
      console.error('Error generating dynamic navigation:', error);
      return { treatments: [], pages: [], admin: [] };
    }
  };

  return {
    // State
    isPreview: readonly(isPreview),
    routes,

    // Methods
    getStudioEditUrl,
    getDynamicNavigation,
  };
};
