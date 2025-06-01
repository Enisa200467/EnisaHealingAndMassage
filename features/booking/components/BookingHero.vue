<script setup lang="ts">
// Hero section for booking page
</script>

<template>
  <section
    class="bg-gradient-to-br from-primary-50 to-secondary-50 py-16 sm:py-24"
  >
    <UContainer>
      <div class="max-w-4xl mx-auto text-center">
        <div class="mb-8">
          <UIcon
            name="i-mdi-calendar-heart"
            class="w-16 h-16 text-primary-500 mx-auto mb-6"
          />
          <h1 class="text-4xl sm:text-5xl font-bold text-neutral-900 mb-6">
            Boek Je Afspraak
          </h1>
          <p class="text-xl text-neutral-600 max-w-2xl mx-auto">
            Plan eenvoudig je healing of massage behandeling in. Kies je
            gewenste behandeling, datum en tijd voor een moment van welzijn en
            ontspanning.
          </p>
        </div>

        <!-- Quick Stats -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white/60 backdrop-blur-sm rounded-lg p-6">
            <UIcon
              name="i-mdi-clock-fast"
              class="w-8 h-8 text-primary-500 mx-auto mb-3"
            />
            <h3 class="font-semibold text-neutral-900 mb-1">
              Snel & Gemakkelijk
            </h3>
            <p class="text-sm text-neutral-600">Boek binnen 2 minuten</p>
          </div>

          <div class="bg-white/60 backdrop-blur-sm rounded-lg p-6">
            <UIcon
              name="i-mdi-check-circle"
              class="w-8 h-8 text-green-500 mx-auto mb-3"
            />
            <h3 class="font-semibold text-neutral-900 mb-1">
              Direct Bevestigd
            </h3>
            <p class="text-sm text-neutral-600">Onmiddellijke bevestiging</p>
          </div>

          <div class="bg-white/60 backdrop-blur-sm rounded-lg p-6">
            <UIcon
              name="i-mdi-calendar-edit"
              class="w-8 h-8 text-secondary-500 mx-auto mb-3"
            />
            <h3 class="font-semibold text-neutral-900 mb-1">
              Flexibel Wijzigen
            </h3>
            <p class="text-sm text-neutral-600">Tot 24u voor je afspraak</p>
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>
