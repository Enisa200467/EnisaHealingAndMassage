// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxtjs/device',
    '@nuxtjs/supabase',
  ],

  // Feature-based auto-imports
  imports: {
    dirs: [
      'features/*/composables',
      'features/*/utils',
      'features/shared/composables',
      'features/shared/utils',
    ],
  },

  // Feature-based component auto-registration
  components: [
    {
      path: '~/features',
      pathPrefix: false,
      pattern: '**/*.vue',
    },
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  ui: {
    colorMode: false,
  },
  supabase: {
    redirectOptions: {
      login: '/admin/login',
      callback: '/admin',
      include: ['/admin(/*)?'],
      exclude: [],
      saveRedirectToCookie: false,
    },
  },
  css: ['~/assets/css/main.css'],
});
