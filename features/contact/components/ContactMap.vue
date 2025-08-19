<script setup lang="ts">
// Map and location information for contact page
</script>

<template>
  <section class="py-16 sm:py-24 bg-purple-50">
    <UContainer>
      <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl font-bold text-neutral-900 mb-8 text-center">
          Locatie & Bereikbaarheid
        </h2>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <!-- Map Placeholder -->
          <UCard>
            <div
              class="bg-neutral-100 h-80 flex items-center justify-center rounded-lg"
            >
              <div class="text-center">
                <UIcon
                  name="i-mdi-map"
                  class="w-16 h-16 text-neutral-400 mx-auto mb-4"
                />
                <p class="text-neutral-500">Google Maps embed</p>
                <p class="text-sm text-neutral-400">
                  Hier komt de interactieve kaart
                </p>
              </div>
            </div>
          </UCard>

          <!-- Directions -->
          <div>
            <div class="space-y-4">
              <UCard>
                <template #header>
                  <div class="flex items-center gap-2">
                    <UIcon name="i-mdi-car" class="w-5 h-5 text-primary-500" />
                    <span class="font-medium">Met de auto</span>
                  </div>
                </template>
                <p class="text-neutral-600 text-sm">
                  Gratis parkeren direct voor de deur. Vanaf de A10 ring
                  Amsterdam, afrit S109 richting centrum.
                </p>
              </UCard>

              <UCard>
                <template #header>
                  <div class="flex items-center gap-2">
                    <UIcon
                      name="i-mdi-train"
                      class="w-5 h-5 text-secondary-500"
                    />
                    <span class="font-medium">Openbaar vervoer</span>
                  </div>
                </template>
                <p class="text-neutral-600 text-sm">
                  5 minuten lopen vanaf tramhalte Voorbeeldplein (lijn 2, 5).
                  Vanaf Amsterdam Centraal 20 minuten met tram.
                </p>
              </UCard>

              <UCard>
                <template #header>
                  <div class="flex items-center gap-2">
                    <UIcon name="i-mdi-bike" class="w-5 h-5 text-green-500" />
                    <span class="font-medium">Met de fiets</span>
                  </div>
                </template>
                <p class="text-neutral-600 text-sm">
                  Fietsenstalling beschikbaar achter het pand. Goed bereikbaar
                  via de grote fietspaden.
                </p>
              </UCard>
            </div>

            <div class="mt-6">
              <UButton
                href="https://maps.google.com"
                target="_blank"
                variant="outline"
                icon="i-mdi-directions"
                block
              >
                Open in Google Maps
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>
