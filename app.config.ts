// app.config.ts
export default defineAppConfig({
  ui: {
    colors: {
      // Set the primary accent color family to 'purple'.
      // This will be used for buttons, active states, highlights, etc.
      // Nuxt UI will automatically select appropriate shades (e.g., purple-500, purple-600).
      primary: 'rose-v2',
      secondary: 'amber-v2',
      neutral: 'gray',
    },

    // Configure default MDI icons for UI components
    icons: {
      arrowLeft: 'i-mdi-arrow-left',
      arrowRight: 'i-mdi-arrow-right',
      check: 'i-mdi-check',
      chevronDoubleLeft: 'i-mdi-chevron-double-left',
      chevronDoubleRight: 'i-mdi-chevron-double-right',
      chevronDown: 'i-mdi-chevron-down',
      chevronLeft: 'i-mdi-chevron-left',
      chevronRight: 'i-mdi-chevron-right',
      chevronUp: 'i-mdi-chevron-up',
      close: 'i-mdi-close',
      ellipsis: 'i-mdi-dots-horizontal',
      external: 'i-mdi-open-in-new',
      folder: 'i-mdi-folder',
      folderOpen: 'i-mdi-folder-open',
      loading: 'i-mdi-loading',
      minus: 'i-mdi-minus',
      plus: 'i-mdi-plus',
      search: 'i-mdi-magnify',
    },

    // Set the neutral/gray color family to 'neutral'.
    // 'neutral' in Tailwind CSS provides warmer grays compared to the default 'cool' gray,
    // fitting the "Warm Stone Grey/Taupe" and "Creamy Off-White" requirements.
    // This affects backgrounds, text colors, borders, card backgrounds, etc.
    gray: 'neutral',
    card: {
      slots: {
        root: 'rounded-lg',
        header: 'p-4 sm:px-6',
        body: 'p-4 sm:p-6',
        footer: 'p-4 sm:px-6',
      },
      variants: {
        variant: {
          solid: {
            root: 'bg-(--ui-bg-inverted) text-(--ui-bg)',
          },
          outline: {
            root: 'bg-(--ui-bg) ring ring-(--ui-border) divide-y divide-(--ui-border)',
          },
          soft: {
            root: 'bg-(--ui-bg-elevated)/50 divide-y divide-(--ui-border)',
          },
          subtle: {
            root: 'bg-(--ui-bg-elevated)/50 ring ring-(--ui-border) divide-y divide-(--ui-border)',
          },
        },
      },
      defaultVariants: {
        variant: 'outline',
      },
    },
    navigationMenu: {
      trigger: {
        base: 'group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-primary-100 hover:text-primary-900 focus:bg-primary-100 focus:text-primary-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-primary-600 data-[active]:text-white data-[state=open]:bg-primary-100 data-[state=open]:text-primary-900',
        color: {
          primary:
            'text-primary-900 data-[active]:bg-primary-600 data-[active]:text-white hover:bg-primary-100 hover:text-primary-900',
        },
      },
      content: {
        base: 'left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto',
      },
      item: {
        base: 'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary-100 hover:text-primary-900 focus:bg-primary-100 focus:text-primary-900 data-[active]:bg-primary-600 data-[active]:text-white',
      },
    },
    // --- Optional Refinements (Uncomment and adjust if needed) ---

    // You generally don't need to override *every* component,
    // as `primary` and `gray` handle most cases.
    // But if you want more specific control:

    /*
      card: {
        // Example: Make card backgrounds slightly lighter/warmer than the default derived from 'neutral'
        background: 'bg-neutral-50 dark:bg-neutral-800/50', // Lighter than default neutral card bg
        ring: 'ring-1 ring-neutral-200 dark:ring-neutral-700' // Adjust border if needed
      },
  
  
      tabs: {
         list: {
           // Example: Customize tab styles if needed
           // background: 'bg-neutral-100 dark:bg-neutral-800',
           // marker: {
           //   background: 'bg-white dark:bg-neutral-900',
           // }
         }
      }
      */
  },
});
