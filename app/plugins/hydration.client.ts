/**
 * Hydration plugin to handle SSR to client-side transition
 */
export default defineNuxtPlugin((nuxtApp) => {
  // Handle hydration errors gracefully
  nuxtApp.hook('vue:error', (error) => {
    // Log hydration errors but don't crash the app
    if (error.message?.includes('hydration')) {
      console.warn('Hydration mismatch detected:', error);
    }
  });
});
