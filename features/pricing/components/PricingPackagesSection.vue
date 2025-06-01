<template>
  <section class="mb-16">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-neutral-900 mb-4">
        Voordeelpakketten
      </h2>
      <p class="text-neutral-600 max-w-2xl mx-auto">
        Bespaar geld met onze voordeelpakketten. Perfect voor regelmatige
        behandelingen.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <UCard
        v-for="pkg in packages"
        :key="pkg.name"
        class="border-2 border-primary-200 relative overflow-hidden"
      >
        <!-- Savings Badge -->
        <div
          class="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium"
        >
          Bespaar {{ pkg.savings }}
        </div>

        <template #header>
          <div>
            <h3 class="text-xl font-semibold text-neutral-900 mb-2">
              {{ pkg.name }}
            </h3>
            <p class="text-neutral-600">{{ pkg.description }}</p>
          </div>
        </template>

        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-neutral-500 line-through">
                {{ pkg.originalPrice }}
              </p>
              <p class="text-3xl font-bold text-primary-600">
                {{ pkg.discountPrice }}
              </p>
            </div>
            <div class="text-right">
              <p class="text-sm text-neutral-600">{{ pkg.validity }}</p>
            </div>
          </div>

          <div class="bg-neutral-50 p-4 rounded-lg">
            <h4 class="font-medium text-neutral-900 mb-2">Pakket voordelen:</h4>
            <ul class="space-y-1 text-sm text-neutral-600">
              <li class="flex items-center gap-2">
                <UIcon name="i-mdi-check" class="w-4 h-4 text-green-500" />
                Vrije keuze uit alle behandelingen
              </li>
              <li class="flex items-center gap-2">
                <UIcon name="i-mdi-check" class="w-4 h-4 text-green-500" />
                Geen vervaldatum stress
              </li>
              <li class="flex items-center gap-2">
                <UIcon name="i-mdi-check" class="w-4 h-4 text-green-500" />
                Overdraagbaar aan familie/vrienden
              </li>
            </ul>
          </div>
        </div>

        <template #footer>
          <UButton to="/contact" block variant="outline" icon="i-mdi-email">
            Informeer naar dit pakket
          </UButton>
        </template>
      </UCard>
    </div>
  </section>
</template>

<script setup lang="ts">
const { packages } = usePricing();
</script>
