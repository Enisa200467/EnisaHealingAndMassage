// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  // Enable SSR for better initial load
  ssr: true,

  // Add proper i18n configuration and HTML lang attribute
  app: {
    head: {
      htmlAttrs: {
        lang: "nl",
        dir: "ltr",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "robots", content: "noindex, nofollow" },
        { name: "theme-color", content: "#8b5cf6" }, // Primary purple color
        { name: "format-detection", content: "telephone=no" },
        { name: "msapplication-TileColor", content: "#8b5cf6" },
        { name: "apple-mobile-web-app-capable", content: "yes" },
        { name: "apple-mobile-web-app-status-bar-style", content: "default" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "manifest", href: "/site.webmanifest" },
      ],
    },
  },
  studio: {
    // Git repository configuration (owner and repo are required)
    repository: {
      provider: "github", // 'github' or 'gitlab'
      owner: "Enisa200467", // your GitHub/GitLab username or organization
      repo: "EnisaHealingAndMassage", // your repository name
      branch: "main", // the branc to commit to (default: 'main')
    },
    development: {
      sync: true,
    },
  },

  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/ui",
    "@nuxt/content",
    "@nuxtjs/device",
    "@nuxtjs/supabase",
    "nuxt-schema-org",
    "@nuxt/scripts",
    "@pinia/nuxt",
    "nuxt-security",
    "nuxt-studio",
  ],

  // Feature-based auto-imports
  imports: {
    dirs: [
      "features/*/composables",
      "features/*/utils",
      "features/shared/composables",
      "features/shared/utils",
    ],
  },

  // Feature-based component auto-registration
  components: [
    {
      path: "~/features",
      pathPrefix: false,
      pattern: "**/*.vue",
    },
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  ui: {
    colorMode: false,
  },
  supabase: {
    redirectOptions: {
      login: "/admin/login",
      callback: "/",
      include: ["/admin(/*)?"],
      exclude: undefined,
      saveRedirectToCookie: false,
    },
  },
  css: ["~/assets/css/main.css"],

  // Optimize CSS delivery to prevent FOUC
  experimental: {
    inlineStyles: true, // Inline critical CSS
  },

  // Optimize rendering
  features: {
    inlineStyles: true, // Inline critical CSS in production
  },

  runtimeConfig: {
    // Private keys (only available on the server-side)
    resendApiKey: process.env.RESEND_API_KEY,
    contactEmail: process.env.CONTACT_EMAIL || "info@enisahealing.nl",
    // Public keys (also exposed to the client-side)
    public: {
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    },
  },

  // Security configuration
  security: {
    headers: {
      // Enable HSTS (HTTP Strict Transport Security)
      strictTransportSecurity: {
        maxAge: 31536000,
        includeSubdomains: true,
      },
      // Prevent clickjacking attacks
      xFrameOptions: "SAMEORIGIN",
      // Prevent MIME type sniffing
      xContentTypeOptions: "nosniff",
      // Enable XSS protection
      xXSSProtection: "1; mode=block",
      // Referrer policy
      referrerPolicy: "strict-origin-when-cross-origin",
      // Content Security Policy
      contentSecurityPolicy: {
        "base-uri": ["'self'"],
        "font-src": ["'self'", "https:", "data:"],
        "form-action": ["'self'"],
        "frame-ancestors": ["'self'"],
        "frame-src": [
          "'self'",
          "https://www.youtube.com",
          "https://www.youtube-nocookie.com",
          "https://player.vimeo.com",
        ],
        "img-src": ["'self'", "data:", "https:", "blob:"],
        "object-src": ["'none'"],
        "script-src-attr": [
          "'unsafe-hashes'",
          "'sha256-bwK6T5wZVTANitXbrTsel7kl/PyCjCd/Dq5Qoz3imjM='",
        ],
        "style-src": ["'self'", "https:", "'unsafe-inline'"],
        "script-src": ["'self'", "https:", "'unsafe-inline'", "'unsafe-eval'"],
        "connect-src": [
          "'self'",
          "https://*.googleapis.com",
          "https://*.google.com",
          "https://*.supabase.co",
          "wss://*.supabase.co",
          "https://api.iconify.design", // Iconify icon CDN
          "https://api.simplesvg.com", // Iconify fallback CDN
          "https://api.unisvg.com", // Iconify fallback CDN
          "ws://localhost:*", // Vite HMR in development
          "ws://127.0.0.1:*", // Vite HMR in development (alternative)
        ],
        "upgrade-insecure-requests": true,
      },
      crossOriginEmbedderPolicy: "unsafe-none",

    },
    // Disable CSRF protection - not needed because:
    // 1. Supabase authentication required for admin routes
    // 2. Rate limiting on all endpoints
    // 3. 5-minute session timeout
    // 4. Input sanitization (DOMPurify)
    // 5. RLS policies at database level
    csrf: false,
    // CORS configuration
    corsHandler: {
      origin:
        process.env.NODE_ENV === "production" ? "https://enisahealing.nl" : "*",
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      credentials: true,
    },
    // Additional security options
    requestSizeLimiter: {
      maxRequestSizeInBytes: 2000000, // 2MB
      maxUploadFileRequestInBytes: 8000000, // 8MB
    },
    xssValidator: {
      throwError: false, // Don't throw error, just sanitize
    },
    hidePoweredBy: true,
  },
});

