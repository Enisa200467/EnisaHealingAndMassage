<template>
  <section id="behandelingen" class="py-16 sm:py-24 scroll-mt-20">
    <UContainer>
      <div class="text-center">
        <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
          Ontdek Onze Behandelingen
        </h2>
        <p class="mt-4 text-lg leading-8 text-gray-600">
          Kies de behandeling die bij jou past: focus op heling of pure
          ontspanning.
        </p>
      </div>

      <div class="mt-16">
        <UTabs :items="massageTypes" class="w-full">
          <template #item="{ item }">
            <div
              class="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3"
            >
              <UCard
                v-for="massage in item.massages"
                :key="massage.title"
                class="flex flex-col"
                variant="outline"
              >
                <template #header>
                  <div class="flex items-center">
                    <UIcon
                      :name="massage.icon || 'i-mdi-sparkles'"
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
                    :to="massage.path"
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
const routes = useRoutes();

// Group treatments by category for the tabs
const massageTypes = computed(() => [
  {
    label: 'Helende Behandelingen',
    slot: 'item',
    massages: routes.treatments.value.healing.items,
  },
  {
    label: 'Reguliere Massages',
    slot: 'item',
    massages: routes.treatments.value.massage.items,
  },
]);
</script>
