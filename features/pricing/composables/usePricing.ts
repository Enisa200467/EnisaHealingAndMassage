export interface Treatment {
  name: string;
  duration: string;
  price: string;
  description: string;
  intensity: number;
  intensityLabel: string;
  benefits: string[];
}

export interface Package {
  name: string;
  description: string;
  originalPrice: string;
  discountPrice: string;
  savings: string;
  validity: string;
}

export const usePricing = () => {
  const healingTreatments: Treatment[] = [
    {
      name: 'Chakra Balancering',
      duration: '60 minuten',
      price: '€70',
      description:
        "Energetische balancering van je chakra's voor innerlijke harmonie",
      intensity: 1,
      intensityLabel: 'Zeer Zacht',
      benefits: [
        'Energetische balans',
        'Innerlijke rust',
        'Emotionele healing',
      ],
    },
    {
      name: 'Energetische Healing Sessie',
      duration: '90 minuten',
      price: '€80',
      description:
        'Uitgebreide energetische behandeling voor diepgaande genezing',
      intensity: 1,
      intensityLabel: 'Zeer Zacht',
      benefits: [
        'Diepe ontspanning',
        'Energetische reiniging',
        'Spirituele groei',
      ],
    },
  ];

  const massageTreatments: Treatment[] = [
    {
      name: 'Klassieke Ontspanningsmassage',
      duration: '60 minuten',
      price: '€65',
      description:
        'Traditionele massage voor volledige ontspanning van lichaam en geest',
      intensity: 2,
      intensityLabel: 'Zacht',
      benefits: [
        'Spierontspanning',
        'Stressvermindering',
        'Betere doorbloeding',
      ],
    },
    {
      name: 'Zweedse Massage',
      duration: '60 minuten',
      price: '€70',
      description: 'Klassieke Zweedse massagetechniek voor diepe ontspanning',
      intensity: 3,
      intensityLabel: 'Medium',
      benefits: [
        'Diepe ontspanning',
        'Verbeterde flexibiliteit',
        'Pijnverlichting',
      ],
    },
    {
      name: 'Sportmassage',
      duration: '60 minuten',
      price: '€75',
      description: 'Gespecialiseerde massage voor sporters en actieve mensen',
      intensity: 4,
      intensityLabel: 'Stevig',
      benefits: [
        'Herstel na sport',
        'Blessure preventie',
        'Prestatieverbetering',
      ],
    },
    {
      name: 'Intuïtieve Lichaamsmassage',
      duration: '75 minuten',
      price: '€75',
      description:
        "Op maat gemaakte massage afgestemd op jouw lichaam's behoeften",
      intensity: 2,
      intensityLabel: 'Zacht',
      benefits: [
        'Persoonlijke benadering',
        'Holistische aanpak',
        'Diepgaande ontspanning',
      ],
    },
  ];

  const packages: Package[] = [
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

  // Generate intensity dots
  const getIntensityDots = (intensity: number) => {
    return Array.from({ length: 5 }, (_, i) => i < intensity);
  };

  return {
    healingTreatments,
    massageTreatments,
    packages,
    getIntensityDots,
  };
};
