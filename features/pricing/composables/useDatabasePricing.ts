import { useTreatmentStore } from '~/features/treatments/store';
import type { Database } from '~/types/database.types';

type Treatment = Database['public']['Tables']['treatments']['Row'];

export interface PricingTreatment {
  id: string;
  name: string;
  duration: string;
  price: string;
  description: string;
  intensity: number;
  intensityLabel: string;
  benefits: string[];
  slug: string;
  category: string;
}

export interface PricingPackage {
  name: string;
  description: string;
  originalPrice: string;
  discountPrice: string;
  savings: string;
  validity: string;
}

/**
 * Database-driven pricing composable
 * Fetches treatment data from the database and provides formatted pricing information
 */
export const useDatabasePricing = () => {
  // Static packages (keep the discount packages as requested)
  const packages: PricingPackage[] = [
    {
      name: '3 Behandelingen Pakket',
      description: 'Kies 3 willekeurige behandelingen',
      originalPrice: '€210',
      discountPrice: '€190',
      savings: '€20',
      validity: '6 maanden geldig',
    },
    {
      name: '5 Behandelingen Pakket',
      description: 'Kies 5 willekeurige behandelingen',
      originalPrice: '€350',
      discountPrice: '€300',
      savings: '€50',
      validity: '12 maanden geldig',
    },
  ];

  const treatmentStore = useTreatmentStore();

  // Generate intensity dots
  const getIntensityDots = (intensity: number) => {
    return Array.from({ length: 5 }, (_, i) => i < intensity);
  };

  return {
    packages,
    healingTreatments: treatmentStore.healingTreatments,
    massageTreatments: treatmentStore.massageTreatments,
    loading: treatmentStore.loading,
    error: treatmentStore.error,
    getIntensityDots,
  };
};
