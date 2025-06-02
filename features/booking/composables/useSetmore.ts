// Composable for managing Setmore booking script integration

// Extend Window interface to include setmore
declare global {
  interface Window {
    setmore?: {
      init: () => void;
    };
  }
}

// Global state to ensure script is only loaded once
let isScriptInitialized = false;
let scriptPromise: Promise<void> | null = null;

export const useSetmore = () => {
  // Reactive state for loading
  const isLoading = ref(false);
  const isReady = ref(false);
  const hasError = ref(false);
  const errorMessage = ref<string | null>(null);

  /**
   * Initialize the Setmore script
   */
  const initializeSetmore = async (): Promise<void> => {
    // If already initialized, return the existing promise
    if (scriptPromise) {
      return scriptPromise;
    }

    // If script is already loaded, mark as ready
    if (isScriptInitialized && window.setmore) {
      isReady.value = true;
      isLoading.value = false;
      return Promise.resolve();
    }

    // Set loading state
    isLoading.value = true;
    hasError.value = false;
    errorMessage.value = null;

    // Create the initialization promise
    scriptPromise = new Promise<void>((resolve, reject) => {
      try {
        // Check if we're in browser environment
        if (typeof window === 'undefined') {
          reject(
            new Error('Setmore can only be initialized in browser environment')
          );
          return;
        }

        // Check if script already exists
        const existingScript = document.getElementById('setmore_script');
        if (existingScript) {
          // Script exists, check if setmore is available
          if (window.setmore) {
            isScriptInitialized = true;
            isReady.value = true;
            isLoading.value = false;
            resolve();
            return;
          }
        }

        // Create and load the script
        const script = document.createElement('script');
        script.id = 'setmore_script';
        script.type = 'text/javascript';
        script.src =
          'https://assets.setmore.com/integration/static/setmoreIframeLive.js';
        script.async = true;

        // Handle successful script load
        script.onload = () => {
          // Give a small delay to ensure setmore object is available
          setTimeout(() => {
            if (window.setmore) {
              setTimeout(() => {
                isScriptInitialized = true;
                isReady.value = true;
                isLoading.value = false;
                window.setmore?.init();
                // wait 500ms to ensure setmore is fully loaded
                resolve();
              }, 500);
            } else {
              const error =
                'Setmore script loaded but setmore object not available';
              errorMessage.value = error;
              hasError.value = true;
              isLoading.value = false;
              reject(new Error(error));
            }
          }, 100);
        };

        // Handle script load error
        script.onerror = () => {
          const error = 'Failed to load Setmore script';
          errorMessage.value = error;
          hasError.value = true;
          isLoading.value = false;
          reject(new Error(error));
        };

        // Add script to document
        document.head.appendChild(script);
      } catch (error) {
        const errorMsg =
          error instanceof Error ? error.message : 'Unknown error occurred';
        errorMessage.value = errorMsg;
        hasError.value = true;
        isLoading.value = false;
        reject(error);
      }
    });

    return scriptPromise;
  };

  /**
   * Check if Setmore is ready for use
   */
  const checkSetmoreReady = (): boolean => {
    return isReady.value && window.setmore !== undefined;
  };

  /**
   * Initialize on mount if not already done
   */
  onMounted(() => {
    if (!isScriptInitialized && !scriptPromise) {
      initializeSetmore().catch((error) => {
        console.error('Failed to initialize Setmore:', error);
      });
    } else if (isScriptInitialized) {
      isReady.value = true;
      isLoading.value = false;
    }
  });

  return {
    // State
    isLoading: readonly(isLoading),
    isReady: readonly(isReady),
    hasError: readonly(hasError),
    errorMessage: readonly(errorMessage),

    // Methods
    initializeSetmore,
    checkSetmoreReady,
  };
};
