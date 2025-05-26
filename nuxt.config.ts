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
  ui: {
    colorMode: false,
  },
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/admin',
      include: ['/admin(/*)?'],
      exclude: [],
      saveRedirectToCookie: false,
    },
  },
  css: ['~/assets/css/main.css'],
});
