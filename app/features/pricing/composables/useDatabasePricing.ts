import type { Database } from '~/types/database.types';

export interface PricingTreatment {
  id: string;
  name: string;
  duration: string;
  price: string;
  description: string;
  benefits: string[];
  slug: string;
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
      description: 'Energetische healing of chakra healing',
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

  return {
    packages,
  };
};
