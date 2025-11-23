import type {
  Treatment,
  CreateTreatmentInput,
  TreatmentFormData,
} from '../types/treatment.types';

export const useAdminTreatments = () => {
  const treatments = ref<Treatment[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Helper function to generate slug from name
  const generateSlug = (name: string): string => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .trim();
  };

  // Convert euros to cents
  const eurosToCents = (euros: number): number => {
    return Math.round(euros * 100);
  };

  // Convert cents to euros
  const centsToEuros = (cents: number): number => {
    return cents / 100;
  };

  // Convert form data to database format
  const formatForDatabase = (
    formData: TreatmentFormData
  ): CreateTreatmentInput => {
    return {
      name: formData.name,
      slug: generateSlug(formData.name),
      description: formData.description,
      duration_minutes: formData.duration_minutes,
      price_cents: eurosToCents(formData.price_euros),
      icon: formData.icon,
      display_order: formData.display_order,
    };
  };

  // Convert form data to database format for updates (preserves existing slug if name hasn't changed significantly)
  const formatForDatabaseUpdate = (
    formData: TreatmentFormData,
    existingTreatment?: Treatment
  ) => {
    const baseData = {
      name: formData.name,
      description: formData.description,
      duration_minutes: formData.duration_minutes,
      price_cents: eurosToCents(formData.price_euros),
      icon: formData.icon,
      display_order: formData.display_order,
      is_active: formData.is_active,
    };

    // Only regenerate slug if name has changed
    if (existingTreatment && existingTreatment.name !== formData.name) {
      return {
        ...baseData,
        slug: generateSlug(formData.name),
      };
    }

    return baseData;
  };

  // Convert database format to form data
  const formatForForm = (treatment: Treatment): TreatmentFormData => {
    return {
      name: treatment.name,
      description: treatment.description || '',
      duration_minutes: treatment.duration_minutes,
      price_euros: centsToEuros(treatment.price_cents),
      icon: treatment.icon || '',
      display_order: treatment.display_order,
      is_active: treatment.is_active,
    };
  };

  // Fetch all treatments
  const fetchTreatments = async (): Promise<void> => {
    try {
      loading.value = true;
      error.value = null;

      const response = await $fetch<{ data: Treatment[] }>(
        '/api/admin/treatments'
      );
      treatments.value = response.data || [];
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : 'Failed to fetch treatments';
      console.error('Error fetching treatments:', err);
    } finally {
      loading.value = false;
    }
  };

  // Create a new treatment
  const createTreatment = async (
    formData: TreatmentFormData
  ): Promise<Treatment | null> => {
    try {
      loading.value = true;
      error.value = null;

      const treatmentData = formatForDatabase(formData);

      const response = await $fetch<{ data: Treatment }>(
        '/api/admin/treatments',
        {
          method: 'POST',
          body: treatmentData,
        }
      );

      // Refresh the treatments list
      await fetchTreatments();

      return response.data;
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : 'Failed to create treatment';
      console.error('Error creating treatment:', err);
      return null;
    } finally {
      loading.value = false;
    }
  };

  // Update an existing treatment
  const updateTreatment = async (
    id: string,
    formData: TreatmentFormData
  ): Promise<Treatment | null> => {
    try {
      loading.value = true;
      error.value = null;

      // Find the existing treatment for comparison
      const existingTreatment = treatments.value.find((t) => t.id === id);
      if (!existingTreatment) {
        throw new Error(`Treatment with ID ${id} not found in local data`);
      }

      const updateData = formatForDatabaseUpdate(formData, existingTreatment);

      const response = await $fetch<{ data: Treatment }>(
        `/api/admin/treatments/${id}`,
        {
          method: 'PUT',
          body: updateData,
        }
      );

      // Refresh the treatments list
      await fetchTreatments();

      return response.data;
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : 'Failed to update treatment';
      console.error('Error updating treatment:', err);
      return null;
    } finally {
      loading.value = false;
    }
  };

  // Delete a treatment
  const deleteTreatment = async (id: string): Promise<boolean> => {
    try {
      loading.value = true;
      error.value = null;

      await $fetch(`/api/admin/treatments/${id}`, {
        method: 'DELETE',
      });

      // Refresh the treatments list
      await fetchTreatments();

      return true;
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : 'Failed to delete treatment';
      console.error('Error deleting treatment:', err);
      return false;
    } finally {
      loading.value = false;
    }
  };

  // Toggle treatment active status
  const toggleTreatmentStatus = async (
    id: string,
    isActive: boolean
  ): Promise<boolean> => {
    try {
      loading.value = true;
      error.value = null;

      await $fetch(`/api/admin/treatments/${id}/toggle-status`, {
        method: 'PATCH',
        body: { is_active: isActive },
      });

      // Refresh the treatments list
      await fetchTreatments();

      return true;
    } catch (err) {
      error.value =
        err instanceof Error
          ? err.message
          : 'Failed to update treatment status';
      console.error('Error updating treatment status:', err);
      return false;
    } finally {
      loading.value = false;
    }
  };

  // Update display order for multiple treatments
  const updateDisplayOrder = async (
    treatmentUpdates: { id: string; display_order: number }[]
  ): Promise<boolean> => {
    try {
      loading.value = true;
      error.value = null;

      // Update each treatment's display order sequentially
      for (const update of treatmentUpdates) {
        await $fetch(`/api/admin/treatments/${update.id}`, {
          method: 'PUT',
          body: { display_order: update.display_order },
        });
      }

      // Refresh the treatments list
      await fetchTreatments();

      return true;
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : 'Failed to update display order';
      console.error('Error updating display order:', err);
      return false;
    } finally {
      loading.value = false;
    }
  };

  return {
    treatments: readonly(treatments),
    loading: readonly(loading),
    error: readonly(error),
    fetchTreatments,
    createTreatment,
    updateTreatment,
    deleteTreatment,
    toggleTreatmentStatus,
    updateDisplayOrder,
    formatForForm,
    formatForDatabase,
    eurosToCents,
    centsToEuros,
    generateSlug,
  };
};
