import type {
  Treatment,
  CreateTreatmentInput,
  TreatmentFormData,
  TreatmentTraject,
  TreatmentTrajectFormData,
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

  // Convert form data to database format (metadata only - content in markdown)
  const formatForDatabase = (
    formData: TreatmentFormData
  ): CreateTreatmentInput => {
    const baseData = {
      name: formData.name,
      slug: generateSlug(formData.name),
      duration_minutes: formData.duration_minutes,
      price_cents: eurosToCents(formData.price_euros),
      discount_enabled: formData.discount_enabled,
      discount_price_cents: formData.discount_enabled
        ? eurosToCents(formData.discount_price_euros)
        : undefined,
      icon: formData.icon,
      display_order: formData.display_order,
    };

    return baseData;
  };

  // Convert form data to database format for updates (preserves existing slug if name hasn't changed significantly)
  const formatForDatabaseUpdate = (
    formData: TreatmentFormData,
    existingTreatment?: Treatment
  ): Record<string, unknown> => {
    const baseData = {
      name: formData.name,
      duration_minutes: formData.duration_minutes,
      price_cents: eurosToCents(formData.price_euros),
      discount_enabled: formData.discount_enabled,
      discount_price_cents: formData.discount_enabled
        ? eurosToCents(formData.discount_price_euros)
        : undefined,
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
      duration_minutes: treatment.duration_minutes,
      price_euros: centsToEuros(treatment.price_cents),
      discount_enabled: treatment.discount_enabled || false,
      discount_price_euros: treatment.discount_price_cents
        ? centsToEuros(treatment.discount_price_cents)
        : 0,
      trajects: (treatment.trajects || []).map((traject: TreatmentTraject) => ({
        id: traject.id,
        sessions: traject.sessions,
        price_euros: centsToEuros(traject.price_cents),
        is_active: traject.is_active,
      })),
      icon: treatment.icon || '',
      display_order: treatment.display_order || 0,
      is_active: treatment.is_active ?? true,
    };
  };

  const createTrajects = async (
    treatmentId: string,
    trajects: TreatmentTrajectFormData[]
  ): Promise<TreatmentTraject[]> => {
    const payload = trajects.map((traject) => ({
      id: traject.id,
      treatment_id: treatmentId,
      sessions: traject.sessions,
      price_cents: eurosToCents(traject.price_euros),
      is_active: traject.is_active,
    }));

    const response = await $fetch<{ data: TreatmentTraject[] }>(
      `/api/admin/treatments/${treatmentId}/trajects`,
      {
        method: 'PUT',
        body: { trajects: payload },
      }
    );

    return response.data;
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

      if (formData.trajects.length > 0) {
        await createTrajects(response.data.id, formData.trajects);
      }

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

      await createTrajects(id, formData.trajects);

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
    createTrajects,
  };
};
