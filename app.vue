<script setup lang="ts">
// Define Calendly on window type to avoid TypeScript errors if using <script setup lang="ts">
// If you are using plain JavaScript (<script setup>), you can remove this declare block.
declare global {
  interface Window {
    Calendly?: {
      initBadgeWidget: (options: Record<string, unknown>) => void;
    };
  }
}

useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://assets.calendly.com/assets/external/widget.css',
    },
  ],
  script: [
    {
      src: 'https://assets.calendly.com/assets/external/widget.js',
      async: true,
    },
    {
      // This includes the inline script that initializes the widget.
      // The `window.onload` ensures it runs after the page and the external script are likely loaded.
      innerHTML: `
        window.onload = function() {
          if (typeof Calendly !== 'undefined') {
            Calendly.initBadgeWidget({
              url: 'https://calendly.com/matthijsrademaker33/30min?hide_event_type_details=1&hide_gdpr_banner=1',
              text: 'Boek een massage',
              color: '#d800ff',
              textColor: '#ffffff'
            });
          } else {
            console.error('Calendly object not found. Widget initialization failed.');
          }
        };
      `,
      type: 'text/javascript',
      // Adding a unique key can help Nuxt manage the script tag effectively
      key: 'calendly-init',
    },
  ],
});
</script>

<template>
  <UApp>
    <main class="flex flex-col min-h-screen ml-2 lg:ml-64 mr-2 lg:mr-64">
      <!-- <Header /> TODO -->
      <div class="flex-grow">
        <NuxtPage />
      </div>
      <!-- <Footer /> TODO -->
    </main>
  </UApp>
</template>
