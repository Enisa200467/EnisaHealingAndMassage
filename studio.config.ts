export default {
  // Configure the Studio editor experience
  ui: {
    primaryColor: 'violet', // Match your brand color
    accentColor: 'teal',
  },

  // Configure content collections for better editing experience
  content: {
    collections: {
      // Treatment pages collection
      treatments: {
        name: 'Behandelingen',
        description: 'Beheer alle behandelingen en hun content',
        pattern: 'content/treatments/**/*.md',
        icon: 'spa',
        template: 'treatment',
      },
      // General pages collection
      pages: {
        name: "Pagina's",
        description: "Beheer algemene website pagina's",
        pattern: 'content/pages/**/*.md',
        icon: 'document',
        template: 'page',
      },
    },
    // Configure custom fields for frontmatter
    fields: {
      treatment: [
        {
          name: 'title',
          type: 'string',
          label: 'Titel',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'SEO Beschrijving',
          hint: '150-160 karakters voor optimale SEO',
        },
        {
          name: 'category',
          type: 'select',
          label: 'Categorie',
          options: [
            { label: 'Massage', value: 'massage' },
            { label: 'Healing', value: 'healing' },
          ],
        },
        {
          name: 'featured_image',
          type: 'image',
          label: 'Hoofdafbeelding',
          hint: 'Optimaal: 1200x800px WebP formaat',
        },
      ],
      page: [
        {
          name: 'title',
          type: 'string',
          label: 'Titel',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'SEO Beschrijving',
        },
        {
          name: 'layout',
          type: 'select',
          label: 'Layout',
          options: [
            { label: 'Standaard', value: 'default' },
            { label: 'Volledig', value: 'full' },
          ],
        },
      ],
    },
  },

  // Configure media handling
  media: {
    // Configure for local media storage
    driver: 'fs',
    base: '/images',
  },

  // Configure GitHub integration (for deployment)
  github: {
    owner: 'Enisa200467',
    repo: 'EnisaHealingAndMassage',
    branch: 'main',
  },

  // Configure design tokens for consistent styling
  tokens: {
    colors: {
      primary: {
        50: '#f5f3ff',
        100: '#ede9fe',
        200: '#ddd6fe',
        300: '#c4b5fd',
        400: '#a78bfa',
        500: '#8b5cf6', // Main primary
        600: '#7c3aed',
        700: '#6d28d9',
        800: '#5b21b6',
        900: '#4c1d95',
      },
      secondary: {
        50: '#f0fdfa',
        100: '#ccfbf1',
        200: '#99f6e4',
        300: '#5eead4',
        400: '#2dd4bf',
        500: '#14b8a6', // Main secondary
        600: '#0d9488',
        700: '#0f766e',
        800: '#115e59',
        900: '#134e4a',
      },
    },
    spacing: {
      xs: '0.5rem',
      sm: '1rem',
      md: '1.5rem',
      lg: '2rem',
      xl: '3rem',
    },
    typography: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
      },
    },
  },
};
