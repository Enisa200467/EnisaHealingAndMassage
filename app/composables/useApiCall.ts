/**
 * Composable for making API calls with built-in error handling and toast notifications
 *
 * @example
 * const { execute, loading, error, data } = useApiCall();
 *
 * const submitForm = async () => {
 *   await execute('/api/contact', {
 *     method: 'POST',
 *     body: formData,
 *     successMessage: 'Formulier succesvol verzonden!',
 *   });
 * };
 */
export function useApiCall<T = any>() {
  const toast = useToast();
  const loading = ref(false);
  const error = ref<Error | null>(null);
  const data = ref<T | null>(null);

  /**
   * Execute an API call with automatic error handling
   *
   * @param url - API endpoint URL
   * @param options - Fetch options + custom toast configuration
   */
  const execute = async (
    url: string,
    options?: {
      method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
      body?: any;
      successMessage?: string;
      errorMessage?: string;
      showSuccessToast?: boolean;
      showErrorToast?: boolean;
      onSuccess?: (data: T) => void;
      onError?: (error: any) => void;
    }
  ) => {
    const {
      method = 'GET',
      body,
      successMessage,
      errorMessage,
      showSuccessToast = true,
      showErrorToast = true,
      onSuccess,
      onError,
    } = options || {};

    loading.value = true;
    error.value = null;

    try {
      const response = await $fetch<T>(url, {
        method,
        body,
      });

      data.value = response;

      // Show success toast
      if (showSuccessToast && successMessage) {
        toast.add({
          id: `success-${Date.now()}`,
          title: 'Gelukt!',
          description: successMessage,
          color: 'green',
          icon: 'i-heroicons-check-circle',
          timeout: 5000,
        });
      }

      // Call success callback
      if (onSuccess) {
        onSuccess(response);
      }

      return response;
    } catch (err: any) {
      console.error('API call failed:', err);
      error.value = err;

      // Extract error message from standardized API error response
      const apiErrorMessage =
        err.data?.error?.message || err.message || 'Er is een fout opgetreden';

      // Show error toast
      if (showErrorToast) {
        toast.add({
          id: `error-${Date.now()}`,
          title: 'Fout',
          description: errorMessage || apiErrorMessage,
          color: 'red',
          icon: 'i-heroicons-exclamation-triangle',
          timeout: 7000,
        });
      }

      // Call error callback
      if (onError) {
        onError(err);
      }

      throw err;
    } finally {
      loading.value = false;
    }
  };

  /**
   * Reset the state
   */
  const reset = () => {
    loading.value = false;
    error.value = null;
    data.value = null;
  };

  return {
    execute,
    loading: readonly(loading),
    error: readonly(error),
    data: readonly(data),
    reset,
  };
}
