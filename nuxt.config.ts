// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  // Add proper i18n configuration and HTML lang attribute
  app: {
    head: {
      htmlAttrs: {
        lang: 'nl',
        dir: 'ltr',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'robots', content: 'index, follow' },
        { name: 'theme-color', content: '#8b5cf6' }, // Primary purple color
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'msapplication-TileColor', content: '#8b5cf6' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
    },
  },
  content: {
    preview: {
      api: 'https://api.nuxt.studio',
    },
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxtjs/device',
    '@nuxtjs/supabase',
    'nuxt-schema-org',
    '@nuxt/scripts',
    '@nuxt/test-utils',
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
      exclude: undefined,
      saveRedirectToCookie: false,
    },
  },
  css: ['~/assets/css/main.css'],
});
