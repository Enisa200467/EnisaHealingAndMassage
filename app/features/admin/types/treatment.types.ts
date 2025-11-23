export interface Treatment {
  id: string;
  name: string;
  slug: string;
  description?: string;
  duration_minutes: number;
  price_cents: number;
  icon?: string;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface CreateTreatmentInput {
  name: string;
  slug?: string;
  description?: string;
  duration_minutes: number;
  price_cents: number;
  icon?: string;
  display_order?: number;
}

export interface UpdateTreatmentInput extends Partial<CreateTreatmentInput> {
  id: string;
  is_active?: boolean;
}

export interface TreatmentFormData {
  name: string;
  description: string;
  duration_minutes: number;
  price_euros: number; // For form display, converted to/from price_cents
  icon: string;
  display_order: number;
  is_active: boolean;
}

export const COMMON_ICONS = [
  { value: 'i-mdi-sparkles', label: 'Sparkles (Chakra/Energy)' },
  { value: 'i-mdi-heart', label: 'Heart (Intuitive/Loving)' },
  { value: 'i-mdi-account-group', label: 'People (Classic/Traditional)' },
  { value: 'i-mdi-meditation', label: 'Meditation (Calm/Peaceful)' },
  { value: 'i-mdi-hands-pray', label: 'Hands (Healing/Prayer)' },
  { value: 'i-mdi-flower', label: 'Flower (Natural/Gentle)' },
  { value: 'i-mdi-leaf', label: 'Leaf (Organic/Natural)' },
  { value: 'i-mdi-run-fast', label: 'Running (Sports/Active)' },
] as const;
