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
export function useApiCall<T = unknown>() {
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
      method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
      body?: object;
      successMessage?: string;
      errorMessage?: string;
      showSuccessToast?: boolean;
      showErrorToast?: boolean;
      onSuccess?: (data: T) => void;
      onError?: (error: unknown) => void;
    },
  ) => {
    const {
      method = "GET",
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
          title: "Gelukt!",
          description: successMessage,
          color: "success",
          icon: "i-heroicons-check-circle",
          duration: 5000,
        });
      }

      // Call success callback
      if (onSuccess) {
        onSuccess(response);
      }

      return response;
    } catch (err: unknown) {
      console.error("API call failed:", err);
      const normalizedError =
        err instanceof Error ? err : new Error("Er is een fout opgetreden");
      const apiError = err as {
        data?: { error?: { message?: string } };
      };
      error.value = normalizedError;

      // Extract error message from standardized API error response
      const apiErrorMessage =
        apiError.data?.error?.message || normalizedError.message;

      // Show error toast
      if (showErrorToast) {
        toast.add({
          id: `error-${Date.now()}`,
          title: "Fout",
          description: errorMessage || apiErrorMessage,
          color: "error",
          icon: "i-heroicons-exclamation-triangle",
          duration: 7000,
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
