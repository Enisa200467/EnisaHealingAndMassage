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
export const useTreatmentDetailsFormatter = () => {
  const formatPrice = (priceCents: number): string => {
    return `€ ${(priceCents / 100).toFixed(0)}`;
  };

  const formatDuration = (minutes: number): string => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      if (remainingMinutes === 0) {
        return `${hours} ${hours === 1 ? "uur" : "uur"}`;
      }
      return `${hours}u ${remainingMinutes} min`;
    }
    return `${minutes} minuten`;
  };

  const formatTreatmentData = (
    treatment: TreatmentData,
  ): TreatmentWithFormatted => {
    return {
      ...treatment,
      price_formatted: formatPrice(treatment.price_cents),
      duration_formatted: formatDuration(treatment.duration_minutes),
    };
  };

  return {
    formatPrice,
    formatDuration,
    formatTreatmentData,
  };
};
