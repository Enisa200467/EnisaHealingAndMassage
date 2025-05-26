<template>
  <section id="behandelingen" class="py-16 sm:py-24 scroll-mt-20">
    <UContainer>
      <div class="text-center">
        <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
          Ontdek Onze Behandelingen
        </h2>
        <p class="mt-4 text-lg leading-8 text-gray-600">
          Kies de behandeling die bij jou past: focus op heling of pure ontspanning.
        </p>
      </div>

      <div class="mt-16">
        <UTabs :items="massageTypes" class="w-full">
          <template #item="{ item }">
            <div class="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3">
              <UCard
                v-for="massage in item.massages"
                :key="massage.title"
                class="flex flex-col"
                variant="outline"
              >
                <template #header>
                  <div class="flex items-center">
                    <UIcon
                      :name="massage.icon"
                      class="mr-2 text-primary-500"
                    />
                    <h3 class="text-lg font-semibold leading-6">
                      {{ massage.title }}
                    </h3>
                  </div>
                </template>

                <p class="text-sm text-gray-600 grow">
                  {{ massage.description }}
                </p>

                <template #footer>
                  <UButton
                    variant="outline"
                    :to="massage.slug"
                    label="Meer Info"
                    size="sm"
                  />
                  <UButton
                    :to="routes.pages.booking"
                    label="Direct Boeken"
                    size="sm"
                    class="ml-2"
                  />
                </template>
              </UCard>
            </div>
          </template>
        </UTabs>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const routes = useRoutes()

// Fetch dynamic treatment data
const { data: allTreatments } = await useAsyncData(
  'homepage-treatments',
  async (): Promise<{
    id: string
    slug: string
    title: string
    description: string
    icon: string
    category: string
  }[]> => {
    // Get all treatments with full metadata
    const treatments = await queryCollection('treatments').all()

    return treatments.map((treatment) => ({
      id: treatment.id,
      slug: treatment.path,
      title: treatment.title,
      description: treatment.description,
      icon: (treatment.meta.icon as string) || 'i-mdi-sparkles',
      category: (treatment.meta.category as string) || 'healing',
    }))
  }
)

// Group treatments by category for the tabs
const massageTypes = computed(() => {
  if (!allTreatments.value) return []
  
  const healingTreatments = allTreatments.value.filter(
    (treatment) => treatment.category === 'healing'
  )
  const massageTreatments = allTreatments.value.filter(
    (treatment) => treatment.category === 'massage'
  )

  return [
    {
      label: 'Helende Behandelingen',
      slot: 'item',
      massages: healingTreatments,
    },
    {
      label: 'Reguliere Massages',
      slot: 'item',
      massages: massageTreatments,
    },
  ]
})
</script>
