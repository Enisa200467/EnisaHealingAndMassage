import { defineContentConfig, defineCollection } from '@nuxt/content';

export default defineContentConfig({
  collections: {
    treatments: defineCollection({
      type: 'page',
      source: 'treatments/*.md',
    }),
  },
});
