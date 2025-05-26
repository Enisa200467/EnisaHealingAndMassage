export interface TreatmentData {
  slug?: string
  path: string
  title: string
  _file?: string
  description?: string
  category?: string
  icon?: string
  duration?: string
  price?: string
  intensity?: number
  intensityLabel?: string
}

export interface TreatmentCategory {
  id: string
  title: string
  treatments: TreatmentData[]
}

export interface TreatmentFilter {
  category?: 'healing' | 'massage'
  intensity?: number
  duration?: string
  priceRange?: [number, number]
}
