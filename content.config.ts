import { defineContentConfig, defineCollection } from '@nuxt/content';

export default defineContentConfig({
  collections: {
    behandelingen: defineCollection({
      type: 'page',
      source: 'behandelingen/*.md',
    }),
  },
});
