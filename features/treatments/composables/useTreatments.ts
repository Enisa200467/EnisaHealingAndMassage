import type { TreatmentData, TreatmentCategory, TreatmentFilter } from '../types/treatments.types'

export const useTreatments = () => {
  /**
   * Get all treatments with optional filtering
   */
  const getAllTreatments = async (filter?: TreatmentFilter): Promise<TreatmentData[]> => {
    try {
      const { data: allTreatments } = await useAsyncData(
        'all-treatments',
        async (): Promise<TreatmentData[]> => {
          const treatments = await queryCollection('treatments')
            .where({ _type: 'markdown' })
            .sort({ title: 1 })
            .find()

          return treatments.map((treatment: any) => ({
            slug: treatment._file?.split('/').pop()?.replace('.md', ''),
            path: treatment._path,
            title: treatment.title,
            description: treatment.description,
            category: treatment.category,
            icon: treatment.icon,
            duration: treatment.duration,
            price: treatment.price,
            intensity: treatment.intensity,
            intensityLabel: treatment.intensityLabel,
          }))
        }
      )

      let filteredTreatments = allTreatments.value || []

      // Apply filters
      if (filter?.category) {
        filteredTreatments = filteredTreatments.filter(
          treatment => treatment.category === filter.category
        )
      }

      if (filter?.intensity) {
        filteredTreatments = filteredTreatments.filter(
          treatment => treatment.intensity === filter.intensity
        )
      }

      return filteredTreatments
    } catch (error) {
      console.error('Error fetching treatments:', error)
      return []
    }
  }

  /**
   * Get treatments grouped by category
   */
  const getTreatmentsByCategory = async (): Promise<TreatmentCategory[]> => {
    const allTreatments = await getAllTreatments()
    
    const healingTreatments = allTreatments.filter(t => t.category === 'healing')
    const massageTreatments = allTreatments.filter(t => t.category === 'massage')

    return [
      {
        id: 'healing',
        title: 'Healing Behandelingen',
        treatments: healingTreatments
      },
      {
        id: 'massage', 
        title: 'Massage Behandelingen',
        treatments: massageTreatments
      }
    ]
  }

  /**
   * Get a single treatment by slug
   */
  const getTreatmentBySlug = async (slug: string): Promise<TreatmentData | null> => {
    try {
      const treatment = await queryCollection('treatments')
        .path(`/treatments/${slug}`)
        .first()

      if (!treatment) return null

      return {
        slug: treatment._file?.split('/').pop()?.replace('.md', ''),
        path: treatment._path,
        title: treatment.title,
        description: treatment.description,
        category: treatment.category,
        icon: treatment.icon,
        duration: treatment.duration,
        price: treatment.price,
        intensity: treatment.intensity,
        intensityLabel: treatment.intensityLabel,
      }
    } catch (error) {
      console.error('Error fetching treatment:', error)
      return null
    }
  }

  /**
   * Get popular treatments (could be based on bookings, views, etc.)
   */
  const getPopularTreatments = async (limit = 3): Promise<TreatmentData[]> => {
    const allTreatments = await getAllTreatments()
    // For now, just return the first few treatments
    // In a real app, this would be based on actual popularity metrics
    return allTreatments.slice(0, limit)
  }

  return {
    getAllTreatments,
    getTreatmentsByCategory,
    getTreatmentBySlug,
    getPopularTreatments
  }
}
