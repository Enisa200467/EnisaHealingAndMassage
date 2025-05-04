// app.config.ts
export default defineAppConfig({
  ui: {
    colors: {
      // Set the primary accent color family to 'purple'.
      // This will be used for buttons, active states, highlights, etc.
      // Nuxt UI will automatically select appropriate shades (e.g., purple-500, purple-600).
      primary: 'purple',
      secondary: 'teal',
      neutral: 'gray',
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
  
      button: {
        // Example: Customize the default solid button variant if the derived purple isn't quite right
        // color: {
        //   primary: {
        //     solid: 'bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white dark:text-gray-900 focus-visible:outline-purple-500 dark:focus-visible:outline-purple-400'
        //   }
        // }
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
