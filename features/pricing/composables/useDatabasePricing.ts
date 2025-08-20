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
  const { fetchAllTreatments } = useTreatmentData();

  // Reactive state
  const treatments = ref<Treatment[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Benefits mapping based on treatment name or category
  const getBenefitsForTreatment = (treatment: Treatment): string[] => {
    const benefitsMap: Record<string, string[]> = {
      'chakra-balancering': [
        'Energetische balans',
        'Innerlijke rust',
        'Emotionele healing',
      ],
      'energetische-healing-sessie': [
        'Diepe ontspanning',
        'Energetische reiniging',
        'Spirituele groei',
      ],
      'klassieke-ontspanningsmassage': [
        'Spierontspanning',
        'Stressvermindering',
        'Betere doorbloeding',
      ],
      'zweedse-massage': [
        'Diepe ontspanning',
        'Verbeterde flexibiliteit',
        'Pijnverlichting',
      ],
      sportmassage: [
        'Herstel na sport',
        'Blessure preventie',
        'Prestatieverbetering',
      ],
      'intuitieve-lichaamsmassage': [
        'Persoonlijke benadering',
        'Holistische aanpak',
        'Diepgaande ontspanning',
      ],
    };

    // Return specific benefits if found, otherwise default by category
    if (benefitsMap[treatment.slug]) {
      return benefitsMap[treatment.slug];
    }

    // Default benefits by category
    if (treatment.category === 'healing') {
      return ['Energetische balans', 'Innerlijke rust', 'Spirituele groei'];
    }

    if (treatment.category === 'massage') {
      return [
        'Spierontspanning',
        'Stressvermindering',
        'Verbeterde circulatie',
      ];
    }

    // Generic fallback
    return ['Ontspanning', 'Welzijn verbetering', 'Stress vermindering'];
  };

  // Format treatment data for pricing display
  const formatTreatmentForPricing = (
    treatment: Treatment
  ): PricingTreatment => {
    return {
      id: treatment.id,
      name: treatment.name,
      duration: formatDuration(treatment.duration_minutes),
      price: formatPrice(treatment.price_cents),
      description: treatment.description || '',
      intensity: treatment.intensity || 1,
      intensityLabel: treatment.intensity_label || 'Zacht',
      benefits: getBenefitsForTreatment(treatment),
      slug: treatment.slug,
      category: treatment.category || 'other',
    };
  };

  // Format price helper
  const formatPrice = (priceCents: number): string => {
    return `€${(priceCents / 100).toFixed(0)}`;
  };

  // Format duration helper
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

  // Fetch treatments from database
  const fetchTreatments = async (): Promise<void> => {
    try {
      loading.value = true;
      error.value = null;

      const dbTreatments = await fetchAllTreatments();

      // If no treatments from database, use fallback data for development
      if (dbTreatments.length === 0) {
        console.warn('No treatments found in database, using fallback data');
        treatments.value = getFallbackTreatments();
        return;
      }

      // Convert to the format expected by this composable
      treatments.value = dbTreatments.map((treatment) => ({
        id: treatment.id,
        name: treatment.name,
        slug: treatment.slug,
        description: treatment.description || null,
        duration_minutes: treatment.duration_minutes,
        price_cents: treatment.price_cents,
        intensity: treatment.intensity || null,
        intensity_label: treatment.intensity_label || null,
        icon: treatment.icon || null,
        category: treatment.category || null,
        is_active: treatment.is_active,
        display_order: treatment.display_order,
        created_at: treatment.created_at,
        updated_at: treatment.updated_at,
      }));
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : 'Failed to fetch treatments';
      console.error('Error fetching treatments for pricing:', err);

      // Use fallback data when there's an error
      console.warn('Using fallback treatments due to fetch error');
      treatments.value = getFallbackTreatments();
    } finally {
      loading.value = false;
    }
  };

  // Fallback treatments data for when database is not available
  const getFallbackTreatments = (): Treatment[] => {
    return [
      {
        id: '1',
        name: 'Chakra Balancering',
        slug: 'chakra-balancering',
        description:
          'Herstel de harmonie en energiestroom in je lichaam met een zachte Chakra Balancering. Gericht op het vrijmaken van blokkades en het bevorderen van emotioneel en fysiek welzijn.',
        duration_minutes: 60,
        price_cents: 7000,
        intensity: 1,
        intensity_label: 'Zeer Zacht',
        icon: 'i-mdi-sparkles',
        category: 'healing',
        is_active: true,
        display_order: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'Energetische Healing Sessie',
        slug: 'energetische-healing-sessie',
        description:
          'Herstel de natuurlijke energiestroom in je lichaam met een intuïtieve energetische healing. Perfect voor diepgaande ontspanning en het oplossen van energetische blokkades.',
        duration_minutes: 75,
        price_cents: 8500,
        intensity: 1,
        intensity_label: 'Zeer Zacht',
        icon: 'i-mdi-weather-sunny',
        category: 'healing',
        is_active: true,
        display_order: 2,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: '3',
        name: 'Klassieke Ontspanningsmassage',
        slug: 'klassieke-ontspanningsmassage',
        description:
          'Ervaar diepe ontspanning en verlichting van spierspanning met onze traditionele klassieke massage. Ideaal om stress te verminderen en tot rust te komen.',
        duration_minutes: 60,
        price_cents: 6500,
        intensity: 2,
        intensity_label: 'Zacht',
        icon: 'i-mdi-account-group',
        category: 'massage',
        is_active: true,
        display_order: 3,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: '4',
        name: 'Intuïtieve Lichaamsmassage',
        slug: 'intuitieve-lichaamsmassage',
        description:
          'Een zachte, intuïtieve massage waarbij volledig wordt ingespeeld op wat jouw lichaam op dat moment nodig heeft. Een unieke ervaring van diepe verbinding en ontspanning.',
        duration_minutes: 90,
        price_cents: 9500,
        intensity: 2,
        intensity_label: 'Zacht',
        icon: 'i-mdi-heart',
        category: 'massage',
        is_active: true,
        display_order: 4,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];
  };

  // Computed healing treatments
  const healingTreatments = computed<PricingTreatment[]>(() => {
    return treatments.value
      .filter((t) => t.category === 'healing' && t.is_active)
      .sort((a, b) => a.display_order - b.display_order)
      .map(formatTreatmentForPricing);
  });

  // Computed massage treatments
  const massageTreatments = computed<PricingTreatment[]>(() => {
    return treatments.value
      .filter((t) => t.category === 'massage' && t.is_active)
      .sort((a, b) => a.display_order - b.display_order)
      .map(formatTreatmentForPricing);
  });

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

  // Generate intensity dots
  const getIntensityDots = (intensity: number) => {
    return Array.from({ length: 5 }, (_, i) => i < intensity);
  };

  // Auto-fetch treatments on mount
  onMounted(() => {
    fetchTreatments();
  });

  return {
    // State
    treatments: readonly(treatments),
    loading: readonly(loading),
    error: readonly(error),

    // Computed treatments
    healingTreatments: readonly(healingTreatments),
    massageTreatments: readonly(massageTreatments),
    packages,

    // Methods
    fetchTreatments,
    getIntensityDots,
    formatTreatmentForPricing,
  };
};
