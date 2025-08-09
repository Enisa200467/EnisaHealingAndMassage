interface TreatmentData {
  id: string;
  name: string;
  slug: string;
  description?: string;
  duration_minutes: number;
  price_cents: number;
  intensity?: number;
  intensity_label?: string;
  icon?: string;
  category?: string;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

interface TreatmentWithFormatted extends TreatmentData {
  // Computed formatted fields for template use
  price_formatted: string;
  duration_formatted: string;
}

/**
 * Composable for fetching treatment data from the database
 * Provides formatted data ready for use in templates
 */
export const useTreatmentData = () => {
  const formatPrice = (priceCents: number): string => {
    return `€ ${(priceCents / 100).toFixed(0)}`;
  };

  const formatDuration = (minutes: number): string => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      if (remainingMinutes === 0) {
        return `${hours} ${hours === 1 ? 'uur' : 'uur'}`;
      }
      return `${hours}u ${remainingMinutes}min`;
    }
    return `${minutes} minuten`;
  };

  const formatTreatmentData = (
    treatment: TreatmentData
  ): TreatmentWithFormatted => {
    return {
      ...treatment,
      price_formatted: formatPrice(treatment.price_cents),
      duration_formatted: formatDuration(treatment.duration_minutes),
    };
  };

  // Fetch single treatment by slug
  const fetchTreatmentBySlug = async (
    slug: string
  ): Promise<TreatmentWithFormatted | null> => {
    try {
      const response = await $fetch<{ data: TreatmentData[] }>(
        '/api/treatments'
      );
      const treatment = response.data.find(
        (t) => t.slug === slug && t.is_active
      );

      if (!treatment) {
        return null;
      }

      return formatTreatmentData(treatment);
    } catch (error) {
      console.error('Error fetching treatment by slug:', error);
      return null;
    }
  };

  // Fetch all active treatments
  const fetchAllTreatments = async (): Promise<TreatmentWithFormatted[]> => {
    try {
      const response = await $fetch<{ data: TreatmentData[] }>(
        '/api/treatments'
      );
      return response.data
        .filter((t) => t.is_active)
        .map(formatTreatmentData)
        .sort((a, b) => a.display_order - b.display_order);
    } catch (error) {
      console.error('Error fetching treatments:', error);
      return [];
    }
  };

  return {
    fetchTreatmentBySlug,
    fetchAllTreatments,
    formatPrice,
    formatDuration,
    formatTreatmentData,
  };
};
