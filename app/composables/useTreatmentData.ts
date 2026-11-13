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

// Verified service IDs. Unknown treatments keep the existing general booking URL.
export const setmoreServiceUrl = (serviceId: string): string =>
  `https://enisa-healing-massage.setmore.com/services/${serviceId}`;

const treatmentServiceIds: Record<string, string> = {
  'chakra-healing': '2148ffb2-310a-4cb5-8bc0-533c72422382',
  'chakra-healing-ontspannings-massage': 'e5e0bdc9-d082-411c-9004-49db8fb89442',
  'chakra-healing-ontspanningsmassage': 'e5e0bdc9-d082-411c-9004-49db8fb89442',
  'energetische-healing': 'e468911f-41d4-4a48-bff8-199340927928',
  'energetische-lichaamshealing': 'e468911f-41d4-4a48-bff8-199340927928',
  'ontspanningsmassage': 'aaa5749c-4bc8-4df0-9fc0-8eb2cba5cc94',
  'anti-stress': 'a7168302-dd8d-4b96-8e4e-748488656c3c',
  'hypnotherapie': '337d6c1c-e1fa-4a0a-b45f-f404eaac22ce',
  'regressietherapie-amsterdam-noord': '337d6c1c-e1fa-4a0a-b45f-f404eaac22ce',
};

const treatmentSlug = (path: string): string =>
  path.replace(/\/$/, '').split('/').pop() || '';

export const isIntakeTreatment = (path: string): boolean =>
  ['hypnotherapie', 'regressietherapie-amsterdam-noord'].includes(treatmentSlug(path));

export const isBlockadesTreatment = (path: string): boolean =>
  treatmentSlug(path) === 'energetische-blokkades-opheffen';

// On overview pages, visitors choose their trajectory on the existing detail page.
export const treatmentBookingUrl = (path: string): string => {
  if (isBlockadesTreatment(path)) return '/behandelingen/energetische-blokkades-opheffen';
  const serviceId = treatmentServiceIds[treatmentSlug(path)];
  return serviceId ? setmoreServiceUrl(serviceId) : 'https://enisa-healing-massage.setmore.com';
};

export const blockadesBookingOptions = [
  { label: 'Boek traject 3 sessies', href: setmoreServiceUrl('c6bf84bc-9e4e-4d1f-bc80-89d4578653e4') },
  { label: 'Boek traject 4 sessies', href: setmoreServiceUrl('6d6dd807-cb0e-4527-a6ac-f4198c5ecfa4') },
];
