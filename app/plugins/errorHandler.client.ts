/**
 * Global error handler plugin
 * Catches unhandled Vue errors and provides user-friendly notifications
 */
export default defineNuxtPlugin((nuxtApp) => {
  const toast = useToast();

  // Handle Vue errors
  nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
    console.error('Vue Error:', error);
    console.error('Component:', instance);
    console.error('Error Info:', info);

    // Show user-friendly error message
    toast.add({
      id: 'vue-error',
      title: 'Er is een fout opgetreden',
      description: 'Sorry, er ging iets mis. Probeer de pagina te vernieuwen.',
      color: 'red',
      icon: 'i-heroicons-exclamation-triangle',
      timeout: 5000,
    });

    // In production, you could send this to an error tracking service
    if (process.env.NODE_ENV === 'production') {
      // TODO: Send to error tracking service (e.g., Sentry, LogRocket)
      // trackError(error, { component: instance, info });
    }
  };

  // Handle unhandled promise rejections
  if (process.client) {
    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled Promise Rejection:', event.reason);

      toast.add({
        id: 'promise-rejection',
        title: 'Verbindingsfout',
        description: 'Er is een fout opgetreden bij het laden van gegevens.',
        color: 'red',
        icon: 'i-heroicons-exclamation-triangle',
        timeout: 5000,
      });

      // Prevent default browser error handling
      event.preventDefault();
    });
  }

  // Provide error handling utilities
  return {
    provide: {
      handleError: (error: Error, context?: string) => {
        console.error(`Error in ${context || 'Unknown context'}:`, error);

        toast.add({
          id: `error-${Date.now()}`,
          title: 'Er ging iets mis',
          description: context
            ? `Fout bij ${context}. Probeer het opnieuw.`
            : 'Er is een onverwachte fout opgetreden.',
          color: 'red',
          icon: 'i-heroicons-exclamation-triangle',
          timeout: 5000,
        });
      },
    },
  };
});
